import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { CableRain } from "@/components/features/cable-rain";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cable Ratt",
  description: "Enterprise dashboard for [product description]",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <CableRain startDelayMs={300} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}