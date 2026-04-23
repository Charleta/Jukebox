'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser'
import {
  DEFAULT_APP_CONFIG,
  EMPTY_RECOVERY_SIGNAL,
  type AppConfigState,
  type CancionCola,
  type RecoverySignal,
} from '@/lib/jukeboxSyncTypes'

interface JukeboxSyncContextValue {
  fichas: number
  fichasHoy: number
  cola: CancionCola[]
  colaClientes: CancionCola[]
  maxDurKiosko: number
  maxDurAdmin: number
  fichasPack: number
  precioPack: number
  autostartPlaylists: string
  recoveryCommand: string
  recoveryRequestedAt: string
  refetchFichas: (options?: { broadcast?: boolean }) => Promise<void>
  refetchCola: (options?: { broadcast?: boolean }) => Promise<void>
  refetchAppConfig: (options?: { broadcast?: boolean }) => Promise<void>
  refetchRecovery: (options?: { broadcast?: boolean }) => Promise<void>
  clearRecoverySignal: (requestedAt: string) => Promise<void>
}

const JukeboxSyncContext = createContext<JukeboxSyncContextValue | null>(null)

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    return res.json() as Promise<T>
  } catch {
    return null
  }
}

function normalizeAppConfig(data: Partial<AppConfigState> | null | undefined): AppConfigState {
  return {
    maxDurKiosko: Number(data?.maxDurKiosko ?? DEFAULT_APP_CONFIG.maxDurKiosko),
    maxDurAdmin: Number(data?.maxDurAdmin ?? DEFAULT_APP_CONFIG.maxDurAdmin),
    fichasPack: Number(data?.fichasPack ?? DEFAULT_APP_CONFIG.fichasPack),
    precioPack: Number(data?.precioPack ?? DEFAULT_APP_CONFIG.precioPack),
    autostartPlaylists: String(data?.autostartPlaylists ?? DEFAULT_APP_CONFIG.autostartPlaylists),
  }
}

