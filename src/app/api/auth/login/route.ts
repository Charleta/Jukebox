import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import {
  buildSessionValue,
  createDeviceId,
  getVenueContext,
  hashSessionValue,
  readDeviceId,
  writeDeviceCookie,
  writeSessionCookie,
} from '@/lib/jukeboxAuth'

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
    const deviceFingerprint = existingDeviceId ?? createDeviceId()
    const userAgent = req.headers.get('user-agent')?.slice(0, 120) || `${role}-device`
    const path = '/admin/login'

    const venueRow = await prismaCloud.venue.upsert({
      where: { slug: venue.venueId },
      update: { name: venue.venueName, active: true },
      create: { slug: venue.venueId, name: venue.venueName, active: true },
    })

    const existingDevice = await prismaCloud.device.findUnique({ where: { fingerprint: deviceFingerprint } })
    const device = existingDevice
      ? await prismaCloud.device.update({
          where: { fingerprint: deviceFingerprint },
          data: {
            venueId: venueRow.id,
            name: userAgent,
            role,
            status:
              role === 'superadmin'
                ? 'approved'
                : existingDevice.status === 'blocked'
                  ? 'pending'
                  : existingDevice.status || 'pending',
            approved: role === 'superadmin' ? true : existingDevice.status !== 'blocked' && existingDevice.approved,
            lastSeenAt: new Date(),
          },
        })
      : await prismaCloud.device.create({
          data: {
            venueId: venueRow.id,
            fingerprint: deviceFingerprint,
            name: userAgent,
            role,
            status: role === 'superadmin' ? 'approved' : 'pending',
            approved: role === 'superadmin',
            lastSeenAt: new Date(),
          },
        })

    const logAttempt = async (result: string, message: string) => {
      await prismaCloud.accessAttempt.create({
        data: {
          venueId: venueRow.id,
          deviceId: device.id,
          fingerprint: deviceFingerprint,
          surface: role ?? 'admin',
          path,
          result,
          message,
          userAgent,
        },
      })
    }

    if (role !== 'superadmin' && !device.approved) {
      await logAttempt('pending', 'Dispositivo pendiente de aprobación por superadmin')
      const res = NextResponse.json(
        {
          error: 'device_pending',
          message: 'Dispositivo pendiente de aprobación por superadmin',
          deviceId: deviceFingerprint,
          venueId: venue.venueId,
          venueRowId: venueRow.id,
          venueSlug: venueRow.slug,
        },
        { status: 403 }
      )
      if (!existingDeviceId) writeDeviceCookie(res, deviceFingerprint)
      return res
    }

    const sessionContext = { role: role as 'admin' | 'operador' | 'superadmin', deviceId: deviceFingerprint, venueId: venue.venueId }
    const sessionValue = buildSessionValue(sessionContext)
    await prismaCloud.deviceSession.create({
      data: {
        tokenHash: hashSessionValue(sessionValue),
        deviceId: device.id,
        venueId: venueRow.id,
        role,
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
      },
    })
    await logAttempt('ok', 'Login autorizado')

    const res = NextResponse.json({ role, deviceId: deviceFingerprint, venueId: venue.venueId, venueRowId: venueRow.id, venueSlug: venueRow.slug })
    writeSessionCookie(res, sessionContext)
    if (!existingDeviceId) writeDeviceCookie(res, deviceFingerprint)
    return res
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
