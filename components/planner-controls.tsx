"use client";

import { useRouter } from "next/navigation";
import { LocateFixed } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SPECIES } from "@/lib/species";
import { nearestStation, stationsByCoast } from "@/lib/stations";

export function PlannerControls({
  stationId,
  speciesSlug,
}: {
  stationId: string;
  speciesSlug: string;
}) {
  const router = useRouter();
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState<string | null>(null);

  function go(nextStation: string, nextSpecies: string) {
    router.push(`/planner?station=${nextStation}&species=${nextSpecies}`);
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
      <label className="grid flex-1 gap-1.5 text-sm">
        <span className="text-muted-foreground">Tide station</span>
        <Select value={stationId} onValueChange={(value) => value && go(value, speciesSlug)}>
          <SelectTrigger className="w-full min-w-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {stationsByCoast().map((group) => (
              <SelectGroup key={group.coast}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.stations.map((station) => (
                  <SelectItem key={station.id} value={station.id}>
                    {station.shortName}, {station.state}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </label>
      <label className="grid flex-1 gap-1.5 text-sm">
        <span className="text-muted-foreground">Target species</span>
        <Select value={speciesSlug} onValueChange={(value) => value && go(stationId, value)}>
          <SelectTrigger className="w-full min-w-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SPECIES.map((species) => (
              <SelectItem key={species.slug} value={species.slug}>
                {species.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
      <div className="flex flex-col gap-1.5">
        <Button
          type="button"
          variant="outline"
          className="lg:mb-[1px]"
          disabled={locating}
          onClick={() => {
            setLocateError(null);
            if (!navigator.geolocation) {
              setLocateError("Location is not available in this browser.");
              return;
            }
            setLocating(true);
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const nearest = nearestStation(
                  position.coords.latitude,
                  position.coords.longitude,
                );
                setLocating(false);
                go(nearest.id, speciesSlug);
              },
              () => {
                setLocating(false);
                setLocateError("Could not read location. Pick a station instead.");
              },
              { timeout: 8000 },
            );
          }}
        >
          <LocateFixed />
          {locating ? "Finding coast…" : "Use my location"}
        </Button>
        {locateError && (
          <p className="text-xs text-destructive lg:max-w-40">{locateError}</p>
        )}
      </div>
    </div>
  );
}
