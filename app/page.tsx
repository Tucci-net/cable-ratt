import Link from "next/link";
import { Header } from "@/components/features/header";
import { CableRain } from "@/components/features/rain-background";

export default function HomePage() {
  return (
    <>
      <cable-rain/>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">Cable Ratt</h1>
          <p className="max-w-md text-neutral-600 dark:text-neutral-400">
            Welcome — this is your marketing/landing page.
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