import crypto from 'crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export type JukeboxRole = 'admin' | 'operador' | 'superadmin'

export interface JukeboxSessionContext {
  role: JukeboxRole
  deviceId: string | null
  venueId: string | null
}

const SESSION_COOKIE = 'jukebox_session'
const DEVICE_COOKIE = 'jukebox_device'
const SESSION_TTL_SECONDS = 60 * 60 * 8
const SESSION_VERSION = 1

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET no definido')
  return secret
}

function sign(value: string) {
  return crypto.createHmac('sha256', getSessionSecret()).update(value).digest('hex')
}

function getDefaultVenueId() {
  return (
    process.env.JUKEBOX_VENUE_ID ||
    process.env.VENUE_ID ||
    process.env.VENUE_SLUG ||
    'default-venue'
  )
}

function safeJsonParse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

function parseLegacySession(raw: string): JukeboxSessionContext | null {
  const dotIdx = raw.indexOf('.')
  if (dotIdx === -1) return null

  const role = raw.slice(0, dotIdx)
  const sig = raw.slice(dotIdx + 1)
  if (role !== 'admin' && role !== 'operador' && role !== 'superadmin') return null

  const expected = sign(role)
  const sigBuf = Buffer.from(sig, 'hex')
  const expBuf = Buffer.from(expected, 'hex')
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return null

  return { role, deviceId: null, venueId: null }
}

export function createDeviceId() {
  return crypto.randomUUID()
}

export function buildSessionValue(context: JukeboxSessionContext) {
  const payload = {
    v: SESSION_VERSION,
    role: context.role,
    deviceId: context.deviceId,
    venueId: context.venueId,
    issuedAt: new Date().toISOString(),
  }

  const serialized = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url')
  return `${serialized}.${sign(serialized)}`
}

export function parseSessionValue(raw: string | undefined | null): JukeboxSessionContext | null {
  if (!raw) return null

  const legacy = parseLegacySession(raw)
  if (legacy) return legacy

  const dotIdx = raw.lastIndexOf('.')
  if (dotIdx === -1) return null

  const encoded = raw.slice(0, dotIdx)
  const sig = raw.slice(dotIdx + 1)
  const expected = sign(encoded)
  const sigBuf = Buffer.from(sig, 'hex')
  const expBuf = Buffer.from(expected, 'hex')
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return null

  const decoded = Buffer.from(encoded, 'base64url').toString('utf8')
  const payload = safeJsonParse<{ v?: number; role?: string; deviceId?: string; venueId?: string }>(decoded)
  if (!payload || payload.v !== SESSION_VERSION) return null
  if (payload.role !== 'admin' && payload.role !== 'operador' && payload.role !== 'superadmin') return null

  return {
    role: payload.role,
    deviceId: payload.deviceId ?? null,
    venueId: payload.venueId ?? null,
  }
}

export async function readSessionContext() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)?.value
  return parseSessionValue(session)
}

export async function readDeviceId() {
  const cookieStore = await cookies()
  return cookieStore.get(DEVICE_COOKIE)?.value ?? null
}

export function writeSessionCookie(res: NextResponse, context: JukeboxSessionContext) {
  res.cookies.set(SESSION_COOKIE, buildSessionValue(context), {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  })
}

export function writeDeviceCookie(res: NextResponse, deviceId: string) {
  res.cookies.set(DEVICE_COOKIE, deviceId, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, '', { maxAge: 0, path: '/' })
}

export function getVenueContext() {
  return {
    venueId: getDefaultVenueId(),
    venueName: process.env.JUKEBOX_VENUE_NAME || process.env.VENUE_NAME || 'Jukebox',
  }
}

export function isPrivilegedRole(role: string | null | undefined) {
  return role === 'admin' || role === 'superadmin'
}
