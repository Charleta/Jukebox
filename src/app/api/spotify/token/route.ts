import { NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/spotify'

export async function GET() {
  try {
    const token = await getAccessToken()
    return NextResponse.json({ token })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'No se pudo obtener el token de Spotify'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
