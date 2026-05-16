'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface CurrentVideo {
  videoId: string
  title: string
  channelTitle: string
  thumbnailUrl: string
  updatedAt: string
}

interface YouTubeControl {
  action: string
  updatedAt: string
}

declare global {
  interface Window {
    YT?: {
      Player: new (elementId: string, options: Record<string, unknown>) => YouTubePlayer
      PlayerState: { ENDED: number }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

interface YouTubePlayer {
  loadVideoById: (videoId: string) => void
  playVideo: () => void
  pauseVideo: () => void
  stopVideo: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  mute: () => void
  unMute: () => void
  setVolume: (volume: number) => void
  destroy: () => void
}

const POLL_MS = 2000

export default function YouTubeScreenPage() {
  const [video, setVideo] = useState<CurrentVideo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const playerRef = useRef<YouTubePlayer | null>(null)
  const playerReadyRef = useRef(false)
  const pendingVideoRef = useRef<CurrentVideo | null>(null)
  const currentVolumeRef = useRef(80)
  const lastUpdatedAtRef = useRef('')
  const lastControlUpdatedAtRef = useRef('')

  const playVideo = useCallback((nextVideo: CurrentVideo) => {
    pendingVideoRef.current = nextVideo
    setVideo(nextVideo)
    if (!playerReadyRef.current || !playerRef.current) return
    setError('')
    playerRef.current.loadVideoById(nextVideo.videoId)
    playerRef.current.setVolume(currentVolumeRef.current)
    window.setTimeout(() => {
      playerRef.current?.playVideo()
    }, 250)
  }, [])

  const playNextFromQueue = useCallback(async () => {
    try {
      await fetch('/api/youtube/next', { method: 'POST', cache: 'no-store' })
    } catch {}
  }, [])

  useEffect(() => {
    let active = true

    const initPlayer = () => {
      if (!active || playerRef.current || !window.YT) return
      playerRef.current = new window.YT.Player('youtube-player', {
        width: '100%',
        height: '100%',
        videoId: pendingVideoRef.current?.videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          enablejsapi: 1,
          origin: window.location.origin,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: () => {
            playerReadyRef.current = true
            playerRef.current?.setVolume(currentVolumeRef.current)
            if (pendingVideoRef.current) playVideo(pendingVideoRef.current)
          },
          onStateChange: (event: { data: number }) => {
            if (event.data === window.YT?.PlayerState.ENDED) {
              void playNextFromQueue()
            }
          },
          onError: () => {
            setError('YouTube no pudo reproducir este video. Probá con otro resultado.')
          },
          onAutoplayBlocked: () => {
            setError('Chrome bloqueó el autoplay. Tocá Play desde el admin o abrí la pantalla con el script actualizado.')
          },
        },
      })
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      window.onYouTubeIframeAPIReady = initPlayer
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.body.appendChild(script)
    }

    return () => {
      active = false
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [playNextFromQueue, playVideo])

  const applyControl = useCallback((control: YouTubeControl | null | undefined, volume: number) => {
    currentVolumeRef.current = Math.min(100, Math.max(0, Math.round(volume)))
    playerRef.current?.setVolume(currentVolumeRef.current)

    if (!control?.action || !control.updatedAt || control.updatedAt === lastControlUpdatedAtRef.current) return
    lastControlUpdatedAtRef.current = control.updatedAt

    if (control.action === 'play') playerRef.current?.playVideo()
    if (control.action === 'pause') playerRef.current?.pauseVideo()
    if (control.action === 'stop') playerRef.current?.stopVideo()
    if (control.action === 'replay') {
      playerRef.current?.seekTo(0, true)
      playerRef.current?.playVideo()
    }
    if (control.action === 'mute') playerRef.current?.mute()
    if (control.action === 'unmute') playerRef.current?.unMute()
    if (control.action === 'set-volume') playerRef.current?.setVolume(currentVolumeRef.current)
  }, [])

  useEffect(() => {
    let active = true

    const loadCurrent = async () => {
      try {
        const res = await fetch('/api/youtube/current', { cache: 'no-store' })
        if (!res.ok) throw new Error('current_failed')
        const data = await res.json() as { video?: CurrentVideo | null; control?: YouTubeControl; volume?: number }
        if (!active) return

        const nextVideo = data.video ?? null
        const nextUpdatedAt = nextVideo?.updatedAt ?? ''
        if (nextVideo && nextUpdatedAt !== lastUpdatedAtRef.current) {
          lastUpdatedAtRef.current = nextUpdatedAt
          playVideo(nextVideo)
        } else if (!nextVideo) {
          setVideo(null)
        }
        applyControl(data.control, Number(data.volume ?? 80))
        setError('')
      } catch {
        if (active) setError('No se pudo leer el video actual')
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadCurrent()
    const interval = window.setInterval(() => {
      void loadCurrent()
    }, POLL_MS)

    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [applyControl, playVideo])

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <div className="absolute inset-0 h-full w-full bg-black" id="youtube-player" />
      {video ? (
        <>
        <div className="pointer-events-none absolute left-0 right-0 top-0 bg-gradient-to-b from-black/70 to-transparent p-6">
          <div className="max-w-4xl">
            <div className="text-xs uppercase tracking-[0.4em] text-red-400">YouTube</div>
            <h1 className="mt-2 truncate text-4xl font-black leading-none" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              {video.title}
            </h1>
            {video.channelTitle && <div className="mt-1 text-sm text-zinc-300">{video.channelTitle}</div>}
          </div>
        </div>
        {error && (
          <div className="pointer-events-none absolute bottom-6 left-6 right-6 rounded-2xl border border-red-500/40 bg-black/80 px-5 py-4 text-sm text-red-100">
            {error}
          </div>
        )}
        </>
      ) : (
        <div className="relative z-10 flex h-full w-full items-center justify-center bg-black px-8 text-center">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-[0.6em] text-red-400">YouTube</div>
            <h1 className="mt-5 text-7xl font-black leading-none text-yellow-400" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              Rancho Aparte
            </h1>
            <p className="mt-4 text-lg text-zinc-500">
              {loading ? 'Cargando pantalla...' : 'Esperando video desde el panel admin'}
            </p>
            {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
          </div>
        </div>
      )}
    </main>
  )
}
