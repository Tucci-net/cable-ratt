import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { forwardRef } from "react";

export const Header = forwardRef<HTMLElement, object>(function Header(_, ref) {
  return (
    <header
      ref={ref}
      className="flex items-center justify-between border-b border-neutral-200/40 px-6 py-4 dark:border-neutral-700/40"
    >
      <div className="flex items-center gap-8">
        <Image
          src="/cable-ratt-logo-black.svg"
          alt="Cable Ratt"
          width={250}
          height={47}
          className="h-10 w-auto max-w-[210px] dark:hidden"
        />
        <Image
          src="/cable-ratt-logo-white.svg"
          alt="Cable Ratt"
          width={250}
          height={47}
          className="hidden h-10 w-auto max-w-[210px] dark:block"
        />
        <nav className="hidden items-center gap-6 text-base text-neutral-600 dark:text-neutral-400 sm:flex">
	<Link href="/" className="hover:text-black dark:hover:text-white">
 	 Home
	</Link>
	<Link href="/dashboard" className="hover:text-black dark:hover:text-white">
  	Dashboard
	</Link>
          <Link
            href="/login"
            className="hover:text-black dark:hover:text-white"
          >
            Log in
          </Link>
        </nav>
      </div>
      <ThemeToggle />
    </header>
  );
});
