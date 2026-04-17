import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { prisma } from '@/lib/db'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const ref = searchParams.get('ref')
  const cantidad = Number(searchParams.get('cantidad') ?? 0)

  if (!ref || !cantidad) return NextResponse.json({ aprobado: false })

  // Verificar en DB (persiste entre reinicios del servidor)
  const yaProcessado = await prisma.pagoProcesado.findUnique({ where: { ref } })
  if (yaProcessado) return NextResponse.json({ aprobado: true })

  try {
    const payment = new Payment(client)
    const results = await payment.search({
      options: { sort: 'date_created', criteria: 'desc', external_reference: ref },
    })

    const aprobado = results.results?.some(p => p.status === 'approved') ?? false

    if (aprobado) {
      await prisma.pagoProcesado.create({ data: { ref } })
      await prisma.config.update({
        where: { id: 1 },
        data: { fichas: { increment: cantidad } },
      })
    }

    return NextResponse.json({ aprobado })
  } catch (err) {
    console.error('MP estado error:', err)
    return NextResponse.json({ aprobado: false, error: true })
  }
}
