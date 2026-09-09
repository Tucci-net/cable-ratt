import { Suspense } from "react";
import { DashboardSidebar } from "@/components/features/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Suspense fallback={null}>
        <DashboardSidebar />
      </Suspense>
      <div className="flex-1">{children}</div>
    </div>
  );
}