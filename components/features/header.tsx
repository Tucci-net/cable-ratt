import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <img src="/cable-ratt-logo-black.svg" alt="Cable Ratt" className="h-8 dark:hidden" />
      <img src="/cable-ratt-logo-white.svg" alt="Cable Ratt" className="hidden h-8 dark:block" />
      <ThemeToggle />
    </header>
  );
}