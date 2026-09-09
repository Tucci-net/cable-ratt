"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowDownToLine,
  Check,
  Download,
  File,
  FolderPlus,
  Hand,
  Maximize2,
  Minimize2,
  Move,
  MousePointer2,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
  Waves,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DashboardTopbar } from "@/components/features/dashboard-topbar";
import { Module } from "@/components/features/module";
import { CommitsModule } from "@/components/features/commits-module";
import { ActionsGaugeModule } from "@/components/features/actions-gauge-module";

const STATS = [
  { label: "Wires Pulled", value: "1,249", trend: "+12.3%" },
  { label: "Nodes Connected", value: "318", trend: "+8.9%" },
  { label: "Documents Managed", value: "142", trend: "+22.4%" },
];

const TABS = [
  "Overview",
  "Workspace",
  "Projects",
  "History",
  "Assets / Files",
  "Presentations",
  "Settings",
];

const RATT_LIGHT_ICON_SRC = "/ratt-light.svg";
const RATT_DARK_ICON_SRC = "/ratt-dark.svg";

type Point = { x: number; y: number };
type Wire = { id: number; points: Point[]; smooth: boolean };
type WireReport = {
  lengths: { id: number; value: number }[];
  overlaps: number;
  unit: WorkspaceSettings["unit"];
};
type WorkspaceSettings = {
  width: number;
  height: number;
  unit: "generic" | "feet" | "meters";
};
type WorkspaceMode = "points" | "smooth" | "move" | "delete" | "hand";
type ProjectStatus = "active" | "archived" | "completed";
type Project = {
  id: number;
  name: string;
  updated: string;
  status: ProjectStatus;
};
type ProjectFilter = "all" | ProjectStatus;

