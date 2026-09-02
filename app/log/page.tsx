"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { formatClock, formatDay, formatRange } from "@/lib/format";
import { DEFAULT_STATION_ID, getStation } from "@/lib/stations";
import { readTrips, removeTrip, type SavedTrip } from "@/lib/storage";

export default function LogPage() {
  const [trips, setTrips] = useState<SavedTrip[] | null>(null);

  useEffect(() => {
    const sync = () => setTrips(readTrips());
    sync();
    window.addEventListener("bite-window-change", sync);
    return () => window.removeEventListener("bite-window-change", sync);
  }, []);

  if (trips === null) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 text-muted-foreground sm:px-6">
        Opening the logbook…
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.2em] text-primary uppercase">Logbook</p>
      <h1 className="font-heading mt-3 text-4xl sm:text-5xl">Windows you decided were worth it.</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Saved on this device only. No account, no cloud — which is the point until Pro needs a
        real backend.
      </p>

      {trips.length === 0 ? (
        <div className="mt-10 rounded-2xl bg-card p-8 text-center ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">Nothing saved yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Open the planner, pick a coast and a fish, and pin the windows you actually want to
            launch for.
          </p>
          <Button asChild className="mt-5">
            <Link href="/planner">Go to the planner</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-3">
          {trips.map((trip) => {
            const station = getStation(trip.stationId) ?? getStation(DEFAULT_STATION_ID)!;
            return (
              <article key={trip.id} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
                <p className="text-xs tracking-wide text-muted-foreground uppercase">
                  {trip.speciesName} · {trip.stationName} · score {trip.score}
                </p>
                <h2 className="font-heading mt-1 text-2xl">
                  {formatDay(trip.peak, station.timezone)}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatRange(trip.start, trip.end, station.timezone)} · peak{" "}
                  {formatClock(trip.peak, station.timezone)}
                </p>
                <p className="mt-3 text-sm leading-6">{trip.tactic}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/planner?station=${trip.stationId}&species=${trip.speciesSlug}`}>
                      Open planner
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeTrip(trip.id)}>
                    Remove
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
