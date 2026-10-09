import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import { isPrivilegedRole, readSessionContext } from '@/lib/jukeboxAuth'

export const dynamic = 'force-dynamic'

const ALLOWED_ACTIONS = new Set(['play', 'pause', 'stop', 'replay', 'mute', 'unmute', 'set-volume'])

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

  const body = await req.json().catch(() => ({} as { action?: unknown; volume?: unknown }))
  const action = typeof body.action === 'string' ? body.action : ''
  if (!ALLOWED_ACTIONS.has(action)) {
    return NextResponse.json({ error: 'Accion invalida' }, { status: 400 })
  }

  const updatedAt = new Date().toISOString()
  const updates = [
    upsertConfig('youtube_control_action', action),
    upsertConfig('youtube_control_updated_at', updatedAt),
  ]

  let volume: number | null = null
  if (action === 'set-volume') {
    const parsed = Number(body.volume)
    volume = Number.isFinite(parsed) ? Math.min(100, Math.max(0, Math.round(parsed))) : 80
    updates.push(upsertConfig('youtube_volume', String(volume)))
  }

  await Promise.all(updates)

  return NextResponse.json({ ok: true, action, volume, updatedAt }, { headers: { 'Cache-Control': 'no-store' } })
}
