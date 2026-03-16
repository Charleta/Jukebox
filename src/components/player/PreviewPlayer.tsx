'use client'
import { useEffect, useRef, useState } from 'react'
import { CancionCola } from '@/hooks/useCola'

interface Props {
  cancion: CancionCola | null
  onTerminada: () => void
}

export function PreviewPlayer({ cancion, onTerminada }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!cancion) return
    setError(false)
    fetchPreview(cancion.spotifyUri)
  }, [cancion?.id])

  const fetchPreview = async (uri: string) => {
    const trackId = uri.replace('spotify:track:', '')
    const res = await fetch(`/api/spotify/preview?trackId=${trackId}`)
    const data = await res.json()
    if (data.previewUrl) {
      setPreviewUrl(data.previewUrl)
    } else {
      setError(true)
      // Si no tiene preview, pasamos a la siguiente después de 3 segundos
      setTimeout(onTerminada, 3000)
    }
  }

  useEffect(() => {
    if (!previewUrl) return
    const audio = new Audio(previewUrl)
    audioRef.current = audio
    audio.play()
    audio.onended = onTerminada
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [previewUrl])

  if (!cancion) return null

  return (
    <div className="px-6 pb-4">
      {error && (
        <div className="text-xs text-zinc-500 text-center animate-pulse">
          Sin preview — pasando a la siguiente...
        </div>
      )}
      {previewUrl && !error && (
        <div className="text-xs text-yellow-400/60 text-center">
          ▶ Preview 30s
        </div>
      )}
    </div>
  )
}