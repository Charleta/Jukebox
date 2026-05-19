# Resumen YouTube Admin UX

## Contexto

Se agrego y refinó el flujo para controlar una pantalla secundaria de YouTube desde el admin del jukebox. La pantalla recomendada es por HDMI, usando Windows en modo `Extender`, abriendo `/youtube-screen` en la segunda pantalla y fullscreen manual con `F11`.

No se implemento integracion tipo Chromecast/Cast de YouTube porque el player embebido no permite abrir/controlar el selector oficial de dispositivos. Tampoco se agrego limite de duracion de videos por decision actual.

## Archivos clave

- `src/app/admin/page.tsx`: UI y logica del panel YouTube en admin.
- `src/app/youtube-screen/page.tsx`: pantalla receptora fullscreen con YouTube iframe API.
- `src/app/api/youtube/current/route.ts`: estado actual de video, cola, volumen y control.
- `src/app/api/youtube/queue/route.ts`: alta, vaciado y edicion de cola YouTube.
- `src/app/api/youtube/play/route.ts`: envia video actual y pausa Spotify.
- `src/app/api/youtube/control/route.ts`: play, pause, stop, replay, mute, unmute y volumen.
- `src/app/api/youtube/next/route.ts`: pasa al siguiente video de la cola.

## UX implementada

- El bloque YouTube del admin ahora arranca con indicacion de pantalla HDMI y video actual.
- La busqueda de video quedo arriba de la cola para operacion rapida.
- Los botones de resultado dicen `PONER AHORA` y `AGREGAR A COLA`.
- `AGREGAR A COLA` tiene mas peso visual que antes para evitar cortar el video actual por error.
- Si hay video en pantalla y se intenta `PONER AHORA`, pide confirmacion antes de reemplazar.
- La cola muestra empty state cuando esta vacia.
- Cada item de cola permite `AHORA`, `SUBIR`, `BAJAR` y `QUITAR`.
- El volumen tiene debounce de 350ms para no disparar requests en cada pixel del slider.
- Hay presets de volumen `0%`, `50%`, `80%`, `100%`.
- Las acciones delicadas quedaron separadas: `STOP` y `QUITAR ACTUAL`.
- Los textos `ABRIR`/`CERRAR` se aclararon como control de pantalla.

## Estado de pantalla conectada

Se elimino el chequeo automatico de pantalla conectada para evitar requests/escrituras periodicas en la base de datos.

El admin ahora muestra una indicacion fija `Pantalla HDMI` con la instruccion de abrir `/youtube-screen` en la segunda pantalla. Para saber si realmente esta abierta, se verifica visualmente en la pantalla HDMI.

## Modelo de datos usado

Todo el estado remoto de YouTube se guarda en `AppConfig` usando claves:

- `youtube_current_video_id`
- `youtube_current_video_title`
- `youtube_current_channel`
- `youtube_current_thumbnail`
- `youtube_updated_at`
- `youtube_control_action`
- `youtube_control_updated_at`
- `youtube_queue`
- `youtube_volume`

No se agregaron migraciones ni tablas nuevas.

## Comportamiento operativo

Flujo recomendado:

1. Conectar TV/monitor por HDMI.
2. Windows: `Win + P` y elegir `Extender`.
3. Abrir admin en pantalla principal.
4. Abrir `/youtube-screen` en segunda pantalla.
5. Poner fullscreen con `F11`.
6. Controlar videos desde admin, seccion `YouTube`.

Notas:

- Si se abre `/youtube-screen` directamente en una TV con navegador, el audio saldria por la TV.
- Con HDMI por cable se puede elegir salida de audio desde Windows para mantener audio en la PC/equipo.
- El fullscreen no se puede forzar remotamente desde el admin por restricciones del navegador.

## Verificacion realizada

- `npx tsc --noEmit`: paso correctamente.
- `npm run build`: paso correctamente.
- `npm run lint`: falla por problemas preexistentes en archivos generados y otros modulos, no por TypeScript de este cambio.

## Git

Cambio commiteado y pusheado:

```txt
e4a7a56 Refine YouTube admin control UX
```

Rama:

```txt
feat/vercel-supabase-migration
```

Quedo `prisma/dev.db` modificado en working tree, pero no fue incluido porque no correspondia a este cambio.

## Pendientes posibles

- Agregar duracion de videos y bloqueo/advertencia para videos largos.
- Si se quiere recuperar estado conectado, usar una estrategia que no escriba a DB cada pocos segundos.
- Evaluar reducir lecturas/escrituras de `AppConfig` si Supabase vuelve a saturar conexiones.
- Excluir `src/generated/cloud` del lint o ajustar config para evitar falsos errores en codigo generado.
