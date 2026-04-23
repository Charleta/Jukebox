const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!

// ─── Token caché ─────────────────────────────────────────────────────────────
let cachedToken: string | null = null
let tokenExpiresAt = 0
let tokenRefreshPromise: Promise<string> | null = null

// ─── Caché general ───────────────────────────────────────────────────────────
const searchCache = new Map<string, { data: any; at: number }>()
const artistCache = new Map<string, { data: any; at: number }>()
const playlistCache = new Map<string, { data: any; at: number }>()
const CACHE_TTL = 1000 * 60 * 60 * 24 // 24 horas
// ─── Fetch con timeout ────────────────────────────────────────────────────────
function fetchWithTimeout(url: string, options: RequestInit = {}, ms = 8000): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), ms)
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(id))
}

// ─── Token ────────────────────────────────────────────────────────────────────
export async function getAccessToken(): Promise<string> {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error('Faltan variables de entorno de Spotify')
  }

  if (cachedToken && Date.now() < tokenExpiresAt - 60_000) {
    return cachedToken
  }
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

// ─── Search ───────────────────────────────────────────────────────────────────
export async function searchSpotify(query: string, soloTracks = false) {
  const key = (soloTracks ? 'import:' : '') + query.toLowerCase().trim()
  const cached = searchCache.get(key)
  if (cached && Date.now() - cached.at < CACHE_TTL) {
    return cached.data
  }

  const token = await getAccessToken()
  const headers = { Authorization: `Bearer ${token}` }

  if (soloTracks) {
    const res = await fetchWithTimeout(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
      { headers }
    )
    if (res.status === 429) {
      const retryAfter = res.headers.get('Retry-After')
      throw new Error(`Rate limit. Esperá ${retryAfter ? Number(retryAfter) : 30} segundos.`)
    }
    const data = await res.json()
    searchCache.set(key, { data, at: Date.now() })
    return data
  }

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
  const result = { ...general, playlists: playlists.playlists }

  searchCache.set(key, { data: result, at: Date.now() })
  return result
}

// ─── Artist top tracks ────────────────────────────────────────────────────────
export async function getArtistTopTracks(artistId: string) {
  const cached = artistCache.get(`top-${artistId}`)
  if (cached && Date.now() - cached.at < CACHE_TTL) {
    return cached.data
  }

  const token = await getAccessToken()
  const res = await fetchWithTimeout(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=AR`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  const data = await res.json()
  const result = { tracks: data.tracks ?? [] }
  artistCache.set(`top-${artistId}`, { data: result, at: Date.now() })
  return result
}

// ─── Artist albums + tracks ───────────────────────────────────────────────────
export async function getArtistAlbums(artistId: string) {
  const cached = artistCache.get(`albums-${artistId}`)
  if (cached && Date.now() - cached.at < CACHE_TTL) {
    return cached.data
  }

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
  const result = allTracks.filter(t => {
    const key = `${t.name.toLowerCase()}|${t.artists?.[0]?.name?.toLowerCase() ?? ''}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  artistCache.set(`albums-${artistId}`, { data: result, at: Date.now() })
  return result
}

// ─── Playlist tracks ──────────────────────────────────────────────────────────
export async function getPlaylistTracks(playlistId: string) {
  const cached = playlistCache.get(playlistId)
  if (cached && Date.now() - cached.at < CACHE_TTL) {
    return cached.data
  }

  const token = await getAccessToken()
  const res = await fetchWithTimeout(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=AR&limit=50`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  const data = await res.json()
  const result = (data.items ?? [])
    .map((item: any) => item.track)
    .filter(Boolean)

  playlistCache.set(playlistId, { data: result, at: Date.now() })
  return result
}

// ─── Search playlists ─────────────────────────────────────────────────────────
export async function searchPlaylists(query: string) {
  const key = `playlist-${query.toLowerCase().trim()}`
  const cached = searchCache.get(key)
  if (cached && Date.now() - cached.at < CACHE_TTL) {
    return cached.data
  }

  const token = await getAccessToken()
  const res = await fetchWithTimeout(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=6`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  const result = await res.json()
  searchCache.set(key, { data: result, at: Date.now() })
  return result
}
