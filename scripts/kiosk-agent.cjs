const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const { createClient } = require('@supabase/supabase-js')

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return
  const content = fs.readFileSync(filePath, 'utf8')
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const idx = line.indexOf('=')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim().replace(/^"(.*)"$/, '$1')
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnvFile(path.join(__dirname, 'kiosk-agent.env.local'))
loadEnvFile(path.join(__dirname, 'kiosk-agent.env'))

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const JUKEBOX_VENUE_ID = process.env.JUKEBOX_VENUE_ID
const ROOT = process.env.JUKEBOX_ROOT || path.resolve(__dirname, '..')

const ACTION_SCRIPTS = {
  'restart-kiosk': path.join(ROOT, 'scripts', 'kiosk-restart.bat'),
  'close-kiosk': path.join(ROOT, 'scripts', 'kiosk-close.bat'),
  'shutdown-pc': path.join(ROOT, 'scripts', 'kiosk-shutdown.bat'),
}

function fail(message) {
  console.error(`[kiosk-agent] ${message}`)
  process.exit(1)
}

if (!SUPABASE_URL) fail('Falta SUPABASE_URL')
if (!SUPABASE_SERVICE_ROLE_KEY) fail('Falta SUPABASE_SERVICE_ROLE_KEY')
if (!JUKEBOX_VENUE_ID) fail('Falta JUKEBOX_VENUE_ID')

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
  realtime: { params: { eventsPerSecond: 10 } },
})

let venueRowId = null
let processing = false

async function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const child = spawn('cmd.exe', ['/c', scriptPath], {
      cwd: ROOT,
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
    })
    child.on('error', reject)
    child.unref()
    resolve()
  })
}

async function markCommand(id, data) {
  const { error } = await supabase
    .from('KioskCommand')
    .update(data)
    .eq('id', id)
  if (error) throw error
}

async function claimCommand(command) {
  const { data, error } = await supabase
    .from('KioskCommand')
    .update({
      status: 'processing',
      claimedAt: new Date().toISOString(),
      message: 'Procesando comando',
    })
    .eq('id', command.id)
    .eq('status', 'pending')
    .select('id, action, status, venueId')
    .maybeSingle()

  if (error) throw error
  return data
}

async function executeCommand(command) {
  const scriptPath = ACTION_SCRIPTS[command.action]
  if (!scriptPath) {
    await markCommand(command.id, {
      status: 'failed',
      failedAt: new Date().toISOString(),
      message: `Accion desconocida: ${command.action}`,
    })
    return
  }

  await runScript(scriptPath)
  await markCommand(command.id, {
    status: 'processed',
    processedAt: new Date().toISOString(),
    message: `Ejecutado: ${command.action}`,
  })
}

async function handleCommand(command) {
  if (!command || command.venueId !== venueRowId) return

  try {
    const claimed = await claimCommand(command)
    if (!claimed) return
    await executeCommand(claimed)
  } catch (error) {
    console.error('[kiosk-agent] Error procesando comando:', error)
    try {
      await markCommand(command.id, {
        status: 'failed',
        failedAt: new Date().toISOString(),
        message: error instanceof Error ? error.message : 'Error desconocido',
      })
    } catch (markError) {
      console.error('[kiosk-agent] No se pudo marcar como fallido:', markError)
    }
  }
}

async function processPending() {
  const { data, error } = await supabase
    .from('KioskCommand')
    .select('id, action, status, venueId, requestedAt')
    .eq('venueId', venueRowId)
    .eq('status', 'pending')
    .order('requestedAt', { ascending: true })

  if (error) {
    console.error('[kiosk-agent] No se pudieron leer comandos pendientes:', error)
    return
  }

  for (const command of data ?? []) {
    await handleCommand(command)
  }
}

async function bootstrap() {
  const { data: venue, error: venueError } = await supabase
    .from('Venue')
    .select('id, slug, name, active')
    .eq('slug', JUKEBOX_VENUE_ID)
    .maybeSingle()

  if (venueError) fail(`No se pudo leer el venue: ${venueError.message}`)
  if (!venue) fail(`No existe el venue con slug ${JUKEBOX_VENUE_ID}`)
  if (venue.active === false) fail(`El venue ${JUKEBOX_VENUE_ID} esta inactivo`)

  venueRowId = venue.id
  console.log(`[kiosk-agent] Venue listo: ${venue.name} (${venue.slug})`)

  await processPending()

  const channel = supabase
    .channel(`kiosk-commands-${venueRowId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'KioskCommand',
        filter: `venueId=eq.${venueRowId}`,
      },
      payload => {
        void handleCommand(payload.new)
      }
    )
    .subscribe(status => {
      console.log(`[kiosk-agent] Realtime: ${status}`)
    })

  process.on('SIGINT', async () => {
    console.log('[kiosk-agent] Cerrando...')
    await supabase.removeChannel(channel)
    process.exit(0)
  })

  process.on('SIGTERM', async () => {
    console.log('[kiosk-agent] Cerrando...')
    await supabase.removeChannel(channel)
    process.exit(0)
  })

  console.log('[kiosk-agent] Escuchando comandos...')
}

bootstrap().catch(err => fail(err instanceof Error ? err.message : 'Error fatal'))
