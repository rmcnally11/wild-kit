import Link from "next/link";

import { TideMark } from "@/components/site-header";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <TideMark className="size-6" />
            <span className="font-heading text-lg">Bite Window</span>
          </div>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            A saltwater bite-window planner. NOAA tides, local weather, and species
            notes so you stop guessing which tide is worth launching for.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <Link href="/planner" className="hover:text-foreground">
            Planner
          </Link>
          <Link href="/species" className="hover:text-foreground">
            Species
          </Link>
          <Link href="/pricing" className="hover:text-foreground">
            Pro
          </Link>
          <Link href="/log" className="hover:text-foreground">
            Logbook
          </Link>
        </div>
      </div>
    </footer>
  );
}
