import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST() {
  const primera = await prisma.cola.findFirst({
    orderBy: { orden: 'asc' }
  })
  if (primera) {
    await prisma.cola.delete({ where: { id: primera.id } })
  }
  const siguiente = await prisma.cola.findFirst({
    orderBy: { orden: 'asc' }
  })
  return NextResponse.json(siguiente ?? null)
}