import type { NextAuthConfig } from "next-auth";

export default {
  providers: [],
  pages: {
    signIn: "/login",
  },
callbacks: {
  authorized() {
    // Dashboard is intentionally open for design preview right now —
    // there's no real per-user data behind it yet. Change this back to
    // `!!auth?.user` once real data needs protecting.
    return true;
  },
},
} satisfies NextAuthConfig;