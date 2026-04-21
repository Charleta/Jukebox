import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { prismaCloud } from '@/lib/dbCloud'

export async function POST() {
  // No hacer nada si ya hay canciones en cola
  const existentes = await prisma.cola.count()
  if (existentes > 0) return NextResponse.json({ ok: true, added: 0 })

  const cfg = await prisma.appConfig.findUnique({ where: { clave: 'autostart_playlists' } })
  if (!cfg?.valor) return NextResponse.json({ ok: true, added: 0 })

  let ids: number[] = []
  try { ids = JSON.parse(cfg.valor) } catch { return NextResponse.json({ ok: true, added: 0 }) }
  if (!ids.length) return NextResponse.json({ ok: true, added: 0 })

  const playlists = await prismaCloud.playlist.findMany({
    where: { id: { in: ids } },
    include: { canciones: { orderBy: { orden: 'asc' } } },
  })

  const todas = playlists.flatMap(p => p.canciones)
  // Fisher-Yates shuffle
  for (let i = todas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[todas[i], todas[j]] = [todas[j], todas[i]]
  }

  if (!todas.length) return NextResponse.json({ ok: true, added: 0 })

  await prisma.cola.createMany({
    data: todas.map((s, i) => ({
      titulo: s.titulo,
      artista: s.artista,
      duracion: s.duracion,
      spotifyUri: s.spotifyUri,
      imagenUrl: s.imagenUrl,
      orden: i + 1,
      tipo: 'admin',
    })),
  })

  return NextResponse.json({ ok: true, added: todas.length })
}
