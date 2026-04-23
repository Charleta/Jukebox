import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'

function hoy() {
  return new Date().toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }).split('/').reverse().map(p => p.padStart(2, '0')).join('-')
}

export async function GET() {
  const today = hoy()
  let config = await prismaCloud.config.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, fichas: 0, fichasHoy: 0, fechaHoy: today },
  })
  // Auto-reset diario
  if (config.fechaHoy !== today) {
    config = await prismaCloud.config.update({
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
    const config = await prismaCloud.config.upsert({
      where: { id: 1 },
      update: { fichas: 0 },
      create: { id: 1, fichas: 0, fichasHoy: 0, fechaHoy: today },
    })
    return NextResponse.json({ fichas: config.fichas, fichasHoy: config.fichasHoy })
  }

  const { cantidad } = body as { cantidad: number }

  const current = await prismaCloud.config.findUnique({ where: { id: 1 } })
  const esNuevoDia = !current || current.fechaHoy !== today

  const updateData: Record<string, unknown> = {
    fichas: { increment: cantidad },
    fechaHoy: today,
  }
  if (esNuevoDia) {
    updateData.fichasHoy = cantidad > 0 ? cantidad : 0
  } else {
    updateData.fichasHoy = { increment: cantidad }
  }

  const config = await prismaCloud.config.upsert({
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
