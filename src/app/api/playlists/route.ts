import { NextResponse } from 'next/server'
import { prismaCloud as prisma } from '@/lib/dbCloud'

export async function GET(req: Request) {
  const soloVisibles = new URL(req.url).searchParams.get('visibles') === 'true'
  const playlists = await prisma.playlist.findMany({
    where: soloVisibles ? { oculta: false } : undefined,
    include: { canciones: { orderBy: { orden: 'asc' } } },
    orderBy: [{ orden: 'asc' }, { createdAt: 'asc' }],
  })
  return NextResponse.json(playlists)
}

export async function POST(req: Request) {
  const { nombre, descripcion, imagenUrl } = await req.json()
  const last = await prisma.playlist.findFirst({ orderBy: { orden: 'desc' } })
  const playlist = await prisma.playlist.create({
    data: { nombre, descripcion: descripcion ?? '', imagenUrl: imagenUrl ?? '', orden: (last?.orden ?? 0) + 1 },
  })
  return NextResponse.json(playlist)
}

export async function PATCH(req: Request) {
  const { ids } = await req.json()
  await Promise.all((ids as number[]).map((id, i) =>
    prisma.playlist.update({ where: { id }, data: { orden: i } })
  ))
  return NextResponse.json({ ok: true })
}
