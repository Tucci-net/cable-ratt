"use client";

import { useEffect, useRef, useState } from "react";

const ACTION_MODULES = [
  { label: "Prompts Today", value: 1249 },
  { label: "AI Images", value: 318 },
  { label: "Documents", value: 142 },
  { label: "Exports", value: 56 },
];

const TOTAL_ACTIONS = ACTION_MODULES.reduce((sum, m) => sum + m.value, 0);
const MAX_ACTIONS = 2000;
const PERCENTAGE = Math.min(TOTAL_ACTIONS / MAX_ACTIONS, 1);

const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const OFFSET = CIRCUMFERENCE * (1 - PERCENTAGE);

export function ActionsGaugeModule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      <h3 className="mb-4 text-lg font-medium">Actions Made</h3>

      <div
        className={`relative flex flex-1 items-center justify-center transition-all duration-700 ease-out ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
      <svg viewBox="0 0 180 180" className="aspect-square h-auto w-full max-w-[500px] -rotate-90">
          <circle
            cx="90"
            cy="90"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-neutral-200 dark:text-neutral-800"
          />
          <circle
            cx="90"
            cy="90"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={OFFSET}
            className="text-blue-600 dark:text-blue-400"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold">{TOTAL_ACTIONS.toLocaleString()}</span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            of {MAX_ACTIONS.toLocaleString()} target
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        {ACTION_MODULES.map((m) => (
          <div key={m.label} className="flex items-center justify-between">
            <span className="text-neutral-600 dark:text-neutral-400">{m.label}</span>
            <span className="font-medium">{m.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}