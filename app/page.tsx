"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/features/header";
import { CableRain } from "@/components/features/cable-rain";
import { Module } from "@/components/features/module";
import { ScrollHint } from "@/components/features/scroll-hint";
import { GraphModule } from "@/components/features/graph-module";

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
      <ScrollHint />
      <div className="flex flex-col">
        <Header ref={headerRef} />

        <main
          className="flex h-screen flex-col items-center justify-center gap-6 px-6 text-center"
          style={{ height: `calc(100vh - ${headerHeightPx}px)` }}
        >
          <h1
 	  className="animate-content-in opacity-0 text-5xl font-semibold tracking-tight sm:text-6xl"
            style={{ animationDuration: `${CONTENT_DURATION_MS}ms` }}
          >
            Cable Ratt
          </h1>
          <p
            className="animate-content-in opacity-0 max-w-lg text-lg text-neutral-600 dark:text-neutral-400"
            style={{
              animationDuration: `${CONTENT_DURATION_MS}ms`,
              animationDelay: `${CONTENT_STAGGER_MS}ms`,
            }}
          >
            Welcome to Cable Ratt, the enterprise dashboard for managing your mental Ratt&apos;s nest.
            This is a demo application built with Next.js, Tailwind CSS, and TypeScript.
          </p>
          <Link
            href="/login"
            className="rounded-md bg-black px-5 py-2.5 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Sign in
          </Link>
        </main>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="lg:w-2/3">
              <Module className="h-full">
                <GraphModule />
              </Module>
            </div>
            <div className="flex flex-col gap-6 lg:w-1/3">
              <Module>
                <h3 className="mb-2 text-lg font-medium">Real-time overview</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Work on project items and documenation simultaneously.
                </p>
              </Module>
              <Module>
                <h3 className="mb-2 text-lg font-medium">Signal Flow management</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Work faster and document on the job, All from the swipe of a finger.
                </p>
              </Module>
              <Module>
                <h3 className="mb-2 text-lg font-medium">Custom reporting</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Sync your work to the cloud, for your whole team to see and collaborate.
                </p>
              </Module>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}