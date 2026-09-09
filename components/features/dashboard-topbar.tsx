"use client";

import { Search } from "lucide-react";

type ProjectFilter = "all" | "active" | "archived" | "completed";

export function DashboardTopbar({
  projectFilter,
  searchTerm,
  onProjectFilterChange,
  onSearchTermChange,
  onNewProject,
}: {
  projectFilter: ProjectFilter;
  searchTerm: string;
  onProjectFilterChange: (filter: ProjectFilter) => void;
  onSearchTermChange: (term: string) => void;
  onNewProject: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-neutral-200 px-6 py-4 dark:border-neutral-800 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <select value={projectFilter} onChange={(event) => onProjectFilterChange(event.target.value as ProjectFilter)} className="rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm capitalize dark:border-neutral-700">
          <option value="all">All projects</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
          <option value="completed">Completed</option>
        </select>
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
            className="w-full rounded-md border border-neutral-300 bg-transparent py-2 pl-9 pr-3 text-sm dark:border-neutral-700"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-md border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">
          Export Data
        </button>
        <button onClick={onNewProject} className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
          + New Project
        </button>
      </div>
    </div>
  );
}