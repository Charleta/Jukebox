import type { Metadata } from 'next'
import './globals.css'
import { JukeboxSyncProvider } from '@/providers/JukeboxSyncProvider'

export const metadata: Metadata = {
  title: 'JukeBox',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'window.onSpotifyWebPlaybackSDKReady = window.onSpotifyWebPlaybackSDKReady || function () {};' }} />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Bebas+Neue&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
        <script src="https://sdk.scdn.co/spotify-player.js"></script>

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#f5c842" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="JukeBox Admin" />

      </head>
      <body className="bg-black" style={{ fontFamily: 'DM Sans, sans-serif' }}>
        <JukeboxSyncProvider>{children}</JukeboxSyncProvider>
      </body>
    </html>
  )
}
