import Link from "next/link";
import { ArrowRight, Compass, MoonStar, Waves } from "lucide-react";
import type { ReactNode } from "react";

import { ScoreDial } from "@/components/score-dial";
import { Button } from "@/components/ui/button";
import { formatClock, formatDay, formatRange, gradeLabel, stageLabel } from "@/lib/format";
import { getForecast } from "@/lib/forecast";
import { DEFAULT_SPECIES_SLUG, getSpecies, SPECIES } from "@/lib/species";
import { DEFAULT_STATION_ID, getStation, STATIONS } from "@/lib/stations";

export const revalidate = 1800;

export default async function HomePage() {
  const station = getStation(DEFAULT_STATION_ID)!;
  const species = getSpecies(DEFAULT_SPECIES_SLUG)!;
  const forecast = await getForecast({
    stationId: station.id,
    speciesSlug: species.slug,
    days: 3,
  });
  const next = [...forecast.windows].sort((a, b) => b.score - a.score)[0];

  return (
    <div>
      <section className="mx-auto w-full max-w-6xl px-4 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24">
        <p className="text-xs tracking-[0.22em] text-primary uppercase">Saltwater side hustle, built</p>
        <h1 className="font-heading mt-4 max-w-3xl text-5xl leading-[0.95] sm:text-7xl">
          Know when the water will turn on.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Most tide apps stop at high and low. Bite Window scores the actual fishing window
          for redfish, snook, trout, tarpon, and the rest of the inshore rotation — using
          live NOAA tides and the weather that will actually be on the water.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full px-5">
            <Link href="/planner">
              Open the planner
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-5">
            <Link href="/species">Read the field notes</Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {STATIONS.length} NOAA stations · {SPECIES.length} inshore species · no account required
        </p>
      </section>

      {next && (
        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
          <div className="grid gap-6 rounded-3xl bg-card/70 p-6 ring-1 ring-foreground/10 md:grid-cols-[1.4fr_0.8fr] md:p-8">
            <div>
              <p className="text-xs tracking-[0.18em] text-copper uppercase">
                Next best · {station.shortName} · {species.name}
              </p>
              <h2 className="font-heading mt-2 text-4xl sm:text-5xl">
                {formatDay(next.peak, station.timezone)}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {formatRange(next.start, next.end, station.timezone)} · peak{" "}
                {formatClock(next.peak, station.timezone)}
              </p>
              <p className="mt-4 max-w-lg leading-7">
                {gradeLabel(next.grade)} on a {stageLabel(next.stage).toLowerCase()}. {next.tactic}
              </p>
              <Button asChild variant="outline" className="mt-6">
                <Link href={`/planner?station=${station.id}&species=${species.slug}`}>
                  Full {station.shortName} board
                </Link>
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-secondary/50 p-6">
              <ScoreDial score={next.score} grade={next.grade} size="lg" />
              <p className="text-sm text-muted-foreground">{forecast.moon.name}</p>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-16 sm:px-6 md:grid-cols-3">
        <IdeaCard
          icon={<Waves className="size-5 text-primary" />}
          kicker="Idea 1 · this product"
          title="Bite Window"
          body="Digital, no inventory. Recurring revenue from a tool you can run between tides. Live NOAA data, species scoring, a logbook, and a Pro horizon."
        />
        <IdeaCard
          icon={<Compass className="size-5 text-copper" />}
          kicker="Idea 2 · later"
          title="The Leader Bench"
          body="Custom-tied fluoro leaders as a productized service. High margin, uses skill you already have, sold as kits with a spec card from the same species notes."
        />
        <IdeaCard
          icon={<MoonStar className="size-5 text-foam" />}
          kicker="Idea 3 · later"
          title="Open Seat"
          body="Last-minute leftover charter seats. Captains hate empty chairs; anglers will take a 6 a.m. discount. Take rate instead of inventory — but it needs a two-sided dock."
        />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-4xl">How the score is built</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Tide stage",
              copy: "Flood, ebb, and both slacks are not equal. Snook want the drain. Trout want the first of the flood. The model weights the stage the way the fish actually hunt.",
            },
            {
              title: "Light and moon",
              copy: "Dawn and dusk get a real bump. Spring tides help current species and can wreck skinny-water sight fishing. That difference is in the math, not a vibe.",
            },
            {
              title: "Wind and season",
              copy: "A 25 mph onshore is not a 'go' just because the tide table looks pretty. Weather comes from Open-Meteo. Out-of-season windows get marked as maybes.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
              <h3 className="font-heading text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.copy}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
          This will not make fish appear. It will stop you from burning a Saturday on a dead
          slack in July because a generic solunar app said “excellent.”
        </p>
      </section>
    </div>
  );
}

function IdeaCard({
  icon,
  kicker,
  title,
  body,
}: {
  icon: ReactNode;
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{kicker}</p>
      </div>
      <h2 className="font-heading mt-3 text-2xl">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </article>
  );
}
