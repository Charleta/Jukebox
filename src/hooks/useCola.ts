import { useState, useEffect } from 'react'

export interface CancionCola {
  id: number
  titulo: string
  artista: string
  duracion: number
  spotifyUri: string
  imagenUrl: string
  orden: number
}

export function useCola() {
  const [cola, setCola] = useState<CancionCola[]>([])

  const fetchCola = async () => {
    const res = await fetch('/api/cola')
    const data = await res.json()
    setCola(data)
  }

  useEffect(() => {
    fetchCola()
    const interval = setInterval(fetchCola, 3000)
    return () => clearInterval(interval)
  }, [])

  return { cola, refetch: fetchCola }
}