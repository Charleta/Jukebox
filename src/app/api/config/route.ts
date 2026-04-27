import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'

export const dynamic = 'force-dynamic'

function safeNumber(value: unknown, fallback: number) {
  const num = Number(value)
  return Number.isFinite(num) ? num : fallback
}

async function readConfig() {
  const configs = await prismaCloud.appConfig.findMany()
  const map = Object.fromEntries(configs.map(c => [c.clave, c.valor]))
  const legacy = map.max_duracion // backward compat con clave vieja
  const maxDurKiosko = safeNumber(map.max_duracion_kiosko ?? legacy, 300)
  const maxDurAdmin = safeNumber(map.max_duracion_admin ?? legacy, 300)
  const fichasPack = safeNumber(map.fichas_pack, 2)
  const precioPack = safeNumber(map.precio_pack, 1000)
  const playerVolume = safeNumber(map.player_volume, 0.8)
  const autostartPlaylists = String(map.autostart_playlists ?? '[]')

  return {
    max_duracion_kiosko: maxDurKiosko,
    max_duracion_admin: maxDurAdmin,
    fichas_pack: fichasPack,
    precio_pack: precioPack,
    player_volume: playerVolume,
    autostart_playlists: autostartPlaylists,
    maxDurKiosko,
    maxDurAdmin,
    fichasPack,
    precioPack,
    playerVolume,
    autostartPlaylists,
  }
}

export async function GET() {
  return NextResponse.json(await readConfig(), { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(req: Request) {
  const body = await req.json()
  await Promise.all(
    Object.entries(body).map(([clave, valor]) =>
      prismaCloud.appConfig.upsert({
        where:  { clave },
        update: { valor: String(valor) },
        create: { clave, valor: String(valor) },
      })
    )
  )
  return NextResponse.json({ ok: true, ...(await readConfig()) }, { headers: { 'Cache-Control': 'no-store' } })
}
