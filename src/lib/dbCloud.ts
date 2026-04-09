import { PrismaClient } from '../generated/cloud'

const globalForPrismaCloud = globalThis as unknown as {
  prismaCloud: PrismaClient | undefined
}

export const prismaCloud =
  globalForPrismaCloud.prismaCloud ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production')
  globalForPrismaCloud.prismaCloud = prismaCloud
