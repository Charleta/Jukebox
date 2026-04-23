'use client'

import { useJukeboxSync } from '@/providers/JukeboxSyncProvider'
export type { AppConfigState } from '@/lib/jukeboxSyncTypes'

export function useAppConfig() {
  const {
    maxDurKiosko,
    maxDurAdmin,
    fichasPack,
    precioPack,
    autostartPlaylists,
    refetchAppConfig,
  } = useJukeboxSync()

  return {
    maxDurKiosko,
    maxDurAdmin,
    fichasPack,
    precioPack,
    autostartPlaylists,
    refetch: refetchAppConfig,
  }
}
