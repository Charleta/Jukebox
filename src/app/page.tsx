
'use client'
import { useState } from 'react'
import { BuscadorArtista } from '@/components/kiosko/BuscadorArtista'
import { ListaCanciones } from '@/components/kiosko/ListaCanciones'
import { ColaProximas } from '@/components/kiosko/ColaProximas'
import { FichasDisplay } from '@/components/kiosko/FichasDisplay'
import { useFichas } from '@/hooks/useFichas'
import { useCola } from '@/hooks/useCola'
import { SpotifyArtist, SpotifyTrack } from '@/types'
import { SpotifyPlayer } from '@/components/player/SpotifyPlayer'

const formatMs = (ms: number) => {
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function KioskoPage() {
  const { fichas, refetch: refetchFichas } = useFichas()
  const { cola, colaClientes, refetch: refetchCola } = useCola()
  const [artist, setArtist] = useState<SpotifyArtist | null>(null)
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [focused, setFocused] = useState(0)
  const [toast, setToast] = useState('')
  const [progreso, setProgreso] = useState(0)
  const [duracion, setDuracion] = useState(0)

  const pasarSiguiente = async () => {
    setProgreso(0)
    setDuracion(0)
    await fetch('/api/cola/siguiente', { method: 'POST' })
    refetchCola()
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const handleArtistSelect = async (a: SpotifyArtist) => {
    setArtist(a)
    setTracks([])
    setFocused(0)
    const res = await fetch(`/api/spotify/search?artistId=${a.id}`)
    const data = await res.json()
    setTracks(data.tracks ?? [])
  }

  const handleInternalPlaylistSelect = async (id: number) => {
    setArtist({ id: 'loading', name: 'Cargando lista...', images: [], genres: [], followers: { total: 0 } })
    setTracks([])
    setFocused(0)
    const res = await fetch(`/api/playlists/${id}`)
    const playlist = await res.json()
    setArtist({
      id: String(playlist.id),
      name: playlist.nombre,
      images: playlist.imagenUrl ? [{ url: playlist.imagenUrl }] : [],
      genres: [],
      followers: { total: playlist.canciones.length },
    })
    setTracks(
      playlist.canciones.map((c: any) => ({
        id: String(c.id),
        name: c.titulo,
        uri: c.spotifyUri,
        duration_ms: c.duracion * 1000,
        album: { name: '', images: [{ url: c.imagenUrl }] },
        artists: [{ name: c.artista }],
      }))
    )
  }
  const handleTrackSelect = async (track: SpotifyTrack) => {
    if (fichas <= 0) { showToast('❌ SIN FICHAS — PEDILE AL ENCARGADO'); return }
    const res = await fetch('/api/cola', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: track.name,
        artista: track.artists.map((a: any) => a.name).join(', '),
        duracion: Math.floor(track.duration_ms / 1000),
        spotifyUri: track.uri,
        imagenUrl: track.album.images[0]?.url ?? '',
      }),
    })
    if (res.ok) {
      showToast(`✓ "${track.name}" AGREGADA`)
      refetchFichas()
      refetchCola()
    }
  }

  const nowPlaying = colaClientes[0] ?? cola[0] ?? null

  return (
    <div className="h-screen overflow-hidden flex bg-black text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>

      {/* LEFT */}
      <div className="w-96 flex-shrink-0 flex flex-col bg-zinc-900 border-r border-zinc-800">
        {/* Now playing */}
        <div className="relative overflow-hidden flex-shrink-0">
          {nowPlaying && (
            <div
              className="absolute inset-0 scale-110"
              style={{
                backgroundImage: `url(${nowPlaying.imagenUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(40px) brightness(0.25)',
              }}
            />
          )}
          <div className="relative p-4">
            <div className="text-xs tracking-widest text-yellow-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              SONANDO AHORA
            </div>
            {nowPlaying ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <img src={nowPlaying.imagenUrl} alt="" className="w-full h-60 rounded object-cover shadow-xl shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-lg leading-tight truncate" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      {nowPlaying.titulo}
                    </div>
                    <div className="text-xs text-zinc-400 truncate mt-0.5">{nowPlaying.artista}</div>
                  </div>
                </div>

                {/* Barra de progreso */}
                {duracion > 0 && (
                  <div>
                    <div className="h-0.5 bg-zinc-700 rounded overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 transition-all duration-1000"
                        style={{ width: `${(progreso / duracion) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-zinc-500 mt-1">
                      <span>{formatMs(progreso)}</span>
                      <span>{formatMs(duracion)}</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded bg-zinc-800 flex items-center justify-center text-zinc-600 shrink-0">♪</div>
                <div className="text-sm text-zinc-600">Sin canciones</div>
              </div>
            )}
          </div>
        </div>

        <SpotifyPlayer
          spotifyUri={nowPlaying?.spotifyUri ?? null}
          onTerminada={pasarSiguiente}
          onProgress={(pos, dur) => { setProgreso(pos); setDuracion(dur) }}
        />

        <FichasDisplay fichas={fichas} />
        <ColaProximas cola={colaClientes.slice(1)} />
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className={artist ? 'hidden' : 'flex-1 flex flex-col overflow-hidden'}>
          <BuscadorArtista
            onArtistSelect={handleArtistSelect}
            onTrackSelect={handleTrackSelect}
            onInternalPlaylistSelect={handleInternalPlaylistSelect}
          />
        </div>
        {artist && (
          tracks.length > 0 ? (
            <ListaCanciones
              artist={artist}
              tracks={tracks}
              focused={focused}
              setFocused={setFocused}
              onAdd={handleTrackSelect}
              onBack={() => { setArtist(null); setTracks([]) }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <div className="text-zinc-600 text-sm animate-pulse">Cargando canciones...</div>
              <button onClick={() => { setArtist(null); setTracks([]) }} className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors">
                Volver
              </button>
            </div>
          )
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-3 rounded font-bold tracking-widest text-sm animate-bounce">
          {toast}
        </div>
      )}
    </div>
  )
}