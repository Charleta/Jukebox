import dotenv from 'dotenv'
import { resolve } from 'path'

// Carga .env.local primero (tiene Spotify keys + DB URLs)
dotenv.config({ path: resolve(__dirname, '../.env.local') })
// Fallback a .env
dotenv.config({ path: resolve(__dirname, '../.env') })
