import Link from "next/link";
import { signIn } from "@/lib/auth/auth";
import { Header } from "@/components/features/header";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="text-2xl font-semibold">Log in to Cable Ratt</h1>
        <p className="max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
          Sign in with GitHub to access your dashboard.
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="rounded-md bg-black px-5 py-2.5 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Sign in with GitHub
          </button>
        </form>
        <Link
          href="/"
          className="text-sm text-neutral-500 underline hover:text-black dark:hover:text-white"
        >
          Back to home
        </Link>
      </main>
    </div>
  );
}