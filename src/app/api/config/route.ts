import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'

export async function GET() {
  const configs = await prismaCloud.appConfig.findMany()
  const map = Object.fromEntries(configs.map(c => [c.clave, c.valor]))
  const legacy = map.max_duracion // backward compat con clave vieja

  return NextResponse.json({
    max_duracion_kiosko:   Number(map.max_duracion_kiosko ?? legacy ?? 300),
    max_duracion_admin:    Number(map.max_duracion_admin  ?? legacy ?? 300),
    fichas_pack:           Number(map.fichas_pack ?? 2),
    precio_pack:           Number(map.precio_pack ?? 1000),
    autostart_playlists:   map.autostart_playlists ?? '[]',
  })
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
  return NextResponse.json({ ok: true })
}
