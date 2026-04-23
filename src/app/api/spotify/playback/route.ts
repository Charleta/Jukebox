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
    const currentTrack = data.item ? {
      uri: data.item.uri ?? '',
      title: data.item.name ?? '',
      artist: Array.isArray(data.item.artists) ? data.item.artists.map((a: any) => a?.name).filter(Boolean).join(', ') : '',
      imageUrl: Array.isArray(data.item.album?.images) ? data.item.album.images[0]?.url ?? '' : '',
    } : null

    cachedPlayback = {
      isPlaying: data.is_playing ?? false,
      progress_ms: data.progress_ms ?? 0,
      duration_ms: data.item?.duration_ms ?? 0,
      track: currentTrack,
    }
    playbackCachedAt = Date.now()
    return NextResponse.json(cachedPlayback)
  } catch {
    return NextResponse.json({ isPlaying: false })
  }
}
