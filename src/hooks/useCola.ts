import { useJukeboxSync } from '@/providers/JukeboxSyncProvider'
export type { CancionCola } from '@/lib/jukeboxSyncTypes'

export function useCola() {
  const { cola, colaClientes, refetchCola } = useJukeboxSync()

  return { cola, colaClientes, refetch: refetchCola }
}
