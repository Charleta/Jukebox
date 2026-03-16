import { NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/spotify'

export async function POST(req: Request) {
  const { deviceId, uri } = await req.json()
  const token = await getAccessToken()

  const res = await fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris: [uri] }),
    }
  )

  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json(err, { status: res.status })
  }

  return NextResponse.json({ ok: true })
}