import { NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/spotify'

export async function GET() {
  const token = await getAccessToken()
  const res = await fetch('https://api.spotify.com/v1/me/player', {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (res.status === 204 || !res.ok) {
    return NextResponse.json({ isPlaying: false })
  }

  const data = await res.json()
  return NextResponse.json({ isPlaying: data.is_playing ?? false })
}