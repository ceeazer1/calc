"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const models = [
  { id: "gpt-5", label: "GPT‑5" },
  { id: "gpt-5-mini", label: "GPT‑5 mini" },
  { id: "gpt-nano", label: "GPT nano" },
  { id: "gemini", label: "Gemini" },
]

export default function DashboardHome() {
  const router = useRouter()
  const [selected, setSelected] = useState("gpt-5-mini")
  const [notes, setNotes] = useState("")
  const [savedToast, setSavedToast] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [tiConverted, setTiConverted] = useState(false)
  const [promptHistory, setPromptHistory] = useState([])
  const [latestImage, setLatestImage] = useState("")

  // Helpers
  const countWords = (t) => {
    if (!t) return 0
    const words = t.trim().length ? t.trim().split(/\s+/).filter(Boolean) : []
    return words.length
  }

  const toTISafe = (text) => {
    if (!text) return ""
    let t = text
    // Strip diacritics
    try { t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "") } catch {}
    // Typographic punctuation -> ASCII
    t = t
      .replace(/[“”«»]/g, '"')
      .replace(/[‘’‚‛]/g, "'")
      .replace(/[–—−]/g, "-")
      .replace(/…/g, "...")
      .replace(/[•·]/g, "-")
    // Uppercase for TI display
    t = t.toUpperCase()
    // Whitelist characters: A-Z 0-9 space newline and basic math/punctuation
    t = t.replace(/[^A-Z0-9 \.\,\:\;\!\?\'"\-\+\*\/=\^\(\)\[\]\n]/g, " ")
    // Tidy spaces (preserve newlines)
    t = t.replace(/[ \t]+/g, " ").replace(/[ ]*\n[ ]*/g, "\n").trim()
    return t
  }

  const handleNotesChange = (e) => {
    let v = e.target.value
    const words = v.trim().length ? v.trim().split(/\s+/).filter(Boolean) : []
    if (words.length > 500) {
      v = words.slice(0, 500).join(" ")
      setWordCount(500)
    } else {
      setWordCount(words.length)
    }
    setNotes(v)
    setTiConverted(false)
  }

  const handleConvert = () => {
    const converted = toTISafe(notes)
    setNotes(converted)
    setWordCount(countWords(converted))
    setTiConverted(true)
    setSavedToast("Converted to TI‑safe")
    setTimeout(() => setSavedToast(""), 1200)
  }

  useEffect(() => {
    const s = localStorage.getItem("calcai:model") || "gpt-5-mini"
    const n = localStorage.getItem("calcai:notes") || ""
    setSelected(s)
    setNotes(n)
    setWordCount(countWords(n))
    // Load prompt history (local preview)
    let hist = []
    try { hist = JSON.parse(localStorage.getItem("calcai:promptHistory") || "[]") } catch {}
    if (!Array.isArray(hist) || hist.length === 0) {
      try { hist = JSON.parse(localStorage.getItem("calcai:history") || "[]") } catch {}
    }
    setPromptHistory(Array.isArray(hist) ? hist.slice(-20).reverse() : [])
    // Load latest image URL (local preview)
    const li = localStorage.getItem("calcai:latestImage") || localStorage.getItem("calcai:latestImageUrl") || ""
    setLatestImage(li)
  }, [])

  const saveModel = () => {
    localStorage.setItem("calcai:model", selected)
    setSavedToast("Model saved")
    setTimeout(() => setSavedToast(""), 1200)
  }

  const saveNotes = () => {
    localStorage.setItem("calcai:notes", notes)
    setSavedToast("Notes saved")
    setTimeout(() => setSavedToast(""), 1200)
  }

  const refreshLocal = () => {
    let hist = []
    try { hist = JSON.parse(localStorage.getItem("calcai:promptHistory") || "[]") } catch {}
    if (!Array.isArray(hist) || hist.length === 0) {
      try { hist = JSON.parse(localStorage.getItem("calcai:history") || "[]") } catch {}
    }
    setPromptHistory(Array.isArray(hist) ? hist.slice(-20).reverse() : [])
    const li = localStorage.getItem("calcai:latestImage") || localStorage.getItem("calcai:latestImageUrl") || ""
    setLatestImage(li)
    setSavedToast("Refreshed")
    setTimeout(() => setSavedToast(""), 900)
  }


  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Your Dashboard</h1>
            <p className="text-gray-300">Manage notes and AI model for your calculator</p>
          </div>
          <button onClick={() => router.push("/dashboard")} className="btn-secondary rounded-xl">Sign out</button>
        </div>

        {savedToast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-xl ring-1 ring-white/15 text-white px-4 py-2 rounded-full text-sm shadow-lg">
            {savedToast}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notes tile */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium">Notes</h2>
              <span className="text-xs text-gray-400">Synced per device (coming soon)</span>
            </div>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              rows={8}
              placeholder="Write quick notes for your calculator..."
              className="w-full bg-white/5 text-white placeholder-gray-400 rounded-xl px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-blue-500/40 resize-none"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className={`text-xs ${wordCount >= 500 ? "text-red-400" : "text-gray-400"}`}>
                {wordCount}/500 words {tiConverted && <span className="text-gray-500">• TI‑safe</span>}
              </span>
              <div className="flex gap-2">
                <button onClick={handleConvert} className="btn-secondary rounded-xl px-4">Convert to TI‑safe</button>
                <button onClick={saveNotes} className="btn-primary rounded-xl px-5 bg-blue-600/90 hover:bg-blue-600">Save</button>
              </div>
            </div>
          </div>

          {/* Model tile */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium">AI Model</h2>
              <span className="text-xs text-gray-400">Applied on device (coming soon)</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {models.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m.id)}
                  className={`px-4 py-2 rounded-full transition ring-1 backdrop-blur text-sm ${
                    selected === m.id
                      ? "bg-blue-600/80 ring-blue-400/30 text-white"
                      : "bg-white/5 ring-white/10 text-gray-200 hover:bg-white/10"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <button onClick={saveModel} className="btn-primary rounded-xl px-5 bg-blue-600/90 hover:bg-blue-600">Save</button>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Note: CalcAI currently uses GPT‑5 mini by default. Additional models will be enabled soon.
            </p>
          </div>

          {/* Prompt History tile */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium">Prompt History</h2>
              <div className="flex items-center gap-2">
                <button onClick={refreshLocal} className="text-xs text-gray-300 bg-white/5 hover:bg-white/10 ring-1 ring-white/10 rounded-lg px-3 py-1">Refresh</button>
              </div>
            </div>
            <div className="space-y-3 max-h-64 overflow-auto pr-1">
              {promptHistory && promptHistory.length ? (
                promptHistory.map((h, i) => (
                  <div key={i} className="rounded-lg bg-white/5 ring-1 ring-white/10 p-3">
                    <div className="text-[11px] text-gray-400 mb-1">{h.iso || (h.ts ? new Date(h.ts).toLocaleString() : '')}</div>
                    <div className="text-sm text-gray-200"><span className="text-gray-400">Q:</span> {String(h.prompt || h.question || '').slice(0, 160)}</div>
                    {h.response ? <div className="text-xs text-gray-400 mt-1"><span className="text-gray-500">A:</span> {String(h.response).slice(0, 160)}</div> : null}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400">No prompts yet</div>
              )}
            </div>
          </div>

          {/* Latest Image tile */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium">Latest Image</h2>
              <div className="flex items-center gap-2">
                <button onClick={refreshLocal} className="text-xs text-gray-300 bg-white/5 hover:bg-white/10 ring-1 ring-white/10 rounded-lg px-3 py-1">Refresh</button>
                {latestImage ? <a href={latestImage} target="_blank" rel="noreferrer" className="text-xs text-blue-300 hover:text-blue-200">Open</a> : null}
              </div>
            </div>
            {latestImage ? (
              <div className="aspect-video w-full overflow-hidden rounded-xl ring-1 ring-white/10 bg-black/20">
                <img src={latestImage} alt="Latest from calculator" className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="h-40 w-full rounded-xl ring-1 ring-white/10 bg-white/5 flex items-center justify-center text-gray-400 text-sm">
                No image saved yet
              </div>
            )}
            <p className="text-xs text-gray-400 mt-3">Shows the most recent photo captured on your calculator.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

