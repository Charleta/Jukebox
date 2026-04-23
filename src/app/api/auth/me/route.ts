import { NextResponse } from 'next/server'
import { readSessionContext } from '@/lib/jukeboxAuth'

export async function GET() {
  try {
    const session = await readSessionContext()
    if (!session) return NextResponse.json({ role: null, deviceId: null, venueId: null })

    return NextResponse.json(session)
  } catch {
    return NextResponse.json({ role: null, deviceId: null, venueId: null })
  }
}
