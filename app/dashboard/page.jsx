"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DashboardAuth() {
  const router = useRouter()
  const [mode, setMode] = useState("login") // 'login' | 'signup'
  const [deviceCode, setDeviceCode] = useState("")
  const [deviceVerified, setDeviceVerified] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    router.push("/dashboard/home")
  }

  const handleVerifyCode = (e) => {
    e.preventDefault()
    if (/^\d{6}$/.test(deviceCode)) {
      setDeviceVerified(true)
    }
  }

  const handleSignup = (e) => {
    e.preventDefault()
    if (!deviceVerified) return
    if (password && password === confirm) {
      router.push("/dashboard/home")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">CalcAI Dashboard</h1>
          <p className="text-gray-300 mt-2">Manage your calculator, notes, and AI model</p>
        </div>

        <div className="mx-auto mb-4 inline-flex rounded-full bg-white/5 ring-1 ring-white/10 p-1 backdrop-blur">
          <button
            className={`px-4 py-2 text-sm rounded-full transition ${mode === "login" ? "bg-white/10 text-white" : "text-gray-300 hover:text-white"}`}
            onClick={() => setMode("login")}
          >
            Log in
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-full transition ${mode === "signup" ? "bg-white/10 text-white" : "text-gray-300 hover:text-white"}`}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-2xl p-6 shadow-xl">
          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 text-white placeholder-gray-400 rounded-xl px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 text-white placeholder-gray-400 rounded-xl px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
              <button type="submit" className="w-full btn-primary rounded-xl py-3 bg-blue-600/90 hover:bg-blue-600">
                Continue
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard/home")}
                className="w-full text-sm text-gray-400 hover:text-white mt-1"
              >
                Continue as guest (preview)
              </button>
            </form>
          ) : (
            <form onSubmit={deviceVerified ? handleSignup : handleVerifyCode} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">6‑digit device code</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\\d{6}"
                    maxLength={6}
                    required
                    value={deviceCode}
                    onChange={(e) => setDeviceCode(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="e.g. 428319"
                    className="flex-1 bg-white/5 text-white placeholder-gray-400 rounded-xl px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500/40 tracking-widest"
                  />
                  <button type="submit" className="btn-primary rounded-xl whitespace-nowrap px-5">
                    {deviceVerified ? "Verified" : "Verify"}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Find this on your calculator under Notes → Pair</p>
              </div>

              {deviceVerified && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white/5 text-white placeholder-gray-400 rounded-xl px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500/40"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Password</label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white/5 text-white placeholder-gray-400 rounded-xl px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Confirm</label>
                      <input
                        type="password"
                        required
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white/5 text-white placeholder-gray-400 rounded-xl px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500/40"
                      />
                    </div>
                  </div>
                  <button onClick={handleSignup} className="w-full btn-primary rounded-xl py-3 bg-blue-600/90 hover:bg-blue-600">
                    Create account
                  </button>
                </div>
              )}
            </form>
          )}
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing you agree to our <a className="underline decoration-white/20 hover:decoration-white" href="/terms">Terms</a> and <a className="underline decoration-white/20 hover:decoration-white" href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  )
}

