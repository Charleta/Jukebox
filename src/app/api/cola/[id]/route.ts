import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.cola.delete({ where: { id: Number(id) } })
  return NextResponse.json({ ok: true })
}