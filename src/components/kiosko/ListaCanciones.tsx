'use client'
import { useEffect, useRef, useState } from 'react'
import { SpotifyArtist, SpotifyTrack } from '@/types'
import { useKeyboardNav } from '@/hooks/useKeyboardNav'

function formatMs(ms: number) {
  const m = Math.floor(ms / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return `${m}:${s.toString().padStart(2, '0')}`
}

interface Props {
  artist: SpotifyArtist
  tracks: SpotifyTrack[]
  focused: number
  setFocused: (n: number) => void
  onAdd: (track: SpotifyTrack) => void
  onBack: () => void
}

export function ListaCanciones({ artist, tracks, focused, setFocused, onAdd, onBack }: Props) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [search, setSearch] = useState('')

  const filtered = search.trim()
    ? tracks.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.artists.some((a: any) => a.name.toLowerCase().includes(search.toLowerCase()))
      )
    : tracks

  useKeyboardNav({
    itemCount: filtered.length,
    focused,
    setFocused,
    onEnter: () => filtered[focused] && onAdd(filtered[focused]),
    onEscape: onBack,
  })

  useEffect(() => {
    refs.current[focused]?.scrollIntoView({ block: 'nearest' })
  }, [focused])

  // Resetear búsqueda y foco al cambiar de artista/playlist
  useEffect(() => {
    setSearch('')
    setFocused(0)
  }, [artist.id])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header: back + info + buscador */}
      <div className="shrink-0 border-b border-zinc-800"
        style={{ background: 'linear-gradient(90deg, rgba(245,200,66,0.06) 0%, transparent 60%)' }}>
        <div className="flex items-center gap-4 px-5 py-4">
          <button
            onClick={onBack}
            className="shrink-0 w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-all"
            title="Volver"
          >
            ←
          </button>
          {artist.images[0]?.url && (
            <img
              src={artist.images[0].url}
              alt={artist.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400 shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="text-2xl leading-none truncate" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              {artist.name}
            </div>
            <div className="text-xs text-zinc-500 mt-0.5">
              {filtered.length !== tracks.length
                ? `${filtered.length} de ${tracks.length} canciones`
                : `${tracks.length} canciones`}
            </div>
          </div>
        </div>

        {/* Buscador dentro de la lista */}
        <div className="px-5 pb-3">
          <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded focus-within:border-yellow-400 transition-colors">
            <span className="px-3 text-zinc-500 text-sm">🔍</span>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setFocused(0) }}
              placeholder="Buscar en esta lista..."
              className="flex-1 bg-transparent outline-none text-white text-sm py-2 font-light"
            />
            {search && (
              <button
                onClick={() => { setSearch(''); setFocused(0) }}
                className="px-3 text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Songs */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="flex items-center justify-center h-32 text-zinc-600 text-sm">
            Sin resultados
          </div>
        )}
        {filtered.map((track, i) => (
          <div
            key={track.id}
            ref={el => { refs.current[i] = el }}
            onClick={() => { setFocused(i); onAdd(track) }}
            className={`flex items-center gap-4 px-8 py-2.5 cursor-pointer transition-all border-l-4 ${
              focused === i
                ? 'bg-yellow-400/8 border-yellow-400'
                : 'border-transparent hover:bg-zinc-800/40'
            }`}
          >
            <span className={`text-xs w-5 text-right shrink-0 ${focused === i ? 'text-yellow-400' : 'text-zinc-600'}`}>
              {i + 1}
            </span>
            <img
              src={track.album.images[0]?.url}
              alt=""
              className="w-11 h-11 rounded object-cover shrink-0 bg-zinc-800"
              onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden' }}
            />
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium truncate ${focused === i ? 'text-yellow-400' : ''}`}>
                {track.name}
              </div>
              <div className="text-xs text-zinc-500">{track.artists.map((a: any) => a.name).join(', ')}</div>
            </div>
            <div className="text-xs text-zinc-500 shrink-0">{formatMs(track.duration_ms)}</div>
            <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-lg shrink-0 transition-all ${
              focused === i ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-zinc-700 text-zinc-600'
            }`}>
              +
            </div>
          </div>
        ))}
      </div>

      {/* Keyboard hints */}
      <div className="flex gap-5 px-8 py-3 border-t border-zinc-800 shrink-0">
        {[['← →', 'Navegar'], ['Enter', 'Agregar'], ['Esc', 'Volver']].map(([k, v]) => (
          <div key={k} className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5 font-mono text-zinc-300">{k}</span>
            {v}
          </div>
        ))}
      </div>
    </div>
  )
}
