import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import { isPrivilegedRole, readSessionContext } from '@/lib/jukeboxAuth'
import { normalizeYouTubeVideo, parseYouTubeQueue } from '@/lib/youtube'

export const dynamic = 'force-dynamic'

async function upsertConfig(clave: string, valor: string) {
  await prismaCloud.appConfig.upsert({
    where: { clave },
    update: { valor },
    create: { clave, valor },
  })
}

async function readQueue() {
  const row = await prismaCloud.appConfig.findUnique({ where: { clave: 'youtube_queue' } })
  return parseYouTubeQueue(row?.valor)
}

export async function GET() {
  return NextResponse.json({ queue: await readQueue() }, { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(req: Request) {
  const session = await readSessionContext()
  if (!isPrivilegedRole(session?.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const video = normalizeYouTubeVideo(await req.json().catch(() => null))
  if (!video) return NextResponse.json({ error: 'Video invalido' }, { status: 400 })

  const queue = [...await readQueue(), video].slice(0, 50)
  await upsertConfig('youtube_queue', JSON.stringify(queue))
  return NextResponse.json({ ok: true, queue }, { headers: { 'Cache-Control': 'no-store' } })
}

export async function PATCH(req: Request) {
  const session = await readSessionContext()
  if (!isPrivilegedRole(session?.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({} as { action?: string; index?: number }))
  const index = Number(body.index)
  const queue = await readQueue()
  if (!Number.isInteger(index) || index < 0 || index >= queue.length) {
    return NextResponse.json({ error: 'Indice invalido' }, { status: 400 })
  }

  if (body.action === 'remove') {
    queue.splice(index, 1)
  } else if (body.action === 'up' && index > 0) {
    ;[queue[index - 1], queue[index]] = [queue[index], queue[index - 1]]
  } else if (body.action === 'down' && index < queue.length - 1) {
    ;[queue[index], queue[index + 1]] = [queue[index + 1], queue[index]]
  } else if (body.action !== 'up' && body.action !== 'down') {
    return NextResponse.json({ error: 'Accion invalida' }, { status: 400 })
  }

  await upsertConfig('youtube_queue', JSON.stringify(queue))
  return NextResponse.json({ ok: true, queue }, { headers: { 'Cache-Control': 'no-store' } })
}

export async function DELETE() {
  const session = await readSessionContext()
  if (!isPrivilegedRole(session?.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  await upsertConfig('youtube_queue', '[]')
  return NextResponse.json({ ok: true, queue: [] }, { headers: { 'Cache-Control': 'no-store' } })
}
