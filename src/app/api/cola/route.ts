import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const cola = await prisma.cola.findMany({
    orderBy: [
      { tipo: 'asc' },  // 'admin' > 'cliente' alfabéticamente, pero cliente va primero
      { orden: 'asc' }
    ]
  })
  return NextResponse.json(cola)
}

export async function POST(req: Request) {
  const body = await req.json()

  const cancion = await prisma.$transaction(async (tx) => {
    const config = await tx.config.findUnique({ where: { id: 1 } })
    if (!config || config.fichas <= 0) return null

    const last = await tx.cola.findFirst({ orderBy: { orden: 'desc' } })
    const orden = (last?.orden ?? 0) + 1

    const created = await tx.cola.create({
      data: {
        titulo: body.titulo,
        artista: body.artista,
        duracion: body.duracion,
        spotifyUri: body.spotifyUri,
        imagenUrl: body.imagenUrl,
        orden,
        tipo: 'cliente',
      },
    })
    await tx.config.update({
      where: { id: 1 },
      data: { fichas: { decrement: 1 } },
    })
    return created
  })

  if (!cancion) {
    return NextResponse.json({ error: 'Sin fichas' }, { status: 400 })
  }
  return NextResponse.json(cancion)
}

export async function PATCH(req: Request) {
  const { id, nuevaPos } = await req.json()
  
  const cola = await prisma.cola.findMany({
    orderBy: { orden: 'asc' }
  })
  
  const itemIndex = cola.findIndex(c => c.id === id)
  if (itemIndex === -1) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  
  const [item] = cola.splice(itemIndex, 1)
  cola.splice(nuevaPos, 0, item)
  
  await Promise.all(
    cola.map((c, i) => prisma.cola.update({
      where: { id: c.id },
      data: { orden: i + 1 }
    }))
  )
  
  return NextResponse.json({ ok: true })
}