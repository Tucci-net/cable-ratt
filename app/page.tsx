"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/features/header";
import { CableRain } from "@/components/features/cable-rain";
import { Module } from "@/components/features/module";
import { ScrollHint } from "@/components/features/scroll-hint";
import { GraphModule } from "@/components/features/graph-module";
import { FolderKanban, MoreHorizontal } from "lucide-react";

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
          className="mx-auto grid min-h-[min(760px,calc(100svh-5rem))] w-full max-w-7xl min-w-0 grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
          style={{ height: `calc(100vh - ${headerHeightPx}px)` }}
        >
          <div className="flex flex-col items-start gap-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              A clearer view of complex work
            </p>
            <h1
              className="animate-content-in opacity-0 text-5xl font-semibold tracking-tight sm:text-6xl"
              style={{ animationDuration: `${CONTENT_DURATION_MS}ms` }}
            >
              Cable Ratt
            </h1>
            <p
              className="animate-content-in opacity-0 max-w-xl text-lg leading-8 text-neutral-600 dark:text-neutral-400"
              style={{
                animationDuration: `${CONTENT_DURATION_MS}ms`,
                animationDelay: `${CONTENT_STAGGER_MS}ms`,
              }}
            >
              Keep projects, cable layouts, files, and team activity together
              in one focused workspace.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-lg bg-black px-5 py-3 text-base font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Explore the workspace
              </Link>
              <Link
                href="/dashboard?tab=Projects"
                className="rounded-lg border border-neutral-300 px-5 py-3 text-base hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
              >
                View projects
              </Link>
            </div>
          </div>

          <div className="min-w-0 animate-content-in opacity-0" style={{ animationDuration: `${CONTENT_DURATION_MS}ms`, animationDelay: `${CONTENT_STAGGER_MS}ms` }}>
            <Module className="!p-0 min-w-0">
              <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5 dark:border-neutral-800">
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Workspace
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                    Projects
                  </h2>
                </div>
                <button
                  type="button"
                  className="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-black"
                >
                  + New project
                </button>
              </div>
              <div className="flex flex-wrap gap-2 border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
                {["All projects", "Active", "Archived"].map((filter, index) => (
                  <span
                    key={filter}
                    className={`rounded-full px-3 py-1.5 text-sm ${
                      index === 0
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                        : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                    }`}
                  >
                    {filter}
                  </span>
                ))}
              </div>
              <ul className="divide-y divide-neutral-200 px-6 dark:divide-neutral-800">
                {[
                  ["Cable layout study", "Active", "Updated today"],
                  ["Homepage exploration", "Completed", "Updated yesterday"],
                  ["Network refresh", "Active", "Updated Oct 22"],
                ].map(([name, status, updated]) => (
                  <li
                    key={name}
                    className="flex items-center justify-between gap-4 py-5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="rounded-lg bg-neutral-100 p-2.5 dark:bg-neutral-800">
                        <FolderKanban className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-base font-medium">{name}</p>
                        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                          {updated}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="rounded-full border border-neutral-200 px-2.5 py-1 text-xs dark:border-neutral-700">
                        {status}
                      </span>
                      <MoreHorizontal
                        className="h-5 w-5 text-neutral-500"
                        aria-hidden="true"
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200 px-6 py-4 text-sm dark:border-neutral-800">
                <span className="text-neutral-500 dark:text-neutral-400">
                  Showing 3 sample projects
                </span>
                <Link
                  href="/dashboard?tab=Projects"
                  className="font-medium underline underline-offset-4"
                >
                  Open project tab
                </Link>
              </div>
            </Module>
          </div>
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
                <h3 className="mb-2 text-xl font-medium">Real-time overview</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Work on project items and documenation simultaneously.
                </p>
              </Module>
              <Module>
                <h3 className="mb-2 text-xl font-medium">Signal Flow management</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Work faster and document on the job, All from the swipe of a finger.
                </p>
              </Module>
              <Module>
                <h3 className="mb-2 text-xl font-medium">Custom reporting</h3>
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