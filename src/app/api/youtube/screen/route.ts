import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'

export const dynamic = 'force-dynamic'

export async function POST() {
  const lastSeen = new Date().toISOString()
  await prismaCloud.appConfig.upsert({
    where: { clave: 'youtube_screen_last_seen' },
    update: { valor: lastSeen },
    create: { clave: 'youtube_screen_last_seen', valor: lastSeen },
  })

  return NextResponse.json({ ok: true, lastSeen }, { headers: { 'Cache-Control': 'no-store' } })
}
