import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CalcAI - TI-84 Plus with ChatGPT Integration',
  description: 'Revolutionary TI-84 Plus calculator with discrete ChatGPT integration. Perfect for students who need advanced AI assistance.',
  keywords: 'TI-84 Plus, ChatGPT, calculator, AI, student, math, discrete, modded',
  authors: [{ name: 'CalcAI' }],
  openGraph: {
    title: 'CalcAI - Smart Calculator with AI',
    description: 'TI-84 Plus calculator with discrete ChatGPT integration',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalcAI - Smart Calculator with AI',
    description: 'TI-84 Plus calculator with discrete ChatGPT integration',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
