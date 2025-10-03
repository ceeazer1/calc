import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Help | CalcAI — First-Time Setup',
  description: 'Step-by-step guide to unlock, launch, connect Wi‑Fi, and use the camera on CalcAI. Troubleshooting and support links included.'
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="CalcAI Logo"
                width={200}
                height={60}
                className="h-5 sm:h-6 w-auto transform hover:scale-105 transition-transform duration-200"
              />
            </Link>
            <nav className="flex items-center space-x-6 text-sm">
              <Link href="/product" className="text-gray-300 hover:text-white transition-colors">Product</Link>
              <Link href="/community" className="text-gray-300 hover:text-white transition-colors">Community</Link>
              <Link href="/cart" className="text-gray-300 hover:text-white transition-colors">Cart</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Layout: Sidebar + Content */}
        <div className="md:grid md:grid-cols-12 md:gap-8">
          {/* Sidebar (desktop) */}
          <aside className="hidden md:block md:col-span-3 sticky top-20 h-max">
            <nav className="space-y-2 text-sm">
              <a href="#intro" className="block text-gray-300 hover:text-white">Overview</a>
              <a href="#power" className="block text-gray-300 hover:text-white">Power & batteries</a>
              <a href="#unlock" className="block text-gray-300 hover:text-white">1) Unlock</a>
              <a href="#launcher" className="block text-gray-300 hover:text-white">2) Launch the launcher</a>
              <a href="#open-calcai" className="block text-gray-300 hover:text-white">3) Open CALCAI</a>
              <a href="#wifi" className="block text-gray-300 hover:text-white">Wi‑Fi / Hotspot</a>
              <a href="#camera" className="block text-gray-300 hover:text-white">Camera</a>
              <a href="#debug" className="block text-gray-300 hover:text-white">Debugging / Support</a>
            </nav>
          </aside>

          {/* Content column */}
          <div className="md:col-span-9">
            {/* Mobile quick links */}
            <div className="md:hidden -mx-1 mb-6 flex gap-2 overflow-x-auto pb-1">
              {[
                { id: 'power', label: 'Power' },
                { id: 'unlock', label: 'Unlock' },
                { id: 'launcher', label: 'Launcher' },
                { id: 'open-calcai', label: 'Open CALCAI' },
                { id: 'wifi', label: 'Wi‑Fi' },
                { id: 'camera', label: 'Camera' },
                { id: 'debug', label: 'Support' },
              ].map((it) => (
                <a key={it.id} href={`#${it.id}`} className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">
                  {it.label}
                </a>
              ))}
            </div>
        {/* Hero */}
        <div id="intro" className="sr-only">Overview</div>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-purple-400">
            CalcAI — First-Time Setup (Easy Guide)
          </h1>
          <p className="text-gray-300">Follow these steps to unlock, launch, connect Wi‑Fi, and start using CalcAI. Keep your calculator steady for camera autofocus.</p>
        </div>

        {/* Power / Batteries */}
        <section id="power" className="scroll-mt-24 rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur p-5 mb-8">
          <h2 className="text-xl font-bold mb-2">Power and batteries</h2>
          <p className="text-gray-200">
            For best results we recommend high-quality AAA lithium batteries (triple‑A). They last longer than
            standard alkaline cells and handle the higher power draw from the camera and Wi‑Fi modules.
          </p>
          <ul className="list-disc list-inside text-gray-300 mt-3 space-y-1">
            <li>Use fresh AAA lithium cells for longest runtime.</li>
            <li>Camera autofocus and uploads can cause short power spikes; lithium chemistry stays more stable under load.</li>
            <li>Optional: keep a spare set in your bag. High‑capacity NiMH rechargeables also work, but may need more frequent charging.</li>
          </ul>
        </section>




        {/* Step 1: Unlock */}
        <section id="unlock" className="scroll-mt-24 rounded-2xl border border-white/10 bg-gray-900/40 backdrop-blur p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">1) Unlock it</h2>
          <div className="space-y-4 text-gray-200">
            <div>
              <h3 className="font-semibold text-white mb-2">A) Enter the password value</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>On the Home screen, insert the letter <span className="font-mono">P</span>: press <span className="font-mono">ALPHA</span>, then press the key that has <span className="font-mono">P</span> in green (you should see a green <span className="font-mono">P</span> on screen).</li>
                <li>Type <span className="font-mono">&gt;12345</span> (that <span className="font-mono">&gt;</span> represents the <span className="font-mono">STO→</span> key on the calculator).</li>
                <li>Press <span className="font-mono">ENTER</span>.</li>
                <li>You should now see something like: <span className="font-mono">P&gt;12345</span></li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">B) Use the <span className="font-mono">Send(</span> command with <span className="font-mono">P</span></h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Open the command catalog: press <span className="font-mono">2ND → CATALOG</span> (the <span className="font-mono">0</span> key).</li>
                <li>You should now be in Catalog. Press <span className="font-mono">LN</span> once (this jumps partway down), then use the down arrow to scroll until you find <span className="font-mono">Send(</span>.</li>
                <li>Tip: you can also press <span className="font-mono">ALPHA</span> then the key with <span className="font-mono">S</span> (green) to jump closer to the S‑section.</li>
                <li>Press <span className="font-mono">ENTER</span> to paste <span className="font-mono">Send(</span> onto the Home screen.</li>
                <li>Insert <span className="font-mono">P</span>: press <span className="font-mono">ALPHA</span> then the key with <span className="font-mono">P</span> (green). It should look like <span className="font-mono">Send(P</span></li>
                <li>Press <span className="font-mono">ENTER</span>.</li>
              </ol>
              <p className="mt-2 text-green-300">➜ The ESP is now unlocked.</p>
            </div>
            {/* Unlock video walkthrough */}
            <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black/50">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/j-q0VZhzFvs"
                title="CalcAI Unlock — Step 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

          </div>
        </section>

        {/* Step 2: Launcher */}
        <section id="launcher" className="scroll-mt-24 rounded-2xl border border-white/10 bg-gray-900/40 backdrop-blur p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">2) Launch the launcher</h2>
          <div className="space-y-4 text-gray-200">
            <div>
              <h3 className="font-semibold text-white mb-2">A) Set <span className="font-mono">C</span> to <span className="font-mono">5</span></h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Type <span className="font-mono">5</span></li>
                <li>Press the <span className="font-mono">STO→</span> key (the right‑arrow store key; shown as <span className="font-mono">&gt;</span> in text).</li>
                <li>Insert <span className="font-mono">C</span>: press <span className="font-mono">ALPHA</span>, then the key with <span className="font-mono">C</span> in green.</li>
                <li>Press <span className="font-mono">ENTER</span>.</li>
                <li>You should now see something like: <span className="font-mono">5&gt;C</span></li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">B) Use the <span className="font-mono">Send(</span> command with <span className="font-mono">C</span></h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Open Catalog again: <span className="font-mono">2ND → CATALOG</span>.</li>
                <li>Press <span className="font-mono">LN</span> once, then use the down arrow to find <span className="font-mono">Send(</span> (or jump with <span className="font-mono">ALPHA + S</span>).</li>
                <li>Press <span className="font-mono">ENTER</span> to paste <span className="font-mono">Send(</span>.</li>
                <li>Insert <span className="font-mono">C</span>: <span className="font-mono">ALPHA</span> then the <span className="font-mono">C</span> key (green). It should look like <span className="font-mono">Send(C</span></li>
                <li>Press <span className="font-mono">ENTER</span>.</li>
              </ol>
              <p className="mt-2 text-green-300">➜ The launcher is running.</p>
            </div>
          </div>
        </section>

        {/* Step 3: Open CALCAI */}
        <section id="open-calcai" className="scroll-mt-24 rounded-2xl border border-white/10 bg-gray-900/40 backdrop-blur p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">3) Open CALCAI</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-200">
            <li>Press <span className="font-mono">PRGM</span>.</li>
            <li>Select <span className="font-mono">CALCAI</span> → press <span className="font-mono">ENTER</span> to open it.</li>
            <li>You’re now in the CALCAI menu. <span className="text-gray-400">(Most features need Wi‑Fi—set that up next.)</span></li>
          </ol>
        </section>

        {/* Step 4: Wi‑Fi */}
        <section id="wifi" className="scroll-mt-24 rounded-2xl border border-white/10 bg-gray-900/40 backdrop-blur p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">4) Connect Wi‑Fi / Hotspot</h2>
          <div className="space-y-3 text-gray-200">
            <ol className="list-decimal list-inside space-y-2">
              <li>In <span className="font-mono">CALCAI</span>: <span className="font-mono">Settings → Configuration</span>.</li>
              <li>On your phone/tablet, join Wi‑Fi <span className="font-mono">calcai-config</span>.</li>
              <li>Portal password: <span className="font-mono">configue</span></li>
              <li>Follow the page to add your home Wi‑Fi or hotspot.</li>
              <li>The portal auto‑closes after ~10 minutes for privacy.</li>
            </ol>
            {/* Wi‑Fi video walkthrough */}
            <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black/50">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/n48sqHHPF5Y"
                title="CalcAI Wi‑Fi Setup"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="rounded-lg border border-amber-400/30 bg-amber-500/10 p-4">
              <h3 className="font-semibold text-amber-300 mb-2">Important: Portal lockout behavior</h3>
              <ul className="list-disc list-inside space-y-1 text-amber-100/90">
                <li>While you’re on the Configuration page, the calculator is locked to the portal—you cannot access other calculator functions.</li>
                <li>Before returning to CALCAI, you must close the portal by tapping <span className="font-mono">“Close configuration portal”</span> on the portal page.</li>
                <li>If you don’t close it, the calculator won’t function properly.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Camera */}
        <section id="camera" className="scroll-mt-24 rounded-2xl border border-white/10 bg-gray-900/40 backdrop-blur p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Camera</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>After you press <span className="font-mono">ENTER</span> to capture, you’ll see “hold still”—that’s autofocus working. Keep the calculator steady.</li>
            <li>Image quality drops in low light. Use bright, even lighting and avoid glare for best results.</li>
          </ul>
        </section>

        {/* Debugging / Support */}
        <section id="debug" className="scroll-mt-24 rounded-2xl border border-white/10 bg-gray-900/40 backdrop-blur p-6">
          <h2 className="text-2xl font-bold mb-4">Debugging / Support</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-200">
            <li>If you encounter a problem you can’t solve: Open <span className="font-mono">Settings → Configuration</span> to start the portal.</li>
            <li>In the portal, open <span className="font-mono">Debug</span>.</li>
            <li>Copy or download your <span className="font-mono">Logs</span> and your <span className="font-mono">MAC address</span>.</li>
            <li>Create a support ticket in our Discord and attach those details. Our team will jump on it ASAP.</li>
          </ol>
          <div className="mt-4">
            <a
              href="https://discord.gg/83ZwJcPWJ6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors font-semibold"
            >
              Join our Discord for Support
            </a>
          </div>
        </section>
          </div>
        </div>
      </main>
    </div>
  )
}

