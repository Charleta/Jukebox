import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const config = await prisma.appConfig.findUnique({ where: { clave: 'max_duracion' } })
  return NextResponse.json({ valor: config?.valor ?? '300' })
}

export async function POST(req: Request) {
  const { valor } = await req.json()
  await prisma.appConfig.upsert({
    where: { clave: 'max_duracion' },
    update: { valor: String(valor) },
    create: { clave: 'max_duracion', valor: String(valor) },
  })
  return NextResponse.json({ ok: true })
}