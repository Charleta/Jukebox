export interface SpotifyArtist {
  id: string
  name: string
  images: { url: string }[]
  genres: string[]
  followers: { total: number }
}

export interface SpotifyTrack {
  id: string
  name: string
  uri: string
  duration_ms: number
  album: {
    name: string
    images: { url: string }[]
  }
  artists: { name: string }[]
}

export type Pantalla = 'inicio' | 'artista' | 'canciones'