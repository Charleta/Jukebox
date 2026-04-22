import { NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/spotify'

export async function POST(req: Request) {
  const { deviceId, uri } = await req.json()
  const token = await getAccessToken()
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  await fetch('https://api.spotify.com/v1/me/player', {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      device_ids: [deviceId],
      play: false,
    }),
  }).catch(() => {})

  const res = await fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({ uris: [uri] }),
    }
  )

  if (!res.ok) {
    let err: unknown = { status: res.status, message: res.statusText }
    try {
      const text = await res.text()
      if (text) {
        err = JSON.parse(text)
      }
    } catch {
      err = { status: res.status, message: res.statusText }
    }
    console.error(`[play] Spotify error ${res.status}:`, JSON.stringify(err))
    return NextResponse.json(err, { status: res.status })
  }

  return NextResponse.json({ ok: true })
}
