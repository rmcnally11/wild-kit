"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { PlannerControls } from "@/components/planner-controls";
import { TideChart } from "@/components/tide-chart";
import { WindowCard } from "@/components/window-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FREE_DAYS, PRO_DAYS, readPro } from "@/lib/storage";
import { formatDayLong, stageLabel } from "@/lib/format";
import type { Species } from "@/lib/species";
import type { Station } from "@/lib/stations";
import type { Forecast } from "@/lib/types";

export function PlannerView({
  forecast,
  station,
  species,
}: {
  forecast: Forecast;
  station: Station;
  species: Species;
}) {
  const [pro, setPro] = useState(false);

  useEffect(() => {
    const sync = () => setPro(readPro());
    sync();
    window.addEventListener("bite-window-change", sync);
    return () => window.removeEventListener("bite-window-change", sync);
  }, []);

  const days = pro ? PRO_DAYS : FREE_DAYS;
  const now = new Date(forecast.generatedAt).getTime();
  const horizon = now + days * 24 * 3600 * 1000;
  const visible = useMemo(
    () => forecast.windows.filter((window) => new Date(window.peak).getTime() <= horizon),
    [forecast.windows, horizon],
  );
  const ranked = [...visible].sort((a, b) => b.score - a.score);
  const nextBest = ranked[0] ?? null;
  const lockedCount = forecast.windows.length - visible.length;

  const grouped = new Map<string, typeof visible>();
  for (const window of visible) {
    const key = formatDayLong(window.peak, station.timezone);
    grouped.set(key, [...(grouped.get(key) ?? []), window]);
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-3">
        <p className="text-xs tracking-[0.2em] text-primary uppercase">Bite planner</p>
        <h1 className="font-heading text-4xl leading-none sm:text-5xl">
          {species.name} around {station.shortName}
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          {station.water}. Scores mix tide stage, light, swing, moon, wind, and season — then
          tell you the window, not just the high tide time.
        </p>
      </div>

      <PlannerControls stationId={station.id} speciesSlug={species.slug} />

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Badge variant="outline">{forecast.source === "noaa" ? "NOAA tides" : "Estimated tides"}</Badge>
        <Badge variant="outline">{forecast.moon.name}</Badge>
        <Badge variant="outline">{forecast.weatherOk ? "Live wind" : "No weather feed"}</Badge>
        <Badge variant="outline">{pro ? `${PRO_DAYS}-day Pro horizon` : `${FREE_DAYS}-day free horizon`}</Badge>
      </div>

      {forecast.sourceNote && (
        <p className="rounded-xl bg-secondary/60 px-4 py-3 text-sm text-muted-foreground">
          {forecast.sourceNote}
        </p>
      )}

      {nextBest ? (
        <WindowCard
          window={nextBest}
          timeZone={station.timezone}
          stationId={station.id}
          stationName={station.shortName}
          speciesSlug={species.slug}
          speciesName={species.name}
          featured
        />
      ) : (
        <div className="rounded-2xl bg-card p-8 text-center ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">No windows in this horizon</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            NOAA did not return usable tide swings for the selected days. Try another station
            or unlock Pro for a longer look.
          </p>
        </div>
      )}

      <TideChart
        tides={forecast.tides}
        extremes={forecast.extremes}
        windows={visible}
        timeZone={station.timezone}
        highlightId={nextBest?.id}
        nowIso={forecast.generatedAt}
      />

      <section className="grid gap-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl">Upcoming windows</h2>
          <p className="text-sm text-muted-foreground">{visible.length} scored</p>
        </div>
        {[...grouped.entries()].map(([day, windows]) => (
          <div key={day} className="grid gap-3">
            <h3 className="text-sm tracking-wide text-muted-foreground uppercase">{day}</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {windows.map((window) => (
                <div key={window.id} className="rounded-2xl bg-card/80 p-4 ring-1 ring-foreground/10">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">
                        {stageLabel(window.stage)} · {window.score}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {window.tactic}
                      </p>
                    </div>
                    <span className="rounded-full bg-secondary px-2 py-1 text-xs capitalize">
                      {window.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {ranked.length > 1 && (
        <section className="grid gap-4">
          <h2 className="font-heading text-3xl">Ranked, not chronological</h2>
          <div className="grid gap-4">
            {ranked.slice(1, 5).map((window) => (
              <WindowCard
                key={window.id}
                window={window}
                timeZone={station.timezone}
                stationId={station.id}
                stationName={station.shortName}
                speciesSlug={species.slug}
                speciesName={species.name}
              />
            ))}
          </div>
        </section>
      )}

      {!pro && lockedCount > 0 && (
        <div className="rounded-2xl bg-secondary/50 p-6 ring-1 ring-primary/20">
          <h2 className="font-heading text-2xl">{lockedCount} more windows sit past day {FREE_DAYS}</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Pro on this device unlocks a {PRO_DAYS}-day horizon, the same scoring model, and a
            logbook that keeps the windows you actually want to fish.
          </p>
          <Button asChild className="mt-4">
            <Link href="/pricing">See Pro</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
