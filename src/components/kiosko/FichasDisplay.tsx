interface Props {
  fichas: number
}

export function FichasDisplay({ fichas }: Props) {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-t border-b border-zinc-800">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-xs shrink-0">
          $
        </div>
        <span className="text-zinc-500 text-xs uppercase tracking-widest">Fichas disponibles</span>
        <span className="text-yellow-400 font-black text-xl leading-none" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{fichas}</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${i < fichas ? 'bg-yellow-400' : 'border border-zinc-600'}`}
          />
        ))}
      </div>
    </div>
  )
}