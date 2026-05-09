import { NextResponse } from 'next/server'
import { prismaCloud } from '@/lib/dbCloud'
import { enqueueKioskCommand } from '@/lib/kioskCommands'

export async function POST() {
  try {
    // Leer estado actual
    const appConfig = await prismaCloud.appConfig.findUnique({
      where: { clave: 'youtube_open' },
    })

    const isYoutubeOpen = appConfig?.valor === 'true'
    const action = isYoutubeOpen ? 'youtube-close' : 'youtube-open'

    // Enqueue el comando opuesto
    await enqueueKioskCommand(action)

    return NextResponse.json({
      ok: true,
      action,
      youtubeOpen: !isYoutubeOpen,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'No autorizado') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    return NextResponse.json({ error: 'No se pudo alternar YouTube' }, { status: 500 })
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
