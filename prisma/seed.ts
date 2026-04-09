import { PrismaClient as PrismaLocal } from '@prisma/client'
import { PrismaClient as PrismaCloud } from '../src/generated/cloud'

const local = new PrismaLocal()
const cloud = new PrismaCloud()

async function main() {
  console.log('Limpiando tablas...')
  await local.cola.deleteMany()
 

  console.log('Insertando playlists en Supabase...')

  await cloud.playlist.create({
    data: {
      nombre: 'Cumbia Argentina',
      descripcion: 'Lo mejor de la cumbia argentina',
      imagenUrl: '',
      canciones: {
        create: [
          { titulo: 'Quiero Más',          artista: 'Los Palmeras',  duracion: 211, spotifyUri: 'spotify:track:3n3oP4QCN3x0YEsaNJfVFp', imagenUrl: '', orden: 1 },
          { titulo: 'Amigos con Derechos', artista: 'Ráfaga',         duracion: 198, spotifyUri: 'spotify:track:6lXKNdOsnaLv9LwulZbxNl', imagenUrl: '', orden: 2 },
          { titulo: 'La Colegiala',        artista: 'Amar Azul',      duracion: 218, spotifyUri: 'spotify:track:2wpa3pQBaFMQKgAhPGsSpX', imagenUrl: '', orden: 3 },
          { titulo: 'Me Vas a Extrañar',   artista: 'Damas Gratis',   duracion: 243, spotifyUri: 'spotify:track:5vNRhkKd0yEAg8suGBpjeY', imagenUrl: '', orden: 4 },
          { titulo: 'Mi Santa',            artista: 'Los Palmeras',   duracion: 224, spotifyUri: 'spotify:track:4tDbM9ITPcBnRMGTYJHaSH', imagenUrl: '', orden: 5 },
        ],
      },
    },
  })

  await cloud.playlist.create({
    data: {
      nombre: 'Rock Nacional',
      descripcion: 'Los clásicos del rock argentino',
      imagenUrl: '',
      canciones: {
        create: [
          { titulo: 'De Música Ligera',        artista: 'Soda Stereo',           duracion: 246, spotifyUri: 'spotify:track:2374M2M9YHnBmWxAONXgry', imagenUrl: '', orden: 1 },
          { titulo: 'Espejo',                  artista: 'Divididos',              duracion: 261, spotifyUri: 'spotify:track:3yXOd8J0P9XJxMHXnVyH4Z', imagenUrl: '', orden: 2 },
          { titulo: 'Jijiji',                  artista: 'Los Redonditos de Ricota',duracion: 312, spotifyUri: 'spotify:track:1RqeRoNnurxSXOIy3LL4zR', imagenUrl: '', orden: 3 },
          { titulo: 'No Voy en Tren',          artista: 'Charly García',          duracion: 287, spotifyUri: 'spotify:track:5kqDuRb0jTrAl3aIkqJMPH', imagenUrl: '', orden: 4 },
          { titulo: 'El Amor Después del Amor',artista: 'Fito Páez',              duracion: 303, spotifyUri: 'spotify:track:0VjIjW4GlUZAMYd2vXMi3b', imagenUrl: '', orden: 5 },
        ],
      },
    },
  })

  await cloud.playlist.create({
    data: {
      nombre: 'Reggaeton',
      descripcion: 'Los hits del reggaeton latino',
      imagenUrl: '',
      canciones: {
        create: [
          { titulo: 'Dakiti',    artista: 'Bad Bunny & Jhay Cortez', duracion: 219, spotifyUri: 'spotify:track:5wANPM4fzvnaU18MHjoexp', imagenUrl: '', orden: 1 },
          { titulo: 'Safari',   artista: 'J Balvin',                 duracion: 210, spotifyUri: 'spotify:track:7vLPVqMBfDwgSaHp0BYSIK', imagenUrl: '', orden: 2 },
          { titulo: 'Goteo',    artista: 'Duki',                     duracion: 185, spotifyUri: 'spotify:track:4cluDES4hQEUhmXj6TXkSo', imagenUrl: '', orden: 3 },
          { titulo: 'Todo de Ti',artista: 'Rauw Alejandro',          duracion: 176, spotifyUri: 'spotify:track:1r9xUipOqoNwggBpENDsvJ', imagenUrl: '', orden: 4 },
          { titulo: 'La Playa', artista: 'Myke Towers',              duracion: 197, spotifyUri: 'spotify:track:3Wrjmx4MgQJe4Pu4GS4UdP', imagenUrl: '', orden: 5 },
        ],
      },
    },
  })

  console.log('Cargando cola inicial en SQLite...')
  const canciones = [
    { titulo: 'Quiero Más',          artista: 'Los Palmeras',  duracion: 211, spotifyUri: 'spotify:track:3n3oP4QCN3x0YEsaNJfVFp', imagenUrl: '' },
    { titulo: 'Amigos con Derechos', artista: 'Ráfaga',         duracion: 198, spotifyUri: 'spotify:track:6lXKNdOsnaLv9LwulZbxNl', imagenUrl: '' },
    { titulo: 'La Colegiala',        artista: 'Amar Azul',      duracion: 218, spotifyUri: 'spotify:track:2wpa3pQBaFMQKgAhPGsSpX', imagenUrl: '' },
    { titulo: 'De Música Ligera',    artista: 'Soda Stereo',    duracion: 246, spotifyUri: 'spotify:track:2374M2M9YHnBmWxAONXgry', imagenUrl: '' },
    { titulo: 'Jijiji',              artista: 'Los Redonditos', duracion: 312, spotifyUri: 'spotify:track:1RqeRoNnurxSXOIy3LL4zR', imagenUrl: '' },
    { titulo: 'Dakiti',              artista: 'Bad Bunny',      duracion: 219, spotifyUri: 'spotify:track:5wANPM4fzvnaU18MHjoexp', imagenUrl: '' },
    { titulo: 'Me Vas a Extrañar',   artista: 'Damas Gratis',   duracion: 243, spotifyUri: 'spotify:track:5vNRhkKd0yEAg8suGBpjeY', imagenUrl: '' },
    { titulo: 'Goteo',               artista: 'Duki',           duracion: 185, spotifyUri: 'spotify:track:4cluDES4hQEUhmXj6TXkSo', imagenUrl: '' },
    { titulo: 'Espejo',              artista: 'Divididos',      duracion: 261, spotifyUri: 'spotify:track:3yXOd8J0P9XJxMHXnVyH4Z', imagenUrl: '' },
    { titulo: 'Todo de Ti',          artista: 'Rauw Alejandro', duracion: 176, spotifyUri: 'spotify:track:1r9xUipOqoNwggBpENDsvJ', imagenUrl: '' },
  ]
  await local.cola.createMany({
    data: canciones.map((c, i) => ({ ...c, orden: i + 1 })),
  })

  console.log('Seed completado.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => {
    await local.$disconnect()
    await cloud.$disconnect()
  })
