"use client";
import { useEffect, useState } from "react";

const SERVER = "https://calcai-server.fly.dev";

export default function PairPage() {
  const [mode, setMode] = useState("register"); // 'register' | 'login'
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [mac, setMac] = useState("");
  const [macs, setMacs] = useState([]);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Restore token and try whoami
    try {
      const t = localStorage.getItem("calcai_token") || "";
      if (t) {
        setToken(t);
        fetch(`${SERVER}/api/auth/whoami`, { headers: { Authorization: `Bearer ${t}` } })
          .then(r => r.ok ? r.json() : null)
          .then(j => {
            if (j && j.ok) {
              setUsername(j.username || "");
              setMacs(Array.isArray(j.macs) ? j.macs : []);
              if (Array.isArray(j.macs) && j.macs.length > 0) setMac(j.macs[0]);
              setMode("login");
            }
          })
          .catch(()=>{});
      }
    } catch {}
  }, []);

  function authHeaders(){
    const h = { };
    if (token) h["Authorization"] = `Bearer ${token}`;
    else if (code) h["X-Pair-Code"] = code.trim();
    return h;
  }

  async function doRegister(e){
    e.preventDefault();
    setStatus("Registering...");
    try {
      if (!code || !username || !password) throw new Error("All fields required");
      // Optionally, check claim status first
      const chk = await fetch(`${SERVER}/api/pair/resolve?code=${encodeURIComponent(code.trim())}`);
      const cj = await chk.json().catch(()=>({}));
      if (!chk.ok || !cj.ok) throw new Error("Invalid code");
      if (cj.claimed) throw new Error("Already claimed. Please log in.");

      const resp = await fetch(`${SERVER}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim(), username: username.trim(), password })
      });
      const j = await resp.json().catch(()=>({}));
      if (!resp.ok || !j.ok) throw new Error(j.error || "register_failed");
      try { localStorage.setItem("calcai_token", j.token); } catch {}
      setToken(j.token);
      setMac(j.mac);
      setMacs(Array.isArray(j.macs) ? j.macs : [j.mac]);
      setStatus("Registered. You can load notes now.");
      setMode("login");
    } catch (e){ setStatus(e.message || "Error"); }
  }

  async function doLogin(e){
    e.preventDefault();
    setStatus("Logging in...");
    try {
      const resp = await fetch(`${SERVER}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password })
      });
      const j = await resp.json().catch(()=>({}));
      if (!resp.ok || !j.ok) throw new Error(j.error || "login_failed");
      try { localStorage.setItem("calcai_token", j.token); } catch {}
      setToken(j.token);
      setMacs(Array.isArray(j.macs) ? j.macs : []);
      if (Array.isArray(j.macs) && j.macs.length > 0) setMac(j.macs[0]);
      setStatus("Logged in. You can load notes now.");
    } catch (e){ setStatus(e.message || "Error"); }
  }

  async function loadNotes(){
    if (!mac) return;
    setStatus("Loading notes...");
    try {
      const resp = await fetch(`${SERVER}/api/notes/${mac}`, { headers: { ...authHeaders() } });
      const text = await resp.text();
      setNotes(text || "");
      setStatus("");
    } catch { setStatus("Failed to load"); }
  }

  async function saveNotes(mode){
    if (!mac) return;
    setStatus(mode === "append" ? "Appending..." : "Saving...");
    try {
      const resp = await fetch(`${SERVER}/api/notes/${mac}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ text: notes, mode })
      });
      const j = await resp.json().catch(()=>({}));
      if (!resp.ok || !j.ok) throw new Error("save_failed");
      setStatus("Saved");
    } catch (e) { setStatus(e.message || "Error"); }
  }

  async function clearNotes(){
    if (!mac) return;
    if (!confirm("Clear all notes for this device?")) return;
    setStatus("Clearing...");
    try {
      const resp = await fetch(`${SERVER}/api/notes/${mac}`, { method: "DELETE", headers: { ...authHeaders() } });
      const j = await resp.json().catch(()=>({}));
      if (!resp.ok || !j.ok) throw new Error("clear_failed");
      setNotes("");
      setStatus("Cleared");
    } catch (e) { setStatus(e.message || "Error"); }
  }

  function logout(){
    try { localStorage.removeItem("calcai_token"); } catch {}
    setToken(""); setMac(""); setMacs([]);
    setStatus("Logged out.");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Notes Access</h1>

      {!token && (
        <div className="mb-6">
          <div className="flex gap-2 mb-3">
            <button className={`px-3 py-2 rounded ${mode==='register'?'bg-blue-600 text-white':'border'}`} onClick={()=>setMode('register')}>Register</button>
            <button className={`px-3 py-2 rounded ${mode==='login'?'bg-blue-600 text-white':'border'}`} onClick={()=>setMode('login')}>Login</button>
          </div>

          {mode === 'register' ? (
            <form onSubmit={doRegister} className="space-y-3">
              <p>First time? Enter your calculator&apos;s pairing code to claim your device and create an account.</p>
              <input value={code} onChange={(e)=>setCode(e.target.value.toUpperCase())} maxLength={8} placeholder="PAIR CODE (e.g., K7P3Q9)" className="border rounded px-3 py-2 w-full tracking-widest bg-black text-white placeholder-gray-400" />
              <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" className="border rounded px-3 py-2 w-full bg-black text-white placeholder-gray-400" />
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="border rounded px-3 py-2 w-full bg-black text-white placeholder-gray-400" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
              {status && <div className="text-sm text-gray-400">{status}</div>}
            </form>
          ) : (
            <form onSubmit={doLogin} className="space-y-3">
              <p>Already registered? Log in with your username and password.</p>
              <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" className="border rounded px-3 py-2 w-full bg-black text-white placeholder-gray-400" />
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="border rounded px-3 py-2 w-full bg-black text-white placeholder-gray-400" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
              {status && <div className="text-sm text-gray-400">{status}</div>}
            </form>
          )}
        </div>
      )}

      {token && (
        <div className="mb-4 text-sm text-gray-400 flex items-center gap-2">
          <span>Signed in as</span>
          <code className="px-2 py-1 bg-gray-800 rounded">{username || 'user'}</code>
          <button onClick={logout} className="ml-auto px-3 py-1 border rounded">Log out</button>
        </div>
      )}

      {(token || mac) && (
        <div className="space-y-4">
          <div className="text-sm text-gray-400 flex items-center gap-2">
            <span>Device:</span>
            {macs.length > 1 ? (
              <select value={mac} onChange={(e)=>setMac(e.target.value)} className="px-2 py-1 bg-black border rounded">
                {macs.map(m=> (<option key={m} value={m}>{m}</option>))}
              </select>
            ) : (
              <code>{mac}</code>
            )}
            {!token && code && <span>| Using code <code>{code}</code></span>}
          </div>

          <div className="flex gap-2">
            <button onClick={loadNotes} className="px-3 py-2 border rounded">Load</button>
            <button onClick={()=>saveNotes('set')} className="px-3 py-2 border rounded">Save</button>
            <button onClick={()=>saveNotes('append')} className="px-3 py-2 border rounded">Append</button>
            <button onClick={clearNotes} className="px-3 py-2 border rounded text-red-600">Clear</button>
          </div>

          <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows={12} className="w-full border rounded p-3 font-mono bg-black text-white placeholder-gray-400" placeholder="Type your notes here..." />
          {status && <div className="text-sm text-gray-400">{status}</div>}
        </div>
      )}
    </div>
  );
}

