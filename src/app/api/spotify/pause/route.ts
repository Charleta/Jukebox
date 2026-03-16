import { NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/spotify'

export async function POST(req: Request) {
  const { action } = await req.json()
  const token = await getAccessToken()

  const endpoint = action === 'pause'
    ? 'https://api.spotify.com/v1/me/player/pause'
    : 'https://api.spotify.com/v1/me/player/play'

  await fetch(endpoint, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  })

  return NextResponse.json({ ok: true })
}