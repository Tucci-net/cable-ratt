import { DashboardTopbar } from "@/components/features/dashboard-topbar";
import { Module } from "@/components/features/module";
import { CommitsModule } from "@/components/features/commits-module";
import { ActionsGaugeModule } from "@/components/features/actions-gauge-module";

const STATS = [
  { label: "Prompts Today", value: "1,249", trend: "+12.3%" },
  { label: "Images Rendered", value: "318", trend: "+8.9%" },
  { label: "Documents Generated", value: "142", trend: "+22.4%" },
  { label: "API Tokens Used", value: "2.8M", trend: "+22.4%" },
];

const TABS = [
  "Overview",
  "Workspace",
  "Generations",
  "Projects",
  "Prompts",
  "History",
  "Analysis",
  "Assets / Files",
  "Settings",
];

export default function DashboardHomePage() {
  return (
    <div>
      <DashboardTopbar />

      <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-neutral-200 px-6 py-4 text-sm dark:border-neutral-800">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <span className="text-neutral-500 dark:text-neutral-400">{stat.label} </span>
            <span className="font-medium">{stat.value}</span>{" "}
            <span className="text-xs text-emerald-600 dark:text-emerald-400">{stat.trend}</span>
          </div>
        ))}
      </div>

      <nav className="flex gap-6 overflow-x-auto border-b border-neutral-200 px-6 text-sm dark:border-neutral-800">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`whitespace-nowrap border-b-2 py-3 ${
              i === 0
                ? "border-black font-medium dark:border-white"
                : "border-transparent text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 xl:grid-cols-4">
        <Module>
          <p className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">Prompts Today</p>
          <p className="text-3xl font-semibold">1,249</p>
        </Module>
        <Module>
          <p className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">AI Images</p>
          <p className="text-3xl font-semibold">318</p>
        </Module>
        <Module>
          <p className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">Documents</p>
          <p className="text-3xl font-semibold">142</p>
        </Module>
        <Module>
          <p className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">Exports</p>
          <p className="text-3xl font-semibold">56</p>
        </Module>
      </div>

<div className="flex flex-col gap-6 px-6 pb-6 lg:flex-row">
  <div className="lg:w-2/3">
    <Module className="h-full">
      <CommitsModule />
    </Module>
  </div>
  <div className="lg:w-1/3">
    <Module className="h-full">
      <ActionsGaugeModule />
    </Module>
  </div>
</div>
    </div>
  );
}