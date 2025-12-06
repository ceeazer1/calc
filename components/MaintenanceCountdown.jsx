"use client";

import { useEffect, useMemo, useState } from "react";

export default function MaintenanceCountdown({ target }) {
  const targetDate = useMemo(() => new Date(target || Date.now()), [target]);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diffMs = targetDate.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const two = (n) => String(n).padStart(2, "0");

  return (
    <div className="text-center">
      <div className="text-3xl sm:text-5xl font-bold tracking-tight tabular-nums text-white">
        {days}d {two(hours)}h {two(minutes)}m {two(seconds)}s
      </div>
    </div>
  );
}

