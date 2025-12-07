export const dynamic = 'force-dynamic'

import Image from 'next/image'
import MaintenanceCountdown from '../../components/MaintenanceCountdown'

async function getSettings() {
  try {
    const r = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/website-settings`, { cache: 'no-store' })
    if (!r?.ok) return null
    return r.json()
  } catch {
    try {
      // Relative fetch as fallback (works at request time)
      const r2 = await fetch('/api/website-settings', { cache: 'no-store' })
      if (!r2?.ok) return null
      return r2.json()
    } catch {
      return null
    }
  }
}

export default async function MaintenancePage() {
  const data = await getSettings()
  const m = (data?.maintenance ?? data) || {}
  const rawUntil = (m.until ?? m.maintenanceUntil ?? '').toString()
  const target = rawUntil.trim()
  const discord = m.discordUrl || process.env.NEXT_PUBLIC_DISCORD_URL || '#'

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0B0F14] text-white px-6">
      <div className="w-full max-w-xl text-center space-y-8">
        <div className="flex justify-center">
          <Image src="/logo.png" alt="CalcAI" width={120} height={120} priority className="rounded-xl" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">We will be back</h1>
        {target ? <MaintenanceCountdown target={target} /> : null}
        <div className="pt-2">
          <a href={discord} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <Image src="/discord-logo.svg" alt="Discord" width={20} height={20} />
            <span>Discord</span>
          </a>
        </div>
      </div>
    </main>
  )
}

