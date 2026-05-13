export interface YouTubeSearchItem {
  videoId: string
  title: string
  channelTitle: string
  thumbnailUrl: string
  publishedAt: string
}

export interface YouTubeCurrentVideo extends YouTubeSearchItem {
  updatedAt: string
}

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'

export function isValidYouTubeVideoId(videoId: unknown) {
  return typeof videoId === 'string' && /^[A-Za-z0-9_-]{11}$/.test(videoId)
}

export function getYouTubeApiKey() {
  const key = process.env.YOUTUBE_API_KEY
  if (!key) throw new Error('YOUTUBE_API_KEY no definido')
  return key
}

export async function searchYouTubeVideos(query: string): Promise<YouTubeSearchItem[]> {
  const key = getYouTubeApiKey()
  const q = query.trim()
  if (!q) return []

  const params = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    maxResults: '12',
    videoEmbeddable: 'true',
    q,
    key,
  })

  const res = await fetch(`${YOUTUBE_SEARCH_URL}?${params.toString()}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`YouTube search failed ${res.status}: ${detail || res.statusText}`)
  }

  const data = await res.json() as {
    items?: Array<{
      id?: { videoId?: string }
      snippet?: {
        title?: string
        channelTitle?: string
        publishedAt?: string
        thumbnails?: {
          medium?: { url?: string }
          high?: { url?: string }
          default?: { url?: string }
        }
      }
    }>
  }

  return (data.items ?? [])
    .map(item => {
      const videoId = item.id?.videoId ?? ''
      const snippet = item.snippet ?? {}
      return {
        videoId,
        title: decodeHtmlEntities(snippet.title ?? ''),
        channelTitle: decodeHtmlEntities(snippet.channelTitle ?? ''),
        thumbnailUrl: snippet.thumbnails?.medium?.url ?? snippet.thumbnails?.high?.url ?? snippet.thumbnails?.default?.url ?? '',
        publishedAt: snippet.publishedAt ?? '',
      }
    })
    .filter(item => isValidYouTubeVideoId(item.videoId) && item.title)
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}
