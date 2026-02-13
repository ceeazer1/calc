import './globals.css'


import { Space_Grotesk } from 'next/font/google'
import ThemeBackground from '../components/ThemeBackground'
import Navbar from '../components/Navbar'

// Display-forward, modern font inspired by OrbAI aesthetics
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata = {
  title: 'CalcAI',
  description: 'advanced AI calculator',
  keywords: 'AI, calculator, advanced, math, student, assistant',
  authors: [{ name: 'CalcAI' }],
  metadataBase: new URL('https://calcai.cc'),
  icons: {
    icon: [
      { url: '/logo_icon.png', type: 'image/png', sizes: '16x16' },
      { url: '/logo_icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/logo_icon.png', type: 'image/png', sizes: '96x96' },
      { url: '/logo_icon.png', sizes: '192x192' }
    ],
    apple: [
      { url: '/logo_icon.png', sizes: '120x120' },
      { url: '/logo_icon.png', sizes: '152x152' },
      { url: '/logo_icon.png', sizes: '167x167' },
      { url: '/logo_icon.png', sizes: '180x180' }
    ],
    shortcut: ['/logo_icon.png'],
  },
  openGraph: {
    title: 'CalcAI',
    description: 'advanced AI calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalcAI',
    description: 'advanced AI calculator',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <ThemeBackground />
        <div className="min-h-screen relative">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
