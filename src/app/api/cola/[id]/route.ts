import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prismaCloud.cola.delete({ where: { id: Number(id) } })
  return NextResponse.json({ ok: true })
}