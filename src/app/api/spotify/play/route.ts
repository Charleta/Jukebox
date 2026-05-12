import { NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/spotify'

function isPlayableSpotifyUri(uri: unknown) {
  return typeof uri === 'string' && uri.startsWith('spotify:track:')
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function waitForActiveDevice(token: string, deviceId: string, attempts = 10) {
  const headers = { Authorization: `Bearer ${token}` }

  for (let i = 0; i < attempts; i++) {
    const res = await fetch('https://api.spotify.com/v1/me/player/devices', { headers })
    if (res.ok) {
      const data = await res.json().catch(() => null) as { devices?: Array<{ id?: string; is_active?: boolean }> } | null
      const active = data?.devices?.some(device => device.id === deviceId && device.is_active)
      if (active) return true
    }
    await delay(300)
  }

  return false
}

export async function POST(req: Request) {
  const { deviceId, uri } = await req.json()

  if (typeof deviceId !== 'string' || !deviceId.trim()) {
    return NextResponse.json({ error: 'Falta deviceId' }, { status: 400 })
  }

  if (!isPlayableSpotifyUri(uri)) {
    return NextResponse.json({ error: 'URI de Spotify invalida o no reproducible' }, { status: 400 })
  }

  const token = await getAccessToken()
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const transfer = await fetch('https://api.spotify.com/v1/me/player', {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      device_ids: [deviceId],
      play: false,
    }),
  })

  if (!transfer.ok) {
    const transferBody = await transfer.text().catch(() => '')
    console.error(`[play] transfer error ${transfer.status}: ${transferBody || transfer.statusText}`)
  }

  const ready = await waitForActiveDevice(token, deviceId)
  if (!ready) {
    return NextResponse.json(
      { error: 'Dispositivo Spotify no listo' },
      { status: 409 }
    )
  }

  await delay(500)

  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ uris: [uri] }),
    })

    if (res.ok) {
      return NextResponse.json({ ok: true })
    }

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

    if (res.status >= 500 && attempt === 0) {
      await delay(800)
      const readyAgain = await waitForActiveDevice(token, deviceId, 5)
      if (!readyAgain) {
        return NextResponse.json(
          { error: 'Dispositivo Spotify no listo' },
          { status: 409 }
        )
      }
      continue
    }

    return NextResponse.json(err, { status: res.status })
  }

  return NextResponse.json({ error: 'No se pudo iniciar la reproduccion' }, { status: 502 })
}
