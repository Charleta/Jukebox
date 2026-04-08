'use client'
import { useState, useEffect, useRef } from 'react'
import { useFichas } from '@/hooks/useFichas'
import { useCola } from '@/hooks/useCola'

const PIN = process.env.NEXT_PUBLIC_ADMIN_PIN ?? '1234'

interface SearchResult {
  artists: any[]
  tracks: any[]
}

interface PlaylistCancion {
  id: number
  titulo: string
  artista: string
  duracion: number
  spotifyUri: string
  imagenUrl: string
  orden: number
}

interface Playlist {
  id: number
  nombre: string
  descripcion: string
  imagenUrl: string
  canciones: PlaylistCancion[]
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const { fichas, refetch: refetchFichas } = useFichas()
  const { cola, refetch: refetchCola } = useCola()
  const [isPlaying, setIsPlaying] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult | null>(null)
  const [searching, setSearching] = useState(false)
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [progreso, setProgreso] = useState(0)
  const [duracion, setDuracion] = useState(0)

  // Playlists
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [playlistActiva, setPlaylistActiva] = useState<number | null>(null)
  const [creandoPlaylist, setCreandoPlaylist] = useState(false)
  const [nombreNueva, setNombreNueva] = useState('')
  const [queryPl, setQueryPl] = useState('')
  const [resultsPl, setResultsPl] = useState<any | null>(null)
  const [buscandoPl, setBuscandoPl] = useState(false)
  const searchPlRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Importador masivo
  const [importPlaylistId, setImportPlaylistId] = useState<number | null>(null)
  const [importTexto, setImportTexto] = useState('')
  const [importando, setImportando] = useState(false)
  const [importLog, setImportLog] = useState<{ linea: string; ok: boolean; msg: string }[]>([])

  const cargarPlaylists = async () => {
    const res = await fetch('/api/playlists')
    if (res.ok) setPlaylists(await res.json())
  }

  useEffect(() => {
    if (authed) cargarPlaylists()
  }, [authed])

