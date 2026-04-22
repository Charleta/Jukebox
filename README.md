# Rancho Aparte — Rockola / JukeBox

Sistema de rockola digital para bares, pensado para correr en una pantalla táctil. Los clientes buscan canciones y las agregan a la cola pagando con fichas (físicas o por QR con MercadoPago). El encargado controla todo desde un panel de administración en su celular.

## ¿Cómo funciona?

### Para el cliente (pantalla táctil del local)
- Busca artistas o canciones en Spotify
- Navega listas de canciones precargadas por el admin
- Agrega canciones a la cola usando fichas
- Puede comprar fichas escaneando un QR de MercadoPago

### Para el admin (desde el celular)
- Controla reproducción (play, pausa, skip)
- Carga y descuenta fichas manualmente
- Guarda canciones en listas o en Favoritos (❤ en el player)
- Crea, renombra, oculta y reordena listas de canciones
- Configura listas de arranque (suenan automáticamente al iniciar, mezcladas)
- Configura límites de duración y precio del pack de fichas
- Reordena la cola con drag & drop

### Para el operador (vista simplificada)
- Ve qué está sonando y cuántas fichas hay
- Puede cargar fichas con un solo botón

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router) |
| UI | React 19 + Tailwind CSS 4 |
| Reproductor | Spotify Web Playback SDK |
| Base de datos local | SQLite vía Prisma (cola, fichas, config, pagos) |
| Base de datos cloud | PostgreSQL en Supabase (listas de canciones) |
| Pagos | MercadoPago API (QR dinámico) |
| Auth | Cookie httpOnly firmada con HMAC-SHA256 |

---

## Requisitos previos

- Node.js 18+
- Cuenta de Spotify Premium + app creada en [Spotify Developer Dashboard](https://developer.spotify.com)
- Cuenta en [Supabase](https://supabase.com) (base de datos de listas)
- Cuenta en MercadoPago con acceso a la API

---

## Instalación

```bash
git clone https://github.com/tu-usuario/jukebox.git
cd jukebox
npm install
