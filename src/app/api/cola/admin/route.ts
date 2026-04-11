import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.json()

  const cancion = await prisma.$transaction(async (tx) => {
    const last = await tx.cola.findFirst({ orderBy: { orden: 'desc' }, select: { orden: true } })
    return tx.cola.create({
      data: {
        titulo: body.titulo,
        artista: body.artista,
        duracion: body.duracion,
        spotifyUri: body.spotifyUri,
        imagenUrl: body.imagenUrl,
        orden: (last?.orden ?? 0) + 1,
        tipo: 'admin',
      },
    })
  })

  return NextResponse.json(cancion)
}