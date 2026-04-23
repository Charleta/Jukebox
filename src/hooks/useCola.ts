import { useEffect, useState } from 'react'
import { useSupabaseTableRefresh } from './useSupabaseTableRefresh'

export interface CancionCola {
  id: number
  titulo: string
  artista: string
  duracion: number
  spotifyUri: string
  imagenUrl: string
  orden: number
  tipo: string
}

export function useCola() {
  const [cola, setCola] = useState<CancionCola[]>([])

  const fetchCola = async () => {
    const res = await fetch('/api/cola')
    const data = await res.json()
    setCola(data)
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchCola()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  useSupabaseTableRefresh('Cola', fetchCola)

  const colaClientes = cola.filter(c => c.tipo === 'cliente')

  return { cola, colaClientes, refetch: fetchCola }
}
