"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { FamilyChrome } from "@/components/family-chrome";
import { hueOf } from "@/lib/hues";
import { KITS, type Season } from "@/lib/kits";
import { useStand } from "@/lib/stand-store";
import { cn } from "@/lib/utils";

const FILTERS: { id: "all" | Season; label: string; on: string; ink: string }[] = [
  { id: "all", label: "All", on: "#1C1A19", ink: "#FFF6E8" },
  { id: "summer", label: "Summer", on: "#F5C518", ink: "#1C1A19" },
  { id: "spring", label: "Spring", on: "#3BAF6A", ink: "#FFF6E8" },
  { id: "fall", label: "Fall", on: "#E85D75", ink: "#FFF6E8" },
  { id: "rain", label: "Rain", on: "#4EB3E8", ink: "#1C1A19" },
  { id: "anytime", label: "Anytime", on: "#FF7A59", ink: "#1C1A19" },
];

export default function SaturdayJobsHub() {
  const { stand } = useStand();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const visible = useMemo(
    () => (filter === "all" ? KITS : KITS.filter((kit) => kit.season === filter)),
    [filter],
  );
  const open = visible.filter((kit) => kit.status === "open");
  const next = visible.filter((kit) => kit.status === "next");

  return (
    <FamilyChrome title="Saturday Jobs">
      <div className="grid gap-5">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-wide text-[var(--raspberry)]">
            Weekend projects for wild little kits
          </p>
          <h2 className="font-display mt-1 text-4xl leading-none">Pick a job. Then go outside.</h2>
          <p className="mt-2 text-lg font-semibold">
            {stand.kidName ? `${stand.kidName} invents it.` : "Kids invent it."} You hit print. Then
            leave the phone.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={cn("tap rounded-full px-4 py-2 text-sm font-extrabold")}
              style={
                filter === item.id
                  ? { background: item.on, color: item.ink }
                  : { background: "#FFE7A8", color: "#1C1A19" }
              }
            >
              {item.label}
            </button>
          ))}
        </div>

        <section className="grid gap-3">
          <p className="text-sm font-extrabold uppercase tracking-wide text-accent">Open this weekend</p>
          {open.map((kit) => {
            const hue = hueOf(kit.id);
            return (
              <Link
                key={kit.id}
                href={kit.href || `/kits/${kit.id}`}
                className="tap rounded-[1.8rem] px-5 py-5"
                style={{ background: hue.bg, color: hue.ink }}
              >
                <p className="text-sm font-extrabold uppercase opacity-80">{kit.seasonLabel}</p>
                <p className="font-display mt-1 text-3xl leading-none">{kit.name}</p>
                <p className="mt-1 text-sm font-semibold">{kit.listing}</p>
                <p className="mt-2 font-semibold">{kit.line}</p>
                <p className="mt-3 text-sm font-extrabold">Open →</p>
              </Link>
            );
          })}
        </section>

        <section className="grid gap-3">
          <p className="text-sm font-extrabold uppercase tracking-wide">The rest of the shelf</p>
          <p className="text-sm text-muted-foreground">
            You do not need the buttons. The list is the job. Print a brief and go.
          </p>
          {next.map((kit) => {
            const hue = hueOf(kit.id);
            return (
              <Link
                key={kit.id}
                href={`/kits/${kit.id}`}
                className="tap rounded-[1.6rem] px-5 py-4"
                style={{ background: hue.bg, color: hue.ink }}
              >
                <p className="text-xs font-extrabold uppercase opacity-80">{kit.seasonLabel}</p>
                <p className="font-display text-2xl leading-none">{kit.name}</p>
                <p className="mt-1 text-sm font-semibold">{kit.line}</p>
              </Link>
            );
          })}
        </section>
      </div>
    </FamilyChrome>
  );
}
