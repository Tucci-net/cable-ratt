import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    // Swap or add providers here for enterprise SSO:
    // e.g. next-auth/providers/google, or a SAML/OIDC provider for Okta/Azure AD.
  ],
  session: { strategy: "database" },
  pages: {
    signIn: "/login",
  },
});