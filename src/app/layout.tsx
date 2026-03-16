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

      </head>
      <body className={`${dmSans.className} bg-black`}>{children}</body>
    </html>
  )
}