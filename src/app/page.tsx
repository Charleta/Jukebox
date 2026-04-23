
'use client'
import { useState, useEffect, useRef } from 'react'
import { BuscadorArtista } from '@/components/kiosko/BuscadorArtista'
import { ListaCanciones } from '@/components/kiosko/ListaCanciones'
import { ColaProximas } from '@/components/kiosko/ColaProximas'
import { FichasDisplay } from '@/components/kiosko/FichasDisplay'
import { useAppConfig } from '@/hooks/useAppConfig'
import { useFichas } from '@/hooks/useFichas'
import { useCola } from '@/hooks/useCola'
import { useRecoverySignal } from '@/hooks/useRecoverySignal'
import { useSpotifyPlayback } from '@/hooks/useSpotifyPlayback'
import { SpotifyArtist, SpotifyTrack } from '@/types'
import { SpotifyPlayer } from '@/components/player/SpotifyPlayer'
import { QRCodeSVG } from 'qrcode.react'

const formatMs = (ms: number) => {
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function KioskoPage() {
  const [splash, setSplash] = useState(true)
  const [splashFading, setSplashFading] = useState(false)
  const [playerInstanceKey, setPlayerInstanceKey] = useState(0)
  const [accessState, setAccessState] = useState<'checking' | 'pending' | 'approved' | 'error'>('checking')
  const [accessMessage, setAccessMessage] = useState('Verificando autorización...')
  const accessPollRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  useEffect(() => {
    const t1 = setTimeout(() => setSplashFading(true), 1800)
    const t2 = setTimeout(() => setSplash(false), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    let active = true

    const verify = async () => {
      try {
        const res = await fetch('/api/dev/checkin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ surface: 'kiosk', path: '/' }),
        })
        const data = await res.json().catch(() => ({} as { result?: string; approved?: boolean; message?: string }))
        if (!active) return
        const approved = res.ok && (data.result === 'ok' || data.approved === true)
        setAccessState(approved ? 'approved' : 'pending')
        setAccessMessage(
          approved
            ? 'Dispositivo autorizado. Ingresando...'
            : data.message || 'Necesita aprobacion del creador'
        )
      } catch {
        if (!active) return
        setAccessState('error')
        setAccessMessage('No se pudo verificar el dispositivo')
      }
    }

    void verify()

    return () => {
      active = false
      clearInterval(accessPollRef.current)
    }
  }, [])

  useEffect(() => {
    if (accessState !== 'pending') {
      clearInterval(accessPollRef.current)
      return
    }

    clearInterval(accessPollRef.current)
    accessPollRef.current = setInterval(async () => {
      try {
        const res = await fetch('/api/dev/checkin', { cache: 'no-store' })
        const data = await res.json().catch(() => ({} as { approved?: boolean; status?: string }))
        if (res.ok && data.approved) {
          setAccessState('approved')
          setAccessMessage('Dispositivo autorizado. Ingresando...')
          clearInterval(accessPollRef.current)
        }
      } catch {}
    }, 3500)

    return () => clearInterval(accessPollRef.current)
  }, [accessState])

  const { fichas, refetch: refetchFichas } = useFichas()
  const { cola, colaClientes, refetch: refetchCola } = useCola()
  const { maxDurKiosko, maxDurAdmin, fichasPack, precioPack } = useAppConfig()
  const { command: recoveryCommand, requestedAt: recoveryRequestedAt, clearSignal: clearRecoverySignal } = useRecoverySignal()
  const playback = useSpotifyPlayback()
  const [artist, setArtist] = useState<SpotifyArtist | null>(null)
  const [tracks, setTracks] = useState<SpotifyTrack[]>([])
  const [focused, setFocused] = useState(0)
  const [toast, setToast] = useState('')

  // Modal confirmación de canción
  const [pendingTrack, setPendingTrack] = useState<SpotifyTrack | null>(null)

  // Modal QR — MercadoPago
  const [qrModal, setQrModal] = useState<{ cantidad: number; total: number } | null>(null)
  const [qrUrl, setQrUrl] = useState<string | null>(null)
  const [qrAprobado, setQrAprobado] = useState(false)
  const [qrError, setQrError] = useState(false)
  const pollingRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const pollingFailsRef = useRef(0)
  const qrActiveRef = useRef(false)
  const bgPollingTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const autostartDoneRef = useRef(false)
  const lastRecoveryRef = useRef('')

  useEffect(() => {
    if (autostartDoneRef.current) return
    autostartDoneRef.current = true
    fetch('/api/cola/autostart', { method: 'POST' })
      .then(r => r.json())
      .then(data => { if (data.added > 0) refetchCola() })
      .catch(() => {})
  }, [])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  useEffect(() => {
    if (!recoveryCommand || !recoveryRequestedAt || recoveryRequestedAt === lastRecoveryRef.current) return

    lastRecoveryRef.current = recoveryRequestedAt

    const applyRecovery = async () => {
      await clearRecoverySignal(recoveryRequestedAt).catch(() => {})

      if (recoveryCommand === 'reload-app') {
        window.location.reload()
        return
      }

      if (recoveryCommand === 'restart-player') {
        setPlayerInstanceKey(prev => prev + 1)
        setToast('REINICIANDO REPRODUCTOR...')
        setTimeout(() => setToast(''), 2500)
      }
    }

    void applyRecovery()
  }, [clearRecoverySignal, recoveryCommand, recoveryRequestedAt])

  const pasarSiguiente = async () => {
    await fetch('/api/cola/siguiente', { method: 'POST' })
    refetchCola()
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

  // Volver al inicio cuando se agotan las fichas
  useEffect(() => {
    if (fichas <= 0 && artist) {
      setArtist(null)
      setTracks([])
    }
  }, [fichas])

  // Abre el modal de confirmación en vez de agregar directo
  const handleTrackSelect = (track: SpotifyTrack) => {
    if (fichas <= 0) { showToast('SIN FICHAS — COMPRÁ MÁS'); return }
    setPendingTrack(track)
  }

  // Confirma y agrega a la cola
  const confirmTrack = async (track: SpotifyTrack) => {
    setPendingTrack(null)
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

  const handlePagar = async (cantidad: number, total: number) => {
    clearInterval(pollingRef.current)
    clearTimeout(bgPollingTimeoutRef.current)
    pollingFailsRef.current = 0
    qrActiveRef.current = true
    setQrModal({ cantidad, total })
    setQrUrl(null)
    setQrAprobado(false)
    setQrError(false)
    try {
      const res = await fetch('/api/pagos/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cantidad, total }),
      })
      if (!res.ok) { setQrError(true); return }
      const data = await res.json()
      if (!data.qrUrl) { setQrError(true); return }
      setQrUrl(data.qrUrl)
      pollingRef.current = setInterval(async () => {
        try {
          const r = await fetch(`/api/pagos/estado?ref=${data.ref}&cantidad=${cantidad}`)
          const json = await r.json()
          if (json.aprobado) {
            clearInterval(pollingRef.current)
            clearTimeout(bgPollingTimeoutRef.current)
            refetchFichas()
            if (qrActiveRef.current) {
              setQrAprobado(true)
              setTimeout(() => { setQrModal(null); setQrAprobado(false) }, 2500)
            } else {
              showToast(`✓ ${cantidad} FICHAS CARGADAS`)
            }
            qrActiveRef.current = false
          }
        } catch {
          pollingFailsRef.current += 1
          if (pollingFailsRef.current >= 5 && qrActiveRef.current) {
            clearInterval(pollingRef.current)
            setQrError(true)
          }
        }
      }, 1500)
    } catch {
      setQrError(true)
    }
  }

  const queueNowPlaying = colaClientes[0] ?? cola[0] ?? null
  const displayNowPlaying = playback.track
    ? {
        ...(queueNowPlaying ?? {}),
        titulo: playback.track.title || queueNowPlaying?.titulo || '',
        artista: playback.track.artist || queueNowPlaying?.artista || '',
        imagenUrl: playback.track.imageUrl || queueNowPlaying?.imagenUrl || '',
      }
    : queueNowPlaying
  const playerSpotifyUri = queueNowPlaying?.spotifyUri ?? null
  const maxSegundos = queueNowPlaying?.tipo === 'admin' ? maxDurAdmin : maxDurKiosko
  const hasQueue = colaClientes.slice(1).length > 0

  if (accessState !== 'approved') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6 text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
        <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 text-center shadow-2xl">
          <div className="text-xs uppercase tracking-[0.4em] text-yellow-400">Kiosko</div>
          <h1 className="mt-3 text-4xl font-black leading-none text-yellow-400" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            Acceso pendiente
          </h1>
          <p className="mt-4 text-sm leading-6 text-zinc-300">
            {accessMessage}
          </p>
          <div className="mt-5 rounded-2xl border border-zinc-800 bg-black/50 p-4 text-left text-xs text-zinc-400">
            <div className="mb-1 uppercase tracking-widest text-zinc-500">Estado</div>
            <div className={accessState === 'error' ? 'text-red-300' : 'text-yellow-300'}>
              {accessState === 'checking' && 'Verificando...'}
              {accessState === 'pending' && 'Esperando aprobación'}
              {accessState === 'error' && 'Error de verificación'}
            </div>
            <div className="mt-3 text-zinc-500">
              Esta PC quedará autorizada de forma permanente cuando el creador la permita desde superadmin.
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 w-full rounded-2xl bg-yellow-400 px-4 py-3 font-black text-black transition-colors active:bg-yellow-300"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            REINTENTAR
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen overflow-hidden flex bg-black text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>

      {/* Splash screen */}
      {splash && (
        <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-500 ${splashFading ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-yellow-400 text-7xl font-black tracking-wide text-center" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            Rancho Aparte
          </div>
          <div className="text-zinc-600 text-xs tracking-[0.6em] uppercase mt-3">Rockola</div>
        </div>
      )}

      {/* LEFT */}
      <div className="w-96 flex-shrink-0 flex flex-col bg-zinc-900 border-r border-zinc-800">
        {/* Now playing */}
        <div className="relative overflow-hidden flex-shrink-0">
          {displayNowPlaying && (
            <div
              className="absolute inset-0 scale-110"
              style={{
                backgroundImage: `url(${displayNowPlaying.imagenUrl})`,
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
            {displayNowPlaying ? (
              <>
                {hasQueue ? (
                  <div className="flex items-center gap-3 mb-3">
                    <img src={displayNowPlaying.imagenUrl} alt="" className="w-16 h-16 rounded-xl object-cover shadow-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-lg font-black leading-tight truncate" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                        {displayNowPlaying.titulo}
                      </div>
                      <div className="text-xs text-zinc-400 truncate mt-0.5">{displayNowPlaying.artista}</div>
                    </div>
                  </div>
                ) : (
                  <>
                    <img src={displayNowPlaying.imagenUrl} alt="" className="w-full h-52 rounded-xl object-cover shadow-xl mb-3" />
                    <div className="text-2xl font-black leading-tight truncate mb-0.5" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      {displayNowPlaying.titulo}
                    </div>
                    <div className="text-xs text-zinc-400 truncate mb-3">{displayNowPlaying.artista}</div>
                  </>
                )}

                {/* Barra de progreso */}
                {playback.durationMs > 0 && (
                  <div>
                    <div className="h-0.5 bg-zinc-700 rounded overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 transition-all duration-1000"
                        style={{ width: `${(playback.progressMs / playback.durationMs) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-zinc-500 mt-1">
                      <span>{formatMs(playback.progressMs)}</span>
                      <span>{formatMs(playback.durationMs)}</span>
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
          key={playerInstanceKey}
          spotifyUri={playerSpotifyUri}
          maxSegundos={maxSegundos}
          onTerminada={pasarSiguiente}
          onProgress={() => {}}
        />

        <FichasDisplay fichas={fichas} />
        <ColaProximas
          cola={colaClientes.slice(1)}
          fichas={fichas}
          fichasPack={fichasPack}
          precioPack={precioPack}
          onPagar={handlePagar}
        />
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className={artist ? 'hidden' : 'flex-1 flex flex-col overflow-hidden'}>
          <BuscadorArtista
            onArtistSelect={handleArtistSelect}
            onTrackSelect={handleTrackSelect}
            onInternalPlaylistSelect={handleInternalPlaylistSelect}
            tieneFichas={fichas > 0}
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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-3 rounded font-bold tracking-widest text-sm animate-bounce z-40">
          {toast}
        </div>
      )}

      {/* Modal confirmación de canción */}
      {pendingTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-6">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-sm">
            <div className="text-xs tracking-widest text-zinc-500 uppercase mb-4">Confirmá tu canción</div>
            <div className="flex items-center gap-4 mb-6">
              {pendingTrack.album.images[0]?.url && (
                <img
                  src={pendingTrack.album.images[0].url}
                  alt=""
                  className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-lg"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-xl font-black leading-tight mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  {pendingTrack.name}
                </div>
                <div className="text-sm text-zinc-400">
                  {pendingTrack.artists.map((a: any) => a.name).join(', ')}
                </div>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-xl px-4 py-3 mb-5 flex items-center justify-between">
              <span className="text-zinc-400 text-sm">Costo</span>
              <div className="text-right">
                <span className="text-yellow-400 font-bold">1 ficha</span>
                <span className="text-zinc-500 text-xs ml-2">
                  (quedan {fichas - 1})
                </span>
              </div>
            </div>

            <button
              onClick={() => confirmTrack(pendingTrack)}
              className="w-full bg-yellow-400 active:bg-yellow-300 text-black font-black py-5 rounded-xl text-2xl mb-3 transition-colors"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              ✓ AGREGAR
            </button>
            <button
              onClick={() => setPendingTrack(null)}
              className="w-full bg-zinc-800 active:bg-zinc-700 text-zinc-300 py-4 rounded-xl text-sm transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal QR — MercadoPago */}
      {qrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-sm text-center">
            {qrAprobado ? (
              <>
                <div className="text-6xl mb-4">✓</div>
                <div className="text-3xl font-black text-green-400 mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  ¡PAGO CONFIRMADO!
                </div>
                <div className="text-zinc-400 text-sm">{qrModal.cantidad} fichas cargadas</div>
              </>
            ) : qrError ? (
              <>
                <div className="text-5xl mb-4">⚠️</div>
                <div className="text-2xl font-black text-red-400 mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  ERROR DE PAGO
                </div>
                <div className="text-zinc-400 text-sm mb-6">
                  No se pudo conectar con MercadoPago. Avisale al encargado.
                </div>
                <button
                  onClick={() => { clearInterval(pollingRef.current); setQrModal(null); setQrError(false) }}
                  className="w-full bg-zinc-800 active:bg-zinc-700 text-zinc-400 py-4 rounded-xl text-sm transition-colors"
                >
                  Cerrar
                </button>
              </>
            ) : (
              <>
                <div className="text-xs tracking-widest text-zinc-500 uppercase mb-1">Escaneá con MercadoPago</div>
                <div className="text-yellow-400 text-4xl font-black mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  {qrModal.cantidad} fichas
                </div>
                <div className="text-zinc-400 text-sm mb-5">
                  ${qrModal.total.toLocaleString('es-AR')}
                </div>

                <div className="flex items-center justify-center bg-white rounded-2xl p-4 mb-5 mx-auto w-fit">
                  {qrUrl
                    ? <QRCodeSVG value={qrUrl} size={200} />
                    : <div className="w-[200px] h-[200px] flex items-center justify-center text-zinc-400 text-sm animate-pulse">
                        Generando QR...
                      </div>
                  }
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-600 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-pulse" />
                  Esperando pago...
                </div>

                <button
                  onClick={() => {
                    qrActiveRef.current = false
                    setQrModal(null)
                    bgPollingTimeoutRef.current = setTimeout(() => clearInterval(pollingRef.current), 5 * 60 * 1000)
                  }}
                  className="w-full bg-zinc-800 active:bg-zinc-700 text-zinc-400 py-4 rounded-xl text-sm transition-colors"
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
