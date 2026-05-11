import { NextResponse } from 'next/server'
import { prismaCloud, ensureConfigColumns } from '@/lib/dbCloud'

function hoy() {
  return new Date().toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }).split('/').reverse().map(p => p.padStart(2, '0')).join('-')
}

export async function GET() {
  await ensureConfigColumns()
  const today = hoy()
  const existing = await prismaCloud.config.findUnique({ where: { id: 1 } })

  let config = existing
  if (!config) {
    config = await prismaCloud.config.create({
      data: { id: 1, fichas: 0, fichasHoy: 0, fichasAdminHoy: 0, fichasVentasHoy: 0, fechaHoy: today },
    })
  } else if (config.fechaHoy !== today) {
    config = await prismaCloud.config.update({
      where: { id: 1 },
      data: { fichasHoy: 0, fichasAdminHoy: 0, fichasVentasHoy: 0, fechaHoy: today },
    })
  }

  return NextResponse.json({
    fichas: config.fichas,
    fichasHoy: config.fichasHoy,
    fichasAdminHoy: config.fichasAdminHoy,
    fichasVentasHoy: config.fichasVentasHoy
  })
}

export async function POST(req: Request) {
  await ensureConfigColumns()
  const body = await req.json()
  const today = hoy()

  // Resetear sólo las fichas disponibles en el kiosko
  if (body.reset) {
    const config = await prismaCloud.config.upsert({
      where: { id: 1 },
      update: { fichas: 0 },
      create: { id: 1, fichas: 0, fichasHoy: 0, fichasAdminHoy: 0, fichasVentasHoy: 0, fechaHoy: today },
    })
    return NextResponse.json({
      fichas: config.fichas,
      fichasHoy: config.fichasHoy,
      fichasAdminHoy: config.fichasAdminHoy,
      fichasVentasHoy: config.fichasVentasHoy
    })
  }

  const { cantidad, fuente } = body as { cantidad: number; fuente?: 'admin' | 'venta' }

  const current = await prismaCloud.config.findUnique({ where: { id: 1 } })
  const esNuevoDia = !current || current.fechaHoy !== today

  const updateData: Record<string, unknown> = {
    fichas: { increment: cantidad },
    fechaHoy: today,
  }

  // Si es admin, incrementar fichasAdminHoy
  if (fuente === 'admin' || !fuente) {
    if (esNuevoDia) {
      updateData.fichasAdminHoy = cantidad > 0 ? cantidad : 0
    } else {
      updateData.fichasAdminHoy = { increment: cantidad }
    }
  }

  // Si es venta, incrementar fichasVentasHoy
  if (fuente === 'venta') {
    if (esNuevoDia) {
      updateData.fichasVentasHoy = cantidad > 0 ? cantidad : 0
    } else {
      updateData.fichasVentasHoy = { increment: cantidad }
    }
  }

  // Mantener fichasHoy como suma total para compatibilidad
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
      fichasAdminHoy: fuente === 'admin' ? cantidad : 0,
      fichasVentasHoy: fuente === 'venta' ? cantidad : 0,
      fechaHoy: today,
    },
  })

  return NextResponse.json({
    fichas: config.fichas,
    fichasHoy: config.fichasHoy,
    fichasAdminHoy: config.fichasAdminHoy,
    fichasVentasHoy: config.fichasVentasHoy
  })
}
