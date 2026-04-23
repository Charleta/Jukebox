'use client'

import { useEffect, useState } from 'react'
import { useSupabaseTableRefresh } from './useSupabaseTableRefresh'

export interface AppConfigState {
  maxDurKiosko: number
  maxDurAdmin: number
  fichasPack: number
  precioPack: number
  autostartPlaylists: string
}

const DEFAULT_CONFIG: AppConfigState = {
  maxDurKiosko: 300,
  maxDurAdmin: 300,
  fichasPack: 2,
  precioPack: 1000,
  autostartPlaylists: '[]',
}

export function useAppConfig() {
  const [config, setConfig] = useState<AppConfigState>(DEFAULT_CONFIG)

  const fetchConfig = async () => {
    const res = await fetch('/api/config')
    if (!res.ok) return

    const data = await res.json()
    setConfig({
      maxDurKiosko: Number(data.max_duracion_kiosko ?? DEFAULT_CONFIG.maxDurKiosko),
      maxDurAdmin: Number(data.max_duracion_admin ?? DEFAULT_CONFIG.maxDurAdmin),
      fichasPack: Number(data.fichas_pack ?? DEFAULT_CONFIG.fichasPack),
      precioPack: Number(data.precio_pack ?? DEFAULT_CONFIG.precioPack),
      autostartPlaylists: String(data.autostart_playlists ?? DEFAULT_CONFIG.autostartPlaylists),
    })
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchConfig()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  useSupabaseTableRefresh('AppConfig', fetchConfig, 15000)

  return { ...config, refetch: fetchConfig }
}
