import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  const { currentId } = await req.json().catch(() => ({ currentId: null }))

  const adminSongs = await prisma.cola.findMany({
    where: { tipo: 'admin' },
    orderBy: { orden: 'asc' },
  })

  // Excluir la canción que está sonando ahora
  const toShuffle = adminSongs.filter(s => s.id !== currentId)

  if (toShuffle.length < 2) return NextResponse.json({ ok: true })

  // Fisher-Yates shuffle
  const shuffled = [...toShuffle]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  // Reasignar los mismos valores de orden pero en orden shuffleado
  const originalOrders = toShuffle.map(s => s.orden)
  await prisma.$transaction(
    shuffled.map((song, i) =>
      prisma.cola.update({
        where: { id: song.id },
        data: { orden: originalOrders[i] },
      })
    )
  )

  return NextResponse.json({ ok: true })
}
