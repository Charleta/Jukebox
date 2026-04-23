import { NextResponse } from 'next/server'
import path from 'path'
import { spawn } from 'child_process'
import { isPrivilegedRole, readSessionContext } from '@/lib/jukeboxAuth'

async function isAdmin() {
  const session = await readSessionContext()
  return isPrivilegedRole(session?.role)
}

export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const scriptPath = path.join(process.cwd(), 'scripts', 'kiosk-close.bat')
  const child = spawn('cmd.exe', ['/c', scriptPath], {
    cwd: process.cwd(),
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  })
  child.unref()

  return NextResponse.json({ ok: true })
}
