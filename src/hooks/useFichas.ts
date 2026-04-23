import { useJukeboxSync } from '@/providers/JukeboxSyncProvider'

export function useFichas() {
  const { fichas, fichasHoy, refetchFichas } = useJukeboxSync()

  return { fichas, fichasHoy, refetch: refetchFichas }
}
