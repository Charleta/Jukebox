// Corré este script con: node get-spotify-token.js
// Requiere tener en .env.local: SPOTIFY_CLIENT_ID y SPOTIFY_CLIENT_SECRET

const http = require('http')
const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

// Leer .env.local
const envPath = path.join(__dirname, '.env.local')
const env = {}
fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) env[key.trim()] = rest.join('=').trim()
})

const CLIENT_ID = env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Falta SPOTIFY_CLIENT_ID o SPOTIFY_CLIENT_SECRET en .env.local')
  process.exit(1)
}

const PORT = 8888
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`

const SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-modify-playback-state',
  'user-read-playback-state',
  'playlist-read-private',
  'playlist-read-collaborative',
].join(' ')

const authUrl = `https://accounts.spotify.com/authorize?` + new URLSearchParams({
  response_type: 'code',
  client_id: CLIENT_ID,
  scope: SCOPES,
  redirect_uri: REDIRECT_URI,
}).toString()

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`)
  if (url.pathname !== '/callback') { res.end(); return }

  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')

  if (error || !code) {
    res.end(`Error: ${error ?? 'sin código'}`)
    server.close()
    return
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }).toString(),
  })
  const data = await tokenRes.json()

  if (!data.refresh_token) {
    res.end(`Error obteniendo token: ${JSON.stringify(data)}`)
    server.close()
    return
  }

  const newToken = data.refresh_token
  console.log('\n✓ NUEVO REFRESH TOKEN:\n')
  console.log(newToken)
  console.log('\nReemplazá SPOTIFY_REFRESH_TOKEN en .env.local con este valor.\n')

  res.end(`<pre style="font-family:monospace;padding:24px;font-size:14px">
✓ NUEVO REFRESH TOKEN:

${newToken}

Reemplazá SPOTIFY_REFRESH_TOKEN en .env.local con este valor y reiniciá el servidor.
</pre>`)

  server.close()
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\nAbriendo Spotify en el browser...`)
  console.log(`Si no se abre solo, copiá esta URL:\n${authUrl}\n`)
  const cmd = process.platform === 'win32' ? `start "" "${authUrl}"` : `open "${authUrl}"`
  exec(cmd)
})
