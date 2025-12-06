"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function loadSquareScript() {
  return new Promise((resolve, reject) => {
    if (window.Square) return resolve()
    const script = document.createElement('script')
    script.src = 'https://web.squarecdn.com/v1/square.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Square.js'))
    document.head.appendChild(script)
  })
}

export default function PayPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [card, setCard] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const subtotal = savedCart.reduce((sum, i) => sum + (Number(i.price || 0) * Number(i.quantity || 1)), 0)
    const withShipping = subtotal + 13
    setTotal(withShipping)

    ;(async () => {
      try {
        await loadSquareScript()
        const cfgRes = await fetch('/api/square/config')
        const cfg = await cfgRes.json()
        if (!cfgRes.ok) throw new Error(cfg?.error || 'Square config error')

        const payments = window.Square.payments(cfg.appId, cfg.locationId)
        const card = await payments.card({
          style: {
            input: {
              backgroundColor: 'rgb(10,10,10)',
              color: '#ffffff',
              fontSize: '16px',
              placeholderColor: 'rgb(160,160,160)'
            }
          }
        })
        await card.attach('#card-container')
        setCard(card)
      } catch (e) {
        console.error(e)
        setError(e?.message || 'Failed to initialize payment')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handlePay = async () => {
    try {
      if (!card) return
      setError('')
      const result = await card.tokenize()
      if (result.status !== 'OK') {
        const msg = result?.errors?.[0]?.message || 'Card validation failed'
        setError(msg)
        return
      }
      const token = result.token
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')

      const res = await fetch('/api/payments/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, cartItems })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || 'Payment failed')
        return
      }
      localStorage.removeItem('cart')
      router.push('/success')
    } catch (e) {
      console.error(e)
      setError(e?.message || 'Payment error')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black/70 backdrop-blur border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/cart" className="text-sm text-gray-300 hover:text-white">Back to Cart</Link>
          <div className="font-semibold">Secure Checkout</div>
          <div />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-6">
          <h1 className="text-xl font-bold mb-4">Pay ${'{'}total.toFixed(2){'}'}</h1>
          <p className="text-xs text-gray-400 mb-4">Shipping: US only - $13 flat rate</p>

          {error && (
            <div className="mb-4 text-sm text-red-300">{error}</div>
          )}

          {loading ? (
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="w-5 h-5 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
              Initializing secure payment…
            </div>
          ) : (
            <>
              <div id="card-container" className="rounded-lg border border-white/10 bg-black p-4" />
              <button
                onClick={handlePay}
                disabled={!card}
                className={`mt-4 w-full py-3 rounded-lg font-semibold transition-all ${!card ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'}`}
              >
                Pay ${'{'}total.toFixed(2){'}'}
              </button>
              <p className="mt-3 text-xs text-gray-400">Your card data is handled by Square. We do not store or see your card details.</p>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

