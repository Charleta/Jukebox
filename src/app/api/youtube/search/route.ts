import { NextResponse } from 'next/server'
import { isPrivilegedRole, readSessionContext } from '@/lib/jukeboxAuth'
import { searchYouTubeVideos } from '@/lib/youtube'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const session = await readSessionContext()
  if (!isPrivilegedRole(session?.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') ?? ''
  if (!q.trim()) return NextResponse.json({ items: [] })

  try {
    const items = await searchYouTubeVideos(q)
    return NextResponse.json({ items }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('YouTube search error:', error)
    const message = error instanceof Error ? error.message : ''
    if (message.includes('quotaExceeded')) {
      return NextResponse.json({ error: 'Se agotó la cuota diaria de YouTube. Probá más tarde.' }, { status: 429 })
    }
    return NextResponse.json({ error: 'No se pudo buscar en YouTube' }, { status: 500 })
  }
}
