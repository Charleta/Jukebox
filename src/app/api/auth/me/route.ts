import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'

function sign(role: string) {
  return crypto.createHmac('sha256', process.env.SESSION_SECRET!).update(role).digest('hex')
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('jukebox_session')?.value
    if (!session) return NextResponse.json({ role: null })

    const dotIdx = session.indexOf('.')
    if (dotIdx === -1) return NextResponse.json({ role: null })
    const role = session.slice(0, dotIdx)
    const sig = session.slice(dotIdx + 1)

    if (role !== 'admin' && role !== 'operador') return NextResponse.json({ role: null })

    const expected = sign(role)
    const sigBuf = Buffer.from(sig, 'hex')
    const expBuf = Buffer.from(expected, 'hex')
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return NextResponse.json({ role: null })
    }

    return NextResponse.json({ role })
  } catch {
    return NextResponse.json({ role: null })
  }
}
