import { z } from "zod";

// Example shared schema — replace with real domain models.
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  orgId: z.string(),
  role: z.enum(["owner", "admin", "member"]),
});

export type User = z.infer<typeof UserSchema>;
