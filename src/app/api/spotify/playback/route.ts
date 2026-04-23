import { NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/spotify'

let cachedPlayback: any = null
let playbackCachedAt = 0

export async function GET() {
  // Devuelve caché si tiene menos de 10 segundos
  if (cachedPlayback && Date.now() - playbackCachedAt < 2000) {
    return NextResponse.json(cachedPlayback)
  }

  try {
    const token = await getAccessToken()
    const res = await fetch('https://api.spotify.com/v1/me/player', {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (res.status === 204 || !res.ok) {
      return NextResponse.json({ isPlaying: false })
    }

    const data = await res.json()
    cachedPlayback = {
      isPlaying: data.is_playing ?? false,
      progress_ms: data.progress_ms ?? 0,
      duration_ms: data.item?.duration_ms ?? 0,
    }
    playbackCachedAt = Date.now()
    return NextResponse.json(cachedPlayback)
  } catch {
    return NextResponse.json({ isPlaying: false })
  }
}
