'use client'
import { useState, useEffect } from 'react'
import { CancionCola } from '@/hooks/useCola'

function formatDur(segundos: number) {
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

interface Props {
  cola: CancionCola[]
  fichas: number
  fichasPack: number
  precioPack: number
  onPagar: (cantidad: number, total: number) => void
}

export function ColaProximas({ cola, fichas, fichasPack, precioPack, onPagar }: Props) {
  const [cantidad, setCantidad] = useState(fichasPack)

  // Sincronizar cuando cambia la config desde admin
  useEffect(() => {
    setCantidad(fichasPack)
  }, [fichasPack])

  const total = Math.round((cantidad / fichasPack) * precioPack)

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {cola.length > 0 && (
        <>
          <div className="px-6 py-3 text-xs tracking-widest text-zinc-500 uppercase sticky top-0 bg-zinc-900 border-b border-zinc-800 shrink-0">
            ▶ En la cola
          </div>
          <div className="flex-1 overflow-y-auto">
            {cola.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3 px-6 py-2.5 border-b border-zinc-800/50">
                <span className="text-zinc-600 text-xs w-4 text-right">{i + 1}</span>
                <img src={c.imagenUrl} alt="" className="w-9 h-9 rounded object-contain bg-zinc-800" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{c.titulo}</div>
                  <div className="text-xs text-zinc-500">{c.artista}</div>
                </div>
                <div className="text-xs text-zinc-500">{formatDur(c.duracion)}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Comprar fichas */}
      <div className="shrink-0 border-t border-zinc-800 px-5 py-4 bg-zinc-900">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs tracking-widest text-zinc-500 uppercase">Comprar fichas</div>
          <div className="text-xs text-zinc-600">{fichasPack} fichas = ${precioPack.toLocaleString('es-AR')}</div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => setCantidad(c => Math.max(fichasPack, c - fichasPack))}
            className="w-10 h-10 rounded-xl bg-zinc-800 active:bg-zinc-700 text-white text-lg flex items-center justify-center"
          >
            −
          </button>
          <div className="flex-1 text-center">
            <div className="text-2xl font-black text-yellow-400" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              {cantidad} fichas
            </div>
            <div className="text-xs text-zinc-500">tenés {fichas} ahora</div>
          </div>
          <button
            onClick={() => setCantidad(c => c + fichasPack)}
            className="w-10 h-10 rounded-xl bg-zinc-800 active:bg-zinc-700 text-white text-lg flex items-center justify-center"
          >
            +
          </button>
        </div>
        <button
          onClick={() => onPagar(cantidad, total)}
          className="w-full bg-yellow-400 active:bg-yellow-300 text-black font-black py-4 rounded-xl text-xl transition-colors"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
        >
          PAGAR ${total.toLocaleString('es-AR')}
        </button>
      </div>
    </div>
  )
}
