import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import { isPrivilegedRole, readSessionContext } from '@/lib/jukeboxAuth'

type RecoveryAction = 'reload-app' | 'restart-player'

async function isAdmin() {
  const session = await readSessionContext()
  return isPrivilegedRole(session?.role)
}

async function getValue(clave: string) {
  const row = await prismaCloud.appConfig.findUnique({ where: { clave } })
  return row?.valor ?? ''
}

async function setValue(clave: string, valor: string) {
  await prismaCloud.appConfig.upsert({
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
