'use client'
import { useState, useEffect, useRef } from 'react'
import { useFichas } from '@/hooks/useFichas'
import { useCola } from '@/hooks/useCola'

const ADMIN_PIN    = process.env.NEXT_PUBLIC_ADMIN_PIN    ?? '1234'
const OPERATOR_PIN = process.env.NEXT_PUBLIC_OPERATOR_PIN ?? '5678'

type Role = 'admin' | 'operador'

interface SearchResult { artists: { items: any[] }; tracks: { items: any[] } }

interface PlaylistCancion {
  id: number; titulo: string; artista: string
  duracion: number; spotifyUri: string; imagenUrl: string; orden: number
}
interface Playlist {
  id: number; nombre: string; descripcion: string
  imagenUrl: string; canciones: PlaylistCancion[]
}

function fmtMs(ms: number) {
  return `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')}`
}

// ─── Vista Operador ───────────────────────────────────────────────────────────
function OperadorView({ onLogout }: { onLogout: () => void }) {
  const { fichas, fichasHoy, refetch } = useFichas()
  const { cola } = useCola()
  const [progreso, setProgreso] = useState(0)
  const [duracion, setDuracion] = useState(0)
  const nowPlaying = cola[0] ?? null

  useEffect(() => {

    const interval = setInterval(async () => {
      const res = await fetch('/api/spotify/playback')
      if (res.ok) {
        const data = await res.json()
        setProgreso(data.progress_ms ?? 0)
        setDuracion(data.duration_ms ?? 0)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

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
            {duracion > 0 && (
              <div>
                <div className="h-0.5 bg-zinc-700 rounded overflow-hidden">
                  <div className="h-full bg-yellow-400 transition-all duration-1000"
                    style={{ width: `${(progreso / duracion) * 100}%` }} />
                </div>
                <div className="flex justify-between text-xs text-zinc-500 mt-1">
                  <span>{fmtMs(progreso)}</span>
                  <span>{fmtMs(duracion)}</span>
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult | null>(null)
  const [searching, setSearching] = useState(false)
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [progreso, setProgreso] = useState(0)
  const [duracion, setDuracion] = useState(0)

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

  const [maxDuracion, setMaxDuracion] = useState(300)
const [maxDuracionInput, setMaxDuracionInput] = useState(5)
const [cargandoPlaylist, setCargandoPlaylist] = useState<number | null>(null)

  const [dragIndex, setDragIndex] = useState<number | null>(null)
const [dragOver, setDragOver] = useState<number | null>(null)
const [seccion, setSeccion] = useState<'fichas' | 'cola' | 'agregar' | 'listas' | 'config'>('fichas')
  const cargarPlaylists = async () => {
    const res = await fetch('/api/playlists')
    if (res.ok) setPlaylists(await res.json())
  }

  useEffect(() => { cargarPlaylists() }, [])

  useEffect(() => {
    fetch('/api/config')
  .then(r => r.json())
  .then(data => {
    setMaxDuracion(Number(data.valor))
    setMaxDuracionInput(Math.floor(Number(data.valor) / 60))
  })
    const interval = setInterval(async () => {
      const res = await fetch('/api/spotify/playback')
      if (res.ok) {
        const data = await res.json()
        setIsPlaying(data.isPlaying ?? false)
        setProgreso(data.progress_ms ?? 0)
        setDuracion(data.duration_ms ?? 0)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

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

  const quitarDePlaylist = async (playlistId: number, cancionId: number) => {
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
    setImportando(true); setImportLog([])
    for (const linea of lineas) {
      const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(linea)}`)
      const data = await res.json()
      const track = data.tracks?.items?.[0]
      if (!track) { setImportLog(prev => [...prev, { linea, ok: false, msg: 'No encontrada' }]); continue }
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
    }
    setImportando(false); cargarPlaylists()
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
  <div className="min-h-screen bg-black text-white pb-24" style={{ fontFamily: 'DM Sans, sans-serif' }}>
    <div className="max-w-lg mx-auto px-4 pt-6">

      {/* PLAYER SIEMPRE VISIBLE */}
      <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800 mb-4">
        {cola[0] ? (
          <div className="flex items-center gap-3 mb-4">
            {cola[0].imagenUrl
              ? <img src={cola[0].imagenUrl} alt="" className="w-14 h-14 rounded object-cover" />
              : <div className="w-14 h-14 rounded bg-zinc-800 flex items-center justify-center text-xl">♪</div>
            }
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{cola[0].titulo}</div>
              <div className="text-sm text-zinc-400 truncate">{cola[0].artista}</div>
            </div>
          </div>
        ) : (
          <div className="text-zinc-600 text-sm mb-4">Sin canciones en cola</div>
        )}
        {duracion > 0 && (
          <div className="mb-4">
            <div className="h-0.5 bg-zinc-700 rounded overflow-hidden">
              <div className="h-full bg-yellow-400 transition-all duration-1000"
                style={{ width: `${(progreso / duracion) * 100}%` }} />
            </div>
            <div className="flex justify-between text-xs text-zinc-500 mt-1">
              <span>{fmtMs(progreso)}</span>
              <span>{fmtMs(duracion)}</span>
            </div>
          </div>
        )}
        <div className="flex gap-3">
          <button onClick={togglePlay}
            className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-lg text-2xl transition-colors">
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button onClick={skipNext}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-lg text-2xl transition-colors">
            ⏭
          </button>
        </div>
      </div>

      {/* CONTENIDO SEGÚN TAB */}

      {seccion === 'fichas' && (
        <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800">
          <div className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Disponibles</div>
          <div className="text-7xl text-yellow-400 font-black leading-none mb-1"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{fichas}</div>
          <div className="flex items-baseline gap-3 mb-6">
            <div className="text-xs text-zinc-500 uppercase tracking-widest">Cargadas hoy</div>
            <div className="text-4xl text-yellow-400 font-black leading-none"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{fichasHoy}</div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button onClick={resetFichas}
              className="bg-red-900/60 hover:bg-red-800 border border-red-800 text-red-400 font-bold py-4 rounded-lg text-sm transition-colors"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}>A 0</button>
            <button onClick={() => cargarFichas(-1)}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-lg text-xl transition-colors"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}>−1</button>
            <button onClick={() => cargarFichas(1)}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-lg text-xl transition-colors"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}>+1</button>
            <button onClick={() => cargarFichas(2)}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-lg text-xl transition-colors"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}>+2</button>
          </div>
        </div>
      )}

      {seccion === 'cola' && (
        <div className="bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-zinc-400">{cola.length} canciones en cola</span>
            <button
              onClick={async () => {
                await fetch('/api/cola/shuffle', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ currentId: cola[0]?.id ?? null }),
                })
                refetchCola()
              }}
              title="Mezclar canciones de fondo (no afecta fichas)"
              className="flex items-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white px-3 py-1.5 rounded transition-colors"
            >
              ⇄ Mezclar
            </button>
          </div>
          {cola.length <= 1 && <div className="px-5 py-8 text-zinc-600 text-center text-sm">No hay canciones siguientes</div>}
          {cola.slice(1).map((c, i) => (
            <div key={c.id} draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => { e.preventDefault(); setDragOver(i) }}
              onDragEnd={() => {
                if (dragIndex !== null && dragOver !== null) moverEnCola(dragIndex, dragOver)
                setDragIndex(null); setDragOver(null)
              }}
              className={`flex items-center gap-3 px-5 py-3 border-b border-zinc-800/50 cursor-grab transition-all ${dragOver === i ? 'bg-yellow-400/10' : ''}`}>
              <span className="text-zinc-600 text-xs">⠿</span>
              <span className="text-zinc-600 text-xs w-4">{i + 1}</span>
              {c.imagenUrl
                ? <img src={c.imagenUrl} alt="" className="w-9 h-9 rounded object-cover" />
                : <div className="w-9 h-9 rounded bg-zinc-800 flex items-center justify-center text-sm">♪</div>
              }
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{c.titulo}</div>
                <div className="text-xs text-zinc-500">{c.artista}</div>
              </div>
              <button onClick={() => eliminarDeCola(c.id)}
                className="text-zinc-600 hover:text-red-400 transition-colors text-lg px-1">×</button>
            </div>
          ))}
        </div>
      )}

      {seccion === 'agregar' && (
        <div className="space-y-4">
          <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800">
            <div className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Agregar canción a la cola</div>
            <input type="text" value={query} onChange={e => handleSearch(e.target.value)}
              placeholder="Buscar canción o artista..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2.5 text-white outline-none focus:border-yellow-400 transition-colors mb-3" />
            {searching && <div className="text-zinc-500 text-sm text-center py-2">Buscando...</div>}
            {results && (
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {results.tracks?.items?.map((track: any) => (
                  <button key={track.id} onClick={() => agregarSinFicha(track)}
                    className="w-full flex items-center gap-3 p-2 rounded hover:bg-zinc-800 transition-colors text-left">
                    <img src={track.album.images[0]?.url} alt="" className="w-10 h-10 rounded object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{track.name}</div>
                      <div className="text-xs text-zinc-500 truncate">{track.artists.map((a: any) => a.name).join(', ')}</div>
                    </div>
                    <span className="text-yellow-400 text-lg shrink-0">+</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-zinc-900 rounded-lg border border-zinc-800">
            <div className="px-5 py-4 border-b border-zinc-800">
              <div className="text-zinc-400 text-xs uppercase tracking-widest">Importar canciones</div>
              <div className="text-zinc-600 text-xs mt-1">Pegá los nombres (uno por línea)</div>
            </div>
            <div className="px-5 py-4 space-y-3">
              <select value={importPlaylistId ?? ''} onChange={e => setImportPlaylistId(Number(e.target.value) || null)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white text-sm outline-none focus:border-yellow-400 transition-colors">
                <option value="">Elegí una lista...</option>
                {playlists.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </select>
              <textarea value={importTexto} onChange={e => setImportTexto(e.target.value)}
                placeholder={"Bohemian Rhapsody\nHotel California\nStairway to Heaven"}
                rows={5}
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white text-sm outline-none focus:border-yellow-400 transition-colors resize-none font-mono" />
              <button onClick={importarCanciones}
                disabled={importando || !importPlaylistId || !importTexto.trim()}
                className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-zinc-700 disabled:text-zinc-500 text-black font-bold py-2.5 rounded text-sm transition-colors">
                {importando ? 'Importando...' : 'Importar'}
              </button>
              {importLog.length > 0 && (
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {importLog.map((entry, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <span className={entry.ok ? 'text-green-400' : 'text-red-400'}>{entry.ok ? '✓' : '✗'}</span>
                      <span className="text-zinc-400 truncate">{entry.msg}</span>
                    </div>
                  ))}
                  {!importando && (
                    <div className="text-zinc-600 text-xs pt-1">
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
        <div className="bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="text-zinc-400 text-xs uppercase tracking-widest">Mis Playlists</div>
            <button onClick={() => { setCreandoPlaylist(true); setPlaylistActiva(null) }}
              className="text-yellow-400 text-xs hover:text-yellow-300 transition-colors">+ Nueva</button>
          </div>
          {creandoPlaylist && (
            <form onSubmit={crearPlaylist} className="px-5 py-4 border-b border-zinc-800">
              <input autoFocus type="text" value={nombreNueva} onChange={e => setNombreNueva(e.target.value)}
                placeholder="Nombre de la playlist..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white text-sm outline-none focus:border-yellow-400 transition-colors" />
              <div className="flex gap-2 mt-2">
                <button type="submit"
                  className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded text-sm transition-colors">Crear</button>
                <button type="button" onClick={() => { setCreandoPlaylist(false); setNombreNueva('') }}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded text-sm transition-colors">Cancelar</button>
              </div>
            </form>
          )}
          {playlists.length === 0 && !creandoPlaylist && (
            <div className="px-5 py-6 text-zinc-600 text-center text-sm">Sin playlists</div>
          )}
          {playlists.map(p => (
            <div key={p.id} className="border-b border-zinc-800/50 last:border-b-0">
              <div className="flex items-center gap-3 px-5 py-3">
                {p.imagenUrl
                  ? <img src={p.imagenUrl} alt="" className="w-10 h-10 rounded object-cover shrink-0" />
                  : <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center text-zinc-600 shrink-0 text-lg">♪</div>
                }
                <button onClick={() => setPlaylistActiva(playlistActiva === p.id ? null : p.id)}
                  className="flex-1 text-left min-w-0">
                  <div className="text-sm font-medium truncate">{p.nombre}</div>
                  <div className="text-xs text-zinc-500">{p.canciones.length} canciones</div>
                </button>
                <button onClick={() => reproducirPlaylist(p)}
                  disabled={cargandoPlaylist === p.id}
                  className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm px-1 shrink-0 disabled:text-zinc-600">
                  {cargandoPlaylist === p.id ? '...' : '▶'}
                </button>
                <button onClick={() => eliminarPlaylist(p.id)}
                  className="text-zinc-600 hover:text-red-400 transition-colors text-lg px-1 shrink-0">×</button>
              </div>
              {playlistActiva === p.id && (
                <div className="px-5 pb-4">
                  <div className="space-y-1 mb-3 max-h-48 overflow-y-auto">
                    {p.canciones.length === 0 && (
                      <div className="text-zinc-600 text-xs text-center py-2">Sin canciones aún</div>
                    )}
                    {p.canciones.map(c => (
                      <div key={c.id} className="flex items-center gap-2 py-1">
                        <img src={c.imagenUrl} alt="" className="w-8 h-8 rounded object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium truncate">{c.titulo}</div>
                          <div className="text-xs text-zinc-500 truncate">{c.artista}</div>
                        </div>
                        <button onClick={() => quitarDePlaylist(p.id, c.id)}
                          className="text-zinc-600 hover:text-red-400 transition-colors text-base px-1 shrink-0">×</button>
                      </div>
                    ))}
                  </div>
                  <input type="text" value={queryPl} onChange={e => handleSearchPl(e.target.value)}
                    placeholder="Agregar canción..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white text-xs outline-none focus:border-yellow-400 transition-colors" />
                  {buscandoPl && <div className="text-zinc-500 text-xs text-center py-2">Buscando...</div>}
                  {resultsPl && (
                    <div className="space-y-0.5 mt-2 max-h-48 overflow-y-auto">
                      {resultsPl.tracks?.items?.map((track: any) => (
                        <button key={track.id} onClick={() => agregarAPlaylist(p.id, track)}
                          className="w-full flex items-center gap-2 p-1.5 rounded hover:bg-zinc-800 transition-colors text-left">
                          <img src={track.album.images[0]?.url} alt="" className="w-8 h-8 rounded object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate">{track.name}</div>
                            <div className="text-xs text-zinc-500 truncate">{track.artists.map((a: any) => a.name).join(', ')}</div>
                          </div>
                          <span className="text-yellow-400 text-sm shrink-0">+</span>
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
        <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800">
          <div className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Límite por canción</div>
          <div className="flex items-center gap-3">
            <input type="number" min={1} max={60} value={maxDuracionInput}
              onChange={e => setMaxDuracionInput(Number(e.target.value))}
              className="w-20 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white text-center outline-none focus:border-yellow-400" />
            <span className="text-zinc-400 text-sm">minutos</span>
            <button onClick={async () => {
              const segundos = maxDuracionInput * 60
              await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ valor: segundos }),
              })
              setMaxDuracion(segundos)
            }} className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-2 rounded-lg transition-colors">
              Guardar
            </button>
          </div>
          <div className="text-xs text-zinc-600 mt-2">Actual: {Math.floor(maxDuracion / 60)} min</div>
          <div className="mt-6">
            <button onClick={onLogout} className="text-zinc-500 text-sm hover:text-red-400 transition-colors">
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

    </div>

    {/* BARRA DE NAVEGACIÓN INFERIOR */}
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex">
      {[
        { id: 'fichas', icon: '$', label: 'Fichas' },
        { id: 'cola', icon: '≡', label: 'Cola' },
        { id: 'agregar', icon: '+', label: 'Agregar' },
        { id: 'listas', icon: '♪', label: 'Listas' },
        { id: 'config', icon: '⚙', label: 'Config' },
      ].map(tab => (
        <button key={tab.id} onClick={() => setSeccion(tab.id as any)}
          className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${
            seccion === tab.id ? 'text-yellow-400' : 'text-zinc-500'
          }`}>
          <span className="text-lg">{tab.icon}</span>
          <span className="text-xs">{tab.label}</span>
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

  useEffect(() => {
    const saved = localStorage.getItem('jukebox_role') as Role | null
    if (saved === 'admin' || saved === 'operador') setRole(saved)
    setHydrated(true)
  }, [])

  const handlePin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      localStorage.setItem('jukebox_role', 'admin')
      setRole('admin')
    } else if (pin === OPERATOR_PIN) {
      localStorage.setItem('jukebox_role', 'operador')
      setRole('operador')
    } else {
      setError(true)
      setPin('')
      setTimeout(() => setError(false), 1000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('jukebox_role')
    setRole(null)
  }

  if (!hydrated) return null

  if (role === 'admin')    return <AdminView onLogout={handleLogout} />
  if (role === 'operador') return <OperadorView onLogout={handleLogout} />

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
      </form>
    </div>
  )
}
