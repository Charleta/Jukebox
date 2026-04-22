import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'
import path from 'path'
import { spawn } from 'child_process'

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
