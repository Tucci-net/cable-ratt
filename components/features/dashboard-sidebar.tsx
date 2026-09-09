"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Archive,
  Library,
  FolderPlus,
  Image as ImageIcon,
  Presentation,
  FileStack,
  Sparkles,
} from "lucide-react";

const FEATURE_LINKS = [
  { href: "/dashboard?tab=Projects&filter=archived", label: "Archived", icon: Archive },
  { href: "/dashboard?tab=Assets%20%2F%20Files", label: "Library", icon: Library },
];

const WORKSPACE_LINKS = [
  { href: "/dashboard?tab=Projects", label: "New Project", icon: FolderPlus },
  { href: "/dashboard?tab=Workspace", label: "Workspace", icon: Sparkles },
  { href: "/dashboard?tab=Assets%20%2F%20Files", label: "Images", icon: ImageIcon },
  { href: "/dashboard?tab=Presentations", label: "Presentations", icon: Presentation },
  { href: "/dashboard?tab=Assets%20%2F%20Files", label: "Files", icon: FileStack },
];

type NavLink = { href: string; label: string; icon: typeof Sparkles };

export function DashboardSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeHref = searchParams.get("tab")
    ? `${pathname}?tab=${searchParams.get("tab")}${searchParams.get("filter") ? `&filter=${searchParams.get("filter")}` : ""}`
    : pathname;

  return (
    <aside className="hidden w-64 flex-col border-r border-neutral-200 bg-white px-4 py-6 dark:border-neutral-800 dark:bg-neutral-950 lg:flex">
      <Link href="/" className="mb-6 px-2">
        <img src="/cable-ratt-logo-black.svg" alt="Cable Ratt" className="h-6 dark:hidden" />
        <img src="/cable-ratt-logo-white.svg" alt="Cable Ratt" className="hidden h-6 dark:block" />
     </Link>

      <NavGroup title="Features" links={FEATURE_LINKS} activeHref={activeHref} />
      <NavGroup title="Workspaces" links={WORKSPACE_LINKS} activeHref={activeHref} />
    </aside>
  );
}

function NavGroup({
  title,
  links,
  activeHref,
}: {
  title: string;
  links: NavLink[];
  activeHref: string | null;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
        {title}
      </p>
      <nav className="flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = activeHref ? decodeURIComponent(activeHref) === decodeURIComponent(href) : false;
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${
                active
                  ? "bg-neutral-100 font-medium dark:bg-neutral-900"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}