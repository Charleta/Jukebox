#!/usr/bin/env node
/**
 * Importar playlist de Spotify al Jukebox
 *
 * Uso:
 *   node scripts/importar-playlist.js <spotify-playlist-url-o-id> [nombre-opcional]
 *
 * Ejemplos:
 *   node scripts/importar-playlist.js https://open.spotify.com/playlist/37i9dQZF1DX...
 *   node scripts/importar-playlist.js 37i9dQZF1DX... "Maria Becerra Hits"
 *
 * Requiere que el servidor Next.js esté corriendo en localhost:3000
 */

const fs = require('fs')
const path = require('path')

// Cargar variables de entorno desde .env.local o .env
function loadEnv() {
  const envFiles = ['.env.local', '.env']
  for (const file of envFiles) {
    const envPath = path.join(process.cwd(), file)
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8')
      for (const line of content.split('\n')) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const eqIdx = trimmed.indexOf('=')
        if (eqIdx === -1) continue
        const key = trimmed.slice(0, eqIdx).trim()
        const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
        if (!process.env[key]) process.env[key] = value
      }
      console.log(`✓ Variables cargadas desde ${file}`)
      break
    }
  }
}

function extractPlaylistId(input) {
  // URL completa: https://open.spotify.com/playlist/37i9dQZF1DX...
  const urlMatch = input.match(/playlist\/([a-zA-Z0-9]+)/)
  if (urlMatch) return urlMatch[1]
  // ID directo
  if (/^[a-zA-Z0-9]+$/.test(input)) return input
  throw new Error(`No se pudo extraer el ID de playlist de: ${input}`)
}

async function getSpotifyToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Faltan SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET o SPOTIFY_REFRESH_TOKEN en .env')
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
  })
  const data = await res.json()
  if (!data.access_token) throw new Error(`Error obteniendo token: ${JSON.stringify(data)}`)
  return data.access_token
}

async function getPlaylistInfo(playlistId, token) {
  const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}?market=AR`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  if (data.error) throw new Error(`Error obteniendo playlist: ${data.error.message}`)
  return data
}

async function getPlaylistTracks(playlistId, token) {
  const tracks = []
  let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=AR&limit=50`

  while (url) {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (data.error) throw new Error(`Error obteniendo tracks: ${data.error.message}`)

    for (const item of data.items ?? []) {
      if (!item.track || item.track.type !== 'track') continue
      tracks.push(item.track)
    }

    url = data.next ?? null
  }

  return tracks
}

async function crearPlaylistEnJukebox(nombre, descripcion, imagenUrl, jukebox) {
  const res = await fetch(`${jukebox}/api/playlists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, descripcion, imagenUrl }),
  })
  if (!res.ok) throw new Error(`Error creando playlist: ${res.status}`)
  return res.json()
}

async function agregarCancion(playlistId, cancion, jukebox) {
  const res = await fetch(`${jukebox}/api/playlists/${playlistId}/canciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cancion),
  })
  if (!res.ok) throw new Error(`Error agregando canción: ${res.status}`)
  return res.json()
}

function formatTrack(track) {
  const artistas = track.artists.map(a => a.name).join(', ')
  const imagen = track.album?.images?.[0]?.url ?? ''
  return {
    titulo: track.name,
    artista: artistas,
    duracion: Math.round(track.duration_ms / 1000),
    spotifyUri: track.uri,
    imagenUrl: imagen,
  }
}

async function main() {
  loadEnv()

  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.error('Uso: node scripts/importar-playlist.js <url-o-id-de-spotify> [nombre-playlist]')
    process.exit(1)
  }

  const playlistInput = args[0]
  const nombreOverride = args[1] ?? null
  const JUKEBOX = process.env.JUKEBOX_URL ?? 'http://localhost:3000'

  const playlistId = extractPlaylistId(playlistInput)
  console.log(`\n📋 Playlist ID: ${playlistId}`)
  console.log(`🎵 Conectando con Spotify...`)

  const token = await getSpotifyToken()
  const info = await getPlaylistInfo(playlistId, token)

  const nombre = nombreOverride ?? info.name
  const descripcion = info.description ?? ''
  const imagenUrl = info.images?.[0]?.url ?? ''

  console.log(`\n🎼 Playlist: ${nombre}`)
  console.log(`📝 Descripción: ${descripcion || '(sin descripción)'}`)

  console.log(`\n🔍 Obteniendo canciones...`)
  const tracks = await getPlaylistTracks(playlistId, token)
  console.log(`✓ ${tracks.length} canciones encontradas`)

  console.log(`\n🚀 Creando playlist en Jukebox (${JUKEBOX})...`)
  const playlist = await crearPlaylistEnJukebox(nombre, descripcion, imagenUrl, JUKEBOX)
  console.log(`✓ Playlist creada con ID: ${playlist.id}`)

  console.log(`\n⏳ Agregando canciones...`)
  let ok = 0
  let err = 0
  for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i]
    const cancion = formatTrack(track)
    try {
      await agregarCancion(playlist.id, cancion, JUKEBOX)
      ok++
      process.stdout.write(`\r  ${i + 1}/${tracks.length} - ${cancion.titulo.slice(0, 40)}`)
    } catch (e) {
      err++
      console.error(`\n  ✗ Error en "${cancion.titulo}": ${e.message}`)
    }
  }

  console.log(`\n\n✅ Listo!`)
  console.log(`   ${ok} canciones importadas`)
  if (err > 0) console.log(`   ${err} errores`)
  console.log(`   Playlist: ${nombre} (ID: ${playlist.id})`)
}

main().catch(e => {
  console.error('\n❌ Error:', e.message)
  process.exit(1)
})
