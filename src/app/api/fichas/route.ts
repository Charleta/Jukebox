import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const config = await prisma.config.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, fichas: 0 },
  })
  return NextResponse.json({ fichas: config.fichas })
}

export async function POST(req: Request) {
  const { cantidad } = await req.json()
  const config = await prisma.config.upsert({
    where: { id: 1 },
    update: { fichas: { increment: cantidad } },
    create: { id: 1, fichas: cantidad },
  })
  return NextResponse.json({ fichas: config.fichas })
}