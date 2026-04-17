import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

export async function POST(req: Request) {
  try {
    const { cantidad, total } = await req.json()
    const ref = `jukebox-${Date.now()}`

    const preference = new Preference(client)
    const result = await preference.create({
      body: {
        items: [{
          id: 'fichas-jukebox',
          title: `${cantidad} Fichas Jukebox`,
          quantity: 1,
          unit_price: Number(total),
          currency_id: 'ARS',
        }],
        external_reference: ref,
      },
    })

    return NextResponse.json({ id: result.id, qrUrl: result.init_point, ref })
  } catch (err) {
    console.error('MP crear error:', err)
    return NextResponse.json({ error: 'Error creando preferencia' }, { status: 500 })
  }
}
