import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import { isPrivilegedRole, readSessionContext } from '@/lib/jukeboxAuth'
import { isValidYouTubeVideoId } from '@/lib/youtube'

export const dynamic = 'force-dynamic'

async function upsertConfig(clave: string, valor: string) {
  await prismaCloud.appConfig.upsert({
    where: { clave },
    update: { valor },
    create: { clave, valor },
  })
}

export async function POST(req: Request) {
  try {
    const session = await readSessionContext()
    if (!isPrivilegedRole(session?.role)) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await req.json().catch(() => ({} as {
      videoId?: unknown
      title?: unknown
      channelTitle?: unknown
      thumbnailUrl?: unknown
    }))

    if (!isValidYouTubeVideoId(body.videoId)) {
      return NextResponse.json({ error: 'Video invalido' }, { status: 400 })
    }

    const videoId = String(body.videoId)
    const title = typeof body.title === 'string' ? body.title.slice(0, 240) : ''
    const channelTitle = typeof body.channelTitle === 'string' ? body.channelTitle.slice(0, 160) : ''
    const thumbnailUrl = typeof body.thumbnailUrl === 'string' ? body.thumbnailUrl.slice(0, 500) : ''
    const updatedAt = new Date().toISOString()

    await Promise.all([
      upsertConfig('youtube_current_video_id', videoId),
      upsertConfig('youtube_current_video_title', title),
      upsertConfig('youtube_current_channel', channelTitle),
      upsertConfig('youtube_current_thumbnail', thumbnailUrl),
      upsertConfig('youtube_updated_at', updatedAt),
      upsertConfig('youtube_control_action', 'play'),
      upsertConfig('youtube_control_updated_at', updatedAt),
    ])

    await fetch(new URL('/api/spotify/pause', req.url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'pause' }),
    }).catch(() => {})

    return NextResponse.json({
      ok: true,
      video: { videoId, title, channelTitle, thumbnailUrl, updatedAt },
    }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('YouTube play error:', error)
    return NextResponse.json({ error: 'No se pudo enviar el video' }, { status: 500 })
  }
}
