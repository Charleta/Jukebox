import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const playlist = await prisma.playlist.findUnique({
    where: { id: Number(id) },
    include: { canciones: { orderBy: { orden: 'asc' } } },
  })
  if (!playlist) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(playlist)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.playlist.delete({ where: { id: Number(id) } })
  return NextResponse.json({ ok: true })
}
