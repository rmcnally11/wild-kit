import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/rascal-icon.png"
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-xl"
            />
            <span>
              <span className="block text-xs font-extrabold tracking-wide text-accent uppercase">
                Wild Kit Co.
              </span>
              <span className="font-display block text-2xl leading-none">Wild Kit</span>
            </span>
          </Link>
          <nav className="flex flex-wrap items-center gap-2 text-sm font-extrabold">
            <Link href="/#jobs" className="rounded-full px-3 py-2 hover:bg-secondary">
              Saturday Jobs
            </Link>
            <Link href="/parents" className="rounded-full px-3 py-2 hover:bg-secondary">
              For Parents
            </Link>
            <Link href="/app" className="rounded-full bg-primary px-4 py-2 text-primary-foreground">
              Open the kits
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 py-8 text-sm font-semibold text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>Wild Kit Co. · Texas · Weekend projects for wild little kits.</p>
          <p className="flex flex-wrap gap-3">
            <Link href="/parents" className="underline">
              For Parents
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
