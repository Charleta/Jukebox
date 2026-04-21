'use client'
import { useState, useRef, useEffect } from 'react'
import { SpotifyArtist, SpotifyTrack } from '@/types'
import Keyboard from 'react-simple-keyboard'

interface InternalPlaylist {
  id: number
  nombre: string
  imagenUrl: string
  esFavoritos: boolean
  canciones: { id: number }[]
}

interface Props {
  onArtistSelect: (artist: SpotifyArtist) => void
  onTrackSelect: (track: SpotifyTrack) => void
  onInternalPlaylistSelect: (id: number) => void
  tieneFichas: boolean
}

export function BuscadorArtista({ onArtistSelect, onTrackSelect, onInternalPlaylistSelect, tieneFichas }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{ artists: SpotifyArtist[]; tracks: SpotifyTrack[] }>({ artists: [], tracks: [] })
  const [loading, setLoading] = useState(false)
  const [showKeyboard, setShowKeyboard] = useState(false)
  const [hasPhysicalKeyboard, setHasPhysicalKeyboard] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const abortRef = useRef<AbortController | null>(null)
  const [internalPlaylists, setInternalPlaylists] = useState<InternalPlaylist[]>([])
  const keyboardRef = useRef<any>(null)

  useEffect(() => {
    fetch('/api/playlists')
      .then(r => r.json())
      .then(data => setInternalPlaylists(data))
      .catch(() => {})
  }, [])

  // Detectar teclado físico
  useEffect(() => {
    const handleKeyDown = () => {
      setHasPhysicalKeyboard(true)
      setShowKeyboard(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
  if (!tieneFichas) {
    setQuery('')
    setResults({ artists: [], tracks: [] })
    setShowKeyboard(false)
    if (keyboardRef.current) keyboardRef.current.setInput('')
  }
}, [tieneFichas])

  const search = (q: string) => {
    if (!tieneFichas) return;
    setQuery(q)
    clearTimeout(debounceRef.current)
    abortRef.current?.abort()
    if (q.length < 2) { setResults({ artists: [], tracks: [] }); return }
    debounceRef.current = setTimeout(async () => {
      abortRef.current = new AbortController()
      setLoading(true)
      try {
        const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(q)}`, {
          signal: abortRef.current.signal,
        })
        const data = await res.json()
        setResults({
          artists: data.artists?.items?.slice(0, 4) ?? [],
          tracks: data.tracks?.items?.slice(0, 10) ?? [],
        })
      } catch (err: any) {
        if (err.name !== 'AbortError') console.error('Search error:', err)
      } finally {
        setLoading(false)
      }
    }, 400)
  }

  const handleKeyboardChange = (input: string) => {
    search(input)
    if (keyboardRef.current) {
      keyboardRef.current.setInput(input)
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-6 overflow-y-auto flex-1">
      {/* Indicador visual de bloqueo */}
        <div className="text-xs tracking-widest uppercase mb-3 flex justify-between">
          <span className={tieneFichas ? "text-zinc-500" : "text-red-500 font-bold"}>
            {tieneFichas ? "Buscá un artista o canción" : " SIN FICHAS PARA BUSCAR"}
          </span>
        </div>

        {/* <div className="text-xs tracking-widest text-zinc-500 uppercase mb-3">
          Buscá un artista o canción
        </div> */}

        <div className={`flex items-center bg-zinc-900 border rounded transition-colors ${
          !tieneFichas ? 'border-red-900 opacity-50' : 'border-zinc-700 focus-within:border-yellow-400'
        }`}>
          <span className="px-4 text-zinc-500">🔍</span>
          <input
            value={query}
            onChange={e => search(e.target.value)}
            onFocus={() => { if (!hasPhysicalKeyboard && tieneFichas) setShowKeyboard(true) }}
            disabled={!tieneFichas}
            placeholder="Tocá para buscar..."
            className="flex-1 bg-transparent outline-none text-white text-lg py-3 font-light"
          />
          {loading && <span className="px-4 text-zinc-500 text-sm animate-pulse">...</span>}
          {query && (
            <button
              onClick={() => { search(''); setShowKeyboard(false); if (keyboardRef.current) keyboardRef.current.setInput('') }}
              className="bg-red-950 active:bg-red-900 hover:bg-red-800 border border-red-900/60 text-red-400 font-black rounded-4xl mr-2 px-3 py-1.5 text-sm transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Nuestras listas */}
        {!query && internalPlaylists.length > 0 && (
          <div className="mt-5">
            <div className="text-xs text-zinc-500 uppercase tracking-widest mb-3">Nuestras Listas</div>
            <div className="grid grid-cols-2 gap-3">
              {internalPlaylists.filter(p => !p.esFavoritos).map(p => (
                <button
                  key={p.id}
                  onClick={() => onInternalPlaylistSelect(p.id)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-yellow-400/30 text-left transition-all"
                >
                  {p.imagenUrl ? (
                    <img src={p.imagenUrl} alt="" className="w-12 h-12 rounded object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded bg-zinc-800 flex items-center justify-center text-zinc-500 flex-shrink-0 text-xl">♪</div>
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{p.nombre}</div>
                    {/* <div className="text-xs text-zinc-500">{p.canciones.length} canciones</div> */}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Artistas */}
        {results.artists.length > 0 && (
          <div className="mt-4">
            <div className="text-xs text-zinc-600 uppercase tracking-widest mb-2">Artistas</div>
            <div className="grid grid-cols-2 gap-2">
              {results.artists.map(a => (
                <button
                  key={a.id}
                  onClick={() => { onArtistSelect(a); setShowKeyboard(false) }}
                  className="flex items-center gap-3 p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-left transition-colors"
                >
                  <img src={a.images[0]?.url ?? '/placeholder.png'} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-medium">{a.name}</div>
                    <div className="text-xs text-zinc-500">{a.genres?.[0] ?? 'Artista'}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Canciones */}
        {results.tracks.length > 0 && (
          <div className="mt-3">
            <div className="text-xs text-zinc-600 uppercase tracking-widest mb-2">Canciones</div>
            {results.tracks.map(t => (
              <button
                key={t.id}
                onClick={() => { onTrackSelect(t); setShowKeyboard(false) }}
                className="flex items-center gap-3 p-2 rounded hover:bg-zinc-800 w-full text-left transition-colors"
              >
                <img src={t.album.images[0]?.url} alt="" className="w-8 h-8 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.artists.map((a: any) => a.name).join(', ')}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Teclado virtual — fijo al pie de pantalla */}
      {showKeyboard && tieneFichas &&(
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/98 border-t border-zinc-800 shadow-2xl backdrop-blur">
          <div className="flex justify-between items-center px-4 pt-3 pb-1">
            <span className="text-zinc-500 text-xs uppercase tracking-widest">Teclado</span>
            <button
              onClick={() => setShowKeyboard(false)}
              className="text-zinc-500 text-xs bg-zinc-800 active:bg-zinc-700 px-3 py-1.5 rounded-full transition-colors"
            >
              Cerrar ✕
            </button>
          </div>
          <Keyboard
            keyboardRef={r => (keyboardRef.current = r)}
            onChange={handleKeyboardChange}
            layout={{
              default: [
                '1 2 3 4 5 6 7 8 9 0',
                'q w e r t y u i o p',
                'a s d f g h j k l ñ',
                'z x c v b n m {bksp}',
                '{space}'
              ]
            }}
            display={{
              '{bksp}': '⌫',
              '{space}': 'ESPACIO'
            }}
            theme="hg-theme-default hg-layout-default"
          />
        </div>
      )}
    </div>
  )
}