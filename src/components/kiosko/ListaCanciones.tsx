'use client'
import { useEffect, useRef } from 'react'
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

  useKeyboardNav({
    itemCount: tracks.length,
    focused,
    setFocused,
    onEnter: () => onAdd(tracks[focused]),
    onEscape: onBack,
  })

  useEffect(() => {
    refs.current[focused]?.scrollIntoView({ block: 'nearest' })
  }, [focused])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Artist hero */}
      <div className="flex items-center gap-4 px-8 py-5 border-b border-zinc-800 flex-shrink-0"
        style={{ background: 'linear-gradient(90deg, rgba(245,200,66,0.06) 0%, transparent 60%)' }}>
        <img
          src={artist.images[0]?.url}
          alt={artist.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
        />
        <div>
          <div className="text-3xl leading-none mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            {artist.name}
          </div>
          <div className="text-xs text-zinc-500">
            {artist.followers?.total?.toLocaleString('es-AR')} seguidores
          </div>
          {artist.genres?.[0] && (
  <div className="inline-block mt-1 text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded uppercase tracking-widest">
    {artist.genres?.[0]}
  </div>
)}
        </div>
      </div>

      {/* Songs */}
      <div className="flex-1 overflow-y-auto">
        {tracks.map((track, i) => (
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
            <span className={`text-xs w-5 text-right flex-shrink-0 ${focused === i ? 'text-yellow-400' : 'text-zinc-600'}`}>
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
              <div className="text-xs text-zinc-500">{track.album.name}</div>
            </div>
            <div className="text-xs text-zinc-500 flex-shrink-0">{formatMs(track.duration_ms)}</div>
            <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-lg flex-shrink-0 transition-all ${
              focused === i ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-zinc-700 text-zinc-600'
            }`}>
              +
            </div>
          </div>
        ))}
      </div>

      {/* Keyboard hints */}
      <div className="flex gap-5 px-8 py-3 border-t border-zinc-800 flex-shrink-0">
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