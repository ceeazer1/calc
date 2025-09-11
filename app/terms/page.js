import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

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
                  width={80}
                  height={80}
                  className="w-20 h-20 transform hover:scale-105 transition-transform duration-200 cursor-pointer"
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
            <p className="text-sm text-gray-400 mt-2">If the PDF doesn't display, use the download link below.</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-gray-900/50">
            <object data="/terms.pdf#view=FitH" type="application/pdf" className="w-full h-[80vh] rounded-xl">
              <div className="p-6 text-center text-gray-300">
                <p className="mb-4">Unable to display the PDF inline.</p>
                <a href="/terms.pdf" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Open Terms (PDF)</a>
              </div>
            </object>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <a href="/terms.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300 underline">Download Terms (PDF)</a>
          </div>
        </div>
      </main>
    </div>
  )
}
