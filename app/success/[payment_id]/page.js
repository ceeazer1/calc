import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Package, Mail, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function SuccessPage({ params }) {
  const { payment_id } = params

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="border-b border-white/10 bg-black/70 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="CalcAI Logo"
              width={200}
              height={60}
              className="h-6 w-auto transition-transform group-hover:scale-105"
              priority
            />
          </Link>
          <Link href="/help" className="text-sm text-gray-400 hover:text-white transition">
            Need help?
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <CheckCircle2 className="w-10 h-10 text-blue-500" />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              Order Confirmed
            </h1>
            <p className="text-lg text-gray-400 max-w-md mx-auto">
              Thank you for your purchase. We're getting your CalcAI ready for shipment.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 sm:p-8 mt-12 text-left space-y-6 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold text-gray-500 mb-1">Order ID</p>
                <code className="text-blue-400 font-mono text-sm sm:text-base break-all uppercase">
                  {payment_id || 'CALC-BH-1024'}
                </code>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full w-fit">
                <Package className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-semibold text-blue-500">Processing</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <h4>Check your inbox</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  We've sent a detailed confirmation email and receipt. If you don't see it, please check your spam folder.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Package className="w-4 h-4 text-gray-400" />
                  <h4>Tracking updates</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Once your order ships (usually within 1-2 business days), we'll send you another email with your tracking number.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white text-black px-8 py-4 text-sm font-bold hover:bg-gray-200 transition-all active:scale-95"
            >
              Back to Home
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-zinc-900 text-white border border-white/10 px-8 py-4 text-sm font-bold hover:bg-zinc-800 transition-all active:scale-95 group"
            >
              Order Status
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-white/5 py-10 opacity-50">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} CalcAI. Licensed for educational support.</p>
        </div>
      </footer>
    </div>
  )
}
