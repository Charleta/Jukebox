const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!

export async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`,
  })
  const data = await res.json()
  return data.access_token
}

export async function searchSpotify(query: string) {
  const token = await getAccessToken()
  const [generalRes, playlistRes] = await Promise.all([
    fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist,track&limit=10`,
      { headers: { Authorization: `Bearer ${token}` } }
    ),
    fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=6`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  ])
  const general = await generalRes.json()
  const playlists = await playlistRes.json()
  return {
    ...general,
    playlists: playlists.playlists,
  }
}

export async function getArtistTopTracks(artistId: string) {
  const token = await getAccessToken()
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=AR`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  const data = await res.json()
  return { tracks: data.tracks ?? [] }
}

export async function getArtistAlbums(artistId: string) {
  const token = await getAccessToken()

  // Top tracks
  const topRes = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=AR`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  const topData = await topRes.json()
  const topTracks = topData.tracks ?? []

  // Álbumes
  const albumsRes = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album%2Csingle&limit=10&market=AR`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  const albumsData = await albumsRes.json()
  console.log('Albums response:', JSON.stringify(albumsData).slice(0, 200))

  const albums = albumsData.items ?? []
  const trackArrays = await Promise.all(
    albums.slice(0, 6).map(async (album: any) => {
      const res = await fetch(
        `https://api.spotify.com/v1/albums/${album.id}/tracks?limit=10&market=AR`,
        { headers: { Authorization: `Bearer ${token}` } }
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
    const key = t.name.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export async function searchPlaylists(query: string) {
  const token = await getAccessToken()
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=6`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.json()
}

export async function getPlaylistTracks(playlistId: string) {
  // Client credentials - no necesita scopes de usuario
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  const tokenData = await tokenRes.json()
  const token = tokenData.access_token

  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=AR&limit=50`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  const data = await res.json()
  console.log('playlist response:', JSON.stringify(data).slice(0, 300))
  return (data.items ?? [])
    .map((item: any) => item.track)
    .filter(Boolean)
}