import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'

export const dynamic = 'force-dynamic'

async function readConfig() {
  const configs = await prismaCloud.appConfig.findMany()
  const map = Object.fromEntries(configs.map(c => [c.clave, c.valor]))
  const legacy = map.max_duracion // backward compat con clave vieja
  const maxDurKiosko = Number(map.max_duracion_kiosko ?? legacy ?? 300)
  const maxDurAdmin = Number(map.max_duracion_admin ?? legacy ?? 300)
  const fichasPack = Number(map.fichas_pack ?? 2)
  const precioPack = Number(map.precio_pack ?? 1000)
  const autostartPlaylists = String(map.autostart_playlists ?? '[]')

  return {
    max_duracion_kiosko: maxDurKiosko,
    max_duracion_admin: maxDurAdmin,
    fichas_pack: fichasPack,
    precio_pack: precioPack,
    autostart_playlists: autostartPlaylists,
    maxDurKiosko,
    maxDurAdmin,
    fichasPack,
    precioPack,
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
