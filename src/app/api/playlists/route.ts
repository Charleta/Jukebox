import { NextResponse } from 'next/server'
import { prismaCloud as prisma } from '@/lib/dbCloud'

export async function GET() {
  const playlists = await prisma.playlist.findMany({
    include: { canciones: { orderBy: { orden: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(playlists)
}

export async function POST(req: Request) {
  const { nombre, descripcion, imagenUrl } = await req.json()
  const playlist = await prisma.playlist.create({
    data: { nombre, descripcion: descripcion ?? '', imagenUrl: imagenUrl ?? '' },
  })
  return NextResponse.json(playlist)
}
