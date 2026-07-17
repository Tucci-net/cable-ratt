// This layout wraps all authenticated dashboard routes.
// Add session checks / redirects here once auth is wired up.

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <Sidebar /> <Topbar /> */}
      <div>{children}</div>
    </div>
  );
}
