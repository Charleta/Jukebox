import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.json()

  const maxOrden = await prisma.cola.findFirst({
    orderBy: { orden: 'desc' },
    select: { orden: true },
  })

  const cancion = await prisma.cola.create({
    data: {
      titulo: body.titulo,
      artista: body.artista,
      duracion: body.duracion,
      spotifyUri: body.spotifyUri,
      imagenUrl: body.imagenUrl,
      orden: (maxOrden?.orden ?? 0) + 1,
      tipo: 'admin',
    },
  })

  return NextResponse.json(cancion)
}