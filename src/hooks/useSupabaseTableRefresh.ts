'use client'

import { useEffect, useRef } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser'

export function useSupabaseTableRefresh(
  table: string,
  onChange: () => void | Promise<void>,
  fallbackIntervalMs = 0,
) {
  const onChangeRef = useRef(onChange)
  const channelIdRef = useRef(
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2),
  )

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()
    let interval: ReturnType<typeof setInterval> | undefined

    if (supabase) {
      const channel = supabase
        .channel(`table-refresh:${table}:${channelIdRef.current}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table },
          () => { void onChangeRef.current() },
        )
        .subscribe()

      if (fallbackIntervalMs > 0) {
        interval = setInterval(() => {
          void onChangeRef.current()
        }, fallbackIntervalMs)
      }

      return () => {
        if (interval) clearInterval(interval)
        void supabase.removeChannel(channel)
      }
    }

    if (fallbackIntervalMs <= 0) return

    interval = setInterval(() => {
      void onChangeRef.current()
    }, fallbackIntervalMs)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [fallbackIntervalMs, table])
}
