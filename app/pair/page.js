"use client";
import { useEffect, useState } from "react";

const SERVER = "https://calcai-server.fly.dev";

export default function PairPage() {
  const [code, setCode] = useState("");
  const [mac, setMac] = useState("");
  const [webToken, setWebToken] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("calcai_pair") || "null");
      if (saved && saved.mac && saved.webToken) {
        setMac(saved.mac);
        setWebToken(saved.webToken);
      }
    } catch {}
  }, []);

  async function claimCode(e) {
    e.preventDefault();
    setStatus("Pairing...");
    try {
      const resp = await fetch(`${SERVER}/api/pair/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data?.error || "pair failed");
      setMac(data.mac);
      setWebToken(data.webToken);
      localStorage.setItem("calcai_pair", JSON.stringify({ mac: data.mac, webToken: data.webToken }));
      setStatus("Paired! You can view/edit notes below.");
    } catch (e) {
      setStatus(e.message || "Error");
    }
  }

  async function loadNotes() {
    if (!mac || !webToken) return;
    setStatus("Loading notes...");
    try {
      const resp = await fetch(`${SERVER}/api/notes/${mac}`, {
        headers: { "X-Web-Token": webToken },
      });
      const text = await resp.text();
      setNotes(text);
      setStatus("");
    } catch (e) {
      setStatus("Failed to load");
    }
  }

  async function saveNotes(mode) {
    if (!mac || !webToken) return;
    setStatus(mode === "append" ? "Appending..." : "Saving...");
    try {
      const resp = await fetch(`${SERVER}/api/notes/${mac}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Web-Token": webToken },
        body: JSON.stringify({ text: notes, mode }),
      });
      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error("save failed");
      setStatus("Saved");
    } catch (e) {
      setStatus(e.message || "Error");
    }
  }

  async function clearNotes() {
    if (!mac || !webToken) return;
    if (!confirm("Clear all notes for this device?")) return;
    setStatus("Clearing...");
    try {
      const resp = await fetch(`${SERVER}/api/notes/${mac}`, {
        method: "DELETE",
        headers: { "X-Web-Token": webToken },
      });
      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error("clear failed");
      setNotes("");
      setStatus("Cleared");
    } catch (e) {
      setStatus(e.message || "Error");
    }
  }

  function unpair() {
    try { localStorage.removeItem("calcai_pair"); } catch {}
    setMac("");
    setWebToken("");
    setNotes("");
    setStatus("Unpaired. Enter a new code to pair again.");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Pair your Calculator</h1>
      {!mac || !webToken ? (
        <form onSubmit={claimCode} className="space-y-3">
          <p>On your calculator, open CalcAI → NOTES. Enter the 6-character code shown.</p>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={8}
            placeholder="PAIR CODE (e.g., K7P3Q9)"
            className="border rounded px-3 py-2 w-full tracking-widest bg-black text-white placeholder-gray-400"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Pair</button>
          {status && <div className="text-sm text-gray-600">{status}</div>}
        </form>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-gray-600">Paired with device: <code>{mac}</code></div>
          <div className="flex gap-2">
            <button onClick={loadNotes} className="px-3 py-2 border rounded">Load</button>
            <button onClick={() => saveNotes("set")} className="px-3 py-2 border rounded">Save</button>
            <button onClick={() => saveNotes("append")} className="px-3 py-2 border rounded">Append</button>
            <button onClick={clearNotes} className="px-3 py-2 border rounded text-red-600">Clear</button>
            <button onClick={unpair} className="px-3 py-2 border rounded ml-auto">Unpair</button>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={12}
            className="w-full border rounded p-3 font-mono bg-black text-white placeholder-gray-400"
            placeholder="Type your notes here..."
          />
          {status && <div className="text-sm text-gray-600">{status}</div>}
        </div>
      )}
    </div>
  );
}

