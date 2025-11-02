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
      <div className="w-full text-center">
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
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center">
        <div
          className="flex items-center justify-center gap-2 text-sm sm:text-base font-semibold tracking-wide tabular-nums whitespace-nowrap"
          style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji' }}
        >
          <span className="text-blue-100">Restock</span>
          <span className="text-white">{days}d {two(hours)}h {two(minutes)}m {two(seconds)}s</span>
        </div>
      </div>
    </div>
  );
}

