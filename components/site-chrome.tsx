import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

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
          "z-30 h-14 w-full",
          overlay
            ? "absolute inset-x-0 top-0 bg-lemonade/90"
            : "sticky top-0 border-b border-border/80 bg-background/90 backdrop-blur",
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between gap-3 px-4">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <Image
              src="/rascal-icon.png"
              alt=""
              width={36}
              height={36}
              className="size-9 shrink-0 rounded-lg"
            />
            <span className="min-w-0">
              <span className="hidden text-[10px] font-extrabold tracking-wide text-leaf uppercase sm:block">
                Wild Kit Co.
              </span>
              <span className="font-display block truncate text-xl leading-none">Wild Kit</span>
            </span>
          </Link>
          <nav className="flex shrink-0 items-center gap-1 text-sm font-extrabold sm:gap-2">
            <Link
              href="/#jobs"
              className="hidden rounded-full px-3 py-2 hover:bg-white/40 sm:inline"
            >
              Saturday Jobs
            </Link>
            <Link href="/parents" className="rounded-full px-3 py-2 hover:bg-white/40">
              Parents
            </Link>
            <Link
              href="/app"
              className="rounded-full bg-ink px-3 py-2 text-cream sm:px-4"
            >
              Open
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="bg-ink text-cream">
        <div className="grid h-2 grid-cols-5">
          <span className="bg-lemonade" />
          <span className="bg-raspberry" />
          <span className="bg-leaf" />
          <span className="bg-sky" />
          <span className="bg-coral" />
        </div>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm font-semibold md:flex-row md:items-center md:justify-between">
          <p>Wild Kit Co. · Texas · Weekend projects for wild little kits.</p>
          <p className="flex flex-wrap gap-3">
            <Link href="/parents" className="underline">
              Parents
            </Link>
            <Link href="/privacy" className="underline">
              Privacy
            </Link>
            <Link href="/app" className="underline">
              Saturday Jobs
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
