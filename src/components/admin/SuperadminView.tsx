'use client'
import { useEffect, useState } from 'react'

interface DevSession {
  id: string
  role: string
  expiresAt: string
  revokedAt: string | null
  createdAt: string
}

interface DevDevice {
  id: string
  fingerprint: string
  name: string
  role: string
  approved: boolean
  lastSeenAt: string | null
  createdAt: string
  updatedAt: string
  sessions: DevSession[]
}

interface DevVenue {
  id: string
  slug: string
  name: string
  active: boolean
  createdAt: string
  updatedAt: string
  devices: DevDevice[]
}

interface DevAttempt {
  id: string
  fingerprint: string
  surface: string
  path: string
  result: string
  message: string
  userAgent: string
  createdAt: string
  device: {
    id: string
    name: string
    fingerprint: string
    role: string
    approved: boolean
  } | null
  venue: {
    id: string
    slug: string
    name: string
  }
}

export function SuperadminView({ onLogout }: { onLogout: () => void }) {
  const [venues, setVenues] = useState<DevVenue[]>([])
  const [attempts, setAttempts] = useState<DevAttempt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('')
  const [busyDeviceId, setBusyDeviceId] = useState<string | null>(null)
  const [toast, setToast] = useState('')

  const cargar = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/dev/registry', { cache: 'no-store' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'No autorizado')
      setVenues(data.venues ?? [])
      setAttempts(data.attempts ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void cargar()
  }, [])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2200)
  }

  const updateDevice = async (deviceId: string, body: Record<string, unknown>, successMsg: string) => {
    setBusyDeviceId(deviceId)
    setError('')
    try {
      const res = await fetch(`/api/dev/devices/${deviceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'No se pudo actualizar')
      await cargar()
      showToast(successMsg)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar')
    } finally {
      setBusyDeviceId(null)
    }
  }

  const normalizedFilter = filter.trim().toLowerCase()
  const visibleVenues = venues
    .map(venue => {
      const venueMatches = !normalizedFilter
        || venue.name.toLowerCase().includes(normalizedFilter)
        || venue.slug.toLowerCase().includes(normalizedFilter)

      const devices = venue.devices.filter(device => {
        if (!normalizedFilter) return true
        const haystack = [
          device.name,
          device.role,
          device.fingerprint,
          device.approved ? 'aprobado' : 'pendiente',
        ].join(' ').toLowerCase()
        return haystack.includes(normalizedFilter)
      })

      return { ...venue, devices, venueMatches }
    })
    .filter(item => item.venueMatches || item.devices.length > 0)

  const visibleAttempts = attempts.filter(attempt => {
    if (!normalizedFilter) return true
    const haystack = [
      attempt.surface,
      attempt.path,
      attempt.result,
      attempt.message,
      attempt.fingerprint,
      attempt.userAgent,
      attempt.device?.name ?? '',
      attempt.device?.role ?? '',
      attempt.venue.name,
      attempt.venue.slug,
    ].join(' ').toLowerCase()
    return haystack.includes(normalizedFilter)
  })

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black text-white px-4 py-5 sm:px-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="text-xs tracking-widest text-yellow-400 uppercase">Superadmin</div>
            <h1 className="text-3xl font-black leading-none" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>Venues y Devices</h1>
            <p className="mt-2 max-w-2xl text-xs text-zinc-500">
              Administrá qué equipos pueden entrar al kiosko o al panel, y revocá sesiones cuando quieras.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button onClick={cargar} className="w-full rounded-xl bg-zinc-800 px-4 py-2.5 text-sm sm:w-auto">
              Refrescar
            </button>
            <button onClick={onLogout} className="w-full rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-bold text-black sm:w-auto">
              Salir
            </button>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
          <label className="mb-2 block text-xs uppercase tracking-widest text-zinc-500">Buscar</label>
          <input
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Venue, device, rol, fingerprint..."
            className="w-full min-w-0 rounded-xl border border-zinc-700 bg-black/60 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400"
          />
        </div>

        {loading && <div className="text-sm text-zinc-500">Cargando inventario...</div>}
        {error && <div className="break-words text-sm text-red-400">{error}</div>}

        {!loading && !error && (
          <section className="w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black leading-none text-yellow-400" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  Intentos recientes
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Abrir kiosko, admin o login queda registrado aquí, aunque no termine en sesión.
                </p>
              </div>
              <div className="text-xs text-zinc-500">{visibleAttempts.length} eventos</div>
            </div>

            <div className="mt-4 grid gap-3">
              {visibleAttempts.slice(0, 12).map(attempt => (
                <article key={attempt.id} className="w-full min-w-0 overflow-hidden rounded-xl border border-zinc-800 bg-black/40 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] uppercase tracking-widest text-zinc-300">
                          {attempt.surface}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest ${
                          attempt.result === 'ok'
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : attempt.result === 'blocked'
                              ? 'bg-red-500/15 text-red-300'
                              : 'bg-yellow-500/15 text-yellow-300'
                        }`}>
                          {attempt.result}
                        </span>
                      </div>
                      <div className="mt-2 break-words text-sm font-semibold text-white">{attempt.message}</div>
                      <div className="mt-1 break-all text-xs text-zinc-500">
                        {attempt.venue.name} · {attempt.path}
                      </div>
                    </div>
                    <div className="shrink-0 text-xs text-zinc-500">
                      {new Date(attempt.createdAt).toLocaleString('es-AR')}
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <div className="min-w-0 rounded-lg bg-zinc-950/60 px-3 py-2 text-xs text-zinc-400">
                      <span className="mb-1 block text-[10px] uppercase tracking-widest text-zinc-500">Device</span>
                      {attempt.device ? (
                        <>
                          <div className="font-semibold text-zinc-200">{attempt.device.name}</div>
                          <div className="break-all font-mono text-[11px] text-zinc-500">{attempt.device.fingerprint}</div>
                        </>
                      ) : (
                        <div className="text-zinc-500">Sin device asociado</div>
                      )}
                    </div>
                    <div className="min-w-0 rounded-lg bg-zinc-950/60 px-3 py-2 text-xs text-zinc-400">
                      <span className="mb-1 block text-[10px] uppercase tracking-widest text-zinc-500">User agent</span>
                      <div className="break-words">{attempt.userAgent}</div>
                    </div>
                  </div>
                </article>
              ))}
              {visibleAttempts.length === 0 && (
                <div className="text-sm text-zinc-600">No hay intentos que coincidan con el filtro.</div>
              )}
            </div>
          </section>
        )}

        {!loading && !error && visibleVenues.map(venue => (
          <section key={venue.id} className="w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 sm:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="break-words text-xl font-black leading-none text-yellow-400" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  {venue.name}
                </h2>
                <p className="mt-1 break-all text-xs text-zinc-500">
                  {venue.slug} · {venue.active ? 'activo' : 'inactivo'}
                </p>
              </div>
              <div className="shrink-0 text-xs text-zinc-500">{venue.devices.length} devices</div>
            </div>

            <div className="mt-4 grid gap-3">
              {venue.devices.map(device => (
                <article key={device.id} className="w-full min-w-0 overflow-hidden rounded-xl border border-zinc-800 bg-black/40 p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="break-words text-sm font-semibold leading-tight sm:text-base">{device.name}</div>
                        <div className="mt-1 break-all font-mono text-xs leading-4 text-zinc-500">
                          {device.role} · {device.fingerprint}
                        </div>
                      </div>
                      <div className={`shrink-0 rounded-full px-2 py-1 text-xs ${device.approved ? 'bg-emerald-500/15 text-emerald-300' : 'bg-yellow-500/15 text-yellow-300'}`}>
                        {device.approved ? 'Aprobado' : 'Pendiente'}
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-3">
                      <div className="min-w-0 rounded-lg bg-zinc-950/60 px-3 py-2 text-xs break-words text-zinc-400">
                        <span className="mb-1 block text-[10px] uppercase tracking-widest text-zinc-500">Última actividad</span>
                        {device.lastSeenAt ? new Date(device.lastSeenAt).toLocaleString('es-AR') : 'sin datos'}
                      </div>
                      <div className="min-w-0 rounded-lg bg-zinc-950/60 px-3 py-2 text-xs break-words text-zinc-400">
                        <span className="mb-1 block text-[10px] uppercase tracking-widest text-zinc-500">Sesiones</span>
                        {device.sessions.length}
                      </div>
                      <div className="min-w-0 rounded-lg bg-zinc-950/60 px-3 py-2 text-xs break-words text-zinc-400">
                        <span className="mb-1 block text-[10px] uppercase tracking-widest text-zinc-500">Estado</span>
                        {device.approved ? 'Permitido' : 'Pendiente de aprobación'}
                      </div>
                    </div>

                    <details className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2">
                      <summary className="cursor-pointer select-none text-sm text-zinc-200">
                        Ver sesiones ({device.sessions.length})
                      </summary>
                      <div className="mt-3 space-y-2">
                        {device.sessions.length === 0 && <div className="text-xs text-zinc-500">Sin sesiones registradas.</div>}
                        {device.sessions.map(session => (
                          <div key={session.id} className="rounded-lg border border-zinc-800 bg-black/40 p-3 text-xs break-words">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                              <span className="font-semibold">{session.role}</span>
                              <span className={session.revokedAt ? 'text-red-300' : 'text-emerald-300'}>
                                {session.revokedAt ? 'revocada' : 'activa'}
                              </span>
                            </div>
                            <div className="mt-1 text-zinc-500">Expira: {new Date(session.expiresAt).toLocaleString('es-AR')}</div>
                            <div className="text-zinc-500">Creada: {new Date(session.createdAt).toLocaleString('es-AR')}</div>
                          </div>
                        ))}
                      </div>
                    </details>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      <button
                        onClick={() => updateDevice(device.id, { approved: true }, 'Device aprobado')}
                        disabled={busyDeviceId === device.id || device.approved}
                        className="w-full rounded-xl border border-emerald-500/20 bg-emerald-500/15 px-3 py-2.5 text-sm font-semibold text-emerald-300 disabled:opacity-50"
                      >
                        Permitir
                      </button>
                      <button
                        onClick={() => updateDevice(device.id, { approved: false, revokeSessions: true }, 'Device bloqueado')}
                        disabled={busyDeviceId === device.id}
                        className="w-full rounded-xl border border-red-500/20 bg-red-500/15 px-3 py-2.5 text-sm font-semibold text-red-300 disabled:opacity-50"
                      >
                        Sacar
                      </button>
                      <button
                        onClick={() => updateDevice(device.id, { revokeSessions: true }, 'Sesiones revocadas')}
                        disabled={busyDeviceId === device.id}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm font-semibold text-zinc-200 disabled:opacity-50"
                      >
                        Cerrar sesiones
                      </button>
                    </div>
                  </div>
                </article>
              ))}
              {venue.devices.length === 0 && <div className="text-sm text-zinc-600">No hay devices registrados.</div>}
            </div>
          </section>
        ))}

        {!loading && !error && visibleVenues.length === 0 && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 text-sm text-zinc-500">
            No hay resultados para ese filtro.
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 max-w-[92vw] -translate-x-1/2 rounded-xl bg-yellow-400 px-4 py-3 text-center text-sm font-bold text-black shadow-lg break-words">
          {toast}
        </div>
      )}
    </div>
  )
}
