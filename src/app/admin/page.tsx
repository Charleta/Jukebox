'use client'
import { useState, useEffect, useRef } from 'react'
import { useAppConfig } from '@/hooks/useAppConfig'
import { useFichas } from '@/hooks/useFichas'
import { useCola } from '@/hooks/useCola'
import { useSpotifyPlayback } from '@/hooks/useSpotifyPlayback'
import { SuperadminView } from '@/components/admin/SuperadminView'

type Role = 'admin' | 'operador' | 'superadmin'
type EmergencyAction = 'reload-app' | 'close-kiosk' | 'restart-kiosk'

interface SearchResult { artists: { items: any[] }; tracks: { items: any[] } }

interface PlaylistCancion {
  id: number; titulo: string; artista: string
  duracion: number; spotifyUri: string; imagenUrl: string; orden: number
}
interface Playlist {
  id: number; nombre: string; descripcion: string
  imagenUrl: string; esFavoritos: boolean; oculta: boolean; orden: number; canciones: PlaylistCancion[]
}

interface DevSession {
  id: string
  role: string
  expiresAt: string
  revokedAt: string | null
  createdAt: string
}

interface DevDevice {
  id: string
  fingerprint: string
  name: string
  role: string
  approved: boolean
  lastSeenAt: string | null
  createdAt: string
  updatedAt: string
  sessions: DevSession[]
}

interface DevVenue {
  id: string
  slug: string
  name: string
  active: boolean
  createdAt: string
  updatedAt: string
  devices: DevDevice[]
}

function fmtMs(ms: number) {
  return `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')}`
}

