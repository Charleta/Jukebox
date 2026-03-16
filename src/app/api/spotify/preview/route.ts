import { NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/spotify'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const trackId = searchParams.get('trackId')

  if (!trackId) return NextResponse.json({ error: 'Falta trackId' }, { status: 400 })

  const token = await getAccessToken()
  const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const data = await res.json()

  return NextResponse.json({ previewUrl: data.preview_url ?? null })
}