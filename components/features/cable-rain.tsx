"use client";

import { useEffect, useState } from "react";

const LANE_WIDTH = 90; // px — target spacing per cable
const CABLES_PER_BATCH = 3; // (unused in your code, keep if you plan to use later)
const BATCH_STAGGER_MS = 900;

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function buildCable(i: number, laneWidth: number, height: number, startDelayMs: number) {
  const x0 = laneWidth * i + laneWidth / 2;

  const kinkMin = laneWidth * 0.22;
  const kinkMax = laneWidth * 0.42;

  const sign1 = pseudoRandom(i + 20) < 0.5 ? -1 : 1;
  const run1 = sign1 * (kinkMin + pseudoRandom(i + 21) * (kinkMax - kinkMin));

  const sign2 = pseudoRandom(i + 40) < 0.5 ? -1 : 1;
  const run2 = sign2 * (kinkMin + pseudoRandom(i + 41) * (kinkMax - kinkMin));

  const x1 = x0 + run1;
  const x2 = x1 + run2;

  const kink1Y = height * 0.2 + pseudoRandom(i + 10) * height * 0.2;
  const kink2Y = height * 0.55 + pseudoRandom(i + 30) * height * 0.2;

  const durationMs = 5000 + pseudoRandom(i + 50) * 5000;

  const batchCount = 5;
  const batchIndex = i % batchCount;
  const delayMs = startDelayMs + batchIndex * BATCH_STAGGER_MS + pseudoRandom(i + 100) * 300;

  const d = `M ${x0} 0
    L ${x0} ${kink1Y}
    L ${x1} ${kink1Y}
    L ${x1} ${kink2Y}
    L ${x2} ${kink2Y}
    L ${x2} ${height}`;

  return { d, duration: `${durationMs}ms`, delay: `${delayMs}ms` };
}

export function CableRain({
  startDelayMs = 0,
  headerHeightPx = 0,
}: {
  startDelayMs?: number;
  headerHeightPx?: number;
}) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    function measure() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    measure();

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 150);
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  if (!size) return null;

  const count = Math.max(4, Math.floor(size.width / LANE_WIDTH));
  const laneWidth = size.width / count;
  const cables = Array.from({ length: count }, (_, i) =>
    buildCable(i, laneWidth, size.height, startDelayMs)
  );

  return (
    <div
  className="pointer-events-none fixed inset-0 -z-10 overflow-hidden text-[#334155] dark:text-[ #3D4C5F]"
  style={{ paddingTop: headerHeightPx }}>

      <svg
        className="h-full w-full"
        viewBox={`0 0 ${size.width} ${size.height}`}
        preserveAspectRatio="none"
      >
        {cables.map((cable, i) => (
          <path
            key={i}
            d={cable.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="3000"
            className="animate-cable-draw opacity-0"
            style={{ animationDuration: cable.duration, animationDelay: cable.delay }}
          />
        ))}
      </svg>
    </div>
  );
}
