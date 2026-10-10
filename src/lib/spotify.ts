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

// ─── Redirect URI ────────────────────────────────────────────────────────────
// Next dev reescribe req.url a localhost; usamos el host real para que coincida
// con la URI registrada en Spotify (ej. http://127.0.0.1:3000/callback)
export function getRedirectUri(req: Request, path = '/callback'): string {
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  if (!host) return new URL(path, req.url).toString()
  const proto = req.headers.get('x-forwarded-proto') ?? new URL(req.url).protocol.replace(':', '')
  return `${proto}://${host}${path}`
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
        body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: REFRESH_TOKEN }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.access_token) {
        cachedToken = null
        tokenExpiresAt = 0
        throw new Error(
          `No se pudo refrescar el token de Spotify (${res.status}): ${data.error_description ?? data.error ?? 'respuesta inválida'}`
        )
      }
      cachedToken = data.access_token as string
      tokenExpiresAt = Date.now() + (data.expires_in ?? 3600) * 1000
      return cachedToken
    } finally {
      tokenRefreshPromise = null
    }
  })()

  return tokenRefreshPromise
}

export function invalidateAccessToken() {
  cachedToken = null
  tokenExpiresAt = 0
}

// Fetch autenticado: si Spotify responde 401, descarta el token y reintenta una vez
async function spotifyFetch(url: string): Promise<Response> {
  const token = await getAccessToken()
  const res = await fetchWithTimeout(url, { headers: { Authorization: `Bearer ${token}` } })
  if (res.status !== 401) return res

  if (cachedToken === token) invalidateAccessToken()
  const fresh = await getAccessToken()
  return fetchWithTimeout(url, { headers: { Authorization: `Bearer ${fresh}` } })
}

async function readJson(res: Response) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(`Spotify ${res.status}: ${data?.error?.message ?? res.statusText}`)
  }
  return data
}

// ─── Search ───────────────────────────────────────────────────────────────────
export async function searchSpotify(query: string, soloTracks = false) {
  const key = (soloTracks ? 'import:' : '') + query.toLowerCase().trim()
  const cached = searchCache.get(key)
  if (cached && Date.now() - cached.at < CACHE_TTL) {
    return cached.data
  }

  if (soloTracks) {
    const res = await spotifyFetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`
    )
    if (res.status === 429) {
      const retryAfter = res.headers.get('Retry-After')
      throw new Error(`Rate limit. Esperá ${retryAfter ? Number(retryAfter) : 30} segundos.`)
    }
    const data = await readJson(res)
    searchCache.set(key, { data, at: Date.now() })
    return data
  }

  const [generalRes, playlistRes] = await Promise.all([
    spotifyFetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist,track&limit=10`
    ),
    spotifyFetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=6`
    ),
  ])

  if (generalRes.status === 429 || playlistRes.status === 429) {
    const retryAfter = generalRes.headers.get('Retry-After') ?? playlistRes.headers.get('Retry-After')
    const segundos = retryAfter ? Number(retryAfter) : 30
    throw new Error(`Rate limit. Esperá ${segundos} segundos.`)
  }

  const general = await readJson(generalRes)
  const playlists = await readJson(playlistRes)
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

  const res = await spotifyFetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=AR`
  )
  const data = await readJson(res)
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

  const [topRes, albumsRes] = await Promise.all([
    spotifyFetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=AR`
    ),
    spotifyFetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album%2Csingle&limit=10&market=AR`
    ),
  ])

  // Top tracks es opcional: Spotify lo bloquea (403) para apps en modo desarrollo
  const topTracks = topRes.ok ? ((await topRes.json()).tracks ?? []) : []

  const albumsData = await readJson(albumsRes)
  const albums = albumsData.items ?? []

  const trackArrays = await Promise.all(
    albums.slice(0, 6).map(async (album: any) => {
      const res = await spotifyFetch(
        `https://api.spotify.com/v1/albums/${album.id}/tracks?limit=10&market=AR`
      )
      if (!res.ok) return []
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

  const res = await spotifyFetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=AR&limit=50`
  )
  const data = await readJson(res)
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

  const res = await spotifyFetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=6`
  )
  const result = await readJson(res)
  searchCache.set(key, { data: result, at: Date.now() })
  return result
}
