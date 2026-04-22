import { NextResponse } from 'next/server'
import { searchSpotify, getArtistAlbums, getPlaylistTracks } from '@/lib/spotify'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') ?? ''
  const artistId = searchParams.get('artistId')
  const playlistId = searchParams.get('playlistId')

  try {
    if (artistId) {
      const tracks = await getArtistAlbums(artistId)
      return NextResponse.json({ tracks })
    }
    if (playlistId) {
      const tracks = await getPlaylistTracks(playlistId)
      return NextResponse.json({ tracks })
    }
    const data = await searchSpotify(q, searchParams.get('modo') === 'import')
    return NextResponse.json(data)
  } catch (error) {
    console.error('Spotify search error:', error)
    return NextResponse.json({ error: 'Error buscando' }, { status: 500 })
  }
}