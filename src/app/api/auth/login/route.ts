import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import { createDeviceId, getVenueContext, readDeviceId, writeDeviceCookie, writeSessionCookie } from '@/lib/jukeboxAuth'

export async function POST(req: Request) {
  try {
    const { pin } = await req.json()
    let role: string | null = null
    if (pin && pin === process.env.ADMIN_PIN) role = 'admin'
    else if (pin && pin === process.env.OPERATOR_PIN) role = 'operador'
    else if (pin && pin === process.env.SUPERADMIN_PIN) role = 'superadmin'

    if (!role) return NextResponse.json({ error: 'PIN incorrecto' }, { status: 401 })

    const venue = getVenueContext()
    const existingDeviceId = await readDeviceId()
    const deviceId = existingDeviceId ?? createDeviceId()
    const userAgent = req.headers.get('user-agent')?.slice(0, 120) || `${role}-device`

    const venueRow = await prismaCloud.venue.upsert({
      where: { slug: venue.venueId },
      update: { name: venue.venueName, active: true },
      create: { slug: venue.venueId, name: venue.venueName, active: true },
    })

    await prismaCloud.device.upsert({
      where: { fingerprint: deviceId },
      update: {
        venueId: venueRow.id,
        name: userAgent,
        role,
        approved: true,
        lastSeenAt: new Date(),
      },
      create: {
        venueId: venueRow.id,
        fingerprint: deviceId,
        name: userAgent,
        role,
        approved: true,
        lastSeenAt: new Date(),
      },
    })

    const res = NextResponse.json({ role, deviceId, venueId: venue.venueId, venueRowId: venueRow.id, venueSlug: venueRow.slug })
    writeSessionCookie(res, { role: role as 'admin' | 'operador' | 'superadmin', deviceId, venueId: venue.venueId })
    if (!existingDeviceId) writeDeviceCookie(res, deviceId)
    return res
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
