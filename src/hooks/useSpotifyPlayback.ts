'use client'

import { useEffect, useState } from 'react'

export interface SpotifyPlaybackTrack {
  uri: string
  title: string
  artist: string
  imageUrl: string
}

export interface SpotifyPlaybackState {
  isPlaying: boolean
  progressMs: number
  durationMs: number
  track: SpotifyPlaybackTrack | null
}

const EMPTY_PLAYBACK: SpotifyPlaybackState = {
  isPlaying: false,
  progressMs: 0,
  durationMs: 0,
  track: null,
}

export function useSpotifyPlayback(pollMs = 2000) {
  const [playback, setPlayback] = useState<SpotifyPlaybackState>(EMPTY_PLAYBACK)

  useEffect(() => {
    let active = true

    const fetchPlayback = async () => {
      try {
        const res = await fetch('/api/spotify/playback')
        if (!res.ok) return
        const data = await res.json()
        if (!active) return
        setPlayback({
          isPlaying: data.isPlaying ?? false,
          progressMs: data.progress_ms ?? 0,
          durationMs: data.duration_ms ?? 0,
          track: data.track
            ? {
                uri: String(data.track.uri ?? ''),
                title: String(data.track.title ?? ''),
                artist: String(data.track.artist ?? ''),
                imageUrl: String(data.track.imageUrl ?? ''),
              }
            : null,
        })
      } catch {
        // Si falla temporalmente, mantenemos el último estado conocido.
      }
    }

    void fetchPlayback()
    const interval = window.setInterval(() => {
      void fetchPlayback()
    }, pollMs)

    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [pollMs])

  return playback
}

