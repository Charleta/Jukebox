import { NextResponse } from 'next/server'
import { enqueueKioskCommand } from '@/lib/kioskCommands'

export async function POST() {
  try {
    await enqueueKioskCommand('shutdown-pc')
    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof Error && error.message === 'No autorizado') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    return NextResponse.json({ error: 'No se pudo encolar el comando' }, { status: 500 })
  }
}
