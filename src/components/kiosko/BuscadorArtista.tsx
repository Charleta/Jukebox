'use client'
import { useState, useRef, useEffect } from 'react'
import { SpotifyArtist, SpotifyTrack } from '@/types'

interface InternalPlaylist {
  id: number
  nombre: string
  imagenUrl: string
  canciones: { id: number }[]
}

interface Props {
  onArtistSelect: (artist: SpotifyArtist) => void
  onTrackSelect: (track: SpotifyTrack) => void
  onInternalPlaylistSelect: (id: number) => void
}

export function BuscadorArtista({ onArtistSelect, onTrackSelect, onInternalPlaylistSelect }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{ artists: SpotifyArtist[]; tracks: SpotifyTrack[] }>({ artists: [], tracks: [] })
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout>()
  const [internalPlaylists, setInternalPlaylists] = useState<InternalPlaylist[]>([])

  useEffect(() => {
    fetch('/api/playlists')
      .then(r => r.json())
      .then(data => setInternalPlaylists(data))
      .catch(() => {})
  }, [])

  const search = (q: string) => {
    setQuery(q)
    clearTimeout(debounceRef.current)
    if (q.length < 2) { setResults({ artists: [], tracks: [] }); return }
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      const [mainRes, genreRes] = await Promise.all([
        fetch(`/api/spotify/search?q=${encodeURIComponent(q)}`),
        fetch(`/api/spotify/search?q=${encodeURIComponent('genre:' + q)}`),
      ])
      const main = await mainRes.json()
      const genre = await genreRes.json()

      const mainTracks: SpotifyTrack[] = main.tracks?.items?.slice(0, 15) ?? []
      const genreTracks: SpotifyTrack[] = genre.tracks?.items?.slice(0, 15) ?? []
      const seenIds = new Set(mainTracks.map(t => t.id))
      const mergedTracks = [...mainTracks, ...genreTracks.filter(t => !seenIds.has(t.id))].slice(0, 25)

      setResults({
        artists: main.artists?.items?.slice(0, 4) ?? [],
        tracks: mergedTracks,
      })
      setLoading(false)
    }, 400)
  }

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="text-xs tracking-widest text-zinc-500 uppercase mb-3">
        Buscá un artista o canción
      </div>
      <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded focus-within:border-yellow-400 transition-colors">
        <span className="px-4 text-zinc-500">🔍</span>
        <input
          autoFocus
          value={query}
          onChange={e => search(e.target.value)}
          placeholder="Escribí acá..."
          className="flex-1 bg-transparent outline-none text-white text-lg py-3 font-light"
        />
        {loading && <span className="px-4 text-zinc-500 text-sm animate-pulse">...</span>}
      </div>

      {/* Nuestras listas — solo cuando no hay query activa */}
      {!query && internalPlaylists.length > 0 && (
        <div className="mt-5">
          <div className="text-xs text-zinc-500 uppercase tracking-widest mb-3">Nuestras Listas</div>
          <div className="grid grid-cols-2 gap-3">
            {internalPlaylists.map(p => (
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
                  <div className="text-xs text-zinc-500">{p.canciones.length} canciones</div>
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
                onClick={() => onArtistSelect(a)}
                className="flex items-center gap-3 p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-left transition-colors"
              >
                <img
                  src={a.images[0]?.url ?? '/placeholder.png'}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
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
              onClick={() => onTrackSelect(t)}
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
  )
}
