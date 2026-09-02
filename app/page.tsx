"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { FamilyChrome } from "@/components/family-chrome";
import { KITS, type Weather } from "@/lib/kits";
import { useStand } from "@/lib/stand-store";
import { cn } from "@/lib/utils";

const FILTERS: { id: "all" | Weather; label: string }[] = [
  { id: "all", label: "All" },
  { id: "outside", label: "Outside" },
  { id: "rainy", label: "Rainy day" },
  { id: "either", label: "Either" },
];

export default function FamilyHome() {
  const { stand } = useStand();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const kid = stand.kidName || "the kid";
  const visible = useMemo(
    () => (filter === "all" ? KITS : KITS.filter((kit) => kit.weather === filter)),
    [filter],
  );
  const open = visible.filter((kit) => kit.status === "open");
  const next = visible.filter((kit) => kit.status === "next");

  return (
    <FamilyChrome title={stand.kidName ? `${stand.kidName}'s Saturday` : "This Saturday"}>
      <div className="grid gap-5">
        <div>
          <h2 className="font-display text-4xl leading-none">Family Time</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Saturday projects that use the house, the driveway, and the kitchen. Not a game.{" "}
            {kid} runs it. A grown-up stays nearby.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={cn(
                "tap rounded-full px-4 py-2 text-sm font-extrabold",
                filter === item.id ? "bg-primary" : "bg-secondary",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <section className="grid gap-3">
          <p className="text-sm font-extrabold uppercase tracking-wide text-accent">Open now</p>
          {open.map((kit) => (
            <Link
              key={kit.id}
              href={kit.href || `/kits/${kit.id}`}
              className="tap rounded-[1.8rem] bg-primary px-5 py-5 text-primary-foreground"
            >
              <p className="text-sm font-extrabold uppercase opacity-80">{kit.weatherLabel}</p>
              <p className="font-display mt-1 text-3xl leading-none">{kit.name}</p>
              <p className="mt-2 font-semibold">{kit.line}</p>
              <p className="mt-3 text-sm font-extrabold">Open this one →</p>
            </Link>
          ))}
        </section>

        <section className="grid gap-3">
          <p className="text-sm font-extrabold uppercase tracking-wide">The rest of the shelf</p>
          <p className="text-sm text-muted-foreground">
            Each one is a real Saturday. The list is the kit. The phone buttons come as we open
            them.
          </p>
          {next.map((kit) => (
            <Link
              key={kit.id}
              href={`/kits/${kit.id}`}
              className="tap rounded-[1.6rem] bg-card px-5 py-4 ring-1 ring-border"
            >
              <p className="text-xs font-extrabold uppercase text-accent">{kit.weatherLabel}</p>
              <p className="font-display text-2xl leading-none">{kit.name}</p>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">{kit.line}</p>
            </Link>
          ))}
        </section>
      </div>
    </FamilyChrome>
  );
}
