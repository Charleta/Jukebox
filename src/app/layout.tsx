import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'


const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JukeBox',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        
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
      <body className={`${dmSans.className} bg-black`}>{children}</body>
    </html>
  )
}