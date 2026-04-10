import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST() {
  // Buscar la primera canción de cliente
  const primeraCliente = await prisma.cola.findFirst({
    where: { tipo: 'cliente' },
    orderBy: { orden: 'asc' }
  })

  // Si no hay cliente, buscar la primera de admin
  const primera = primeraCliente ?? await prisma.cola.findFirst({
    where: { tipo: 'admin' },
    orderBy: { orden: 'asc' }
  })

  if (primera) {
    await prisma.cola.deleteMany({ where: { id: primera.id } })
  }

  // La siguiente también prioriza clientes
  const siguienteCliente = await prisma.cola.findFirst({
    where: { tipo: 'cliente' },
    orderBy: { orden: 'asc' }
  })

  const siguiente = siguienteCliente ?? await prisma.cola.findFirst({
    where: { tipo: 'admin' },
    orderBy: { orden: 'asc' }
  })

  return NextResponse.json(siguiente ?? null)
}