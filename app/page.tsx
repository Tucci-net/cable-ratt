"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/features/header";
import { CableRain } from "@/components/features/cable-rain";

const CONTENT_STAGGER_MS = 400;
const CONTENT_DURATION_MS = 600;
const RAIN_START_DELAY_MS = CONTENT_STAGGER_MS + CONTENT_DURATION_MS;

export default function HomePage() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeightPx, setHeaderHeightPx] = useState(0);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const update = () => {
      setHeaderHeightPx(el.getBoundingClientRect().height);
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return (
    <>
      <CableRain startDelayMs={RAIN_START_DELAY_MS} headerHeightPx={headerHeightPx} />

      <div className="flex min-h-screen flex-col">
        <Header ref={headerRef} />

        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
          <h1
            className="animate-content-in opacity-0 text-4xl font-semibold tracking-tight"
            style={{ animationDuration: `${CONTENT_DURATION_MS}ms` }}
          >
            Cable Ratt
          </h1>

          <p
            className="animate-content-in opacity-0 max-w-md text-neutral-600 dark:text-neutral-400"
            style={{
              animationDuration: `${CONTENT_DURATION_MS}ms`,
              animationDelay: `${CONTENT_STAGGER_MS}ms`,
            }}
          >
            Welcome to Cable Ratt, the enterprise dashboard for managing your mental Ratt&apos;s nest.
	    This is a demo application built with Next.js, Tailwind CSS, and TypeScript.
	    Explore the dashboard to see how you can manage your Ratt&apos;s activities and keep track of their progress.
          </p>

          <Link
            href="/dashboard"
            className="rounded-md bg-black px-5 py-2.5 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Go to dashboard
          </Link>
        </main>
      </div>
    </>
  );
}
