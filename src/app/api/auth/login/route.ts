import { NextResponse } from 'next/server'
import crypto from 'crypto'

function sign(role: string) {
  return crypto.createHmac('sha256', process.env.SESSION_SECRET!).update(role).digest('hex')
}

export async function POST(req: Request) {
  try {
    const { pin } = await req.json()
    let role: string | null = null
    if (pin && pin === process.env.ADMIN_PIN) role = 'admin'
    else if (pin && pin === process.env.OPERATOR_PIN) role = 'operador'

    if (!role) return NextResponse.json({ error: 'PIN incorrecto' }, { status: 401 })

    const sig = sign(role)
    const res = NextResponse.json({ role })
    res.cookies.set('jukebox_session', `${role}.${sig}`, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 8,
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