export function JukeboxSyncProvider({ children }: { children: ReactNode }) {
  const [fichas, setFichas] = useState(0)
  const [fichasHoy, setFichasHoy] = useState(0)
  const [cola, setCola] = useState<CancionCola[]>([])
  const [appConfig, setAppConfig] = useState<AppConfigState>(DEFAULT_APP_CONFIG)
  const [recovery, setRecovery] = useState<RecoverySignal>(EMPTY_RECOVERY_SIGNAL)
  const syncChannelRef = useRef<BroadcastChannel | null>(null)

  if (typeof window !== 'undefined' && typeof BroadcastChannel !== 'undefined' && !syncChannelRef.current) {
    syncChannelRef.current = new BroadcastChannel('jukebox-sync')
  }

  const broadcastRefresh = useCallback((topic: 'fichas' | 'cola' | 'app-config' | 'recovery') => {
    syncChannelRef.current?.postMessage({ topic })
  }, [])

  const refetchFichas = useCallback(async (options?: { broadcast?: boolean }) => {
    const data = await fetchJson<{ fichas?: number; fichasHoy?: number }>('/api/fichas')
    if (!data) return

    setFichas(Number(data.fichas ?? 0))
    setFichasHoy(Number(data.fichasHoy ?? 0))
    if (options?.broadcast !== false) broadcastRefresh('fichas')
  }, [broadcastRefresh])

  const refetchCola = useCallback(async (options?: { broadcast?: boolean }) => {
    const data = await fetchJson<CancionCola[]>('/api/cola')
    if (!data) return

    setCola(data)
    if (options?.broadcast !== false) broadcastRefresh('cola')
  }, [broadcastRefresh])

  const refetchAppConfig = useCallback(async (options?: { broadcast?: boolean }) => {
    const data = await fetchJson<Partial<AppConfigState>>('/api/config')
    if (!data) return

    setAppConfig(normalizeAppConfig(data))
    if (options?.broadcast !== false) broadcastRefresh('app-config')
  }, [broadcastRefresh])

  const refetchRecovery = useCallback(async (options?: { broadcast?: boolean }) => {
    const data = await fetchJson<RecoverySignal>('/api/recovery')
    if (!data) return

    setRecovery({
      command: String(data.command ?? ''),
      requestedAt: String(data.requestedAt ?? ''),
    })
    if (options?.broadcast !== false) broadcastRefresh('recovery')
  }, [broadcastRefresh])

  const loadAppConfigAndRecovery = useCallback(async () => {
    await Promise.all([
      refetchAppConfig({ broadcast: false }),
      refetchRecovery({ broadcast: false }),
    ])
  }, [refetchAppConfig, refetchRecovery])

  const clearRecoverySignal = useCallback(async (requestedAt: string) => {
    try {
      await fetch('/api/recovery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestedAt }),
      })
      await refetchRecovery()
    } catch {
      // If the clear fails, the next AppConfig event or manual refetch will catch up.
    }
  }, [refetchRecovery])

  useEffect(() => {
    void Promise.all([
      refetchFichas({ broadcast: false }),
      refetchCola({ broadcast: false }),
      loadAppConfigAndRecovery(),
    ]).catch(() => {})
  }, [loadAppConfigAndRecovery, refetchCola, refetchFichas])

  useEffect(() => {
    if (!syncChannelRef.current) return

    const channel = syncChannelRef.current
    channel.onmessage = event => {
      const topic = event.data?.topic as string | undefined
      if (topic === 'fichas') {
        void refetchFichas({ broadcast: false })
        return
      }
      if (topic === 'cola') {
        void refetchCola({ broadcast: false })
        return
      }
      if (topic === 'app-config') {
        void refetchAppConfig({ broadcast: false })
        return
      }
      if (topic === 'recovery') {
        void refetchRecovery({ broadcast: false })
      }
    }

    return () => {
      channel.onmessage = null
    }
  }, [refetchAppConfig, refetchCola, refetchFichas, refetchRecovery])

  useEffect(() => {
    return () => {
      syncChannelRef.current?.close()
      syncChannelRef.current = null
    }
  }, [])

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()
    if (!supabase) return

    const channel = supabase
      .channel('sync:Config')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Config' }, () => {
        void refetchFichas()
      })
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [refetchFichas])

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()
    if (!supabase) return

    const channel = supabase
      .channel('sync:Cola')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Cola' }, () => {
        void refetchCola()
      })
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [refetchCola])

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()
    if (!supabase) return

    const channel = supabase
      .channel('sync:AppConfig')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'AppConfig' }, () => {
        void loadAppConfigAndRecovery()
      })
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [loadAppConfigAndRecovery])

  const colaClientes = useMemo(() => cola.filter(c => c.tipo === 'cliente'), [cola])

  const value = useMemo<JukeboxSyncContextValue>(() => ({
    fichas,
    fichasHoy,
    cola,
    colaClientes,
    maxDurKiosko: appConfig.maxDurKiosko,
    maxDurAdmin: appConfig.maxDurAdmin,
    fichasPack: appConfig.fichasPack,
    precioPack: appConfig.precioPack,
    autostartPlaylists: appConfig.autostartPlaylists,
    recoveryCommand: recovery.command,
    recoveryRequestedAt: recovery.requestedAt,
    refetchFichas,
    refetchCola,
    refetchAppConfig,
    refetchRecovery,
    clearRecoverySignal,
  }), [
    appConfig.autostartPlaylists,
    appConfig.fichasPack,
    appConfig.maxDurAdmin,
    appConfig.maxDurKiosko,
    appConfig.precioPack,
    clearRecoverySignal,
    cola,
    colaClientes,
    fichas,
    fichasHoy,
    recovery.command,
    recovery.requestedAt,
    refetchAppConfig,
    refetchCola,
    refetchFichas,
    refetchRecovery,
  ])

  return (
    <JukeboxSyncContext.Provider value={value}>
      {children}
    </JukeboxSyncContext.Provider>
  )
}

export function useJukeboxSync() {
  const context = useContext(JukeboxSyncContext)
  if (!context) {
    throw new Error('useJukeboxSync must be used within JukeboxSyncProvider')
  }
  return context
}
