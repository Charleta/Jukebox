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
  maxSegundos: number
  onTerminada: () => void
  onProgress: (position: number, duration: number) => void
}

export function SpotifyPlayer({ spotifyUri, maxSegundos, onTerminada, onProgress }: Props) {
  const [deviceId, setDeviceId] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const playerRef = useRef<any>(null)
  const deviceIdRef = useRef<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const maxTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const nearEndTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const nearEndScheduledRef = useRef(false)
  const terminadaRef = useRef(false)
  const hasPlayedRef = useRef(false)
  const playStartTimeRef = useRef(0)
  const reconnectTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const reconnectAttemptsRef = useRef(0)
  const spotifyUriRef = useRef<string | null>(null)
  const nextReconnectDelay = () => {
    const delay = Math.min(30000, 2000 * Math.pow(2, reconnectAttemptsRef.current))
    reconnectAttemptsRef.current++
    return delay
  }

  const initPlayer = async () => {
    clearTimeout(reconnectTimerRef.current)
    clearInterval(intervalRef.current)
    if (playerRef.current) {
      playerRef.current.disconnect()
      playerRef.current = null
    }

    try {
      const res = await fetch('/api/spotify/token')
      const { token } = await res.json()

      if (!token) {
        reconnectTimerRef.current = setTimeout(initPlayer, nextReconnectDelay())
        return
      }

      const player = new window.Spotify.Player({
        name: 'JukeBox Player',
        getOAuthToken: async (cb: (token: string) => void) => {
          const r = await fetch('/api/spotify/token')
          const { token: t } = await r.json()
          cb(t)
        },
        volume: 0.8,
      })

      playerRef.current = player

      player.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Player ready, device:', device_id)
        reconnectAttemptsRef.current = 0
        deviceIdRef.current = device_id
        setDeviceId(device_id)
        setReady(true)

      })

      player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
        console.log('Device offline:', device_id)
        deviceIdRef.current = null
        setReady(false)
        reconnectTimerRef.current = setTimeout(initPlayer, nextReconnectDelay())
      })

      player.addListener('player_state_changed', (state: any) => {
        if (!state) return

        if (!state.paused) {
          hasPlayedRef.current = true
          playStartTimeRef.current = playStartTimeRef.current || Date.now()
        }

        const tiempoReproduciendo = Date.now() - playStartTimeRef.current
        if (
          hasPlayedRef.current &&
          tiempoReproduciendo > 3000 &&
          state.position === 0 &&
          state.paused &&
          state.track_window.previous_tracks.length > 0
        ) {
          if (terminadaRef.current) return
          terminadaRef.current = true
          hasPlayedRef.current = false
          playStartTimeRef.current = 0
          onTerminada()
        }
      })

      player.addListener('initialization_error', ({ message }: { message: string }) => {
        console.error('Init error:', message)
        reconnectTimerRef.current = setTimeout(initPlayer, nextReconnectDelay())
      })

      player.addListener('authentication_error', ({ message }: { message: string }) => {
        console.error('Auth error:', message)
        reconnectTimerRef.current = setTimeout(initPlayer, nextReconnectDelay())
      })

      player.addListener('account_error', ({ message }: { message: string }) => {
        console.error('Account error:', message)
      })

      intervalRef.current = setInterval(async () => {
        if (!playerRef.current) return
        const state = await playerRef.current.getCurrentState()
        if (!state) return
        onProgress(state.position, state.duration)

        // Backup: si estamos a menos de 2s del final, programar onTerminada preciso
        if (
          !terminadaRef.current &&
          !nearEndScheduledRef.current &&
          hasPlayedRef.current &&
          !state.paused &&
          state.duration > 0 &&
          state.position >= state.duration - 2000
        ) {
          nearEndScheduledRef.current = true
          const remaining = Math.max(0, state.duration - state.position)
          clearTimeout(nearEndTimerRef.current)
          nearEndTimerRef.current = setTimeout(() => {
            if (terminadaRef.current) return
            terminadaRef.current = true
            onTerminada()
          }, remaining + 300)
        }
      }, 1000)

      player.connect()
    } catch (err) {
      console.error('Error iniciando player:', err)
      reconnectTimerRef.current = setTimeout(initPlayer, nextReconnectDelay())
    }
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
      clearTimeout(nearEndTimerRef.current)
      clearTimeout(reconnectTimerRef.current)
      playerRef.current?.disconnect()
    }
  }, [])

  useEffect(() => {
    spotifyUriRef.current = spotifyUri
    if (!spotifyUri) {
      playerRef.current?.pause()
      return
    }
    if (!ready || !deviceId) return
    playTrack(deviceId, spotifyUri)
  }, [spotifyUri, ready, deviceId])

  const playTrack = async (devId: string, uri: string) => {
    clearTimeout(maxTimerRef.current)
    clearTimeout(nearEndTimerRef.current)
    terminadaRef.current = false
    hasPlayedRef.current = false
    playStartTimeRef.current = 0
    nearEndScheduledRef.current = false

    try {
      const res = await fetch('/api/spotify/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId: devId, uri }),
      })

      if (!res.ok) {
        const err = await res.json()
        console.error('Play error:', err)
        if (res.status === 404) {
          initPlayer()
        } else {
          setTimeout(() => {
            const currentId = deviceIdRef.current
            if (spotifyUriRef.current === uri && currentId) {
              playTrack(currentId, uri)
            }
          }, 3000)
        }
        return
      }

      maxTimerRef.current = setTimeout(() => {
        if (terminadaRef.current) return
        terminadaRef.current = true
        onTerminada()
      }, maxSegundos * 1000)

    } catch (err) {
      console.error('Error en playTrack:', err)
      setTimeout(() => {
        const currentId = deviceIdRef.current
        if (spotifyUriRef.current === uri && currentId) {
          playTrack(currentId, uri)
        }
      }, 3000)
    }
  }

  return null
}
