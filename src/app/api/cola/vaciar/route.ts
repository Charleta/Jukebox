import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'

export const dynamic = 'force-dynamic'

export async function POST() {
  await prismaCloud.cola.deleteMany({})
  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } })
}
