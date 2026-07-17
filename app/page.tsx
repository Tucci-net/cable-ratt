import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Cable Ratt</h1>
      <p>Welcome — this is your marketing/landing page.</p>
      <Link href="/dashboard">Go to dashboard</Link>
    </main>
  );
}