import { NextResponse } from 'next/server'
import { prismaCloud as prisma } from '@/lib/dbCloud'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { titulo, artista, duracion, spotifyUri, imagenUrl } = await req.json()
  const playlistId = Number(id)

  const count = await prisma.playlistCancion.count({ where: { playlistId } })
  const cancion = await prisma.playlistCancion.create({
    data: { playlistId, titulo, artista, duracion, spotifyUri, imagenUrl, orden: count },
  })

  // Auto-asignar imagen de portada si la playlist no tiene una
  const playlist = await prisma.playlist.findUnique({ where: { id: playlistId } })
  if (playlist && !playlist.imagenUrl && imagenUrl) {
    await prisma.playlist.update({ where: { id: playlistId }, data: { imagenUrl } })
  }

  return NextResponse.json(cancion)
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { ids } = await req.json()
  await Promise.all((ids as number[]).map((id, i) =>
    prisma.playlistCancion.update({ where: { id }, data: { orden: i } })
  ))
  return NextResponse.json({ ok: true })
}
