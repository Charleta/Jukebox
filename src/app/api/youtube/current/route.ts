import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import { isValidYouTubeVideoId, type YouTubeCurrentVideo } from '@/lib/youtube'

export const dynamic = 'force-dynamic'

const KEYS = [
  'youtube_current_video_id',
  'youtube_current_video_title',
  'youtube_current_channel',
  'youtube_current_thumbnail',
  'youtube_updated_at',
  'youtube_control_action',
  'youtube_control_updated_at',
]

export async function GET() {
  const configs = await prismaCloud.appConfig.findMany({
    where: { clave: { in: KEYS } },
  })
  const map = Object.fromEntries(configs.map(c => [c.clave, c.valor]))
  const videoId = map.youtube_current_video_id ?? ''

  if (!isValidYouTubeVideoId(videoId)) {
    return NextResponse.json({
      video: null,
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
    control: {
      action: map.youtube_control_action ?? '',
      updatedAt: map.youtube_control_updated_at ?? '',
    },
  }, { headers: { 'Cache-Control': 'no-store' } })
}
