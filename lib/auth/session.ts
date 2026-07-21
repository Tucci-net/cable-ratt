// Session/auth helpers go here once Auth.js / Clerk / WorkOS is wired up.
//
// export async function getSession() { ... }
// export async function requireSession() { ... }

import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export async function getSession() {
  return auth();
}

export async function requireSession() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}