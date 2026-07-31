"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export function ScrollHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10000);

    function handleScroll() {
      if (window.scrollY > 10) {
        setVisible(false);
        clearTimeout(timer);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-8 z-20 flex justify-center">
      <ChevronDown className="h-6 w-6 animate-bounce text-neutral-400 dark:text-neutral-500" />
    </div>
  );
}