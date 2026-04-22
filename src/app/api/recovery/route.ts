import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'
import crypto from 'crypto'

type RecoveryAction = 'reload-app' | 'restart-player'

function sign(role: string) {
  return crypto.createHmac('sha256', process.env.SESSION_SECRET!).update(role).digest('hex')
}

async function isAdmin() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('jukebox_session')?.value
    if (!session) return false

    const dotIdx = session.indexOf('.')
    if (dotIdx === -1) return false

    const role = session.slice(0, dotIdx)
    const sig = session.slice(dotIdx + 1)
    if (role !== 'admin') return false

    const expected = sign(role)
    const sigBuf = Buffer.from(sig, 'hex')
    const expBuf = Buffer.from(expected, 'hex')
    return sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf)
  } catch {
    return false
  }
}

async function getValue(clave: string) {
  const row = await prisma.appConfig.findUnique({ where: { clave } })
  return row?.valor ?? ''
}

async function setValue(clave: string, valor: string) {
  await prisma.appConfig.upsert({
    where: { clave },
    update: { valor },
    create: { clave, valor },
  })
}

export async function GET() {
  const [command, requestedAt] = await Promise.all([
    getValue('recovery_command'),
    getValue('recovery_requested_at'),
  ])

  return NextResponse.json({ command, requestedAt })
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { action } = await req.json() as { action?: RecoveryAction }
  if (action !== 'reload-app' && action !== 'restart-player') {
    return NextResponse.json({ error: 'Accion invalida' }, { status: 400 })
  }

  const requestedAt = new Date().toISOString()
  await Promise.all([
    setValue('recovery_command', action),
    setValue('recovery_requested_at', requestedAt),
  ])

  return NextResponse.json({ ok: true, requestedAt })
}

export async function DELETE(req: Request) {
  const { requestedAt } = await req.json().catch(() => ({ requestedAt: '' }))
  const currentRequestedAt = await getValue('recovery_requested_at')

  if (requestedAt && requestedAt === currentRequestedAt) {
    await Promise.all([
      setValue('recovery_command', ''),
      setValue('recovery_requested_at', ''),
    ])
  }

  return NextResponse.json({ ok: true })
}
