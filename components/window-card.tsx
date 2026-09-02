"use client";

import { CloudRain, Moon, Sunrise, Sun, Wind } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScoreDial } from "@/components/score-dial";
import {
  formatClock,
  formatDay,
  formatRange,
  gradeLabel,
  stageLabel,
  stageVerb,
  windLabel,
} from "@/lib/format";
import type { SavedTrip } from "@/lib/storage";
import { readTrips, removeTrip, upsertTrip } from "@/lib/storage";
import type { BiteWindow } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  window: BiteWindow;
  timeZone: string;
  stationId: string;
  stationName: string;
  speciesSlug: string;
  speciesName: string;
  featured?: boolean;
};

export function WindowCard(props: Props) {
  const { window, timeZone } = props;
  const LightIcon =
    window.light === "dawn" || window.light === "dusk"
      ? Sunrise
      : window.light === "night"
        ? Moon
        : Sun;

  return (
    <article
      className={cn(
        "rounded-2xl bg-card p-5 ring-1 ring-foreground/10",
        props.featured && "bg-card/80 ring-primary/30",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.18em] text-primary uppercase">
            {gradeLabel(window.grade)} · {stageLabel(window.stage)}
          </p>
          <h3 className="font-heading mt-1 text-2xl sm:text-3xl">
            {formatDay(window.peak, timeZone)}
          </h3>
          <p className="mt-1 text-muted-foreground">
            {formatRange(window.start, window.end, timeZone)} · peak{" "}
            {formatClock(window.peak, timeZone)}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6">{stageVerb(window.stage)}. {window.tactic}</p>
        </div>
        <ScoreDial score={window.score} grade={window.grade} size={props.featured ? "lg" : "md"} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1">
          <LightIcon className="size-3.5" />
          {window.light}
        </span>
        {window.weather && (
          <>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1">
              <Wind className="size-3.5" />
              {windLabel(window.weather.windMph, window.weather.windDir)}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1">
              {Math.round(window.weather.tempF)}°F
            </span>
            {window.weather.precipChance >= 30 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1">
                <CloudRain className="size-3.5" />
                {window.weather.precipChance}%
              </span>
            )}
          </>
        )}
        <span className="rounded-full bg-secondary px-2.5 py-1">
          {window.heightFt.toFixed(1)} ft · {window.rangeFt.toFixed(1)} ft swing
        </span>
      </div>
      <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
        {window.reasons.slice(0, props.featured ? 5 : 3).map((reason) => (
          <li key={reason} className="leading-6">
            {reason}
          </li>
        ))}
      </ul>
      {props.featured && (
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs sm:grid-cols-6">
          {Object.entries(window.breakdown).map(([key, value]) => (
            <div key={key} className="rounded-lg bg-secondary/70 px-2 py-2">
              <div className="text-foreground">{value}</div>
              <div className="mt-0.5 capitalize text-muted-foreground">{key}</div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-5">
        <SaveButton {...props} />
      </div>
    </article>
  );
}

function SaveButton(props: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => setSaved(readTrips().some((trip) => trip.id === props.window.id));
    sync();
    window.addEventListener("bite-window-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bite-window-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, [props.window.id]);

  const trip: SavedTrip = {
    id: props.window.id,
    stationId: props.stationId,
    stationName: props.stationName,
    speciesSlug: props.speciesSlug,
    speciesName: props.speciesName,
    peak: props.window.peak,
    start: props.window.start,
    end: props.window.end,
    stage: props.window.stage,
    score: props.window.score,
    grade: props.window.grade,
    tactic: props.window.tactic,
    savedAt: new Date().toISOString(),
  };

  return (
    <Button
      variant={saved ? "secondary" : "outline"}
      onClick={() => {
        if (saved) removeTrip(trip.id);
        else upsertTrip(trip);
      }}
    >
      {saved ? "Saved in logbook" : "Save this window"}
    </Button>
  );
}
