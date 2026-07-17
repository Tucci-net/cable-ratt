// Central place for typed fetchers used by TanStack Query hooks.
// Example pattern:
//
// export async function getOrgUsers(orgId: string): Promise<User[]> {
//   const res = await fetch(`/api/orgs/${orgId}/users`);
//   if (!res.ok) throw new Error("Failed to fetch users");
//   return res.json();
// }

export {};
