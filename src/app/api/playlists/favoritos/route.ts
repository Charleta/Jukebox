import { NextResponse } from 'next/server'
import { prismaCloud as prisma } from '@/lib/dbCloud'

// Encuentra o crea la playlist Favoritos (no puede eliminarse)
async function getFavoritosPlaylist() {
  let fav = await prisma.playlist.findFirst({ where: { esFavoritos: true } })
  if (!fav) {
    fav = await prisma.playlist.create({
      data: { nombre: 'Favoritos', esFavoritos: true, orden: 0 },
    })
  }
  return fav
}

export async function POST(req: Request) {
  try {
    const { titulo, artista, duracion, spotifyUri, imagenUrl } = await req.json()
    const fav = await getFavoritosPlaylist()
    const last = await prisma.playlistCancion.findFirst({
      where: { playlistId: fav.id },
      orderBy: { orden: 'desc' },
    })
    await prisma.playlistCancion.create({
      data: {
        playlistId: fav.id,
        titulo,
        artista,
        duracion,
        spotifyUri,
        imagenUrl,
        orden: (last?.orden ?? 0) + 1,
      },
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Favoritos error:', err)
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
