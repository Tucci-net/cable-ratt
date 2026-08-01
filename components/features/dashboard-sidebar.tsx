"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquarePlus,
  MessageSquare,
  Archive,
  Library,
  FolderPlus,
  Image as ImageIcon,
  Presentation,
  FileStack,
  Sparkles,
} from "lucide-react";

const FEATURE_LINKS = [
  { href: "/dashboard/chat", label: "Chat", icon: MessageSquare },
  { href: "/dashboard/archived", label: "Archived", icon: Archive },
  { href: "/dashboard/library", label: "Library", icon: Library },
];

const WORKSPACE_LINKS = [
  { href: "/dashboard/projects/new", label: "New Project", icon: FolderPlus },
  { href: "/dashboard/images", label: "Images", icon: ImageIcon },
  { href: "/dashboard/presentations", label: "Presentations", icon: Presentation },
  { href: "/dashboard/files", label: "Files", icon: FileStack },
];

type NavLink = { href: string; label: string; icon: typeof MessageSquare };

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r border-neutral-200 bg-white px-4 py-6 dark:border-neutral-800 dark:bg-neutral-950 lg:flex">
      <Link href="/" className="mb-6 px-2">
        <img src="/cable-ratt-logo-black.svg" alt="Cable Ratt" className="h-6 dark:hidden" />
        <img src="/cable-ratt-logo-white.svg" alt="Cable Ratt" className="hidden h-6 dark:block" />
     </Link>

      <button className="mb-6 flex items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">
        <MessageSquarePlus className="h-4 w-4" />
        New Chat
      </button>

      <NavGroup title="Features" links={FEATURE_LINKS} pathname={pathname} />
      <NavGroup title="Workspaces" links={WORKSPACE_LINKS} pathname={pathname} />
    </aside>
  );
}

function NavGroup({
  title,
  links,
  pathname,
}: {
  title: string;
  links: NavLink[];
  pathname: string | null;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
        {title}
      </p>
      <nav className="flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
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