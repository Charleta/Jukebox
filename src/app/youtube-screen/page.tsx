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

const POLL_MS = 2000

function buildEmbedUrl(videoId: string) {
  const params = new URLSearchParams({
    autoplay: '1',
    controls: '1',
    enablejsapi: '1',
    rel: '0',
    modestbranding: '1',
    playsinline: '0',
  })
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}

export default function YouTubeScreenPage() {
  const [video, setVideo] = useState<CurrentVideo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const lastUpdatedAtRef = useRef('')
  const lastControlUpdatedAtRef = useRef('')
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const sendPlayerCommand = useCallback((func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      'https://www.youtube.com'
    )
  }, [])

  const applyControl = useCallback((control: YouTubeControl | null | undefined) => {
    if (!control?.action || !control.updatedAt || control.updatedAt === lastControlUpdatedAtRef.current) return
    lastControlUpdatedAtRef.current = control.updatedAt

    if (control.action === 'play') sendPlayerCommand('playVideo')
    if (control.action === 'pause') sendPlayerCommand('pauseVideo')
    if (control.action === 'stop') sendPlayerCommand('stopVideo')
    if (control.action === 'replay') {
      sendPlayerCommand('seekTo', [0, true])
      sendPlayerCommand('playVideo')
    }
    if (control.action === 'mute') sendPlayerCommand('mute')
    if (control.action === 'unmute') sendPlayerCommand('unMute')
  }, [sendPlayerCommand])

  useEffect(() => {
    let active = true

    const loadCurrent = async () => {
      try {
        const res = await fetch('/api/youtube/current', { cache: 'no-store' })
        if (!res.ok) throw new Error('current_failed')
        const data = await res.json() as { video?: CurrentVideo | null; control?: YouTubeControl }
        if (!active) return

        const nextVideo = data.video ?? null
        const nextUpdatedAt = nextVideo?.updatedAt ?? ''
        if (nextUpdatedAt !== lastUpdatedAtRef.current) {
          lastUpdatedAtRef.current = nextUpdatedAt
          setVideo(nextVideo)
        }
        window.setTimeout(() => applyControl(data.control), 250)
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
  }, [applyControl])

  return (
    <main className="h-screen w-screen overflow-hidden bg-black text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      {video ? (
        <div className="relative h-full w-full bg-black">
          <iframe
            ref={iframeRef}
            key={`${video.videoId}-${video.updatedAt}`}
            className="h-full w-full border-0"
            src={buildEmbedUrl(video.videoId)}
            title={video.title || 'YouTube'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />

          <div className="pointer-events-none absolute left-0 right-0 top-0 bg-gradient-to-b from-black/70 to-transparent p-6">
            <div className="max-w-4xl">
              <div className="text-xs uppercase tracking-[0.4em] text-red-400">YouTube</div>
              <h1 className="mt-2 truncate text-4xl font-black leading-none" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                {video.title}
              </h1>
              {video.channelTitle && <div className="mt-1 text-sm text-zinc-300">{video.channelTitle}</div>}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center px-8 text-center">
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
