import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import {
  hashSessionValue,
  readRawSessionCookie,
  readSessionContext,
} from '@/lib/jukeboxAuth'

export async function GET() {
  try {
    const session = await readSessionContext()
    if (!session) return NextResponse.json({ role: null, deviceId: null, venueId: null })

    const rawSession = await readRawSessionCookie()
    if (rawSession && session.deviceId && session.venueId) {
      const persisted = await prismaCloud.deviceSession.findUnique({
        where: { tokenHash: hashSessionValue(rawSession) },
        include: {
          device: true,
          venue: true,
        },
      })

      if (
        !persisted ||
        persisted.revokedAt ||
        persisted.expiresAt < new Date() ||
        !persisted.device.approved ||
        !persisted.venue.active
      ) {
        return NextResponse.json({ role: null, deviceId: null, venueId: null })
      }
    }

    return NextResponse.json(session)
  } catch {
    return NextResponse.json({ role: null, deviceId: null, venueId: null })
  }
}
