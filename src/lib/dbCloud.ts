import { PrismaClient } from '../generated/cloud'

const globalForPrismaCloud = globalThis as unknown as {
  prismaCloud: PrismaClient | undefined
}

export const prismaCloud =
  globalForPrismaCloud.prismaCloud ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production')
  globalForPrismaCloud.prismaCloud = prismaCloud

export async function ensureConfigColumns() {
  await prismaCloud.$executeRawUnsafe(
    'ALTER TABLE "Config" ADD COLUMN IF NOT EXISTS "fichasAdminHoy" INTEGER NOT NULL DEFAULT 0'
  )
  await prismaCloud.$executeRawUnsafe(
    'ALTER TABLE "Config" ADD COLUMN IF NOT EXISTS "fichasVentasHoy" INTEGER NOT NULL DEFAULT 0'
  )
}
