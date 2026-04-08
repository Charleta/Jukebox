import { NextResponse } from 'next/server'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error || !code) {
    return NextResponse.json({ error: error ?? 'No code received' }, { status: 400 })
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://127.0.0.1:3000/api/auth/callback',
    }),
  })

  const data = await res.json()

  if (!data.refresh_token) {
    return NextResponse.json({ error: 'No refresh token', data }, { status: 500 })
  }

  return new Response(
    `<pre style="font-family:monospace;font-size:14px;padding:24px">
NUEVO REFRESH TOKEN:

${data.refresh_token}

Reemplazá SPOTIFY_REFRESH_TOKEN en .env.local con este valor y reiniciá el servidor.
</pre>`,
    { headers: { 'Content-Type': 'text/html' } }
  )
}
