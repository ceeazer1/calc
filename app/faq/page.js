import Link from 'next/link'
import Image from 'next/image'

export default function FAQ() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40 z-50 border-b border-white/10`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-14">
            {/* Left: Community, Specifications */}
            <div className="hidden md:flex items-center gap-8 justify-start">
              <Link href="/community" className="text-gray-300 hover:text-white text-sm font-medium">Community</Link>
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
      <main className="pt-24 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-light tracking-tight text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-400 font-light tracking-tight">Find quick answers below. For setup help, see <Link href="/help" className="text-blue-400 hover:text-blue-300">Help</Link>.</p>
          </div>

          <div className="space-y-12">
            {/* Device & Usage */}
            <section>
              <h2 className="text-xl font-light tracking-tight text-white mb-4">Device & Usage</h2>
              <div className="rounded-2xl border border-white/10 bg-gray-900/40 p-6 divide-y divide-white/10">
                <div className="py-4">
                  <h3 className="text-white font-light tracking-tight text-lg">What camera does it use?</h3>
                  <p className="text-gray-300">OV5640 — high‑quality 5MP sensor used with the XIAO ESP32S3 Sense.</p>
                </div>
                <div className="py-4">
                  <h3 className="text-white font-light tracking-tight text-lg">Why can the camera response take 10–20 seconds?</h3>
                  <p className="text-gray-300">Images are processed by GPT‑5 (more complex than text‑only), so 10–20s is typical. If it&apos;s slower:</p>
                  <ul className="list-disc pl-5 text-gray-300 mt-2 space-y-1">
                    <li>Check your internet connection and keep your hotspot close.</li>
                    <li>Enable “Maximum Compatibility” on your hotspot (improves 2.4GHz stability).</li>
                    <li>Hold still during “Hold still…” so the camera can auto‑focus.</li>
                    <li>Large/complex images or long questions naturally take longer — that&apos;s normal.</li>
                  </ul>
                </div>
                <div className="py-4">
                  <h3 className="text-white font-light tracking-tight text-lg">Stuck on “Processing”</h3>
                  <p className="text-gray-300">Usually Wi‑Fi couldn’t reach the server or the network briefly disconnected.</p>
                  <ul className="list-disc pl-5 text-gray-300 mt-2 space-y-1">
                    <li>Make sure Wi‑Fi is connected; try again after a few seconds.</li>
                    <li>If needed, restart the calculator, then wait 5–10 seconds before selecting a function.</li>
                  </ul>
                </div>
                <div className="py-4">
                  <h3 className="text-white font-light tracking-tight text-lg">The back of my calculator is warm</h3>
                  <p className="text-gray-300">This is normal during Wi‑Fi and camera use.</p>
                </div>
                <div className="py-4">
                  <h3 className="text-white font-light tracking-tight text-lg">I select a function and it loads forever</h3>
                  <p className="text-gray-300">Turn the calculator off and back on, then wait 5–10 seconds before selecting anything.</p>
                </div>
                <div className="py-4">
                  <h3 className="text-white font-light tracking-tight text-lg">Wi‑Fi portal SSID isn’t showing on my phone</h3>
                  <ul className="list-disc pl-5 text-gray-300 space-y-1">
                    <li>It can take up to ~30 seconds to appear.</li>
                    <li>If it doesn’t, close the portal on the calculator and open it again.</li>
                    <li>If it says “portal not active” when closing, it’s likely a power issue — use fresh lithium batteries.</li>
                  </ul>
                </div>
                <div className="py-4">
                  <h3 className="text-white font-light tracking-tight text-lg">Unable to connect to my Wi‑Fi</h3>
                  <ul className="list-disc pl-5 text-gray-300 space-y-1">
                    <li>When adding the network in the config portal, confirm it showed “Connected”.</li>
                    <li>Stay near your router and minimize interference.</li>
                    <li>If nothing works, it’s likely power — replace the batteries (lithium recommended).</li>
                  </ul>
                </div>
                <div className="py-4">
                  <h3 className="text-white font-light tracking-tight text-lg">Why do my batteries run out fast?</h3>
                  <p className="text-gray-300">Heavy Wi‑Fi + camera usage draws more power. Lithium batteries last longest; keep a spare set.</p>
                </div>
              </div>
            </section>

            {/* Ordering & General */}
            <section>
              <h2 className="text-xl font-light tracking-tight text-white mb-4">Ordering & General</h2>
              <div className="rounded-2xl border border-white/10 bg-gray-900/40 p-6 divide-y divide-white/10">
                <div className="py-4">
                  <h3 className="text-white font-light tracking-tight text-lg">How long is the warranty?</h3>
                  <p className="text-gray-300">2 weeks. Opening/modifying the calculator voids the warranty. Physical damage isn’t covered.</p>
                </div>
                <div className="py-4">
                  <h3 className="text-white font-light tracking-tight text-lg">Shipping and processing time</h3>
                  <p className="text-gray-300">Starting Nov 15: processing 1–3 days; shipping 2–5 days (location dependent). If in stock and ordered before 3pm ET, ships same day. Check availability at <Link href="/product" className="text-blue-400 hover:text-blue-300">calcai.cc/product</Link>.</p>
                </div>
                <div className="py-4">
                  <h3 className="text-white font-light tracking-tight text-lg">Do you accept international orders?</h3>
                  <p className="text-gray-300">Not yet — we’re working on it.</p>
                </div>
                <div className="py-4">
                  <h3 className="text-white font-light tracking-tight text-lg">Is CalcAI available on other calculator models?</h3>
                  <p className="text-gray-300">Not at the moment — planned for the future.</p>
                </div>
                <div className="py-4">
                  <h3 className="text-white font-light tracking-tight text-lg">Support hours</h3>
                  <p className="text-gray-300">Typically 9am–6pm (Mon–Fri). Weekend availability varies.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
