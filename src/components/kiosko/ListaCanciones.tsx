'use client'
import { useEffect, useRef, useState } from 'react'
import { SpotifyArtist, SpotifyTrack } from '@/types'
import { useKeyboardNav } from '@/hooks/useKeyboardNav'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

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

  const [showKeyboard, setShowKeyboard] = useState(false)
  const [hasPhysicalKeyboard, setHasPhysicalKeyboard] = useState(false)
  const keyboardRef = useRef<any>(null)

  useEffect(() => {
  const handleKeyDown = () => {
    setHasPhysicalKeyboard(true)
    setShowKeyboard(false)
  }
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleKeyboardChange = (input: string) => {
  setSearch(input)
  setFocused(0)
  if (keyboardRef.current) keyboardRef.current.setInput(input)
}

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
              className="w-12 h-12 rounded-full object-contain bg-zinc-900 border-2 border-yellow-400 shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="text-2xl leading-none truncate" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              {artist.name}
            </div>
            {/* <div className="text-xs text-zinc-500 mt-0.5">
              {filtered.length !== tracks.length
                ? `${filtered.length} de ${tracks.length} canciones`
                : `${tracks.length} canciones`}
            </div> */}
          </div>
        </div>

        {/* Buscador dentro de la lista */}
        <div className="px-5 pb-3">
          <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded focus-within:border-yellow-400 transition-colors">
            <span className="px-3 text-zinc-500 text-sm">🔍</span>
            <input
              value={search}
              onFocus={() => { if (!hasPhysicalKeyboard) setShowKeyboard(true) }}
              onChange={e => { setSearch(e.target.value); setFocused(0) }}
              placeholder="Buscar en esta lista..."
              className="flex-1 bg-transparent outline-none text-white text-sm py-2 font-light"
            />
            {search && (
              <button
                  onClick={() => { 
                    setSearch(''); 
                    setFocused(0); 
                    setShowKeyboard(false)
                    if (keyboardRef.current) keyboardRef.current.setInput('') 
                  }}                
                  className="bg-red-950 active:bg-red-900 hover:bg-red-800 border border-red-900/60 text-red-400 font-black rounded-4xl mr-2 px-3 py-1.5 text-sm transition-colors"
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
            className={`flex items-center gap-4 px-8 py-4 cursor-pointer transition-all border-l-4 ${
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
              className="w-11 h-11 rounded object-contain shrink-0 bg-zinc-800"
              onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden' }}
            />
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium truncate ${focused === i ? 'text-yellow-400' : ''}`}>
                {track.name}
              </div>
              <div className="text-xs text-zinc-500">{track.artists.map((a: any) => a.name).join(', ')}</div>
            </div>
            {/* <div className="text-xs text-zinc-500 shrink-0">{formatMs(track.duration_ms)}</div> */}
            <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-lg shrink-0 transition-all ${
              focused === i ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-zinc-700 text-zinc-600'
            }`}>
              +
            </div>
          </div>
        ))}
      </div>
        {showKeyboard && (
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
