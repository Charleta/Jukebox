import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import { readSessionContext } from '@/lib/jukeboxAuth'

export const dynamic = 'force-dynamic'

async function isSuperAdmin() {
  const session = await readSessionContext()
  return session?.role === 'superadmin'
}

export async function GET() {
  if (!(await isSuperAdmin())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const [venues, attempts] = await Promise.all([
    prismaCloud.venue.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        devices: {
          orderBy: { updatedAt: 'desc' },
          include: {
            sessions: {
              orderBy: { createdAt: 'desc' },
              select: {
                id: true,
                role: true,
                expiresAt: true,
                revokedAt: true,
                createdAt: true,
              },
            },
          },
        },
      },
    }),
    prismaCloud.accessAttempt.findMany({
      orderBy: { createdAt: 'desc' },
      take: 60,
      include: {
        device: {
          select: {
            id: true,
            name: true,
            fingerprint: true,
            role: true,
            approved: true,
          },
        },
        venue: {
          select: {
            id: true,
            slug: true,
            name: true,
          },
        },
      },
    }),
  ])

  return NextResponse.json({ venues, attempts }, { headers: { 'Cache-Control': 'no-store' } })
}
