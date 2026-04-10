'use client'
import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void
    Spotify: any
  }
}

interface Props {
  spotifyUri: string | null
  onTerminada: () => void
  onProgress: (position: number, duration: number) => void
}

export function SpotifyPlayer({ spotifyUri, onTerminada, onProgress }: Props) {
  const [deviceId, setDeviceId] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const playerRef = useRef<any>(null)
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const maxTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const terminadaRef = useRef(false)

  const initPlayer = async () => {
    const res = await fetch('/api/spotify/token')
    const { token } = await res.json()

    const player = new window.Spotify.Player({
      name: 'JukeBox Player',
      getOAuthToken: (cb: (token: string) => void) => cb(token),
      volume: 0.8,
    })

    playerRef.current = player

    player.addListener('ready', ({ device_id }: { device_id: string }) => {
      console.log('Player ready, device:', device_id)
      setDeviceId(device_id)
      setReady(true)
    })

    player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
      console.log('Device offline:', device_id)
      setReady(false)
    })

    player.addListener('player_state_changed', (state: any) => {
      if (!state) return
      if (state.position === 0 && state.paused && state.track_window.previous_tracks.length > 0) {
  if (terminadaRef.current) return
  terminadaRef.current = true
  clearInterval(intervalRef.current)
  onTerminada()
}
    })

    intervalRef.current = setInterval(async () => {
      if (!playerRef.current) return
      const state = await playerRef.current.getCurrentState()
      if (!state) return
      onProgress(state.position, state.duration)
    }, 1000)

    player.connect()
  }

  useEffect(() => {
    if (window.Spotify) {
      initPlayer()
    } else {
      window.onSpotifyWebPlaybackSDKReady = initPlayer
    }

    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(maxTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!ready || !deviceId || !spotifyUri) return
    playTrack(deviceId, spotifyUri)
  }, [spotifyUri, ready, deviceId])

  const playTrack = async (deviceId: string, uri: string) => {
    clearTimeout(maxTimerRef.current)
terminadaRef.current = false 
    const res = await fetch('/api/spotify/play', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, uri }),
    })
    if (!res.ok) {
      const err = await res.json()
      console.error('Play error:', err)
      return
    }

    const configRes = await fetch('/api/config')
    const config = await configRes.json()
    const maxSegundos = Number(config.valor ?? 300)

maxTimerRef.current = setTimeout(() => {
  if (terminadaRef.current) return
  terminadaRef.current = true
  onTerminada()
}, maxSegundos * 1000)
  }

  return null
}