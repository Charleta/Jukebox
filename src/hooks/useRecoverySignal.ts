'use client'

import { useJukeboxSync } from '@/providers/JukeboxSyncProvider'
export type { RecoverySignal } from '@/lib/jukeboxSyncTypes'

export function useRecoverySignal() {
  const {
    recoveryCommand,
    recoveryRequestedAt,
    refetchRecovery,
    clearRecoverySignal,
  } = useJukeboxSync()

  return {
    command: recoveryCommand,
    requestedAt: recoveryRequestedAt,
    refetch: refetchRecovery,
    clearSignal: clearRecoverySignal,
  }
}
