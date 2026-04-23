import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'

export async function POST(req: Request) {
  const { currentId } = await req.json().catch(() => ({ currentId: null }))

  const adminSongs = await prismaCloud.cola.findMany({
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
  await prismaCloud.$transaction(
    shuffled.map((song, i) =>
      prismaCloud.cola.update({
        where: { id: song.id },
        data: { orden: originalOrders[i] },
      })
    )
  )

  return NextResponse.json({ ok: true })
}
