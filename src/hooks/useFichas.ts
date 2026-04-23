import { useEffect, useState } from 'react'
import { useSupabaseTableRefresh } from './useSupabaseTableRefresh'

export function useFichas() {
  const [fichas, setFichas] = useState(0)
  const [fichasHoy, setFichasHoy] = useState(0)

  const fetchFichas = async () => {
    const res = await fetch('/api/fichas')
    const data = await res.json()
    setFichas(data.fichas ?? 0)
    setFichasHoy(data.fichasHoy ?? 0)
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchFichas()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  useSupabaseTableRefresh('Config', fetchFichas, 5000)

  return { fichas, fichasHoy, refetch: fetchFichas }
}
