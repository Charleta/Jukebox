import { useState, useEffect } from 'react'

export function useFichas() {
  const [fichas, setFichas] = useState(0)

  const fetchFichas = async () => {
    const res = await fetch('/api/fichas')
    const data = await res.json()
    setFichas(data.fichas)
  }

  useEffect(() => {
    fetchFichas()
    const interval = setInterval(fetchFichas, 3000)
    return () => clearInterval(interval)
  }, [])

  return { fichas, refetch: fetchFichas }
}