export default function DashboardHomePage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");
  const [projectSearch, setProjectSearch] = useState("");
  const [workspaceWires, setWorkspaceWires] = useState<Wire[]>([
    {
      id: 1,
      points: [
        { x: 80, y: 210 },
        { x: 520, y: 70 },
      ],
      smooth: false,
    },
  ]);
  const [workspaceSettings, setWorkspaceSettings] = useState<WorkspaceSettings>(
    { width: 600, height: 280, unit: "generic" },
  );
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "Cable layout study", updated: "Today", status: "active" },
    {
      id: 2,
      name: "Homepage exploration",
      updated: "Yesterday",
      status: "completed",
    },
    { id: 3, name: "Untitled project", updated: "Aug 28", status: "archived" },
  ]);
  const [files, setFiles] = useState<string[]>([]);
  const [history, setHistory] = useState([
    "Opened the dashboard overview",
    "Created a new project",
  ]);

  useEffect(() => {
    const requestedTab = searchParams.get("tab");
    setActiveTab(
      requestedTab && TABS.includes(requestedTab) ? requestedTab : "Overview",
    );
    const requestedFilter = searchParams.get("filter");
    setProjectFilter(
      requestedFilter === "active" ||
        requestedFilter === "archived" ||
        requestedFilter === "completed"
        ? requestedFilter
        : "all",
    );
  }, [searchParams]);

  function selectTab(tab: string) {
    setActiveTab(tab);
    const filterQuery =
      tab === "Projects" && projectFilter !== "all"
        ? `&filter=${projectFilter}`
        : "";
    window.history.pushState(
      {},
      "",
      `/dashboard?tab=${encodeURIComponent(tab)}${filterQuery}`,
    );
  }

  function recordActivity(activity: string) {
    setHistory((current) => [activity, ...current]);
  }

  function addProject() {
    setProjects((current) => [
      ...current,
      {
        id: Date.now(),
        name: "Untitled project",
        updated: "Just now",
        status: "active",
      },
    ]);
    recordActivity("Created a new project");
  }

  function updateProjectStatus(id: number, status: ProjectStatus) {
    setProjects((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status, updated: "Just now" } : item,
      ),
    );
    recordActivity(`Marked a project ${status}`);
  }

  function deleteProject(id: number) {
    const project = projects.find((item) => item.id === id);
    if (!project || !window.confirm(`Delete ${project.name}?`)) return;
    setProjects((current) => current.filter((item) => item.id !== id));
    recordActivity(`Deleted ${project.name}`);
  }

  function renameProject(id: number) {
    const project = projects.find((item) => item.id === id);
    if (!project) return;
    const name = window.prompt("Project name", project.name)?.trim();
    if (!name) return;
    setProjects((current) =>
      current.map((item) =>
        item.id === id ? { ...item, name, updated: "Just now" } : item,
      ),
    );
    recordActivity(`Renamed a project to ${name}`);
  }

  function addFiles(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []).map(
      (file) => file.name,
    );
    setFiles((current) => [...new Set([...current, ...selectedFiles])]);
    if (selectedFiles.length > 0)
      recordActivity(`Attached ${selectedFiles.join(", ")}`);
    event.target.value = "";
  }

  return (
    <div>
      <DashboardTopbar
        projectFilter={projectFilter}
        searchTerm={projectSearch}
        onProjectFilterChange={(filter) => {
          setProjectFilter(filter);
          selectTab("Projects");
        }}
        onSearchTermChange={(term) => {
          setProjectSearch(term);
          if (term) selectTab("Projects");
        }}
        onNewProject={() => {
          addProject();
          selectTab("Projects");
        }}
      />

      <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-neutral-200 px-6 py-4 text-sm dark:border-neutral-800">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <span className="text-neutral-500 dark:text-neutral-400">
              {stat.label}{" "}
            </span>
            <span className="font-medium">
              {stat.label === "Wires Pulled"
                ? workspaceWires.length.toLocaleString()
                : stat.value}
            </span>{" "}
            <span className="text-xs text-emerald-600 dark:text-emerald-400">
              {stat.trend}
            </span>
          </div>
        ))}
      </div>

      <nav className="flex gap-6 overflow-x-auto border-b border-neutral-200 px-6 text-sm dark:border-neutral-800">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => selectTab(tab)}
            className={`whitespace-nowrap border-b-2 py-3 ${
              activeTab === tab
                ? "border-black font-medium dark:border-white"
                : "border-transparent text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === "Overview" && <Overview />}
      {activeTab === "Workspace" && (
        <Workspace
          wires={workspaceWires}
          onWiresChange={setWorkspaceWires}
          settings={workspaceSettings}
          onActivity={recordActivity}
        />
      )}
      {activeTab === "Projects" && (
        <Projects
          projects={projects}
          searchTerm={projectSearch}
          filter={projectFilter}
          onAdd={addProject}
          onRename={renameProject}
          onStatusChange={updateProjectStatus}
          onDelete={deleteProject}
        />
      )}
      {activeTab === "History" && <History entries={history} />}
      {activeTab === "Assets / Files" && (
        <Assets files={files} onAddFiles={addFiles} />
      )}
      {activeTab === "Presentations" && (
        <Presentations files={files} points={workspaceWires[0]?.points ?? []} />
      )}
      {activeTab === "Settings" && (
        <Settings
          settings={workspaceSettings}
          onSettingsChange={setWorkspaceSettings}
        />
      )}
    </div>
  );
}

function Overview() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Wires Pulled", "1,249"],
          ["Nodes Connected", "318"],
          ["Documents", "142"],
          ["Exports", "56"],
        ].map(([label, value]) => (
          <Module key={label}>
            <p className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">
              {label}
            </p>
            <p className="text-3xl font-semibold">{value}</p>
          </Module>
        ))}
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
    </>
  );
}

function Workspace({
  wires,
  onWiresChange,
  settings,
  onActivity,
}: {
  wires: Wire[];
  onWiresChange: (wires: Wire[]) => void;
  settings: WorkspaceSettings;
  onActivity: (activity: string) => void;
}) {
  const [mode, setMode] = useState<WorkspaceMode>("points");
  const [activeWireId, setActiveWireId] = useState(wires[0]?.id ?? 1);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [panStart, setPanStart] = useState<{
    x: number;
    y: number;
    panX: number;
    panY: number;
  } | null>(null);
  const [isRattRunning, setIsRattRunning] = useState(false);
  const [rattResult, setRattResult] = useState<WireReport | null>(null);
  const [showAllWires, setShowAllWires] = useState(false);
  const activeWire = wires.find((wire) => wire.id === activeWireId) ?? wires[0];
  const points = activeWire?.points ?? [];
  const smoothDrawing = activeWire?.smooth ?? false;
  const visibleWires = showAllWires ? wires : activeWire ? [activeWire] : [];

  function updateActiveWire(pointsToUpdate: Point[], smooth = smoothDrawing) {
    if (!activeWire) return;
    onWiresChange(
      wires.map((wire) =>
        wire.id === activeWire.id
          ? { ...wire, points: pointsToUpdate, smooth }
          : wire,
      ),
    );
  }

  function addWire() {
    const id = Date.now();
    onWiresChange([...wires, { id, points: [], smooth: false }]);
    setActiveWireId(id);
    setMode("points");
    setRattResult(null);
    onActivity("Created a new wire");
  }

  function runRatt() {
    if (isRattRunning || wires.length === 0) return;
    setIsRattRunning(true);
    setRattResult(null);
    window.setTimeout(() => {
      setRattResult(calculateWireReport(wires, settings));
      setIsRattRunning(false);
      onActivity("Ran Ratt run");
    }, 1800);
  }
  const templates: {
    mode: WorkspaceMode;
    label: string;
    description: string;
    icon: LucideIcon;
  }[] = [
    {
      mode: "points",
      label: "Point-to-point wire",
      description: "Click to add each point.",
      icon: MousePointer2,
    },
    {
      mode: "smooth",
      label: "Smooth freehand wire",
      description: "Click and drag continuously.",
      icon: Waves,
    },
    {
      mode: "move",
      label: "Move wire points",
      description: "Select and reposition a point.",
      icon: Move,
    },
    {
      mode: "delete",
      label: "Delete wire points",
      description: "Select a point to remove it.",
      icon: Trash2,
    },
    {
      mode: "hand",
      label: "Hand tool",
      description: "Pan around the workspace.",
      icon: Hand,
    },
  ];

  function getLocalPoint(event: React.PointerEvent<SVGSVGElement>) {
    const svg = event.currentTarget;
    const screenPoint = svg.createSVGPoint();
    screenPoint.x = event.clientX;
    screenPoint.y = event.clientY;
    const transform = svg.getScreenCTM();
    return transform
      ? screenPoint.matrixTransform(transform.inverse())
      : { x: 0, y: 0 };
  }

  function getPoint(event: React.PointerEvent<SVGSVGElement>): Point {
    const localPoint = getLocalPoint(event);
    return {
      x: Math.max(
        0,
        Math.min(settings.width, Math.round((localPoint.x - pan.x) / zoom)),
      ),
      y: Math.max(
        0,
        Math.min(settings.height, Math.round((localPoint.y - pan.y) / zoom)),
      ),
    };
  }

  function closestPoint(point: Point) {
    let closestIndex: number | null = null;
    let closestDistance = 22;
    points.forEach((item, index) => {
      const distance = Math.hypot(item.x - point.x, item.y - point.y);
      if (distance < closestDistance) {
        closestIndex = index;
        closestDistance = distance;
      }
    });
    return closestIndex;
  }

  function handlePointerDown(event: React.PointerEvent<SVGSVGElement>) {
    if (mode === "hand") {
      const point = getLocalPoint(event);
      event.currentTarget.setPointerCapture(event.pointerId);
      setPanStart({ x: point.x, y: point.y, panX: pan.x, panY: pan.y });
      return;
    }
    const point = getPoint(event);
    event.currentTarget.setPointerCapture(event.pointerId);
    if (mode === "points") {
      updateActiveWire([...points, point], false);
      onActivity("Added a wire point");
    } else if (mode === "smooth") {
      updateActiveWire([...points, point], true);
      setIsDrawing(true);
      onActivity("Started a smooth wire");
    } else {
      const index = closestPoint(point);
      if (index !== null) {
        setActivePoint(index);
        if (mode === "delete") {
          updateActiveWire(
            points.filter((_, pointIndex) => pointIndex !== index),
          );
          setActivePoint(null);
          onActivity("Deleted a wire point");
        }
      }
    }
  }

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    if (mode === "hand" && panStart) {
      const point = getLocalPoint(event);
      setPan({
        x: panStart.panX + point.x - panStart.x,
        y: panStart.panY + point.y - panStart.y,
      });
    } else if (mode === "smooth" && isDrawing) {
      const point = getPoint(event);
      const lastPoint = points[points.length - 1];
      if (
        !lastPoint ||
        Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y) > 5
      )
        updateActiveWire([...points, point]);
    } else if (mode === "move" && activePoint !== null) {
      const point = getPoint(event);
      updateActiveWire(
        points.map((item, index) => (index === activePoint ? point : item)),
      );
    }
  }

  function finishPointer() {
    if (mode === "smooth" && isDrawing)
      updateActiveWire(simplifyPoints(points, 10));
    setIsDrawing(false);
    setActivePoint(null);
    setPanStart(null);
  }

  function resetWorkspace() {
    updateActiveWire(
      [
        { x: 80, y: 210 },
        { x: 520, y: 70 },
      ],
      false,
    );
    setActivePoint(null);
    onActivity("Reset the workspace wire");
  }

  function saveSvg() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 280">${wires.map((wire) => `<g data-wire-id="${wire.id}" data-cable-ratt-mode="${wire.smooth ? "smooth" : "points"}"><path d="${buildWorkspacePath(wire.points, wire.smooth)}" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${wire.points.map((point) => `<circle class="workspace-point" cx="${point.x}" cy="${point.y}" r="5"/>`).join("")}</g>`).join("")}</svg>`;
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "cable-ratt-workspace.svg";
    link.click();
    URL.revokeObjectURL(url);
    onActivity("Saved the workspace as an SVG");
  }

  function openSvg(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const document = new DOMParser().parseFromString(
        String(reader.result),
        "image/svg+xml",
      );
      const loadedWires = Array.from(
        document.querySelectorAll("g[data-wire-id]"),
      )
        .map((group, index) => ({
          id: Number(group.getAttribute("data-wire-id")) || Date.now() + index,
          smooth: group.getAttribute("data-cable-ratt-mode") === "smooth",
          points: Array.from(group.querySelectorAll(".workspace-point"))
            .map((circle) => ({
              x: Number(circle.getAttribute("cx")),
              y: Number(circle.getAttribute("cy")),
            }))
            .filter(
              (point) => Number.isFinite(point.x) && Number.isFinite(point.y),
            ),
        }))
        .filter((wire) => wire.points.length > 0);
      if (loadedWires.length > 0) {
        onWiresChange(loadedWires);
        setActiveWireId(loadedWires[0]!.id);
        onActivity(`Opened ${file.name}`);
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  return (
    <div
      className={`${isFullscreen ? "fixed inset-0 z-50 grid bg-white dark:bg-neutral-950" : "grid p-6"} gap-6 xl:grid-cols-[1fr_280px]`}
    >
      <Module className={isFullscreen ? "min-h-0 h-full" : "min-h-[500px]"}>
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-lg font-medium">Vector workspace</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Choose a wire template, then draw directly on the canvas.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <label
                className="text-xs font-medium text-neutral-500 dark:text-neutral-400"
                htmlFor="wire-select"
              >
                Active wire
              </label>
              <select
                id="wire-select"
                value={activeWire?.id ?? ""}
                onChange={(event) => {
                  setActiveWireId(Number(event.target.value));
                  setRattResult(null);
                }}
                className="rounded-md border border-neutral-300 bg-transparent px-2 py-1 text-xs dark:border-neutral-700"
              >
                {wires.map((wire, index) => (
                  <option key={wire.id} value={wire.id}>
                    Wire {index + 1} ({wire.points.length} points)
                  </option>
                ))}
              </select>
              <button
                onClick={addWire}
                className="flex items-center gap-1 rounded-md border border-neutral-300 px-2 py-1 text-xs hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
              >
                <Plus className="h-3.5 w-3.5" /> New wire
              </button>
              <label className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                <input
                  type="checkbox"
                  checked={showAllWires}
                  onChange={(event) => setShowAllWires(event.target.checked)}
                />{" "}
                Show all wires
              </label>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIsFullscreen((current) => !current)}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className="rounded-md border border-neutral-300 p-2 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() =>
                setZoom((current) =>
                  Math.max(0.5, Number((current - 0.25).toFixed(2))),
                )
              }
              aria-label="Zoom out"
              title="Zoom out"
              className="rounded-md border border-neutral-300 p-2 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="flex items-center px-1 text-xs text-neutral-500 dark:text-neutral-400">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() =>
                setZoom((current) =>
                  Math.min(3, Number((current + 0.25).toFixed(2))),
                )
              }
              aria-label="Zoom in"
              title="Zoom in"
              className="rounded-md border border-neutral-300 p-2 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={resetWorkspace}
              className="flex items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            <button
              onClick={saveSvg}
              disabled={points.length < 2}
              className="flex items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              <Download className="h-4 w-4" /> Save SVG
            </button>
            <label className="flex cursor-pointer items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800">
              <Upload className="h-4 w-4" /> Open SVG
              <input
                type="file"
                accept=".svg,image/svg+xml"
                onChange={openSvg}
                className="sr-only"
              />
            </label>
            <button
              onClick={runRatt}
              disabled={isRattRunning}
              className="flex items-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-wait disabled:opacity-70"
            >
              <span className="text-base">R</span> Ratt
            </button>
          </div>
        </div>
        <svg
          viewBox={`0 0 ${settings.width} ${settings.height}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointer}
          onPointerCancel={finishPointer}
          className={`${isFullscreen ? "min-h-0 flex-1" : "h-[280px]"} w-full touch-none rounded-lg border border-dashed border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-950 ${mode === "hand" ? "cursor-grab active:cursor-grabbing" : "cursor-crosshair"}`}
        >
          <defs>
            <pattern
              id="workspace-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="currentColor"
                strokeOpacity=".08"
              />
            </pattern>
          </defs>
          <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
            <rect
              width={settings.width}
              height={settings.height}
              fill="url(#workspace-grid)"
            />
            {visibleWires.map((wire) => (
              <path
                key={wire.id}
                d={buildWorkspacePath(wire.points, wire.smooth)}
                fill="none"
                stroke="currentColor"
                strokeWidth={wire.id === activeWire?.id ? "3" : "2"}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={wire.id === activeWire?.id ? 1 : 0.35}
                className="text-blue-600 dark:text-blue-400"
              />
            ))}
            {points.map((point, index) => (
              <g key={`${point.x}-${point.y}-${index}`}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="7"
                  fill="currentColor"
                  stroke={activePoint === index ? "#f97316" : "none"}
                  strokeWidth="3"
                  className="text-blue-600 dark:text-blue-400"
                />
                {(mode === "move" || mode === "delete") && (
                  <text
                    x={point.x + 12}
                    y={point.y - 12}
                    className="fill-current text-xs font-medium"
                  >
                    {index + 1}
                  </text>
                )}
              </g>
            ))}
          </g>
        </svg>
        <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          {mode === "points"
            ? "Click to add points."
            : mode === "smooth"
              ? "Hold and drag to draw a smooth wire."
              : mode === "move"
                ? "Drag a point to reposition it."
                : "Click a point to delete it."}
        </p>
        {rattResult && (
          <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm dark:border-orange-900/50 dark:bg-orange-950/20">
            <p className="font-medium">Ratt run complete</p>
            <p className="mt-1 text-neutral-600 dark:text-neutral-300">
              {rattResult.overlaps} wire overlap
              {rattResult.overlaps === 1 ? "" : "s"} detected.
            </p>
            <div className="mt-3 grid gap-1 text-xs text-neutral-600 dark:text-neutral-300">
              {rattResult.lengths.map((wire) => (
                <div key={wire.id} className="flex justify-between">
                  <span>
                    Wire {wires.findIndex((item) => item.id === wire.id) + 1}
                  </span>
                  <span>{wire.value.toFixed(1)} {rattResult.unit}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Module>
      {isRattRunning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-xl border border-neutral-700 bg-neutral-950 p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between text-white">
              <div><p className="text-lg font-medium">Ratt is tracing your wires</p><p className="text-sm text-neutral-400">The cable is being undrawn ahead of the runner.</p></div>
              <span className="text-xs uppercase tracking-widest text-orange-400">Calculating</span>
            </div>
            <svg viewBox="0 0 800 240" className="h-56 w-full rounded-lg bg-neutral-900">
              <defs><clipPath id="ratt-cable-clip"><rect className="ratt-cable-clip" x="0" y="0" width="800" height="240" /></clipPath></defs>
              <path d="M 70 150 C 260 140 540 160 750 140" fill="none" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" clipPath="url(#ratt-cable-clip)" />
              <image href={RATT_LIGHT_ICON_SRC} x="0" y="90" width="100" height="80" className="ratt-chase dark:hidden" />
              <image href={RATT_DARK_ICON_SRC} x="0" y="90" width="100" height="80" className="ratt-chase hidden dark:block" />
            </svg>
          </div>
        </div>
      )}
      <Module className={isFullscreen ? "w-20 min-w-20" : ""}>
        {!isFullscreen && (
          <>
            <p className="mb-1 text-lg font-medium">Wire templates</p>
            <p className="mb-5 text-sm text-neutral-500 dark:text-neutral-400">
              Each option changes how the canvas responds.
            </p>
          </>
        )}
        <div
          className={
            isFullscreen ? "flex flex-col items-center gap-2" : "space-y-2"
          }
        >
          {templates.map((template) => (
            <button
              key={template.mode}
              onClick={() => setMode(template.mode)}
              aria-label={template.label}
              title={template.label}
              className={`${isFullscreen ? "h-10 w-10 items-center justify-center p-2" : "w-full items-start justify-between gap-3 px-3 py-3 text-left"} flex rounded-md border ${mode === template.mode ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30" : "border-neutral-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"}`}
            >
              <span className={isFullscreen ? "" : ""}>
                <span className="flex items-center gap-2 text-sm font-medium">
                  <template.icon className="h-4 w-4 text-neutral-500" />
                  {!isFullscreen && template.label}
                </span>
                {!isFullscreen && (
                  <span className="mt-1 block pl-6 text-xs text-neutral-500 dark:text-neutral-400">
                    {template.description}
                  </span>
                )}
              </span>
              {!isFullscreen && mode === template.mode && (
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      </Module>
    </div>
  );
}

function calculateWireReport(
  wires: Wire[],
  settings: WorkspaceSettings,
): WireReport {
  const lengths = wires.map((wire) => ({
    id: wire.id,
    value: wire.points.slice(1).reduce((total, point, index) => {
      const previous = wire.points[index]!;
      return total + Math.hypot(point.x - previous.x, point.y - previous.y);
    }, 0),
  }));
  let overlaps = 0;
  for (let firstWire = 0; firstWire < wires.length; firstWire += 1) {
    for (
      let secondWire = firstWire + 1;
      secondWire < wires.length;
      secondWire += 1
    ) {
      const firstPoints = wires[firstWire]!.points;
      const secondPoints = wires[secondWire]!.points;
      for (
        let firstSegment = 1;
        firstSegment < firstPoints.length;
        firstSegment += 1
      ) {
        for (
          let secondSegment = 1;
          secondSegment < secondPoints.length;
          secondSegment += 1
        ) {
          if (
            segmentsIntersect(
              firstPoints[firstSegment - 1]!,
              firstPoints[firstSegment]!,
              secondPoints[secondSegment - 1]!,
              secondPoints[secondSegment]!,
            )
          )
            overlaps += 1;
        }
      }
    }
  }
  return { lengths, overlaps, unit: settings.unit };
}

function segmentsIntersect(
  firstStart: Point,
  firstEnd: Point,
  secondStart: Point,
  secondEnd: Point,
) {
  const orientation = (a: Point, b: Point, c: Point) =>
    (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  const onSegment = (start: Point, point: Point, end: Point) =>
    point.x >= Math.min(start.x, end.x) &&
    point.x <= Math.max(start.x, end.x) &&
    point.y >= Math.min(start.y, end.y) &&
    point.y <= Math.max(start.y, end.y);
  const first = orientation(firstStart, firstEnd, secondStart);
  const second = orientation(firstStart, firstEnd, secondEnd);
  const third = orientation(secondStart, secondEnd, firstStart);
  const fourth = orientation(secondStart, secondEnd, firstEnd);
  const crosses =
    ((first > 0 && second < 0) || (first < 0 && second > 0)) &&
    ((third > 0 && fourth < 0) || (third < 0 && fourth > 0));
  return (
    crosses ||
    (first === 0 && onSegment(firstStart, secondStart, firstEnd)) ||
    (second === 0 && onSegment(firstStart, secondEnd, firstEnd)) ||
    (third === 0 && onSegment(secondStart, firstStart, secondEnd)) ||
    (fourth === 0 && onSegment(secondStart, firstEnd, secondEnd))
  );
}

function buildWorkspacePath(points: Point[], smooth: boolean) {
  if (points.length === 0) return "";
  const first = points[0]!;
  let path = `M ${first.x},${first.y}`;
  if (!smooth)
    return `${path}${points
      .slice(1)
      .map((point) => ` L ${point.x},${point.y}`)
      .join("")}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index]!;
    const next = points[index + 1]!;
    const previous = points[index - 1] ?? current;
    const following = points[index + 2] ?? next;
    path += ` C ${current.x + (next.x - previous.x) / 6},${current.y + (next.y - previous.y) / 6} ${next.x - (following.x - current.x) / 6},${next.y - (following.y - current.y) / 6} ${next.x},${next.y}`;
  }
  return path;
}

function simplifyPoints(points: Point[], tolerance: number): Point[] {
  if (points.length <= 2) return points;
  const squaredTolerance = tolerance * tolerance;
  let furthestIndex = 0;
  let furthestDistance = 0;
  const start = points[0]!;
  const end = points[points.length - 1]!;

  points.slice(1, -1).forEach((point, index) => {
    const distance = squaredSegmentDistance(point, start, end);
    if (distance > furthestDistance) {
      furthestIndex = index + 1;
      furthestDistance = distance;
    }
  });

  if (furthestDistance <= squaredTolerance) return [start, end];
  const left: Point[] = simplifyPoints(
    points.slice(0, furthestIndex + 1),
    tolerance,
  );
  const right: Point[] = simplifyPoints(points.slice(furthestIndex), tolerance);
  return [...left.slice(0, -1), ...right];
}

function squaredSegmentDistance(point: Point, start: Point, end: Point) {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  if (deltaX === 0 && deltaY === 0)
    return (point.x - start.x) ** 2 + (point.y - start.y) ** 2;
  const projection = Math.max(
    0,
    Math.min(
      1,
      ((point.x - start.x) * deltaX + (point.y - start.y) * deltaY) /
        (deltaX ** 2 + deltaY ** 2),
    ),
  );
  const closestX = start.x + projection * deltaX;
  const closestY = start.y + projection * deltaY;
  return (point.x - closestX) ** 2 + (point.y - closestY) ** 2;
}

function Projects({
  projects,
  searchTerm,
  filter,
  onAdd,
  onRename,
  onStatusChange,
  onDelete,
}: {
  projects: Project[];
  searchTerm: string;
  filter: ProjectFilter;
  onAdd: () => void;
  onRename: (id: number) => void;
  onStatusChange: (id: number, status: ProjectStatus) => void;
  onDelete: (id: number) => void;
}) {
  const visibleProjects = projects.filter((project) => {
    const matchesFilter = filter === "all" || project.status === filter;
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Projects</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Your workspace projects, stored locally for this mock.
          </p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800 dark:bg-white dark:text-black"
        >
          <FolderPlus className="h-4 w-4" /> New project
        </button>
      </div>
      {visibleProjects.length === 0 ? (
        <Module>
          <p className="py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
            No projects match this search and status filter.
          </p>
        </Module>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <Module key={project.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{project.name}</p>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Updated {project.updated}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    aria-label={`Rename ${project.name}`}
                    onClick={() => onRename(project.id)}
                    className="rounded-md p-2 text-neutral-500 hover:bg-neutral-100 hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    aria-label={`Delete ${project.name}`}
                    onClick={() => onDelete(project.id)}
                    className="rounded-md p-2 text-neutral-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-wide text-neutral-400">
                  Status
                </span>
                <select
                  value={project.status}
                  onChange={(event) =>
                    onStatusChange(
                      project.id,
                      event.target.value as ProjectStatus,
                    )
                  }
                  className="rounded-md border border-neutral-300 bg-transparent px-2 py-1 text-xs capitalize dark:border-neutral-700"
                >
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </Module>
          ))}
        </div>
      )}
    </div>
  );
}

function History({ entries }: { entries: string[] }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Session history</h2>
      <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
        A record of changes made during this session.
      </p>
      <Module>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {entries.map((entry, index) => (
            <div
              key={`${entry}-${index}`}
              className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="rounded-full bg-neutral-100 p-2 dark:bg-neutral-800">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm">{entry}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {index === 0 ? "Just now" : `${index * 8} minutes ago`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Module>
    </div>
  );
}

function Assets({
  files,
  onAddFiles,
}: {
  files: string[];
  onAddFiles: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Assets / Files</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Add reference files to your workspace.
          </p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800 dark:bg-white dark:text-black">
          <Upload className="h-4 w-4" /> Attach files
          <input
            type="file"
            multiple
            onChange={onAddFiles}
            className="sr-only"
          />
        </label>
      </div>
      <Module>
        {files.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 text-center dark:border-neutral-700">
            <File className="mb-3 h-8 w-8 text-neutral-400" />
            <p className="text-sm font-medium">No files attached yet</p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Use Attach files to add files to this mock workspace.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file}
                className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-3 dark:border-neutral-800"
              >
                <span className="flex items-center gap-2 text-sm">
                  <File className="h-4 w-4 text-neutral-500" />
                  {file}
                </span>
                <ArrowDownToLine className="h-4 w-4 text-neutral-400" />
              </div>
            ))}
          </div>
        )}
      </Module>
    </div>
  );
}

function Settings({
  settings,
  onSettingsChange,
}: {
  settings: WorkspaceSettings;
  onSettingsChange: (settings: WorkspaceSettings) => void;
}) {
  return (
    <div className="p-6">
      <Module>
        <div className="max-w-xl">
          <h2 className="text-lg font-medium">Workspace settings</h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Set the drawing canvas size and measurement units.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <label className="text-sm">
              Width
              <input
                type="number"
                min="100"
                max="2400"
                value={settings.width}
                onChange={(event) =>
                  onSettingsChange({
                    ...settings,
                    width: Math.max(100, Number(event.target.value) || 100),
                  })
                }
                className="mt-2 w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
              />
            </label>
            <label className="text-sm">
              Height
              <input
                type="number"
                min="100"
                max="1600"
                value={settings.height}
                onChange={(event) =>
                  onSettingsChange({
                    ...settings,
                    height: Math.max(100, Number(event.target.value) || 100),
                  })
                }
                className="mt-2 w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
              />
            </label>
            <label className="text-sm">
              Units
              <select
                value={settings.unit}
                onChange={(event) =>
                  onSettingsChange({
                    ...settings,
                    unit: event.target.value as WorkspaceSettings["unit"],
                  })
                }
                className="mt-2 w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 capitalize dark:border-neutral-700"
              >
                <option value="generic">Generic</option>
                <option value="feet">Feet</option>
                <option value="meters">Meters</option>
              </select>
            </label>
          </div>
        </div>
      </Module>
    </div>
  );
}

function Presentations({
  files,
  points,
}: {
  files: string[];
  points: Point[];
}) {
  const [yaml, setYaml] = useState(
    `name: cable-ratt-tool\ndescription: A small workspace utility\nentrypoint: index.ts\nfeatures:\n  - draw a wire between two nodes\n  - use attached workspace assets`,
  );
  const [brief, setBrief] = useState("");

  function buildBrief() {
    setBrief(
      `Cable Ratt tool brief\n\n${yaml}\n\nWorkspace line: (${points[0]!.x}, ${points[0]!.y}) to (${points[1]!.x}, ${points[1]!.y})\nAssets: ${files.length ? files.join(", ") : "No assets attached"}`,
    );
  }

  return (
    <div className="grid gap-6 p-6 xl:grid-cols-2">
      <Module>
        <div className="mb-5">
          <h2 className="text-xl font-semibold">Presentation builder</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Write a YAML brief that combines your workspace line and attached
            assets.
          </p>
        </div>
        <textarea
          value={yaml}
          onChange={(event) => setYaml(event.target.value)}
          spellCheck={false}
          className="min-h-80 w-full resize-y rounded-md border border-neutral-300 bg-neutral-50 p-4 font-mono text-sm outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-950"
        />
        <button
          onClick={buildBrief}
          className="mt-4 flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800 dark:bg-white dark:text-black"
        >
          <Plus className="h-4 w-4" /> Build tool brief
        </button>
      </Module>
      <Module>
        <h2 className="mb-5 text-xl font-semibold">Shippable tool preview</h2>
        {brief ? (
          <pre className="min-h-80 whitespace-pre-wrap rounded-md border border-neutral-200 bg-neutral-50 p-4 font-mono text-sm dark:border-neutral-800 dark:bg-neutral-950">
            {brief}
          </pre>
        ) : (
          <div className="flex min-h-80 items-center justify-center rounded-md border border-dashed border-neutral-300 text-center text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
            Build the brief to preview the combined tool definition.
          </div>
        )}
      </Module>
    </div>
  );
}
