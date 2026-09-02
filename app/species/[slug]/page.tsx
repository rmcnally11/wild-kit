import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { stageLabel } from "@/lib/format";
import { getSpecies, SPECIES } from "@/lib/species";
import { COAST_LABELS } from "@/lib/stations";
import type { TideStage } from "@/lib/types";

export function generateStaticParams() {
  return SPECIES.map((species) => ({ slug: species.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const species = getSpecies(slug);
  return {
    title: species ? species.name : "Species",
    description: species?.summary,
  };
}

export default async function SpeciesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const species = getSpecies(slug);
  if (!species) notFound();

  const stages: TideStage[] = ["flood", "high-slack", "ebb", "low-slack"];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.2em] text-primary uppercase">{species.latin}</p>
      <h1 className="font-heading mt-3 text-5xl sm:text-6xl">{species.name}</h1>
      <p className="mt-2 text-muted-foreground">{species.alsoCalled}</p>
      <p className="mt-6 text-lg leading-8">{species.summary}</p>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
          <dt className="text-xs tracking-wide text-muted-foreground uppercase">Water</dt>
          <dd className="mt-1">{species.water}</dd>
        </div>
        <div className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
          <dt className="text-xs tracking-wide text-muted-foreground uppercase">They eat</dt>
          <dd className="mt-1">{species.eat}</dd>
        </div>
        <div className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10 sm:col-span-2">
          <dt className="text-xs tracking-wide text-muted-foreground uppercase">Starting rig</dt>
          <dd className="mt-1">{species.rig}</dd>
        </div>
      </dl>

      <h2 className="font-heading mt-10 text-3xl">Tide by tide</h2>
      <div className="mt-4 grid gap-3">
        {stages.map((stage) => (
          <div key={stage} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-medium">{stageLabel(stage)}</h3>
              <span className="text-sm text-muted-foreground">
                weight {Math.round(species.stageWeight[stage] * 100)}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{species.tactics[stage]}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Coasts in this model: {species.coasts.map((coast) => COAST_LABELS[coast]).join(", ")}.
        Months treated as in-season:{" "}
        {species.months
          .map((month) => new Date(2026, month - 1, 1).toLocaleString("en-US", { month: "short" }))
          .join(", ")}
        .
      </p>

      <Button asChild className="mt-8">
        <Link href={`/planner?species=${species.slug}`}>Plan a {species.name.toLowerCase()} trip</Link>
      </Button>
    </div>
  );
}