  const crearPlaylist = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombreNueva.trim()) return
    await fetch('/api/playlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombreNueva.trim() }),
    })
    setNombreNueva('')
    setCreandoPlaylist(false)
    cargarPlaylists()
  }

  const eliminarPlaylist = async (id: number) => {
    await fetch(`/api/playlists/${id}`, { method: 'DELETE' })
    if (playlistActiva === id) setPlaylistActiva(null)
    cargarPlaylists()
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
    setQueryPl('')
    setResultsPl(null)
    cargarPlaylists()
  }

  const quitarDePlaylist = async (playlistId: number, cancionId: number) => {
    await fetch(`/api/playlists/${playlistId}/canciones/${cancionId}`, { method: 'DELETE' })
    cargarPlaylists()
  }

  const importarCanciones = async () => {
    if (!importPlaylistId) return
    const lineas = importTexto.split('\n').map(l => l.trim()).filter(Boolean)
    if (!lineas.length) return
    setImportando(true)
    setImportLog([])
    for (const linea of lineas) {
      const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(linea)}`)
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
    }
    setImportando(false)
    cargarPlaylists()
  }

  const handleSearchPl = (q: string) => {
    setQueryPl(q)
    if (searchPlRef.current) clearTimeout(searchPlRef.current)
    if (!q.trim()) { setResultsPl(null); return }
    searchPlRef.current = setTimeout(async () => {
      setBuscandoPl(true)
      const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResultsPl(data)
      setBuscandoPl(false)
    }, 400)
  }

  // Poll playback state
  useEffect(() => {
    if (!authed) return
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
  }, [authed])

  const handlePin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === PIN) { setAuthed(true) }
    else { setError(true); setPin(''); setTimeout(() => setError(false), 1000) }
  }

  const cargarFichas = async (n: number) => {
    await fetch('/api/fichas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cantidad: n }),
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
      const data = await res.json()
      setResults(data)
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

  if (!authed) return (
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
          className={`w-full bg-zinc-800 border rounded px-4 py-3 text-white text-center text-2xl tracking-widest outline-none mb-4 transition-colors ${error ? 'border-red-500' : 'border-zinc-700 focus:border-yellow-400'}`}
        />
        <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300 transition-colors">
          ENTRAR
        </button>
      </form>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white pb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="text-4xl text-yellow-400 mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          PANEL ADMIN
        </div>

        {/* Player controls */}
        <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800 mb-4">
          <div className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Reproducción</div>
          {cola[0] ? (
            <div className="flex items-center gap-3 mb-4">
              <img src={cola[0].imagenUrl} alt="" className="w-12 h-12 rounded object-cover" />
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
      <div
        className="h-full bg-yellow-400 transition-all duration-1000"
        style={{ width: `${(progreso / duracion) * 100}%` }}
      />
    </div>
    <div className="flex justify-between text-xs text-zinc-500 mt-1">
      <span>{Math.floor(progreso / 60000)}:{String(Math.floor((progreso % 60000) / 1000)).padStart(2, '0')}</span>
      <span>{Math.floor(duracion / 60000)}:{String(Math.floor((duracion % 60000) / 1000)).padStart(2, '0')}</span>
    </div>
  </div>
)}
          <div className="flex gap-3">
            <button
              onClick={togglePlay}
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-lg text-xl transition-colors"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              onClick={skipNext}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg text-xl transition-colors"
            >
              ⏭
            </button>
          </div>
        </div>

        {/* Fichas */}
        <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800 mb-4">
          <div className="text-zinc-400 text-xs uppercase tracking-widest mb-2">Fichas disponibles</div>
          <div className="text-6xl text-yellow-400 font-black leading-none mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            {fichas}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 5].map(n => (
              <button
                key={n}
                onClick={() => cargarFichas(n)}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-lg text-lg transition-colors"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                +{n}
              </button>
            ))}
          </div>
        </div>

        {/* Buscar y agregar */}
        <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800 mb-4">
          <div className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Agregar canción</div>
          <input
            type="text"
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Buscar canción o artista..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2.5 text-white outline-none focus:border-yellow-400 transition-colors mb-3"
          />
          {searching && <div className="text-zinc-500 text-sm text-center py-2">Buscando...</div>}
          {results && (
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {results.tracks?.items?.map((track: any) => (
                <button
                  key={track.id}
                  onClick={() => agregarSinFicha(track)}
                  className="w-full flex items-center gap-3 p-2 rounded hover:bg-zinc-800 transition-colors text-left"
                >
                  <img src={track.album.images[0]?.url} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{track.name}</div>
                    <div className="text-xs text-zinc-500 truncate">{track.artists.map((a: any) => a.name).join(', ')}</div>
                  </div>
                  <span className="text-yellow-400 text-lg flex-shrink-0">+</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cola */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="px-5 py-4 border-b border-zinc-800 text-xs uppercase tracking-widest text-zinc-400">
            Cola ({cola.length} canciones)
          </div>
          {cola.length === 0 && (
            <div className="px-5 py-8 text-zinc-600 text-center text-sm">Vacía</div>
          )}
          {cola.map((c, i) => (
            <div key={c.id} className="flex items-center gap-3 px-5 py-3 border-b border-zinc-800/50">
              <span className="text-zinc-600 text-xs w-4">{i + 1}</span>
              <img src={c.imagenUrl} alt="" className="w-9 h-9 rounded object-cover" />
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{c.titulo}</div>
                <div className="text-xs text-zinc-500">{c.artista}</div>
              </div>
              <button
                onClick={() => eliminarDeCola(c.id)}
                className="text-zinc-600 hover:text-red-400 transition-colors text-lg px-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Playlists */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 mt-4">
          <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="text-zinc-400 text-xs uppercase tracking-widest">Mis Playlists</div>
            <button
              onClick={() => { setCreandoPlaylist(true); setPlaylistActiva(null) }}
              className="text-yellow-400 text-xs hover:text-yellow-300 transition-colors"
            >
              + Nueva
            </button>
          </div>

          {creandoPlaylist && (
            <form onSubmit={crearPlaylist} className="px-5 py-4 border-b border-zinc-800">
              <input
                autoFocus
                type="text"
                value={nombreNueva}
                onChange={e => setNombreNueva(e.target.value)}
                placeholder="Nombre de la playlist..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white text-sm outline-none focus:border-yellow-400 transition-colors"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded text-sm transition-colors"
                >
                  Crear
                </button>
                <button
                  type="button"
                  onClick={() => { setCreandoPlaylist(false); setNombreNueva('') }}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded text-sm transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          {playlists.length === 0 && !creandoPlaylist && (
            <div className="px-5 py-6 text-zinc-600 text-center text-sm">Sin playlists</div>
          )}

          {playlists.map(p => (
            <div key={p.id} className="border-b border-zinc-800/50 last:border-b-0">
              {/* Playlist header */}
              <div className="flex items-center gap-3 px-5 py-3">
                {p.imagenUrl ? (
                  <img src={p.imagenUrl} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center text-zinc-600 flex-shrink-0 text-lg">♪</div>
                )}
                <button
                  onClick={() => setPlaylistActiva(playlistActiva === p.id ? null : p.id)}
                  className="flex-1 text-left min-w-0"
                >
                  <div className="text-sm font-medium truncate">{p.nombre}</div>
                  <div className="text-xs text-zinc-500">{p.canciones.length} canciones</div>
                </button>
                <button
                  onClick={() => eliminarPlaylist(p.id)}
                  className="text-zinc-600 hover:text-red-400 transition-colors text-lg px-1 flex-shrink-0"
                >
                  ×
                </button>
              </div>

              {/* Expanded: songs + search */}
              {playlistActiva === p.id && (
                <div className="px-5 pb-4">
                  {/* Songs list */}
                  <div className="space-y-1 mb-3 max-h-48 overflow-y-auto">
                    {p.canciones.length === 0 && (
                      <div className="text-zinc-600 text-xs text-center py-2">Sin canciones aún</div>
                    )}
                    {p.canciones.map(c => (
                      <div key={c.id} className="flex items-center gap-2 py-1">
                        <img src={c.imagenUrl} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium truncate">{c.titulo}</div>
                          <div className="text-xs text-zinc-500 truncate">{c.artista}</div>
                        </div>
                        <button
                          onClick={() => quitarDePlaylist(p.id, c.id)}
                          className="text-zinc-600 hover:text-red-400 transition-colors text-base px-1 flex-shrink-0"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Search to add */}
                  <input
                    type="text"
                    value={queryPl}
                    onChange={e => handleSearchPl(e.target.value)}
                    placeholder="Agregar canción..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white text-xs outline-none focus:border-yellow-400 transition-colors"
                  />
                  {buscandoPl && <div className="text-zinc-500 text-xs text-center py-2">Buscando...</div>}
                  {resultsPl && (
                    <div className="space-y-0.5 mt-2 max-h-48 overflow-y-auto">
                      {resultsPl.tracks?.items?.map((track: any) => (
                        <button
                          key={track.id}
                          onClick={() => agregarAPlaylist(p.id, track)}
                          className="w-full flex items-center gap-2 p-1.5 rounded hover:bg-zinc-800 transition-colors text-left"
                        >
                          <img src={track.album.images[0]?.url} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate">{track.name}</div>
                            <div className="text-xs text-zinc-500 truncate">{track.artists.map((a: any) => a.name).join(', ')}</div>
                          </div>
                          <span className="text-yellow-400 text-sm flex-shrink-0">+</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Importador masivo */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 mt-4">
          <div className="px-5 py-4 border-b border-zinc-800">
            <div className="text-zinc-400 text-xs uppercase tracking-widest">Importar canciones de Spotify</div>
            <div className="text-zinc-600 text-xs mt-1">Pegá los nombres (uno por línea) y elegí a qué lista agregarlos</div>
          </div>
          <div className="px-5 py-4 space-y-3">
            <select
              value={importPlaylistId ?? ''}
              onChange={e => setImportPlaylistId(Number(e.target.value) || null)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white text-sm outline-none focus:border-yellow-400 transition-colors"
            >
              <option value="">Elegí una lista...</option>
              {playlists.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
            <textarea
              value={importTexto}
              onChange={e => setImportTexto(e.target.value)}
              placeholder={"Bohemian Rhapsody\nHotel California\nStairway to Heaven"}
              rows={6}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white text-sm outline-none focus:border-yellow-400 transition-colors resize-none font-mono"
            />
            <button
              onClick={importarCanciones}
              disabled={importando || !importPlaylistId || !importTexto.trim()}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-zinc-700 disabled:text-zinc-500 text-black font-bold py-2.5 rounded text-sm transition-colors"
            >
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

        <div className="mt-6">
          <a href="/" className="text-zinc-500 text-sm hover:text-yellow-400 transition-colors">
            ← Volver al kiosko
          </a>
        </div>
      </div>
    </div>
  )
}