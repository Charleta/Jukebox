import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.cola.delete({ where: { id: Number(params.id) } })
  return NextResponse.json({ ok: true })
}