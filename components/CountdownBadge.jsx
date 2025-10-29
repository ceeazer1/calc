"use client";

import { useEffect, useMemo, useState } from "react";

// Small countdown badge for nav bars or sections
// Defaults to Nov 15, 2025 local time
export default function CountdownBadge({ target = "2025-11-15T00:00:00" }) {
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
      <div className="text-[10px] sm:text-xs font-semibold text-green-300 bg-green-500/10 border border-green-400/20 rounded-full px-2 py-1 whitespace-nowrap">
        Restocked!
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
    <div
      title={`Counts down to ${targetDate.toLocaleString()}`}
      className="text-[10px] sm:text-xs font-semibold text-blue-300 bg-blue-500/10 border border-blue-400/20 rounded-full px-2 py-1 whitespace-nowrap"
    >
      Restock in: {days}d {two(hours)}h {two(minutes)}m {two(seconds)}s
    </div>
  );
}

