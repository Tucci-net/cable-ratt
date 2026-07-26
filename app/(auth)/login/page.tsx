import { signIn } from "@/lib/auth/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-semibold">Log in to Cable Ratt</h1>
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/dashboard" });
        }}
      >
        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-white hover:bg-neutral-800"
        >
          Sign in with GitHub
        </button>
      </form>
    </main>
  );
}