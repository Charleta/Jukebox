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

export type YouTubeQueuedVideo = YouTubeSearchItem

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'
const YOUTUBE_SEARCH_CACHE_TTL = 1000 * 60 * 60 * 24 * 7
const youtubeSearchCache = new Map<string, { items: YouTubeSearchItem[]; at: number }>()

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
  const cacheKey = q.toLowerCase()
  const cached = youtubeSearchCache.get(cacheKey)
  if (cached && Date.now() - cached.at < YOUTUBE_SEARCH_CACHE_TTL) {
    return cached.items
  }

  type YouTubeSearchResponse = {
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

  const fetchPage = async (): Promise<YouTubeSearchResponse> => {
    const params = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      maxResults: '50',
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

    return res.json() as Promise<YouTubeSearchResponse>
  }

  const firstPage = await fetchPage()

  const items = (firstPage.items ?? [])
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

  youtubeSearchCache.set(cacheKey, { items, at: Date.now() })
  return items
}

export function normalizeYouTubeVideo(input: unknown): YouTubeSearchItem | null {
  const item = input as Partial<YouTubeSearchItem> | null
  if (!item || !isValidYouTubeVideoId(item.videoId)) return null

  return {
    videoId: String(item.videoId),
    title: typeof item.title === 'string' ? item.title.slice(0, 240) : '',
    channelTitle: typeof item.channelTitle === 'string' ? item.channelTitle.slice(0, 160) : '',
    thumbnailUrl: typeof item.thumbnailUrl === 'string' ? item.thumbnailUrl.slice(0, 500) : '',
    publishedAt: typeof item.publishedAt === 'string' ? item.publishedAt : '',
  }
}

export function parseYouTubeQueue(value: string | undefined | null): YouTubeQueuedVideo[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalizeYouTubeVideo).filter((item): item is YouTubeQueuedVideo => Boolean(item))
  } catch {
    return []
  }
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}
