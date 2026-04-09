import './env' // debe ser el primer import — carga .env.local antes que todo
import { getAccessToken } from '../src/lib/spotify'
import { prismaCloud } from '../src/lib/dbCloud'

/** Token de Client Credentials — puede leer cualquier playlist pública sin scopes de usuario */
async function getClientToken(): Promise<string> {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64')
  const res: Response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
  })
  const data: any = await res.json()
  if (!data.access_token) throw new Error(`Client credentials falló: ${JSON.stringify(data)}`)
  return data.access_token
}

const PLAYLIST_ID  = '6Oc0YChg1KmK7cfMfdCyTf'
const FALLBACK_NAME = 'Reggaetón Viejito'

async function fetchAllTracks(token: string): Promise<any[]> {
  const items: any[] = []
  let url: string | null =
    `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?market=AR&limit=50`

  while (url) {
    const res: Response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    const data: any = await res.json()
    items.push(...(data.items ?? []))
    url = data.next ?? null
    if (url) console.log(`  → paginando, ${items.length} canciones hasta ahora...`)
  }
  return items
}

async function main() {
  console.log('Obteniendo tokens de Spotify...')
  const userToken   = await getAccessToken()   // token de usuario (para /me)
  const appToken    = await getClientToken()    // client credentials (para leer tracks públicos)
  console.log('  ✓ user token ok')
  console.log('  ✓ app token  ok')

  // ── Paso 1: listar playlists del usuario y buscar la target ──────────────
  console.log('\nListando playlists del usuario (/me/playlists)...')
  const meRes: Response = await fetch(
    'https://api.spotify.com/v1/me/playlists?limit=10',
    { headers: { Authorization: `Bearer ${userToken}` } }
  )
  const meData: any = await meRes.json()

  if (!meRes.ok) {
    console.warn(`  ⚠ No se pudo listar playlists: ${meData?.error?.message ?? meRes.status}`)
  } else {
    const list: any[] = meData.items ?? []
    console.log(`  ${list.length} playlists encontradas:`)
    list.forEach((p: any) =>
      console.log(`  ${p.id === PLAYLIST_ID ? '→' : ' '} [${p.id}] "${p.name}" (${p.tracks?.total ?? '?'} tracks, ${p.public ? 'pública' : 'privada'})`)
    )
    const found = list.find((p: any) => p.id === PLAYLIST_ID)
    if (found) {
      console.log(`\n  ✓ Playlist target encontrada en /me/playlists — intentando leer tracks...`)
    } else {
      console.log(`\n  ✗ Playlist ${PLAYLIST_ID} NO aparece en /me/playlists (puede ser privada de otro usuario o requerir más páginas)`)
    }
  }

  // ── Paso 2: metadatos de la playlist target ───────────────────────────────
  console.log('\nCargando metadatos de la playlist target...')
  const metaRes: Response = await fetch(
    `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}?market=AR`,
    { headers: { Authorization: `Bearer ${appToken}` } }
  )
  const meta: any = await metaRes.json()
  const nombre = (meta.name as string | undefined) || FALLBACK_NAME
  console.log(`Playlist: "${nombre}" (pública: ${meta.public}, tracks: ${meta.tracks?.total ?? '?'})`)

  // ── Paso 3: verificar acceso a tracks (con app token) ────────────────────
  const checkRes: Response = await fetch(
    `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?market=AR&limit=1`,
    { headers: { Authorization: `Bearer ${appToken}` } }
  )
  if (!checkRes.ok) {
    const err: any = await checkRes.json()
    throw new Error(
      `Spotify devolvió ${checkRes.status} al leer tracks: ${err?.error?.message ?? 'Forbidden'}\n` +
      `→ Asegurate de que la playlist sea PÚBLICA en Spotify antes de importar.`
    )
  }
  console.log('Acceso a tracks confirmado.')

  console.log('Descargando todas las canciones...')
  const allItems = await fetchAllTracks(appToken)

  // Filtrar: solo pistas de tipo track (no episodios, no nulos, no locales)
  const valid = allItems.filter(
    item => item?.track && item.track.type === 'track' && !item.track.is_local
  )
  console.log(`${valid.length} canciones válidas (${allItems.length - valid.length} filtradas)`)

  console.log('Creando playlist en Supabase...')
  const playlist = await prismaCloud.playlist.create({
    data: {
      nombre,
      descripcion: (meta.description as string | undefined) ?? '',
      imagenUrl: meta.images?.[0]?.url ?? '',
    },
  })
  console.log(`Playlist creada con ID ${playlist.id}`)

  console.log('Insertando canciones...')
  await prismaCloud.playlistCancion.createMany({
    data: valid.map((item, i) => ({
      playlistId: playlist.id,
      titulo:     item.track.name as string,
      artista:    (item.track.artists as any[]).map(a => a.name).join(', '),
      duracion:   Math.floor(item.track.duration_ms / 1000),
      spotifyUri: item.track.uri as string,
      imagenUrl:  item.track.album.images?.[0]?.url ?? '',
      orden:      i + 1,
    })),
  })

  console.log(`\n✓ "${nombre}" importada con ${valid.length} canciones (ID: ${playlist.id})`)
}

main()
  .catch(e => { console.error('Error:', e); process.exit(1) })
  .finally(() => prismaCloud.$disconnect())
