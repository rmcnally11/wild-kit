import type { Metadata } from "next";
import Link from "next/link";

import { SPECIES } from "@/lib/species";

export const metadata: Metadata = {
  title: "Species field notes",
};

export default function SpeciesIndexPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.2em] text-primary uppercase">Field notes</p>
      <h1 className="font-heading mt-3 text-4xl sm:text-6xl">What the tide actually does for each fish.</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        These notes drive the planner. Change the species, and the same NOAA curve produces a
        different set of windows — because redfish and sheepshead do not agree about slack water.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {SPECIES.map((species) => (
          <Link
            key={species.slug}
            href={`/species/${species.slug}`}
            className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10 transition-colors hover:ring-primary/40"
          >
            <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
              {species.latin}
            </p>
            <h2 className="font-heading mt-2 text-3xl">{species.name}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{species.summary}</p>
            <p className="mt-4 text-sm text-primary">Open notes</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
