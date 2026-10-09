import { NextRequest, NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'

export async function GET() {
  try {
    // Obtener la fecha de hoy en UTC
    const hoy = new Date()
    hoy.setUTCHours(0, 0, 0, 0)
    const manana = new Date(hoy)
    manana.setUTCDate(manana.getUTCDate() + 1)

    // Buscar todas las transacciones de ventas del día
    const ventas = await prismaCloud.pagoProcesado.findMany({
      where: {
        creadoEn: {
          gte: hoy,
          lt: manana,
        },
      },
      orderBy: {
        creadoEn: 'desc',
      },
    })

    return NextResponse.json(ventas)
  } catch (error) {
    console.error('Error obteniendo ventas del día:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}