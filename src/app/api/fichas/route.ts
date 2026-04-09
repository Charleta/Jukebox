import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

function hoy() {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD UTC
}

export async function GET() {
  const today = hoy()
  let config = await prisma.config.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, fichas: 0, fichasHoy: 0, fechaHoy: today },
  })
  // Auto-reset diario
  if (config.fechaHoy !== today) {
    config = await prisma.config.update({
      where: { id: 1 },
      data: { fichasHoy: 0, fechaHoy: today },
    })
  }
  return NextResponse.json({ fichas: config.fichas, fichasHoy: config.fichasHoy })
}

export async function POST(req: Request) {
  const body = await req.json()
  const today = hoy()

  // Resetear fichas a 0
  if (body.reset) {
    const config = await prisma.config.upsert({
      where: { id: 1 },
      update: { fichas: 0 },
      create: { id: 1, fichas: 0, fichasHoy: 0, fechaHoy: today },
    })
    return NextResponse.json({ fichas: config.fichas, fichasHoy: config.fichasHoy })
  }

  const { cantidad } = body as { cantidad: number }

  const current = await prisma.config.findUnique({ where: { id: 1 } })
  const esNuevoDia = !current || current.fechaHoy !== today

  const updateData: Record<string, unknown> = {
    fichas: { increment: cantidad },
    fechaHoy: today,
  }
  if (esNuevoDia) {
    updateData.fichasHoy = cantidad > 0 ? cantidad : 0
  } else if (cantidad > 0) {
    updateData.fichasHoy = { increment: cantidad }
  }

  const config = await prisma.config.upsert({
    where: { id: 1 },
    update: updateData,
    create: {
      id: 1,
      fichas: cantidad,
      fichasHoy: cantidad > 0 ? cantidad : 0,
      fechaHoy: today,
    },
  })
  return NextResponse.json({ fichas: config.fichas, fichasHoy: config.fichasHoy })
}
