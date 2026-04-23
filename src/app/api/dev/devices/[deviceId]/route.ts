import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import { readSessionContext } from '@/lib/jukeboxAuth'

export const dynamic = 'force-dynamic'

async function isSuperAdmin() {
  const session = await readSessionContext()
  return session?.role === 'superadmin'
}

async function loadDevice(deviceId: string) {
  return prismaCloud.device.findUnique({
    where: { id: deviceId },
    include: { venue: true },
  })
}

async function updateDeviceStatus(
  deviceId: string,
  approved?: boolean,
  revokeSessions = false,
  alias?: string | null
) {
  const device = await loadDevice(deviceId)
  if (!device) return null

  const updated = await prismaCloud.device.update({
    where: { id: deviceId },
    data: {
      lastSeenAt: new Date(),
      ...(typeof approved === 'boolean' ? { approved } : {}),
      ...(typeof alias === 'string' ? { alias: alias.trim().slice(0, 60) } : {}),
      ...(approved === true ? { status: 'approved' } : {}),
      ...(approved === false && revokeSessions ? { status: 'blocked' } : {}),
    },
  })

  if (revokeSessions || approved === false) {
    await prismaCloud.deviceSession.updateMany({
      where: { deviceId, revokedAt: null },
      data: { revokedAt: new Date() },
    })
  }

  return updated
}

export async function PATCH(req: Request, context: { params: Promise<{ deviceId: string }> }) {
  if (!(await isSuperAdmin())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { deviceId } = await context.params
  const body = await req.json().catch(() => ({} as { approved?: boolean; revokeSessions?: boolean; alias?: string }))
  const updated = await updateDeviceStatus(deviceId, body.approved, body.revokeSessions === true, body.alias ?? null)

  if (!updated) return NextResponse.json({ error: 'Device no encontrado' }, { status: 404 })

  return NextResponse.json({ ok: true, device: updated }, { headers: { 'Cache-Control': 'no-store' } })
}

export async function DELETE(_: Request, context: { params: Promise<{ deviceId: string }> }) {
  if (!(await isSuperAdmin())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { deviceId } = await context.params
  const updated = await updateDeviceStatus(deviceId, false, true)
  if (!updated) return NextResponse.json({ error: 'Device no encontrado' }, { status: 404 })

  return NextResponse.json({ ok: true, device: updated }, { headers: { 'Cache-Control': 'no-store' } })
}