function DeveloperView({ onLogout }: { onLogout: () => void }) {
  const [venues, setVenues] = useState<DevVenue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const cargar = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/dev/registry', { cache: 'no-store' })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'No autorizado')
      setVenues(data.venues ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void cargar()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs tracking-widest text-yellow-400 uppercase">Superadmin</div>
            <h1 className="text-3xl font-black" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Venues y Devices</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={cargar} className="bg-zinc-800 px-4 py-2 rounded-xl text-sm">Refrescar</button>
            <button onClick={onLogout} className="bg-yellow-400 text-black px-4 py-2 rounded-xl text-sm font-bold">Salir</button>
          </div>
        </div>

        {loading && <div className="text-zinc-500 text-sm">Cargando inventario...</div>}
        {error && <div className="text-red-400 text-sm">{error}</div>}

        {!loading && !error && venues.map(venue => (
          <div key={venue.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-yellow-400 font-black text-xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{venue.name}</div>
                <div className="text-xs text-zinc-500">{venue.slug} · {venue.active ? 'activo' : 'inactivo'}</div>
              </div>
              <div className="text-xs text-zinc-500">{venue.devices.length} devices</div>
            </div>

            <div className="grid gap-3">
              {venue.devices.map(device => (
                <div key={device.id} className="rounded-xl border border-zinc-800 bg-black/40 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{device.name}</div>
                      <div className="text-xs text-zinc-500 truncate">
                        {device.role} · {device.fingerprint}
                      </div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${device.approved ? 'bg-emerald-500/15 text-emerald-300' : 'bg-yellow-500/15 text-yellow-300'}`}>
                      {device.approved ? 'Aprobado' : 'Pendiente'}
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500 mt-2">
                    Última actividad: {device.lastSeenAt ? new Date(device.lastSeenAt).toLocaleString('es-AR') : 'sin datos'}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    Sesiones: {device.sessions.length}
                  </div>
                </div>
              ))}
              {venue.devices.length === 0 && (
                <div className="text-zinc-600 text-sm">No hay devices registrados.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Vista Operador ───────────────────────────────────────────────────────────
function OperadorView({ onLogout }: { onLogout: () => void }) {
  const { fichas, fichasHoy, refetch } = useFichas()
  const { cola } = useCola()
  const playback = useSpotifyPlayback(2000)
  const nowPlaying = playback.track
    ? {
        ...(cola[0] ?? {}),
        titulo: playback.track.title || cola[0]?.titulo || '',
        artista: playback.track.artist || cola[0]?.artista || '',
        imagenUrl: playback.track.imageUrl || cola[0]?.imagenUrl || '',
      }
    : cola[0] ?? null

  const cargarFicha = async () => {
    await fetch('/api/fichas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cantidad: 1 }),
    })
    refetch()
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 gap-6"
      style={{ fontFamily: 'DM Sans, sans-serif' }}>

      <div className="text-3xl text-yellow-400" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
        OPERADOR
      </div>

      {/* Sonando ahora */}
      <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800 w-full max-w-sm">
        <div className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Sonando ahora</div>
        {nowPlaying ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              {nowPlaying.imagenUrl
                ? <img src={nowPlaying.imagenUrl} alt="" className="w-14 h-14 rounded object-cover" />
                : <div className="w-14 h-14 rounded bg-zinc-800 flex items-center justify-center text-2xl">♪</div>
              }
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{nowPlaying.titulo}</div>
                <div className="text-sm text-zinc-400 truncate">{nowPlaying.artista}</div>
              </div>
            </div>
            {playback.durationMs > 0 && (
              <div>
                <div className="h-0.5 bg-zinc-700 rounded overflow-hidden">
                  <div className="h-full bg-yellow-400 transition-all duration-1000"
                    style={{ width: `${(playback.progressMs / playback.durationMs) * 100}%` }} />
                </div>
                <div className="flex justify-between text-xs text-zinc-500 mt-1">
                  <span>{fmtMs(playback.progressMs)}</span>
                  <span>{fmtMs(playback.durationMs)}</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-zinc-600 text-sm">Sin canciones en cola</div>
        )}
      </div>

      {/* Fichas */}
      <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800 w-full max-w-sm">
        <div className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Fichas disponibles</div>
        <div className="text-7xl text-yellow-400 font-black leading-none mb-1"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          {fichas}
        </div>
        <div className="flex items-baseline gap-3 mb-5">
          <div className="text-xs text-zinc-500 uppercase tracking-widest">Cargadas hoy</div>
          <div className="text-4xl text-yellow-400 font-black leading-none"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            {fichasHoy}
          </div>
        </div>
        <button
          onClick={cargarFicha}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-5 rounded-lg text-4xl transition-colors"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
        >
          + 1 FICHA
        </button>
      </div>

      <button onClick={onLogout}
        className="text-zinc-600 text-sm hover:text-red-400 transition-colors">
        Cerrar sesión
      </button>
    </div>
  )
}

// ─── Vista Admin ──────────────────────────────────────────────────────────────
function AdminView({ onLogout }: { onLogout: () => void }) {
  const { fichas, fichasHoy, refetch: refetchFichas } = useFichas()
  const { cola, refetch: refetchCola } = useCola()
  const {
    maxDurKiosko: savedMaxDurKiosko,
    maxDurAdmin: savedMaxDurAdmin,
    fichasPack: savedFichasPack,
    precioPack: savedPrecioPack,
    autostartPlaylists,
    refetch: refetchAppConfig,
  } = useAppConfig()
  const playback = useSpotifyPlayback(2000)
  const [isPlaying, setIsPlaying] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult | null>(null)
  const [searching, setSearching] = useState(false)
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [playlistActiva, setPlaylistActiva] = useState<number | null>(null)
  const [creandoPlaylist, setCreandoPlaylist] = useState(false)
  const [nombreNueva, setNombreNueva] = useState('')
  const [queryPl, setQueryPl] = useState('')
  const [resultsPl, setResultsPl] = useState<any | null>(null)
  const [buscandoPl, setBuscandoPl] = useState(false)
  const searchPlRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [importPlaylistId, setImportPlaylistId] = useState<number | null>(null)
  const [importTexto, setImportTexto] = useState('')
  const [importando, setImportando] = useState(false)
  const [importLog, setImportLog] = useState<{ linea: string; ok: boolean; msg: string }[]>([])
  const [importCountdown, setImportCountdown] = useState(0)

  const [maxDurKiosko, setMaxDurKiosko] = useState(300)
  const [maxDurKioskoInput, setMaxDurKioskoInput] = useState(5)
  const [maxDurAdmin, setMaxDurAdmin] = useState(300)
  const [maxDurAdminInput, setMaxDurAdminInput] = useState(5)
  const [fichasPackInput, setFichasPackInput] = useState(2)
  const [precioPackInput, setPrecioPackInput] = useState(1000)
  const [cargandoPlaylist, setCargandoPlaylist] = useState<number | null>(null)

  const [autostartIds, setAutostartIds] = useState<number[]>([])
  const [autostartModal, setAutostartModal] = useState(false)
  const [autostartGuardado, setAutostartGuardado] = useState(false)
  const [configMsg, setConfigMsg] = useState('')
  const [maintenanceBusy, setMaintenanceBusy] = useState<string | null>(null)
  const [pendingEmergencyAction, setPendingEmergencyAction] = useState<EmergencyAction | null>(null)
  const [adminToast, setAdminToast] = useState('')
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [guardandoModal, setGuardandoModal] = useState(false)
  const [dragSongIndex, setDragSongIndex] = useState<number | null>(null)
  const [dragSongOver, setDragSongOver] = useState<number | null>(null)
  const [dragPlIndex, setDragPlIndex] = useState<number | null>(null)
  const [dragPlOver, setDragPlOver] = useState<number | null>(null)
  const [editandoNombre, setEditandoNombre] = useState<number | null>(null)
  const [nombreEditando, setNombreEditando] = useState('')

const [splash, setSplash] = useState(true)
  const [splashFading, setSplashFading] = useState(false)


  useEffect(() => {
    const t1 = setTimeout(() => setSplashFading(true), 1800)
    const t2 = setTimeout(() => setSplash(false), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const showAdminToast = (msg: string) => {
    setAdminToast(msg)
    setTimeout(() => setAdminToast(''), 2200)
  }
const [dragOver, setDragOver] = useState<number | null>(null)
const [seccion, setSeccion] = useState<'fichas' | 'cola' | 'agregar' | 'listas' | 'config'>('fichas')
  const cargarPlaylists = async () => {
    const res = await fetch('/api/playlists')
    if (res.ok) setPlaylists(await res.json())
  }

  useEffect(() => { cargarPlaylists() }, [])

  useEffect(() => {
    setMaxDurKiosko(savedMaxDurKiosko)
    setMaxDurKioskoInput(Math.floor(savedMaxDurKiosko / 60))
    setMaxDurAdmin(savedMaxDurAdmin)
    setMaxDurAdminInput(Math.floor(savedMaxDurAdmin / 60))
    setFichasPackInput(savedFichasPack)
    setPrecioPackInput(savedPrecioPack)
    try { setAutostartIds(JSON.parse(autostartPlaylists ?? '[]')) } catch { setAutostartIds([]) }
  }, [autostartPlaylists, savedFichasPack, savedMaxDurAdmin, savedMaxDurKiosko, savedPrecioPack])

  useEffect(() => {
    setIsPlaying(playback.isPlaying)
  }, [playback.isPlaying])

  const nowPlaying = playback.track
    ? {
        ...(cola[0] ?? {}),
        titulo: playback.track.title || cola[0]?.titulo || '',
        artista: playback.track.artist || cola[0]?.artista || '',
        imagenUrl: playback.track.imageUrl || cola[0]?.imagenUrl || '',
      }
    : cola[0] ?? null

  const cargarFichas = async (n: number) => {
    await fetch('/api/fichas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cantidad: n }),
    })
    refetchFichas()
  }

  const resetFichas = async () => {
    await fetch('/api/fichas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reset: true }),
    })
    refetchFichas()
  }

  const togglePlay = async () => {
    await fetch('/api/spotify/pause', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: isPlaying ? 'pause' : 'play' }),
    })
    setIsPlaying(!isPlaying)
  }

  const skipNext = async () => {
    await fetch('/api/cola/siguiente', { method: 'POST' })
    refetchCola()
  }

  const showConfigFeedback = (msg: string) => {
    setConfigMsg(msg)
    setTimeout(() => setConfigMsg(''), 2500)
  }

  const runRecoveryAction = async (action: 'reload-app') => {
    setMaintenanceBusy(action)
    try {
      const res = await fetch('/api/recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      if (!res.ok) throw new Error('recovery_failed')

      showConfigFeedback('Recarga enviada al kiosko')
    } catch {
      showConfigFeedback('No se pudo enviar la accion')
    } finally {
      setMaintenanceBusy(null)
    }
  }

  const restartKiosk = async () => {
    setMaintenanceBusy('restart-kiosk')
    try {
      const res = await fetch('/api/admin/kiosk-restart', { method: 'POST' })
      if (!res.ok) throw new Error('restart_failed')
      showConfigFeedback('Reinicio completo lanzado')
    } catch {
      showConfigFeedback('No se pudo reiniciar el kiosko')
    } finally {
      setMaintenanceBusy(null)
    }
  }

  const closeKiosk = async () => {
    setMaintenanceBusy('close-kiosk')
    try {
      const res = await fetch('/api/admin/kiosk-close', { method: 'POST' })
      if (!res.ok) throw new Error('close_failed')
      showConfigFeedback('Kiosko cerrado')
    } catch {
      showConfigFeedback('No se pudo cerrar el kiosko')
    } finally {
      setMaintenanceBusy(null)
    }
  }

  const confirmEmergencyAction = async () => {
    if (pendingEmergencyAction === 'reload-app') {
      await runRecoveryAction('reload-app')
    } else if (pendingEmergencyAction === 'close-kiosk') {
      await closeKiosk()
    } else if (pendingEmergencyAction === 'restart-kiosk') {
      await restartKiosk()
    }

    setPendingEmergencyAction(null)
  }

  const eliminarDeCola = async (id: number) => {
    await fetch(`/api/cola/${id}`, { method: 'DELETE' })
    refetchCola()
  }

  const handleSearch = (q: string) => {
    setQuery(q)
    if (searchRef.current) clearTimeout(searchRef.current)
    if (!q.trim()) { setResults(null); return }
    searchRef.current = setTimeout(async () => {
      setSearching(true)
      const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(q)}`)
      setResults(await res.json())
      setSearching(false)
    }, 400)
  }

  const agregarSinFicha = async (track: any) => {
    await fetch('/api/cola/admin', {
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
    refetchCola()
  }

  const crearPlaylist = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombreNueva.trim()) return
    await fetch('/api/playlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombreNueva.trim() }),
    })
    setNombreNueva(''); setCreandoPlaylist(false); cargarPlaylists()
  }

  const eliminarPlaylist = async (id: number) => {
  const confirmado = window.confirm('¿Seguro que querés eliminar esta playlist? Se borrarán todas sus canciones.')
  if (!confirmado) return
  await fetch(`/api/playlists/${id}`, { method: 'DELETE' })
  if (playlistActiva === id) setPlaylistActiva(null)
  cargarPlaylists()
}

  const reproducirPlaylist = async (playlist: Playlist) => {
  setCargandoPlaylist(playlist.id)
  for (const cancion of playlist.canciones) {
    await fetch('/api/cola/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: cancion.titulo,
        artista: cancion.artista,
        duracion: cancion.duracion,
        spotifyUri: cancion.spotifyUri,
        imagenUrl: cancion.imagenUrl,
      }),
    })
  }
  setCargandoPlaylist(null)
  refetchCola()
}
  const agregarAPlaylist = async (playlistId: number, track: any) => {
    await fetch(`/api/playlists/${playlistId}/canciones`, {
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
    setQueryPl(''); setResultsPl(null); cargarPlaylists()
  }

  const quitarDePlaylist = async (playlistId: number, cancionId: number, titulo: string) => {
    if (!window.confirm(`¿Eliminar "${titulo}" de la playlist?`)) return
    await fetch(`/api/playlists/${playlistId}/canciones/${cancionId}`, { method: 'DELETE' })
    cargarPlaylists()
  }

  const handleSearchPl = (q: string) => {
    setQueryPl(q)
    if (searchPlRef.current) clearTimeout(searchPlRef.current)
    if (!q.trim()) { setResultsPl(null); return }
    searchPlRef.current = setTimeout(async () => {
      setBuscandoPl(true)
      const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(q)}`)
      setResultsPl(await res.json())
      setBuscandoPl(false)
    }, 400)
  }

  const importarCanciones = async () => {
    if (!importPlaylistId) return
    const lineas = importTexto.split('\n').map(l => l.trim()).filter(Boolean)
    if (!lineas.length) return
    setImportando(true)
    setImportLog([])
    setImportCountdown(0)

    const LOTE = 20
    const ESPERA = 60

    for (let i = 0; i < lineas.length; i++) {
      // Esperar 60s entre lotes (no antes del primero)
      if (i > 0 && i % LOTE === 0) {
        for (let s = ESPERA; s > 0; s--) {
          setImportCountdown(s)
          await new Promise(r => setTimeout(r, 1000))
        }
        setImportCountdown(0)
      }

      const linea = lineas[i]
      try {
        const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(linea)}&modo=import`)
        const data = await res.json()
        const track = data.tracks?.items?.[0]
        if (!track) {
          setImportLog(prev => [...prev, { linea, ok: false, msg: 'No encontrada' }])
          continue
        }
        await fetch(`/api/playlists/${importPlaylistId}/canciones`, {
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
        setImportLog(prev => [...prev, { linea, ok: true, msg: `${track.name} — ${track.artists[0].name}` }])
      } catch {
        setImportLog(prev => [...prev, { linea, ok: false, msg: 'Error de red' }])
      }
    }

    setImportando(false)
    setImportTexto('')
    cargarPlaylists()
  }

  const shuffleCola = async () => {
    await fetch('/api/cola/shuffle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentId: cola[0]?.id ?? null }),
    })
    refetchCola()
  }

  const clearCola = async () => {
    if (!window.confirm('¿Borrar toda la cola de reproducción?')) return
    await fetch('/api/cola/vaciar', { method: 'POST' })
    refetchCola()
  }

  const moverCancionPlaylist = async (playlistId: number, from: number, to: number) => {
    if (from === to) return
    const playlist = playlists.find(p => p.id === playlistId)
    if (!playlist) return
    const next = [...playlist.canciones]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    setPlaylists(prev => prev.map(p => p.id === playlistId ? { ...p, canciones: next } : p))
    await fetch(`/api/playlists/${playlistId}/canciones`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: next.map(c => c.id) }),
    })
  }

  const guardarEnFavoritos = async () => {
    if (!cola[0]) return
    const res = await fetch('/api/playlists/favoritos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: cola[0].titulo, artista: cola[0].artista,
        duracion: cola[0].duracion, spotifyUri: cola[0].spotifyUri, imagenUrl: cola[0].imagenUrl,
      }),
    })
    if (res.ok) { showAdminToast('❤ Guardada en Favoritos'); cargarPlaylists() }
  }

  const guardarEnPlaylist = async (playlistId: number) => {
    if (!cola[0]) return
    await fetch(`/api/playlists/${playlistId}/canciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: cola[0].titulo, artista: cola[0].artista,
        duracion: cola[0].duracion, spotifyUri: cola[0].spotifyUri, imagenUrl: cola[0].imagenUrl,
      }),
    })
    setGuardandoModal(false)
    showAdminToast('✓ Guardada en la lista')
    cargarPlaylists()
  }

  const moverPlaylist = async (from: number, to: number) => {
    if (from === to) return
    const next = [...playlists]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    setPlaylists(next)
    await fetch('/api/playlists', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: next.map(p => p.id) }),
    })
  }

  const renombrarPlaylist = async (id: number, nuevoNombre: string, nombreActual: string) => {
    const trimmed = nuevoNombre.trim()
    if (!trimmed || trimmed === nombreActual) { setEditandoNombre(null); return }
    if (!window.confirm(`¿Renombrar "${nombreActual}" a "${trimmed}"?`)) return
    await fetch(`/api/playlists/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: trimmed }),
    })
    setEditandoNombre(null)
    cargarPlaylists()
  }

  const toggleOcultaPlaylist = async (p: Playlist) => {
    const msg = p.oculta
      ? `¿Mostrar "${p.nombre}" en el kiosko?`
      : `¿Ocultar "${p.nombre}"? No aparecerá para los clientes.`
    if (!window.confirm(msg)) return
    await fetch(`/api/playlists/${p.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oculta: !p.oculta }),
    })
    cargarPlaylists()
  }

  const toggleAutostartId = (id: number) =>
    setAutostartIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const guardarAutostart = async () => {
    await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ autostart_playlists: JSON.stringify(autostartIds) }),
    })
    await refetchAppConfig()
    setAutostartGuardado(true)
    setTimeout(() => { setAutostartGuardado(false); setAutostartModal(false) }, 1500)
  }

  const moverEnCola = async (fromIndex: number, toIndex: number) => {
  if (fromIndex === toIndex) return
  const item = cola[fromIndex + 1] // +1 porque slice(1)
  await fetch('/api/cola', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: item.id, nuevaPos: toIndex + 1 }),
  })
  refetchCola()
}

return (
  <div className="min-h-screen bg-[#0c0c0c] text-white pb-24" style={{ fontFamily: 'DM Sans, sans-serif' }}>
    {splash && (
        <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-500 ${splashFading ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-yellow-400 text-7xl font-black tracking-wide text-center" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            Rancho Aparte
          </div>
          <div className="text-zinc-600 text-xs tracking-[0.6em] uppercase mt-3">Administrador</div>
        </div>
      )}
    
    
    <div className="max-w-lg mx-auto px-4 pt-4">

      {/* PLAYER */}
      <div className="relative overflow-hidden rounded-2xl mb-4 border border-white/5">
        {nowPlaying?.imagenUrl && (
          <div className="absolute inset-0" style={{
            backgroundImage: `url(${nowPlaying.imagenUrl})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'blur(40px) brightness(0.18)', transform: 'scale(1.1)'
          }} />
        )}
        <div className="relative bg-black/50 p-5">
          {nowPlaying ? (
            <div className="flex items-center gap-4 mb-4">
              {nowPlaying.imagenUrl
                ? <img src={nowPlaying.imagenUrl} alt="" className="w-16 h-16 rounded-xl object-cover shadow-lg shrink-0" />
                : <div className="w-16 h-16 rounded-xl bg-zinc-800 flex items-center justify-center text-xl shrink-0">♪</div>
              }
              <div className="flex-1 min-w-0">
                <div className="text-xs text-yellow-400 tracking-widest uppercase mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse inline-block" />
                  Sonando ahora
                </div>
                <div className="font-black text-lg leading-tight truncate" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{nowPlaying.titulo}</div>
                <div className="text-sm text-zinc-400 truncate">{nowPlaying.artista}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-xl bg-zinc-900 flex items-center justify-center text-2xl text-zinc-600 shrink-0">♪</div>
              <div className="text-sm text-zinc-600">Sin canciones en cola</div>
            </div>
          )}
          {playback.durationMs > 0 && (
            <div className="mb-4">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full transition-all duration-1000"
                  style={{ width: `${(playback.progressMs / playback.durationMs) * 100}%` }} />
              </div>
              <div className="flex justify-between text-xs text-zinc-500 mt-1.5">
                <span>{fmtMs(playback.progressMs)}</span>
                <span>{fmtMs(playback.durationMs)}</span>
              </div>
            </div>
          )}
          <div className="flex gap-3 mb-3">
            <button onClick={togglePlay}
              className="flex-1 bg-yellow-400 active:bg-yellow-300 text-black font-black py-2.5 rounded-xl text-xl transition-colors">
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button onClick={skipNext}
              className="flex-1 bg-white/10 active:bg-white/20 text-white font-bold py-2.5 rounded-xl text-xl transition-colors">
              ⏭
            </button>
          </div>
          <div className="flex items-center justify-around">
            <button onClick={guardarEnFavoritos} disabled={!cola[0]}
              className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl active:bg-white/5 disabled:opacity-30 transition-colors text-red-400">
              <span className="text-xl leading-none">❤</span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest">Favoritos</span>
            </button>
            <button onClick={shuffleCola} disabled={cola.length < 2}
              className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl active:bg-white/5 disabled:opacity-30 transition-colors text-zinc-400">
              <span className="text-xl leading-none">⇄</span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest">Mezclar</span>
            </button>
            <button onClick={() => setGuardandoModal(true)} disabled={!cola[0]}
              className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl active:bg-white/5 disabled:opacity-30 transition-colors text-zinc-400">
              <span className="text-xl leading-none">📁</span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest">Guardar</span>
            </button>
          </div>
        </div>
      </div>

      {/* CONTENIDO SEGÚN TAB */}

      {seccion === 'fichas' && (
        <div className="bg-gradient-to-b from-yellow-950/60 to-zinc-900 rounded-2xl p-6 border border-yellow-900/30 shadow-lg">
          <div className="text-xs tracking-widest text-zinc-500 uppercase mb-1">Disponibles</div>
          <div className="text-8xl text-yellow-400 font-black leading-none mb-2"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{fichas}</div>
          <div className="flex items-baseline gap-3 mb-7">
            <div className="text-xs text-zinc-500 uppercase tracking-widest">Cargadas hoy</div>
            <div className="text-5xl text-yellow-400/70 font-black leading-none"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{fichasHoy}</div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button onClick={resetFichas}
              className="bg-red-950 active:bg-red-900 border border-red-900/60 text-red-400 font-black py-5 rounded-xl text-sm transition-colors"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}>A 0</button>
            <button onClick={() => cargarFichas(-1)}
              className="bg-zinc-800 active:bg-zinc-700 text-white font-black py-5 rounded-xl text-2xl transition-colors"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}>−1</button>
            <button onClick={() => cargarFichas(1)}
              className="bg-yellow-400 active:bg-yellow-300 text-black font-black py-5 rounded-xl text-2xl transition-colors"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}>+1</button>
            <button onClick={() => cargarFichas(2)}
              className="bg-yellow-400 active:bg-yellow-300 text-black font-black py-5 rounded-xl text-2xl transition-colors"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}>+2</button>
          </div>
        </div>
      )}

      {seccion === 'cola' && (
        <div className="bg-gradient-to-b from-sky-950/60 to-zinc-900 rounded-2xl border border-sky-900/30 overflow-hidden shadow-lg">
            <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">{cola.length} en cola</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={shuffleCola}
                  disabled={cola.length < 2}
                  className="flex items-center gap-1.5 text-xs bg-white/5 active:bg-white/10 border border-white/10 text-zinc-300 px-3 py-1.5 rounded-full transition-colors disabled:opacity-40"
                >
                  ⇄ Mezclar
                </button>
                <button
                  onClick={clearCola}
                  disabled={cola.length === 0}
                  className="flex items-center gap-1.5 text-xs bg-red-500/10 active:bg-red-500/20 border border-red-500/20 text-red-300 px-3 py-1.5 rounded-full transition-colors disabled:opacity-40"
                >
                  ✕ Vaciar
                </button>
              </div>
            </div>
          {cola.length <= 1 && <div className="px-5 py-10 text-zinc-600 text-center text-sm">No hay canciones siguientes</div>}
          {cola.slice(1).map((c, i) => (
            <div key={c.id} draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => { e.preventDefault(); setDragOver(i) }}
              onDragEnd={() => {
                if (dragIndex !== null && dragOver !== null) moverEnCola(dragIndex, dragOver)
                setDragIndex(null); setDragOver(null)
              }}
              className={`flex items-center gap-3 px-5 py-3.5 border-b border-zinc-800/40 last:border-0 cursor-grab transition-colors ${dragOver === i ? 'bg-yellow-400/5' : ''}`}>
              <span className="text-zinc-700 text-xs">⠿</span>
              <span className="text-zinc-600 text-xs w-4">{i + 1}</span>
              {c.imagenUrl
                ? <img src={c.imagenUrl} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                : <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-sm shrink-0">♪</div>
              }
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{c.titulo}</div>
                <div className="text-xs text-zinc-500 truncate">{c.artista}</div>
              </div>
              <button onClick={() => eliminarDeCola(c.id)}
                className="text-zinc-700 active:text-red-400 transition-colors text-lg px-1 shrink-0">×</button>
            </div>
          ))}
        </div>
      )}

      {seccion === 'agregar' && (
        <div className="space-y-3">
          <div className="bg-gradient-to-b from-emerald-950/60 to-zinc-900 rounded-2xl p-5 border border-emerald-900/30 shadow-lg">
            <div className="text-xs tracking-widest text-zinc-500 uppercase mb-3">Agregar a la cola</div>
            <input type="text" value={query} onChange={e => handleSearch(e.target.value)}
              placeholder="Buscar canción o artista..."
              className="w-full bg-black/60 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 transition-colors mb-3 text-sm" />
            {searching && <div className="text-zinc-500 text-sm text-center py-2">Buscando...</div>}
            {results && (
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {results.tracks?.items?.map((track: any) => (
                  <button key={track.id} onClick={() => agregarSinFicha(track)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl active:bg-zinc-800 transition-colors text-left">
                    <img src={track.album.images[0]?.url} alt="" className="w-11 h-11 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{track.name}</div>
                      <div className="text-xs text-zinc-500 truncate">{track.artists.map((a: any) => a.name).join(', ')}</div>
                    </div>
                    <span className="text-yellow-400 text-lg shrink-0 font-bold">+</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-b from-emerald-950/40 to-zinc-900 rounded-2xl border border-emerald-900/20 overflow-hidden shadow-lg">
            <div className="px-5 py-4 border-b border-zinc-800">
              <div className="text-xs tracking-widest text-zinc-500 uppercase">Importar por nombre</div>
              <div className="text-zinc-600 text-xs mt-0.5">Un nombre por línea</div>
            </div>
            <div className="px-5 py-4 space-y-3">
              <select value={importPlaylistId ?? ''} onChange={e => setImportPlaylistId(Number(e.target.value) || null)}
                className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-yellow-400 transition-colors">
                <option value="">Elegí una lista...</option>
                {playlists.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </select>
              <textarea value={importTexto} onChange={e => setImportTexto(e.target.value)}
                placeholder={"Bohemian Rhapsody\nHotel California\nStairway to Heaven"}
                rows={4}
                className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-yellow-400 transition-colors resize-none font-mono" />
              <button onClick={importarCanciones}
                disabled={importando || !importPlaylistId || !importTexto.trim()}
                className="w-full bg-yellow-400 active:bg-yellow-300 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-black py-3 rounded-xl text-sm transition-colors"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {importando
                  ? importCountdown > 0
                    ? `Esperando ${importCountdown}s...`
                    : `Importando ${importLog.length + 1}...`
                  : 'IMPORTAR'}
              </button>
              {importCountdown > 0 && (
                <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-3 py-2.5">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shrink-0" />
                  <span className="text-yellow-400 text-xs font-medium">
                    Pausa anti-rate limit — continuando en {importCountdown}s
                  </span>
                </div>
              )}
              {importLog.length > 0 && (
                <div className="space-y-1 max-h-40 overflow-y-auto bg-black/40 rounded-xl p-3">
                  {importLog.map((entry, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <span className={entry.ok ? 'text-green-400' : 'text-red-400'}>{entry.ok ? '✓' : '✗'}</span>
                      <span className="text-zinc-400 truncate">{entry.msg}</span>
                    </div>
                  ))}
                  {!importando && (
                    <div className="text-zinc-600 text-xs pt-1 border-t border-zinc-800 mt-1">
                      {importLog.filter(e => e.ok).length}/{importLog.length} encontradas
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {seccion === 'listas' && (
        <div className=" bg-gradient-to-b from-violet-950/60 to-zinc-900 rounded-2xl border border-violet-900/30 overflow-hidden shadow-lg">
          <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
            {playlistActiva ? (
              <button onClick={() => setPlaylistActiva(null)}
                className="flex items-center gap-2 text-sm text-violet-400 active:text-white transition-colors font-medium">
                ← Todas las listas
              </button>
            ) : (
              <>
                <div className="text-xs tracking-widest text-zinc-400 uppercase font-medium">Mis Playlists</div>
                <button onClick={() => { setCreandoPlaylist(true); setPlaylistActiva(null) }}
                  className="text-xs bg-yellow-400 active:bg-yellow-300 text-black font-bold px-3 py-1.5 rounded-full transition-colors">
                  + Nueva
                </button>
              </>
            )}
          </div>
          {creandoPlaylist && (
            <form onSubmit={crearPlaylist} className="px-5 py-4 border-b border-zinc-800 bg-black/20">
              <input autoFocus type="text" value={nombreNueva} onChange={e => setNombreNueva(e.target.value)}
                placeholder="Nombre de la playlist..."
                className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-yellow-400 transition-colors" />
              <div className="flex gap-2 mt-2">
                <button type="submit"
                  className="flex-1 bg-yellow-400 active:bg-yellow-300 text-black font-black py-2.5 rounded-xl text-sm transition-colors">Crear</button>
                <button type="button" onClick={() => { setCreandoPlaylist(false); setNombreNueva('') }}
                  className="flex-1 bg-zinc-800 active:bg-zinc-700 text-white py-2.5 rounded-xl text-sm transition-colors">Cancelar</button>
              </div>
            </form>
          )}
          {playlists.length === 0 && !creandoPlaylist && (
            <div className="px-5 py-10 text-zinc-600 text-center text-sm">Sin playlists</div>
          )}
          {playlists.filter(p => !playlistActiva || p.id === playlistActiva).map((p, i) => (
            <div key={p.id} draggable={!playlistActiva}
              onDragStart={() => setDragPlIndex(i)}
              onDragOver={(e) => { e.preventDefault(); if (!playlistActiva) setDragPlOver(i) }}
              onDragEnd={() => {
                if (dragPlIndex !== null && dragPlOver !== null) moverPlaylist(dragPlIndex, dragPlOver)
                setDragPlIndex(null); setDragPlOver(null)
              }}
              className={`border-b border-zinc-800/40 last:border-0 transition-colors ${!playlistActiva && dragPlOver === i ? 'bg-violet-400/5' : ''}`}>
              <div className="flex items-center gap-2 px-5 py-3.5">
                {p.esFavoritos
                  ? <div className="w-11 h-11 rounded-lg bg-red-950 flex items-center justify-center text-red-400 shrink-0 text-xl">❤</div>
                  : p.imagenUrl
                    ? <img src={p.imagenUrl} alt="" className={`w-11 h-11 rounded-lg object-cover shrink-0 ${p.oculta ? 'opacity-40' : ''}`} />
                    : <div className={`w-11 h-11 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-600 shrink-0 text-lg ${p.oculta ? 'opacity-40' : ''}`}>♪</div>
                }

                {editandoNombre === p.id ? (
                  <div className="flex-1 flex items-center gap-1.5 min-w-0">
                    <input
                      autoFocus
                      value={nombreEditando}
                      onChange={e => setNombreEditando(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') renombrarPlaylist(p.id, nombreEditando, p.nombre)
                        if (e.key === 'Escape') setEditandoNombre(null)
                      }}
                      className="flex-1 bg-black/60 border border-violet-500 rounded-lg px-2 py-1 text-sm text-white outline-none min-w-0"
                    />
                    <button onClick={() => renombrarPlaylist(p.id, nombreEditando, p.nombre)}
                      className="text-green-400 active:text-green-300 text-lg shrink-0 font-bold px-1">✓</button>
                    <button onClick={() => setEditandoNombre(null)}
                      className="text-zinc-500 active:text-zinc-300 text-base shrink-0 px-1">✗</button>
                  </div>
                ) : (
                  <button onClick={() => setPlaylistActiva(playlistActiva === p.id ? null : p.id)}
                    className="flex-1 text-left min-w-0">
                    <div className={`text-sm font-medium truncate flex items-center gap-1.5 ${p.oculta ? 'text-zinc-500' : ''}`}>
                      {p.esFavoritos && <span className="text-red-400 text-xs">❤</span>}
                      {p.nombre}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {p.canciones.length} canciones{p.oculta ? ' · oculta' : ''}
                    </div>
                  </button>
                )}

                {editandoNombre !== p.id && !playlistActiva && (
                  <>
                    <span className="text-zinc-700 text-sm cursor-grab shrink-0">⠿</span>
                    <button onClick={() => toggleOcultaPlaylist(p)}
                      className={`text-lg shrink-0 px-1 transition-colors active:scale-110 ${p.oculta ? 'text-zinc-600' : 'text-zinc-400'}`}
                      title={p.oculta ? 'Mostrar en kiosko' : 'Ocultar del kiosko'}>
                      {p.oculta ? '🙈' : '👁'}
                    </button>
                    {!p.esFavoritos && (
                      <button onClick={() => { setEditandoNombre(p.id); setNombreEditando(p.nombre) }}
                        className="text-zinc-500 active:text-white text-base shrink-0 px-1 transition-colors"
                        title="Renombrar">
                        ✏
                      </button>
                    )}
                  </>
                )}

                {editandoNombre !== p.id && (
                  <>
                    <button onClick={() => reproducirPlaylist(p)}
                      disabled={cargandoPlaylist === p.id}
                      className="w-8 h-8 rounded-full bg-yellow-400/10 text-yellow-400 active:bg-yellow-400/20 flex items-center justify-center text-sm shrink-0 disabled:opacity-40 transition-colors">
                      {cargandoPlaylist === p.id ? '…' : '▶'}
                    </button>
                    {p.esFavoritos
                      ? <span className="text-zinc-700 text-xl px-1 shrink-0 select-none">❤</span>
                      : <button onClick={() => eliminarPlaylist(p.id)}
                          className="text-zinc-700 active:text-red-400 transition-colors text-xl px-1 shrink-0">×</button>
                    }
                  </>
                )}
              </div>
              {playlistActiva === p.id && (
                <div className="px-5 pb-4 bg-black/20">
                  <div className="space-y-0.5 mb-3 h-80 overflow-y-auto">
                    {p.canciones.length === 0 && (
                      <div className="text-zinc-600 text-xs text-center py-3">Sin canciones aún</div>
                    )}
                    {p.canciones.map((c, ci) => (
                      <div key={c.id} draggable
                        onDragStart={() => setDragSongIndex(ci)}
                        onDragOver={(e) => { e.preventDefault(); setDragSongOver(ci) }}
                        onDragEnd={() => {
                          if (dragSongIndex !== null && dragSongOver !== null) moverCancionPlaylist(p.id, dragSongIndex, dragSongOver)
                          setDragSongIndex(null); setDragSongOver(null)
                        }}
                        className={`flex items-center gap-2 py-1.5 px-1 rounded-lg cursor-grab transition-colors ${dragSongOver === ci ? 'bg-violet-400/10' : ''}`}>
                        <span className="text-zinc-700 text-xs shrink-0">⠿</span>
                        <img src={c.imagenUrl} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium truncate">{c.titulo}</div>
                          <div className="text-xs text-zinc-500 truncate">{c.artista}</div>
                        </div>
                        <button
                          onClick={async () => {
                            await agregarSinFicha({
                              name: c.titulo,
                              artists: [{ name: c.artista }],
                              duration_ms: c.duracion * 1000,
                              uri: c.spotifyUri,
                              album: { images: [{ url: c.imagenUrl }] },
                            })
                            showAdminToast(`✓ "${c.titulo}" agregada`)
                          }}
                          className="w-7 h-7 rounded-full bg-yellow-400/10 text-yellow-400 active:bg-yellow-400/20 flex items-center justify-center text-xs shrink-0 transition-colors"
                          title="Agregar a la cola">
                          +
                        </button>
                        <button onClick={() => quitarDePlaylist(p.id, c.id, c.titulo)}
                          className="text-zinc-700 active:text-red-400 transition-colors text-base px-0.5 shrink-0">×</button>
                      </div>
                    ))}
                  </div>
                  <input type="text" value={queryPl} onChange={e => handleSearchPl(e.target.value)}
                    placeholder="Agregar canción a la lista..."
                    className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-xs outline-none focus:border-yellow-400 transition-colors" />
                  {buscandoPl && <div className="text-zinc-500 text-xs text-center py-2">Buscando...</div>}
                  {resultsPl && (
                    <div className="space-y-0.5 mt-2 max-h-48 overflow-y-auto">
                      {resultsPl.tracks?.items?.map((track: any) => (
                        <button key={track.id} onClick={() => agregarAPlaylist(p.id, track)}
                          className="w-full flex items-center gap-2 p-2 rounded-xl active:bg-zinc-800 transition-colors text-left">
                          <img src={track.album.images[0]?.url} alt="" className="w-9 h-9 rounded-lg object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate">{track.name}</div>
                            <div className="text-xs text-zinc-500 truncate">{track.artists.map((a: any) => a.name).join(', ')}</div>
                          </div>
                          <span className="text-yellow-400 text-sm shrink-0 font-bold">+</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {seccion === 'config' && (
        <div className="bg-gradient-to-b from-slate-900 to-zinc-900 rounded-2xl border border-slate-700/30 overflow-hidden shadow-lg">
          <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="text-xs tracking-widest text-zinc-400 uppercase font-medium">Configuración</div>
            {configMsg && (
              <div className="text-xs text-green-400 font-medium flex items-center gap-1 animate-pulse">
                ✓ {configMsg}
              </div>
            )}
          </div>
          <div className="p-5 space-y-6">
            <div>
              <div className="text-sm font-semibold text-white mb-0.5">Límite kiosko</div>
              <div className="text-xs text-zinc-500 mb-3">Canciones pedidas con fichas por clientes</div>
              <div className="flex items-center gap-3">
                <input type="number" min={1} max={60} value={maxDurKioskoInput}
                  onChange={e => setMaxDurKioskoInput(Number(e.target.value))}
                  className="w-20 bg-black/60 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-center outline-none focus:border-yellow-400 transition-colors" />
                <span className="text-zinc-500 text-sm flex-1">min · actual: {Math.floor(maxDurKiosko / 60)} min</span>
                <button onClick={async () => {
                  const seg = maxDurKioskoInput * 60
                  await fetch('/api/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ max_duracion_kiosko: seg }) })
                  await refetchAppConfig()
                  setMaxDurKiosko(seg)
                  showConfigFeedback('Guardado')
                }} className="bg-yellow-400 active:bg-yellow-300 text-black font-black px-4 py-2.5 rounded-xl text-sm transition-colors">
                  Guardar
                </button>
              </div>
            </div>

            <div className="h-px bg-zinc-800" />

            <div>
              <div className="text-sm font-semibold text-white mb-0.5">Límite admin / listas</div>
              <div className="text-xs text-zinc-500 mb-3">Canciones de playlists del admin</div>
              <div className="flex items-center gap-3">
                <input type="number" min={1} max={60} value={maxDurAdminInput}
                  onChange={e => setMaxDurAdminInput(Number(e.target.value))}
                  className="w-20 bg-black/60 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-center outline-none focus:border-yellow-400 transition-colors" />
                <span className="text-zinc-500 text-sm flex-1">min · actual: {Math.floor(maxDurAdmin / 60)} min</span>
                <button onClick={async () => {
                  const seg = maxDurAdminInput * 60
                  await fetch('/api/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ max_duracion_admin: seg }) })
                  await refetchAppConfig()
                  setMaxDurAdmin(seg)
                  showConfigFeedback('Guardado')
                }} className="bg-yellow-400 active:bg-yellow-300 text-black font-black px-4 py-2.5 rounded-xl text-sm transition-colors">
                  Guardar
                </button>
              </div>
            </div>

            <div className="h-px bg-zinc-800" />

            <div>
              <div className="text-sm font-semibold text-white mb-0.5">Pack de fichas</div>
              <div className="text-xs text-zinc-500 mb-3">Lo que ve el kiosko al comprar</div>
              <div className="flex gap-3 mb-3">
                <div className="flex-1">
                  <div className="text-xs text-zinc-500 mb-1.5">Fichas</div>
                  <input type="number" min={1} max={20} value={fichasPackInput}
                    onChange={e => setFichasPackInput(Number(e.target.value))}
                    className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-center outline-none focus:border-yellow-400 transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-zinc-500 mb-1.5">Precio ($)</div>
                  <input type="number" min={1} value={precioPackInput}
                    onChange={e => setPrecioPackInput(Number(e.target.value))}
                    className="w-full bg-black/60 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-center outline-none focus:border-yellow-400 transition-colors" />
                </div>
              </div>
              <button onClick={async () => {
                await fetch('/api/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fichas_pack: fichasPackInput, precio_pack: precioPackInput }) })
                await refetchAppConfig()
                showConfigFeedback('Guardado')
              }} className="w-full bg-yellow-400 active:bg-yellow-300 text-black font-black py-3 rounded-xl transition-colors"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                GUARDAR PACK
              </button>
            </div>

            <div className="h-px bg-zinc-800" />

            <button
              onClick={() => setAutostartModal(true)}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-zinc-800/60 active:bg-zinc-800 border border-zinc-700/50 transition-colors"
            >
              <div className="text-left">
                <div className="text-sm font-semibold text-white">Listas de Arranque</div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  {autostartIds.length === 0
                    ? 'Ninguna seleccionada'
                    : `${autostartIds.length} lista${autostartIds.length > 1 ? 's' : ''} seleccionada${autostartIds.length > 1 ? 's' : ''}`}
                </div>
              </div>
              <span className="text-zinc-500 text-lg">›</span>
            </button>

            <div className="h-px bg-zinc-800" />

            <div>
              <div className="text-sm font-semibold text-white mb-0.5">Acciones de emergencia</div>
              <div className="text-xs text-zinc-500 mb-4">Atajos para destrabar el kiosko sin salir del panel admin</div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPendingEmergencyAction('reload-app')}
                  disabled={maintenanceBusy !== null}
                  className="group flex flex-col items-center text-center disabled:opacity-60"
                >
                  <span className="w-16 h-16 rounded-full border border-sky-400/30 bg-sky-400/10 text-sky-300 flex items-center justify-center text-2xl transition-colors group-active:bg-sky-400/20">
                    ↻
                  </span>
                  <span className="text-xs font-semibold text-white mt-2">Recargar app</span>
                  <span className="text-[11px] leading-4 text-zinc-500 mt-1">Refresca la pantalla del kiosko</span>
                </button>

                <button
                  onClick={() => setPendingEmergencyAction('close-kiosk')}
                  disabled={maintenanceBusy !== null}
                  className="group flex flex-col items-center text-center disabled:opacity-60"
                >
                  <span className="w-16 h-16 rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 flex items-center justify-center text-2xl transition-colors group-active:bg-yellow-400/20">
                    ♪
                  </span>
                  <span className="text-xs font-semibold text-white mt-2">Reinicio total</span>
                  <span className="text-[11px] leading-4 text-zinc-500 mt-1">Cierra Chrome y reabre el kiosk</span>
                </button>

                <button
                  onClick={() => setPendingEmergencyAction('close-kiosk')}
                  disabled={maintenanceBusy !== null}
                  className="group flex flex-col items-center text-center disabled:opacity-60"
                >
                  <span className="w-16 h-16 rounded-full border border-red-400/30 bg-red-400/10 text-red-300 flex items-center justify-center text-2xl transition-colors group-active:bg-red-400/20">
                    !
                  </span>
                  <span className="text-xs font-semibold text-white mt-2">Cerrar kiosko</span>
                  <span className="text-[11px] leading-4 text-zinc-500 mt-1">Cierra Chrome y apaga la PC</span>
                </button>
              </div>
            </div>

            <div className="h-px bg-zinc-800" />

            <button
              onClick={onLogout}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-zinc-800/40 active:bg-zinc-800 border border-zinc-700/40 transition-colors text-left"
            >
              <div>
                <div className="text-sm font-semibold text-white">Cerrar sesión</div>
                <div className="text-xs text-zinc-500 mt-0.5">Salir del panel admin</div>
              </div>
              <span className="text-zinc-500 text-lg">›</span>
            </button>
          </div>
        </div>
      )}

    </div>

    {/* Modal listas de arranque */}
    {autostartModal && (
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70" onClick={() => !autostartGuardado && setAutostartModal(false)}>
        <div className="bg-zinc-900 border border-zinc-800 rounded-t-2xl w-full max-w-lg p-5 pb-8" onClick={e => e.stopPropagation()}>
          {autostartGuardado ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-3xl text-green-400">✓</div>
              <div className="text-green-400 font-black text-xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>GUARDADO</div>
            </div>
          ) : (
            <>
              <div className="text-xs tracking-widest text-zinc-500 uppercase mb-1">Listas de Arranque</div>
              <div className="text-sm text-zinc-400 mb-4">Elegí las listas que van a sonar al iniciar, mezcladas</div>
              {playlists.length === 0 ? (
                <div className="text-zinc-600 text-sm text-center py-6">No hay listas creadas aún</div>
              ) : (
                <div className="space-y-1 max-h-72 overflow-y-auto mb-4">
                  {playlists.map(pl => (
                    <label key={pl.id} className="flex items-center gap-3 p-3 rounded-xl active:bg-zinc-800 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={autostartIds.includes(pl.id)}
                        onChange={() => toggleAutostartId(pl.id)}
                        className="w-5 h-5 accent-yellow-400 shrink-0"
                      />
                      {pl.imagenUrl
                        ? <img src={pl.imagenUrl} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        : <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0">♪</div>
                      }
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{pl.nombre}</div>
                        <div className="text-xs text-zinc-500">{pl.canciones.length} canciones</div>
                      </div>
                      {pl.esFavoritos && <span className="text-red-400 text-xs shrink-0">❤</span>}
                    </label>
                  ))}
                </div>
              )}
              <button onClick={guardarAutostart}
                className="w-full bg-yellow-400 active:bg-yellow-300 text-black font-black py-4 rounded-xl text-lg transition-colors mb-2"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                CONFIRMAR
              </button>
              <button onClick={() => setAutostartModal(false)}
                className="w-full bg-zinc-800 active:bg-zinc-700 text-zinc-400 py-3 rounded-xl text-sm transition-colors">
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>
    )}

    {/* Modal guardar en playlist */}
    {guardandoModal && cola[0] && (
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70" onClick={() => setGuardandoModal(false)}>
        <div className="bg-zinc-900 border border-zinc-800 rounded-t-2xl w-full max-w-lg p-5 pb-8" onClick={e => e.stopPropagation()}>
          <div className="text-xs tracking-widest text-zinc-500 uppercase mb-1">Guardar en lista</div>
          <div className="text-sm font-medium text-white mb-4 truncate">{cola[0].titulo}</div>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {playlists.map(pl => (
              <button key={pl.id} onClick={() => guardarEnPlaylist(pl.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl active:bg-zinc-800 transition-colors text-left">
                {pl.imagenUrl
                  ? <img src={pl.imagenUrl} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  : <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0">♪</div>
                }
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{pl.nombre}</div>
                  <div className="text-xs text-zinc-500">{pl.canciones.length} canciones</div>
                </div>
                {pl.esFavoritos && <span className="text-red-400 text-sm shrink-0">❤</span>}
              </button>
            ))}
          </div>
          <button onClick={() => setGuardandoModal(false)}
            className="w-full mt-4 bg-zinc-800 active:bg-zinc-700 text-zinc-400 py-3 rounded-xl text-sm transition-colors">
            Cancelar
          </button>
        </div>
      </div>
    )}

    {pendingEmergencyAction && (
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70" onClick={() => maintenanceBusy === null && setPendingEmergencyAction(null)}>
        <div className="bg-zinc-900 border border-zinc-800 rounded-t-2xl w-full max-w-lg p-5 pb-8" onClick={e => e.stopPropagation()}>
          <div className="text-xs tracking-widest text-zinc-500 uppercase mb-1">Confirmar accion</div>
          <div className="text-lg font-semibold text-white mb-2">
            {pendingEmergencyAction === 'reload-app' && 'Recargar la app del kiosko'}
            {pendingEmergencyAction === 'close-kiosk' && 'Cerrar el kiosko y apagar la PC'}
            {pendingEmergencyAction === 'restart-kiosk' && 'Reiniciar todo el kiosko'}
          </div>
          <div className="text-sm text-zinc-400 mb-5">
            {pendingEmergencyAction === 'reload-app' && 'Recarga la pagina del kiosko y vuelve a levantar la interfaz visible en pantalla.'}
            {pendingEmergencyAction === 'close-kiosk' && 'Cierra Chrome del kiosko y apaga la computadora. Usalo solo cuando realmente quieras finalizar todo.'}
            {pendingEmergencyAction === 'restart-kiosk' && 'Cierra Chrome y lo vuelve a abrir en modo kiosk. Usalo como ultimo recurso.'}
          </div>

          <button
            onClick={confirmEmergencyAction}
            disabled={maintenanceBusy !== null}
            className="w-full bg-yellow-400 active:bg-yellow-300 text-black font-black py-4 rounded-xl text-lg transition-colors mb-2 disabled:opacity-60"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            {maintenanceBusy !== null ? 'EJECUTANDO...' : 'CONFIRMAR'}
          </button>
          <button
            onClick={() => setPendingEmergencyAction(null)}
            disabled={maintenanceBusy !== null}
            className="w-full bg-zinc-800 active:bg-zinc-700 text-zinc-400 py-3 rounded-xl text-sm transition-colors disabled:opacity-60"
          >
            Cancelar
          </button>
        </div>
      </div>
    )}

    {/* Admin Toast */}
    {adminToast && (
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold tracking-widest text-sm z-50 shadow-lg whitespace-nowrap">
        {adminToast}
      </div>
    )}

    {/* BARRA NAVEGACIÓN */}
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur border-t border-white/5 flex">
      {[
        { id: 'fichas', icon: '🎟', label: 'Fichas', color: 'text-yellow-400', dot: 'bg-yellow-400', bg: 'bg-yellow-400/10' },
        { id: 'cola', icon: '≡', label: 'Cola', color: 'text-sky-400', dot: 'bg-sky-400', bg: 'bg-sky-400/10' },
        { id: 'agregar', icon: '+', label: 'Agregar', color: 'text-emerald-400', dot: 'bg-emerald-400', bg: 'bg-emerald-400/10' },
        { id: 'listas', icon: '♪', label: 'Listas', color: 'text-violet-400', dot: 'bg-violet-400', bg: 'bg-violet-400/10' },
        { id: 'config', icon: '⚙', label: 'Config', color: 'text-zinc-300', dot: 'bg-zinc-400', bg: 'bg-zinc-400/10' },
      ].map(tab => (
        <button key={tab.id} onClick={() => setSeccion(tab.id as any)}
          className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-all ${
            seccion === tab.id ? `${tab.color} ${tab.bg}` : 'text-zinc-600'
          }`}>
          <span className={`text-xl transition-transform ${seccion === tab.id ? 'scale-110' : ''}`}>{tab.icon}</span>
          <span className="text-[10px] font-medium">{tab.label}</span>
          {seccion === tab.id && <span className={`w-1 h-1 rounded-full ${tab.dot}`} />}
        </button>
      ))}
    </div>
  </div>
)
}

// ─── Login + Router ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [role, setRole] = useState<Role | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetch('/api/dev/checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ surface: 'admin', path: '/admin' }),
    }).catch(() => {})
  }, [])

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(({ role }) => {
        if (role === 'admin' || role === 'operador' || role === 'superadmin') setRole(role as Role)
      })
      .catch(() => {})
      .finally(() => setHydrated(true))
  }, [])

  const handlePin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      })
      if (res.ok) {
        const { role } = await res.json()
        setRole(role as Role)
      } else {
        const data = await res.json().catch(() => ({} as { error?: string; message?: string }))
        setErrorMsg(data.message || data.error || 'PIN incorrecto')
        setError(true)
        setPin('')
        setTimeout(() => setError(false), 1000)
        setTimeout(() => setErrorMsg(''), 1500)
      }
    } catch {
      setErrorMsg('No se pudo iniciar sesión')
      setError(true)
      setPin('')
      setTimeout(() => setError(false), 1000)
      setTimeout(() => setErrorMsg(''), 1500)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
    setRole(null)
  }

  if (!hydrated) return null

  if (role === 'admin')    return <AdminView onLogout={handleLogout} />
  if (role === 'operador') return <OperadorView onLogout={handleLogout} />
  if (role === 'superadmin') return <SuperadminView onLogout={handleLogout} />

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <form onSubmit={handlePin} className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 w-80">
        <div className="text-2xl mb-6 text-center text-yellow-400" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          ACCESO ADMIN
        </div>
        <input
          type="password"
          value={pin}
          onChange={e => setPin(e.target.value)}
          placeholder="PIN"
          autoFocus
          className={`w-full bg-zinc-800 border rounded px-4 py-3 text-white text-center text-2xl tracking-widest outline-none mb-4 transition-colors ${
            error ? 'border-red-500' : 'border-zinc-700 focus:border-yellow-400'
          }`}
        />
        <button type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300 transition-colors">
          ENTRAR
        </button>
        {errorMsg && <div className="mt-3 text-sm text-red-400 text-center break-words">{errorMsg}</div>}
      </form>
    </div>
  )
}
