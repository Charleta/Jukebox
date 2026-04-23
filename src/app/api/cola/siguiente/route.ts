import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'

export async function POST() {
  // Buscar la primera canción de cliente
  const primeraCliente = await prismaCloud.cola.findFirst({
    where: { tipo: 'cliente' },
    orderBy: { orden: 'asc' }
  })

  // Si no hay cliente, buscar la primera de admin
  const primera = primeraCliente ?? await prismaCloud.cola.findFirst({
    where: { tipo: 'admin' },
    orderBy: { orden: 'asc' }
  })

  if (primera) {
    await prismaCloud.cola.deleteMany({ where: { id: primera.id } })
  }

  // La siguiente también prioriza clientes
  const siguienteCliente = await prismaCloud.cola.findFirst({
    where: { tipo: 'cliente' },
    orderBy: { orden: 'asc' }
  })

  const siguiente = siguienteCliente ?? await prismaCloud.cola.findFirst({
    where: { tipo: 'admin' },
    orderBy: { orden: 'asc' }
  })

  return NextResponse.json(siguiente ?? null)
}