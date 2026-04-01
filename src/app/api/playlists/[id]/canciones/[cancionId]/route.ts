import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string; cancionId: string }> }) {
  const { cancionId } = await params
  await prisma.playlistCancion.delete({ where: { id: Number(cancionId) } })
  return NextResponse.json({ ok: true })
}
