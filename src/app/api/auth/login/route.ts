import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { prismaCloud } from '@/lib/dbCloud'
import {
  buildSessionValue,
  createDeviceId,
  getVenueContext,
  readDeviceId,
  writeDeviceCookie,
  writeSessionCookie,
} from '@/lib/jukeboxAuth'

function hashSession(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

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

    const existingDevice = await prismaCloud.device.findUnique({ where: { fingerprint: deviceId } })
    const device = existingDevice
      ? await prismaCloud.device.update({
          where: { fingerprint: deviceId },
          data: {
            venueId: venueRow.id,
            name: userAgent,
            role,
            approved: role === 'superadmin' ? true : existingDevice.approved,
            lastSeenAt: new Date(),
          },
        })
      : await prismaCloud.device.create({
          data: {
            venueId: venueRow.id,
            fingerprint: deviceId,
            name: userAgent,
            role,
            approved: role === 'superadmin',
            lastSeenAt: new Date(),
          },
        })

    if (role !== 'superadmin' && !device.approved) {
      const res = NextResponse.json(
        {
          error: 'device_pending',
          message: 'Dispositivo pendiente de aprobación por superadmin',
          deviceId,
          venueId: venue.venueId,
          venueRowId: venueRow.id,
          venueSlug: venueRow.slug,
        },
        { status: 403 }
      )
      if (!existingDeviceId) writeDeviceCookie(res, deviceId)
      return res
    }

    const sessionContext = { role: role as 'admin' | 'operador' | 'superadmin', deviceId, venueId: venue.venueId }
    const sessionValue = buildSessionValue(sessionContext)
    await prismaCloud.deviceSession.create({
      data: {
        tokenHash: hashSession(sessionValue),
        deviceId: device.id,
        venueId: venueRow.id,
        role,
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
      },
    })

    const res = NextResponse.json({ role, deviceId, venueId: venue.venueId, venueRowId: venueRow.id, venueSlug: venueRow.slug })
    writeSessionCookie(res, sessionContext)
    if (!existingDeviceId) writeDeviceCookie(res, deviceId)
    return res
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
