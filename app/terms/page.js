import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { TERMS_HTML } from '../../content/terms'


export default function Terms() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40 z-50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center">
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
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
          </div>

          {/* Terms content goes here. Replace the placeholder text with the actual terms text. */}
          <article className="prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: TERMS_HTML }} />
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
