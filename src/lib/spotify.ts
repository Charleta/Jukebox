const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!

let cachedToken: string | null = null
let tokenExpiresAt = 0
let tokenRefreshPromise: Promise<string> | null = null

function fetchWithTimeout(url: string, options: RequestInit = {}, ms = 8000): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), ms)
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(id))
}

export async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt - 60_000) {
    return cachedToken
  }
  // Mutex: si ya hay un refresh en curso, esperar ese mismo resultado
  if (tokenRefreshPromise) return tokenRefreshPromise

  tokenRefreshPromise = (async () => {
    try {
      const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
      const res = await fetchWithTimeout('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`,
      })
      const data = await res.json()
      cachedToken = data.access_token
      tokenExpiresAt = Date.now() + (data.expires_in ?? 3600) * 1000
      return cachedToken!
    } finally {
      tokenRefreshPromise = null
    }
  })()

  return tokenRefreshPromise
}

export async function searchSpotify(query: string) {
  const token = await getAccessToken()
  const headers = { Authorization: `Bearer ${token}` }

  const [generalRes, playlistRes] = await Promise.all([
    fetchWithTimeout(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist,track&limit=10`,
      { headers }
    ),
    fetchWithTimeout(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=6`,
      { headers }
    ),
  ])

  if (generalRes.status === 429 || playlistRes.status === 429) {
    const retryAfter = generalRes.headers.get('Retry-After') ?? playlistRes.headers.get('Retry-After')
    const segundos = retryAfter ? Number(retryAfter) : 30
    throw new Error(`Rate limit. Esperá ${segundos} segundos.`)
  }

  const general = await generalRes.json()
  const playlists = await playlistRes.json()
  return {
    ...general,
    playlists: playlists.playlists,
  }
}

export async function getArtistTopTracks(artistId: string) {
  const token = await getAccessToken()
  const res = await fetchWithTimeout(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=AR`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  const data = await res.json()
  return { tracks: data.tracks ?? [] }
}

export async function getArtistAlbums(artistId: string) {
  const token = await getAccessToken()
  const headers = { Authorization: `Bearer ${token}` }

  const [topRes, albumsRes] = await Promise.all([
    fetchWithTimeout(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=AR`,
      { headers }
    ),
    fetchWithTimeout(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album%2Csingle&limit=10&market=AR`,
      { headers }
    ),
  ])

  const topData = await topRes.json()
  const topTracks = topData.tracks ?? []

  const albumsData = await albumsRes.json()
  const albums = albumsData.items ?? []

  const trackArrays = await Promise.all(
    albums.slice(0, 6).map(async (album: any) => {
      const res = await fetchWithTimeout(
        `https://api.spotify.com/v1/albums/${album.id}/tracks?limit=10&market=AR`,
        { headers }
      )
      const data = await res.json()
      return (data.items ?? []).map((track: any) => ({
        ...track,
        album: { images: album.images, name: album.name },
      }))
    })
  )

  const albumTracks = trackArrays.flat()
  const allTracks = [...topTracks, ...albumTracks]
  const seen = new Set<string>()
  return allTracks.filter(t => {
    const key = `${t.name.toLowerCase()}|${t.artists?.[0]?.name?.toLowerCase() ?? ''}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export async function searchPlaylists(query: string) {
  const token = await getAccessToken()
  const res = await fetchWithTimeout(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=6`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.json()
}

export async function getPlaylistTracks(playlistId: string) {
  const token = await getAccessToken()
  const res = await fetchWithTimeout(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=AR&limit=10`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  const data = await res.json()
  return (data.items ?? [])
    .map((item: any) => item.track)
    .filter(Boolean)
}
