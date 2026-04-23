import { prismaCloud } from '@/lib/dbCloud'
import { getVenueContext, isPrivilegedRole, readSessionContext } from '@/lib/jukeboxAuth'

export type KioskLocalAction = 'restart-kiosk' | 'close-kiosk' | 'shutdown-pc'

export async function enqueueKioskCommand(action: KioskLocalAction) {
  const session = await readSessionContext()
  if (!isPrivilegedRole(session?.role)) {
    throw new Error('No autorizado')
  }

  const venue = getVenueContext()
  const venueRow = await prismaCloud.venue.upsert({
    where: { slug: venue.venueId },
    update: { name: venue.venueName, active: true },
    create: { slug: venue.venueId, name: venue.venueName, active: true },
  })

  return prismaCloud.kioskCommand.create({
    data: {
      venueId: venueRow.id,
      action,
      status: 'pending',
      requestedByRole: session.role,
      requestedByDeviceId: session.deviceId ?? null,
    },
  })
}
