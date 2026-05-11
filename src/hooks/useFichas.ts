import { useJukeboxSync } from '@/providers/JukeboxSyncProvider'

export function useFichas() {
  const { fichas, fichasHoy, fichasAdminHoy, fichasVentasHoy, refetchFichas } = useJukeboxSync()

  return { fichas, fichasHoy, fichasAdminHoy, fichasVentasHoy, refetch: refetchFichas }
}
