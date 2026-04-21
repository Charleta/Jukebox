import { NextResponse } from 'next/server'
import { prismaCloud as prisma } from '@/lib/dbCloud'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const playlist = await prisma.playlist.findUnique({
    where: { id: Number(id) },
    include: { canciones: { orderBy: { orden: 'asc' } } },
  })
  if (!playlist) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(playlist)
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const data: Record<string, unknown> = {}
  if (body.nombre !== undefined) data.nombre = String(body.nombre).trim()
  if (body.oculta !== undefined) data.oculta = Boolean(body.oculta)
  const playlist = await prisma.playlist.update({ where: { id: Number(id) }, data })
  return NextResponse.json(playlist)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pl = await prisma.playlist.findUnique({ where: { id: Number(id) } })
  if (pl?.esFavoritos) return NextResponse.json({ error: 'No se puede eliminar Favoritos' }, { status: 403 })
  await prisma.playlist.delete({ where: { id: Number(id) } })
  return NextResponse.json({ ok: true })
}
