'use client'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void
    Spotify: any
  }
}

interface Props {
  spotifyUri: string | null
  onTerminada: () => void
}

export function SpotifyPlayer({ spotifyUri, onTerminada }: Props) {
  const [deviceId, setDeviceId] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = async () => {
      const res = await fetch('/api/spotify/token')
      const { token } = await res.json()

      const player = new window.Spotify.Player({
        name: 'JukeBox Player',
        getOAuthToken: (cb: (token: string) => void) => cb(token),
        volume: 0.8,
      })

      player.addListener('ready', ({ device_id }: { device_id: string }) => {
        setDeviceId(device_id)
        setReady(true)
      })

      player.addListener('player_state_changed', (state: any) => {
        if (!state) return
        if (state.position === 0 && state.paused && state.track_window.previous_tracks.length > 0) {
          onTerminada()
        }
      })

      player.connect()
    }
  }, [])

  useEffect(() => {
    if (!ready || !deviceId || !spotifyUri) return
    playTrack(deviceId, spotifyUri)
  }, [spotifyUri, ready, deviceId])

  const playTrack = async (deviceId: string, uri: string) => {
    const res = await fetch('/api/spotify/play', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, uri }),
    })
    if (!res.ok) {
      const err = await res.json()
      console.error('Play error:', err)
    }
  }

  return null
}