import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import { parseYouTubeQueue } from '@/lib/youtube'

export const dynamic = 'force-dynamic'

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

export async function POST() {
  const row = await prismaCloud.appConfig.findUnique({ where: { clave: 'youtube_queue' } })
  const queue = parseYouTubeQueue(row?.valor)
  const [next, ...rest] = queue

  if (!next) {
    const updatedAt = await clearCurrentVideo()
    return NextResponse.json({ ok: true, video: null, queue: [], updatedAt }, { headers: { 'Cache-Control': 'no-store' } })
  }

  const updatedAt = new Date().toISOString()
  await Promise.all([
    upsertConfig('youtube_current_video_id', next.videoId),
    upsertConfig('youtube_current_video_title', next.title),
    upsertConfig('youtube_current_channel', next.channelTitle),
    upsertConfig('youtube_current_thumbnail', next.thumbnailUrl),
    upsertConfig('youtube_updated_at', updatedAt),
    upsertConfig('youtube_control_action', 'play'),
    upsertConfig('youtube_control_updated_at', updatedAt),
    upsertConfig('youtube_queue', JSON.stringify(rest)),
  ])

  return NextResponse.json({ ok: true, video: { ...next, updatedAt }, queue: rest }, { headers: { 'Cache-Control': 'no-store' } })
}
