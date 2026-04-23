import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import { createDeviceId, getVenueContext, readDeviceId, writeDeviceCookie } from '@/lib/jukeboxAuth'

export const dynamic = 'force-dynamic'

type AccessSurface = 'kiosk' | 'admin'
type AccessResult = 'ok' | 'pending'

function normalizeSurface(value: unknown): AccessSurface {
  return value === 'admin' ? 'admin' : 'kiosk'
}

function normalizePath(value: unknown, surface: AccessSurface) {
  if (typeof value === 'string' && value.trim()) return value.slice(0, 120)
  return surface === 'admin' ? '/admin' : '/'
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as { surface?: unknown; path?: unknown }))
    const surface = normalizeSurface(body.surface)
    const path = normalizePath(body.path, surface)
    const venue = getVenueContext()
    const existingDeviceId = await readDeviceId()
    const deviceFingerprint = existingDeviceId ?? createDeviceId()
    const userAgent = req.headers.get('user-agent')?.slice(0, 180) || `${surface}-browser`

    const venueRow = await prismaCloud.venue.upsert({
      where: { slug: venue.venueId },
      update: { name: venue.venueName, active: true },
      create: { slug: venue.venueId, name: venue.venueName, active: true },
    })

    const existingDevice = await prismaCloud.device.findUnique({
      where: { fingerprint: deviceFingerprint },
      select: { id: true, approved: true, status: true, alias: true },
    })

    const device = existingDevice
      ? await prismaCloud.device.update({
          where: { fingerprint: deviceFingerprint },
          data: {
            venueId: venueRow.id,
            name: userAgent,
            role: surface,
            status: existingDevice.status === 'blocked' ? 'pending' : existingDevice.status || 'pending',
            approved: existingDevice.status === 'blocked' ? false : existingDevice.approved,
            lastSeenAt: new Date(),
          },
        })
      : await prismaCloud.device.create({
          data: {
            venueId: venueRow.id,
            fingerprint: deviceFingerprint,
            name: userAgent,
            alias: '',
            role: surface,
            status: 'pending',
            approved: false,
            lastSeenAt: new Date(),
          },
        })

    const result: AccessResult = device.approved ? 'ok' : 'pending'

    const attempt = await prismaCloud.accessAttempt.create({
      data: {
        venueId: venueRow.id,
        deviceId: device.id,
        fingerprint: deviceFingerprint,
        surface,
        path,
        result,
        message: device.approved ? 'Acceso detectado' : 'Dispositivo pendiente o sin alta',
        userAgent,
      },
    })

    const res = NextResponse.json(
      {
        ok: result === 'ok',
        result,
        deviceId: device.id,
        fingerprint: deviceFingerprint,
        venueId: venue.venueId,
        venueRowId: venueRow.id,
        attemptId: attempt.id,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    )

    if (!existingDeviceId) writeDeviceCookie(res, deviceFingerprint)
    return res
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const venue = getVenueContext()
    const existingDeviceId = await readDeviceId()
    if (!existingDeviceId) {
      return NextResponse.json({ status: 'missing', approved: false, venueId: venue.venueId }, { headers: { 'Cache-Control': 'no-store' } })
    }

    const device = await prismaCloud.device.findUnique({
      where: { fingerprint: existingDeviceId },
      include: {
        venue: true,
      },
    })

    if (!device || device.venue.slug !== venue.venueId) {
      return NextResponse.json({ status: 'missing', approved: false, venueId: venue.venueId }, { headers: { 'Cache-Control': 'no-store' } })
    }

    return NextResponse.json(
      {
        status: device.status === 'approved' ? 'approved' : device.status === 'blocked' ? 'blocked' : 'pending',
        approved: device.approved,
        deviceId: device.id,
        fingerprint: device.fingerprint,
        venueId: device.venue.slug,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch {
    return NextResponse.json({ status: 'missing', approved: false }, { status: 500 })
  }
}
