'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  refetchFichas: () => Promise<void>
  refetchCola: () => Promise<void>
  refetchAppConfig: () => Promise<void>
  refetchRecovery: () => Promise<void>
  clearRecoverySignal: (requestedAt: string) => Promise<void>
}

type AppConfigApiResponse = Partial<AppConfigState> & {
  max_duracion_kiosko?: number
  max_duracion_admin?: number
  fichas_pack?: number
  precio_pack?: number
  autostart_playlists?: string
}

const JukeboxSyncContext = createContext<JukeboxSyncContextValue | null>(null)

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return null
    return res.json() as Promise<T>
  } catch {
    return null
  }
}

function normalizeAppConfig(data: Partial<AppConfigState> | null | undefined): AppConfigState {
  const maxDurKiosko = data?.maxDurKiosko ?? (data as AppConfigApiResponse | null | undefined)?.max_duracion_kiosko
  const maxDurAdmin = data?.maxDurAdmin ?? (data as AppConfigApiResponse | null | undefined)?.max_duracion_admin
  const fichasPack = data?.fichasPack ?? (data as AppConfigApiResponse | null | undefined)?.fichas_pack
  const precioPack = data?.precioPack ?? (data as AppConfigApiResponse | null | undefined)?.precio_pack
  const autostartPlaylists =
    data?.autostartPlaylists ?? (data as AppConfigApiResponse | null | undefined)?.autostart_playlists

  return {
    maxDurKiosko: Number(maxDurKiosko ?? DEFAULT_APP_CONFIG.maxDurKiosko),
    maxDurAdmin: Number(maxDurAdmin ?? DEFAULT_APP_CONFIG.maxDurAdmin),
    fichasPack: Number(fichasPack ?? DEFAULT_APP_CONFIG.fichasPack),
    precioPack: Number(precioPack ?? DEFAULT_APP_CONFIG.precioPack),
    autostartPlaylists: String(autostartPlaylists ?? DEFAULT_APP_CONFIG.autostartPlaylists),
  }
}

export function JukeboxSyncProvider({ children }: { children: ReactNode }) {
  const [fichas, setFichas] = useState(0)
  const [fichasHoy, setFichasHoy] = useState(0)
  const [cola, setCola] = useState<CancionCola[]>([])
  const [appConfig, setAppConfig] = useState<AppConfigState>(DEFAULT_APP_CONFIG)
  const [recovery, setRecovery] = useState<RecoverySignal>(EMPTY_RECOVERY_SIGNAL)

  const refetchFichas = useCallback(async () => {
    const data = await fetchJson<{ fichas?: number; fichasHoy?: number }>('/api/fichas')
    if (!data) return

    setFichas(Number(data.fichas ?? 0))
    setFichasHoy(Number(data.fichasHoy ?? 0))
  }, [])

  const refetchCola = useCallback(async () => {
    const data = await fetchJson<CancionCola[]>('/api/cola')
    if (!data) return

    setCola(data)
  }, [])

  const refetchAppConfig = useCallback(async () => {
    const data = await fetchJson<AppConfigApiResponse>('/api/config')
    if (!data) return

    setAppConfig(normalizeAppConfig(data))
  }, [])

  const refetchRecovery = useCallback(async () => {
    const data = await fetchJson<RecoverySignal>('/api/recovery')
    if (!data) return

    setRecovery({
      command: String(data.command ?? ''),
      requestedAt: String(data.requestedAt ?? ''),
    })
  }, [])

  const loadAppConfigAndRecovery = useCallback(async () => {
    await Promise.all([
      refetchAppConfig(),
      refetchRecovery(),
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
      refetchFichas(),
      refetchCola(),
      loadAppConfigAndRecovery(),
    ]).catch(() => {})
  }, [loadAppConfigAndRecovery, refetchCola, refetchFichas])

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
