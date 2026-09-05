import Link from "next/link";
import type { ReactNode } from "react";

import { HANDLE, STUDIO } from "@/lib/brand";
import { RascalBadge } from "@/lib/rascal";
import { cn } from "@/lib/utils";

export function SiteChrome({
  children,
  overlay,
}: {
  children: ReactNode;
  overlay?: boolean;
}) {
  return (
    <div className="min-h-dvh max-w-[100vw] overflow-x-clip bg-background">
      <header
        className={cn(
          "no-print z-30 h-14 w-full",
          overlay
            ? "absolute inset-x-0 top-0 bg-lemonade/90"
            : "sticky top-0 border-b border-border/80 bg-background/90 backdrop-blur",
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between gap-3 px-4">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <RascalBadge size={36} />
            <span className="font-display truncate text-xl leading-none">Wild Kit</span>
          </Link>
          <nav className="flex shrink-0 items-center gap-1 text-sm font-extrabold sm:gap-2">
            <Link href="/kits/lemonade" className="rounded-full px-3 py-2 hover:bg-white/40">
              This Saturday
            </Link>
            <Link href="/parents" className="rounded-full px-3 py-2 hover:bg-white/40">
              Parents
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="no-print border-t border-border bg-cream text-muted-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm font-semibold md:flex-row md:items-center md:justify-between">
          <p className="text-ink">Wild Kit Co. · getwildkit.com · {STUDIO}</p>
          <p className="flex flex-wrap gap-3">
            <Link href="/kits/lemonade" className="underline">
              This Saturday
            </Link>
            <Link href="/apps" className="underline">
              The app
            </Link>
            <Link href="/parents" className="underline">
              Parents
            </Link>
            <Link href="/about" className="underline">
              About
            </Link>
            <Link href="/privacy" className="underline">
              Privacy
            </Link>
            <a href="https://x.com/getwildkit" className="underline">
              {HANDLE}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
