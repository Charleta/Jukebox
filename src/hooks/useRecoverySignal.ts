'use client'

import { useEffect, useState } from 'react'
import { useSupabaseTableRefresh } from './useSupabaseTableRefresh'

export interface RecoverySignal {
  command: string
  requestedAt: string
}

const EMPTY_SIGNAL: RecoverySignal = {
  command: '',
  requestedAt: '',
}

export function useRecoverySignal() {
  const [signal, setSignal] = useState<RecoverySignal>(EMPTY_SIGNAL)

  const fetchSignal = async () => {
    const res = await fetch('/api/recovery')
    if (!res.ok) return

    const data = await res.json()
    setSignal({
      command: String(data.command ?? ''),
      requestedAt: String(data.requestedAt ?? ''),
    })
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchSignal()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  useSupabaseTableRefresh('AppConfig', fetchSignal, 3000)

  const clearSignal = async (requestedAt: string) => {
    await fetch('/api/recovery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestedAt }),
    })
  }

  return { ...signal, refetch: fetchSignal, clearSignal }
}
