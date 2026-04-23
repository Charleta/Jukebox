export interface AppConfigState {
  maxDurKiosko: number
  maxDurAdmin: number
  fichasPack: number
  precioPack: number
  autostartPlaylists: string
}

export const DEFAULT_APP_CONFIG: AppConfigState = {
  maxDurKiosko: 300,
  maxDurAdmin: 300,
  fichasPack: 2,
  precioPack: 1000,
  autostartPlaylists: '[]',
}

export interface RecoverySignal {
  command: string
  requestedAt: string
}

export const EMPTY_RECOVERY_SIGNAL: RecoverySignal = {
  command: '',
  requestedAt: '',
}

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

