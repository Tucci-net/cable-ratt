"use client";

import { useEffect, useRef, useState } from "react";

const PATH = "M 30 190 L 90 150 L 150 165 L 210 100 L 270 120 L 330 60 L 390 30";

const GRID_LINES = [
  { y: 30, label: "100" },
  { y: 80, label: "75" },
  { y: 130, label: "50" },
  { y: 180, label: "25" },
];

const DRAW_DELAY_MS = 900; // Scroll Pause
const DRAW_DURATION_S = 3.5; // Sroll Duration

export function GraphModule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let delayTimer: ReturnType<typeof setTimeout> | null = null;

   const observer = new IntersectionObserver(
  ([entry]) => {
    if (!entry) return;
    if (entry.isIntersecting) {
      delayTimer = setTimeout(() => setIsVisible(true), DRAW_DELAY_MS);
      observer.disconnect();
    }
  },
  { threshold: 0.3 }
);

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex h-full flex-col">
      <h3 className="mb-4 text-lg font-medium">Growth overview</h3>
      <svg 
	viewBox="0 0 400 200"
	preserveAspectRatio="none"
	className="min-h-0 flex-1 text-neutral-800 dark:text-neutral-200">
        {GRID_LINES.map((line) => (
          <g key={line.y}>
            <line
              x1={30}
              x2={400}
              y1={line.y}
              y2={line.y}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity={0.15}
            />
            <text
              x={22}
              y={line.y}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="10"
              fill="currentColor"
              opacity={0.5}
            >
              {line.label}
            </text>
          </g>
        ))}
        <path
          d={PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1000"
          strokeDashoffset={isVisible ? 0 : 1000}
          style={{ transition: `stroke-dashoffset ${DRAW_DURATION_S}s ease-out` }}
        />
      </svg>
    </div>
  );
}