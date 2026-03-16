import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const cola = await prisma.cola.findMany({
    orderBy: { orden: 'asc' }
  })
  return NextResponse.json(cola)
}

export async function POST(req: Request) {
  const body = await req.json()

  // Verificar fichas
  const config = await prisma.config.findUnique({ where: { id: 1 } })
  if (!config || config.fichas <= 0) {
    return NextResponse.json({ error: 'Sin fichas' }, { status: 400 })
  }

  // Obtener el último orden
  const last = await prisma.cola.findFirst({ orderBy: { orden: 'desc' } })
  const orden = last ? last.orden + 1 : 1

  // Agregar a la cola y descontar ficha en transacción
  const [cancion] = await prisma.$transaction([
    prisma.cola.create({
      data: {
        titulo: body.titulo,
        artista: body.artista,
        duracion: body.duracion,
        spotifyUri: body.spotifyUri,
        imagenUrl: body.imagenUrl,
        orden,
      },
    }),
    prisma.config.update({
      where: { id: 1 },
      data: { fichas: { decrement: 1 } },
    }),
  ])

  return NextResponse.json(cancion)
}