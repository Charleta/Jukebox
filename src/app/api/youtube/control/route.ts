import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import { isPrivilegedRole, readSessionContext } from '@/lib/jukeboxAuth'

export const dynamic = 'force-dynamic'

const ALLOWED_ACTIONS = new Set(['play', 'pause', 'stop', 'replay', 'mute', 'unmute'])

async function upsertConfig(clave: string, valor: string) {
  await prismaCloud.appConfig.upsert({
    where: { clave },
    update: { valor },
    create: { clave, valor },
  })
}

export async function POST(req: Request) {
  const session = await readSessionContext()
  if (!isPrivilegedRole(session?.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({} as { action?: unknown }))
  const action = typeof body.action === 'string' ? body.action : ''
  if (!ALLOWED_ACTIONS.has(action)) {
    return NextResponse.json({ error: 'Accion invalida' }, { status: 400 })
  }

  const updatedAt = new Date().toISOString()
  await Promise.all([
    upsertConfig('youtube_control_action', action),
    upsertConfig('youtube_control_updated_at', updatedAt),
  ])

  return NextResponse.json({ ok: true, action, updatedAt }, { headers: { 'Cache-Control': 'no-store' } })
}
