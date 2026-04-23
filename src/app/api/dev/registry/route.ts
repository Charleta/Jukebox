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

  const venues = await prismaCloud.venue.findMany({
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
  })

  return NextResponse.json({ venues }, { headers: { 'Cache-Control': 'no-store' } })
}
