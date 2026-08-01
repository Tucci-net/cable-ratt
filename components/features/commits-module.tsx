"use client";

import { useEffect, useRef, useState } from "react";

const WEEKLY_COMMITS = [
  { day: "Mon", count: 4 },
  { day: "Tue", count: 7 },
  { day: "Wed", count: 3 },
  { day: "Thu", count: 9 },
  { day: "Fri", count: 6 },
  { day: "Sat", count: 2 },
  { day: "Sun", count: 5 },
];

const WEEKLY_TOTAL = WEEKLY_COMMITS.reduce((sum, d) => sum + d.count, 0);
const WEEKLY_TREND = "+14.2%";
const MONTHLY_TOTAL = 214;
const MONTHLY_TREND = "+18.6%";

const CHART_WIDTH = 400;
const CHART_HEIGHT = 140;
const PADDING = 10;

function buildCommitsPath() {
  const maxValue = Math.max(...WEEKLY_COMMITS.map((d) => d.count));
  const stepX = (CHART_WIDTH - PADDING * 2) / (WEEKLY_COMMITS.length - 1);

  const points = WEEKLY_COMMITS.map((d, i) => ({
    x: PADDING + i * stepX,
    y: PADDING + (1 - d.count / maxValue) * (CHART_HEIGHT - PADDING * 2),
  }));

  const first = points[0]!;
  const last = points[points.length - 1]!;

  let line = `M ${first.x},${first.y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i]!;
    const next = points[i + 1]!;
    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;
    line += ` Q ${current.x},${current.y} ${midX},${midY}`;
  }
  line += ` L ${last.x},${last.y}`;

  const area = `${line} L ${last.x},${CHART_HEIGHT} L ${first.x},${CHART_HEIGHT} Z`;

  return { line, area, points };
}

export function CommitsModule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
const [isVisible, setIsVisible] = useState(false);
const [pathLength, setPathLength] = useState(1000);
const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { line, area, points } = buildCommitsPath();

  useEffect(() => {
    // Measure the REAL length of this exact curve, rather than guessing a
    // buffer number big enough to be "safe" — precise instead of padded.
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex h-full flex-col">
      <h3 className="mb-4 text-lg font-medium">Commit Activity</h3>

      <div className="mb-6 flex gap-8">
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">This Week</p>
          <p className="text-2xl font-semibold">
            {WEEKLY_TOTAL}{" "}
            <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400">
              {WEEKLY_TREND}
            </span>
          </p>
        </div>
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">This Month</p>
          <p className="text-2xl font-semibold">
            {MONTHLY_TOTAL}{" "}
            <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400">
              {MONTHLY_TREND}
            </span>
          </p>
        </div>
      </div>

<div className="relative min-h-0 flex-1">
<svg
  viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
  preserveAspectRatio="none"
  className="h-full w-full text-blue-600 dark:text-blue-400"
>
        <defs>
          <linearGradient id="commitsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d={area}
          fill="url(#commitsFill)"
          opacity={isVisible ? 1 : 0}
          style={{ transition: "opacity 1s ease-out 1.2s" }}
        />
        <path
          ref={pathRef}
          d={line}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={isVisible ? 0 : pathLength}
          style={{ transition: "stroke-dashoffset 1.6s ease-out" }}
        />

{points.map((p, i) => (
  <g key={i}>
    <circle
      cx={p.x}
      cy={p.y}
      r="2.5"
      fill="currentColor"
      opacity={isVisible ? 1 : 0}
      style={{ transition: `opacity 0.3s ease-out ${1.6 + i * 0.08}s` }}
    />
    {/* Invisible, larger circle — the real hover target. The visible dot
        above is too small to reliably catch a cursor on its own. */}
    <circle
      cx={p.x}
      cy={p.y}
      r="12"
      fill="transparent"
      className="cursor-pointer"
      onMouseEnter={() => setHoveredIndex(i)}
      onMouseLeave={() => setHoveredIndex(null)}
    />
  </g>
))}
     </svg>

{hoveredIndex !== null && points[hoveredIndex] && WEEKLY_COMMITS[hoveredIndex] && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-md bg-black px-2 py-1 text-xs whitespace-nowrap text-white dark:bg-white dark:text-black"
          style={{
            left: `${(points[hoveredIndex].x / CHART_WIDTH) * 100}%`,
            top: `${(points[hoveredIndex].y / CHART_HEIGHT) * 100}%`,
            marginTop: "-8px",
          }}
        >
          {WEEKLY_COMMITS[hoveredIndex].day}: {WEEKLY_COMMITS[hoveredIndex].count} commits
        </div>
      )}
      </div>

      <div className="mt-2 flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
        {WEEKLY_COMMITS.map((d) => (
          <span key={d.day}>{d.day}</span>
        ))}
      </div>
    </div>
  );
}