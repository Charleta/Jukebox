import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'

export const dynamic = 'force-dynamic'

export async function POST() {
  const current = await prismaCloud.cola.findFirst({
    orderBy: [
      { tipo: 'desc' },
      { orden: 'asc' },
    ],
  })

  if (current) {
    await prismaCloud.cola.deleteMany({
      where: { id: { not: current.id } },
    })
  } else {
    await prismaCloud.cola.deleteMany({})
  }
  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } })
}
