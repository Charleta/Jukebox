export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { prisma } = await import('./lib/db')
    await prisma.cola.deleteMany()
    console.log('[startup] Cola limpiada')
  }
}
