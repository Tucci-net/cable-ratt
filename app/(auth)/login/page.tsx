import Link from "next/link";
import Image from "next/image";
import { signIn } from "@/lib/auth/auth";
import { Header } from "@/components/features/header";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-10 px-6 py-12 md:grid-cols-2 md:items-center md:gap-16 md:py-16">
        <section className="flex flex-col gap-6">
          <Image
            src="/cable-ratt-logo-black.svg"
            alt="Cable Ratt"
            width={250}
            height={47}
            className="h-12 w-auto max-w-[260px] self-start dark:hidden"
          />
          <Image
            src="/cable-ratt-logo-white.svg"
            alt="Cable Ratt"
            width={250}
            height={47}
            className="hidden h-12 w-auto max-w-[260px] self-start dark:block"
          />
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Your work, connected.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            Organize projects, sketch cable layouts, keep files close, and
            follow activity from one workspace.
          </p>
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="mb-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
              PROJECT WORKSPACE PREVIEW
            </p>
            {[
              ["Cable layout study", "Active"],
              ["Homepage exploration", "Completed"],
            ].map(([name, status]) => (
              <div
                key={name}
                className="flex items-center justify-between gap-4 border-t border-neutral-200 py-4 first:border-0 dark:border-neutral-800"
              >
                <span className="font-medium">{name}</span>
                <span className="rounded-full border border-neutral-200 px-3 py-1 text-sm dark:border-neutral-700">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-7 shadow-xl dark:border-neutral-800 dark:bg-neutral-900 sm:p-9">
          <h2 className="text-3xl font-semibold tracking-tight">
            Log in to Cable Ratt
          </h2>
          <p className="mt-3 text-base leading-7 text-neutral-600 dark:text-neutral-400">
            Choose how you&apos;d like to enter the workspace.
          </p>
          <form
            className="mt-8"
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="w-full rounded-lg bg-black px-5 py-3 text-base font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              Sign in with GitHub
            </button>
          </form>
          <Link
            href="/dashboard"
            className="mt-3 block w-full rounded-lg border border-neutral-300 px-5 py-3 text-center text-base hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Continue as guest
          </Link>
          <Link
            href="/"
            className="mt-6 block text-center text-base text-neutral-500 underline underline-offset-4 hover:text-black dark:hover:text-white"
          >
            Back to home
          </Link>
        </section>
      </main>
    </div>
  );
}