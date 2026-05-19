import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import { isPrivilegedRole, readSessionContext } from '@/lib/jukeboxAuth'
import { isValidYouTubeVideoId, parseYouTubeQueue, type YouTubeCurrentVideo } from '@/lib/youtube'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const KEYS = [
  'youtube_current_video_id',
  'youtube_current_video_title',
  'youtube_current_channel',
  'youtube_current_thumbnail',
  'youtube_updated_at',
  'youtube_control_action',
  'youtube_control_updated_at',
  'youtube_queue',
  'youtube_volume',
  'youtube_screen_last_seen',
]

async function upsertConfig(clave: string, valor: string) {
  await prismaCloud.appConfig.upsert({
    where: { clave },
    update: { valor },
    create: { clave, valor },
  })
}

async function clearCurrentVideo() {
  const updatedAt = new Date().toISOString()
  await Promise.all([
    upsertConfig('youtube_current_video_id', ''),
    upsertConfig('youtube_current_video_title', ''),
    upsertConfig('youtube_current_channel', ''),
    upsertConfig('youtube_current_thumbnail', ''),
    upsertConfig('youtube_updated_at', updatedAt),
    upsertConfig('youtube_control_action', 'stop'),
    upsertConfig('youtube_control_updated_at', updatedAt),
  ])
  return updatedAt
}

export async function GET() {
  try {
    const configs = await prismaCloud.appConfig.findMany({
      where: { clave: { in: KEYS } },
    })
    const map = Object.fromEntries(configs.map(c => [c.clave, c.valor]))
    const videoId = map.youtube_current_video_id ?? ''

    if (!isValidYouTubeVideoId(videoId)) {
      return NextResponse.json({
        video: null,
        queue: parseYouTubeQueue(map.youtube_queue),
        volume: Number(map.youtube_volume ?? 80),
        screenLastSeen: map.youtube_screen_last_seen ?? '',
        control: {
          action: map.youtube_control_action ?? '',
          updatedAt: map.youtube_control_updated_at ?? '',
        },
      }, { headers: { 'Cache-Control': 'no-store' } })
    }

    const video: YouTubeCurrentVideo = {
      videoId,
      title: map.youtube_current_video_title ?? '',
      channelTitle: map.youtube_current_channel ?? '',
      thumbnailUrl: map.youtube_current_thumbnail ?? '',
      publishedAt: '',
      updatedAt: map.youtube_updated_at ?? '',
    }

    return NextResponse.json({
      video,
      queue: parseYouTubeQueue(map.youtube_queue),
      volume: Number(map.youtube_volume ?? 80),
      screenLastSeen: map.youtube_screen_last_seen ?? '',
      control: {
        action: map.youtube_control_action ?? '',
        updatedAt: map.youtube_control_updated_at ?? '',
      },
    }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('[youtube/current] No se pudo leer estado actual', error)
    return NextResponse.json(
      { error: 'youtube_current_failed' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}

export async function DELETE() {
  const session = await readSessionContext()
  if (!isPrivilegedRole(session?.role)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const updatedAt = await clearCurrentVideo()
  return NextResponse.json({ ok: true, video: null, updatedAt }, { headers: { 'Cache-Control': 'no-store' } })
}
