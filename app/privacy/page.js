import Link from 'next/link'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { ArrowLeft } from 'lucide-react'
import { PRIVACY_HTML } from '../../content/privacy'

const poppins = Poppins({ subsets: ['latin'], weight: ['400','500','600','700'] })

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className={`${poppins.className} fixed top-0 w-full bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40 z-50 border-b border-white/10`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-14">
            {/* Left: Community, Specifications */}
            <div className="hidden md:flex items-center gap-8 justify-start">
              <Link href="/community" className="text-gray-300 hover:text-white text-sm font-medium">Community</Link>
              <Link href="/#whats-inside" className="text-gray-300 hover:text-white text-sm font-medium">Specifications</Link>
            </div>
            {/* Center: Logo */}
            <div className="flex items-center justify-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="CalcAI Logo"
                  width={200}
                  height={60}
                  className="h-5 sm:h-6 w-auto transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                />
              </Link>
            </div>
            {/* Right: FAQ, Cart */}
            <div className="flex items-center gap-8 justify-end">
              <Link href="/faq" className="text-gray-300 hover:text-white text-sm font-medium">FAQ</Link>
              <Link href="/cart" className="text-gray-300 hover:text-white text-sm font-medium">Cart</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          </div>

          <article className="prose prose-invert max-w-3xl mx-auto prose-h2:text-white prose-h2:mt-10 prose-h2:mb-3 prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300">
            <div dangerouslySetInnerHTML={{ __html: PRIVACY_HTML }} />
          </article>

          <div className="mt-8">
            <Link href="/" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

