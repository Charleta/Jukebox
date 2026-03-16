import { CancionCola } from '@/hooks/useCola'

function formatDur(segundos: number) {
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

interface Props {
  cola: CancionCola[]
}

export function ColaProximas({ cola }: Props) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-3 text-xs tracking-widest text-zinc-500 uppercase sticky top-0 bg-zinc-900 border-b border-zinc-800">
        ▶ En la cola
      </div>
      {cola.length === 0 && (
        <div className="px-6 py-8 text-zinc-600 text-sm text-center">
          La cola está vacía
        </div>
      )}
      {cola.map((c, i) => (
        <div key={c.id} className="flex items-center gap-3 px-6 py-2.5 border-b border-zinc-800/50 hover:bg-zinc-800/30">
          <span className="text-zinc-600 text-xs w-4 text-right">{i + 1}</span>
          <img src={c.imagenUrl} alt="" className="w-9 h-9 rounded object-cover" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{c.titulo}</div>
            <div className="text-xs text-zinc-500">{c.artista}</div>
          </div>
          <div className="text-xs text-zinc-500">{formatDur(c.duracion)}</div>
        </div>
      ))}
    </div>
  )
}