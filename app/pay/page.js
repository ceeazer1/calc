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
  // Buyer + Shipping (US only)
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [addr1, setAddr1] = useState('')
  const [addr2, setAddr2] = useState('')
  const [city, setCity] = useState('')
  const [stateUS, setStateUS] = useState('')
  const [postal, setPostal] = useState('')

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
              fontSize: '16px'
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

      // Basic required fields
      if (!email || !fullName || !addr1 || !city || !stateUS || !postal) {
        setError('Please fill in email and shipping address (US only).')
        return
      }

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
        body: JSON.stringify({
          token,
          cartItems,
          buyer: {
            email,
            fullName,
            address: {
              line1: addr1,
              line2: addr2,
              city,
              state: stateUS,
              postal,
              country: 'US'
            }
          }
        })
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
          <h1 className="text-xl font-bold mb-4">Pay ${total.toFixed(2)}</h1>
          <p className="text-xs text-gray-400 mb-4">Shipping: US only - $13 flat rate</p>

          {/* Buyer + Shipping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="md:col-span-2">
              <label className="text-xs text-gray-400">Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@example.com" className="mt-1 w-full rounded-md bg-black border border-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-400">Full name</label>
              <input value={fullName} onChange={e=>setFullName(e.target.value)} type="text" placeholder="First Last" className="mt-1 w-full rounded-md bg-black border border-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-400">Address line 1</label>
              <input value={addr1} onChange={e=>setAddr1(e.target.value)} type="text" placeholder="Street address" className="mt-1 w-full rounded-md bg-black border border-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-400">Address line 2 (optional)</label>
              <input value={addr2} onChange={e=>setAddr2(e.target.value)} type="text" placeholder="Apt, suite, etc." className="mt-1 w-full rounded-md bg-black border border-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400">City</label>
              <input value={city} onChange={e=>setCity(e.target.value)} type="text" className="mt-1 w-full rounded-md bg-black border border-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400">State</label>
              <input value={stateUS} onChange={e=>setStateUS(e.target.value)} type="text" placeholder="CA" className="mt-1 w-full rounded-md bg-black border border-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400">Postal code</label>
              <input value={postal} onChange={e=>setPostal(e.target.value)} type="text" placeholder="94105" className="mt-1 w-full rounded-md bg-black border border-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400">Country</label>
              <input value="US" readOnly className="mt-1 w-full rounded-md bg-black border border-white/10 px-3 py-2 text-sm text-white" />
            </div>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-300">{error}</div>
          )}

          {/* Card element container (must exist before attach) */}
          <div id="card-container" className="rounded-lg border border-white/10 bg-black p-4" />
          {loading ? (
            <div className="mt-4 flex items-center gap-3 text-sm text-gray-300">
              <div className="w-5 h-5 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
              Initializing secure payment…
            </div>
          ) : (
            <>
              <button
                onClick={handlePay}
                disabled={!card || !email || !fullName || !addr1 || !city || !stateUS || !postal}
                className={`mt-4 w-full py-3 rounded-lg font-semibold transition-all ${(!card || !email || !fullName || !addr1 || !city || !stateUS || !postal) ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'}`}
              >
                Pay ${total.toFixed(2)}
              </button>
              <p className="mt-3 text-xs text-gray-400">Your card data is handled by Square. We do not store or see your card details.</p>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

