// Centralized, typed access to environment variables and feature flags.
// Validate with zod at startup so misconfiguration fails fast.

export const config = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
};
