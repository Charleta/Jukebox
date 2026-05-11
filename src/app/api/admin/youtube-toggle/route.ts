import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import { enqueueKioskCommand } from '@/lib/kioskCommands'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action } = body

    if (!action || !['open', 'close'].includes(action)) {
      return NextResponse.json({ error: 'Acción inválida' }, { status: 400 })
    }

    const kioskAction = action === 'open' ? 'youtube-open' : 'youtube-close'

    // Enqueue el comando específico
    await enqueueKioskCommand(kioskAction)

    return NextResponse.json({
      ok: true,
      action: kioskAction,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'No autorizado') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    return NextResponse.json({ error: 'No se pudo ejecutar la acción' }, { status: 500 })
  }
}

// También permite GET para obtener el estado actual
export async function GET() {
  try {
    const appConfig = await prismaCloud.appConfig.findUnique({
      where: { clave: 'youtube_open' },
    })

    const isYoutubeOpen = appConfig?.valor === 'true'

    return NextResponse.json({
      ok: true,
      youtubeOpen: isYoutubeOpen,
    })
  } catch (error) {
    return NextResponse.json({ error: 'No se pudo obtener estado' }, { status: 500 })
  }
}
