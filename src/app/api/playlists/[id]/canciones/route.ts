import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

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
