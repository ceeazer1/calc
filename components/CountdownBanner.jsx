"use client";

import { useEffect, useMemo, useState } from "react";

// Large full-width banner for restock countdown, to be placed just below the top nav
export default function CountdownBanner({ target = "2025-11-15T00:00:00" }) {
  const targetDate = useMemo(() => new Date(target), [target]);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diffMs = targetDate.getTime() - now.getTime();
  if (isNaN(diffMs)) return null;

  if (diffMs <= 0) {
    return (
      <div className="w-full bg-green-600/15 border-y border-green-500/30 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-green-200 font-semibold tracking-wide">Restocked!</p>
        </div>
      </div>
    );
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const two = (n) => String(n).padStart(2, "0");

  return (
    <div className="w-full bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 border-y border-white/10 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center">
        <p className="text-sm sm:text-base text-blue-100 font-semibold tracking-wide">
          Restock countdown: <span className="text-white">{days}d {two(hours)}h {two(minutes)}m {two(seconds)}s</span> • Nov 15
        </p>
      </div>
    </div>
  );
}

