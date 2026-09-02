import { moonInfo } from "@/lib/moon";
import { estimateTides, fetchNoaaTides } from "@/lib/noaa";
import { buildWindows } from "@/lib/score";
import { DEFAULT_SPECIES_SLUG, getSpecies } from "@/lib/species";
import { DEFAULT_STATION_ID, getStation } from "@/lib/stations";
import type { Forecast } from "@/lib/types";
import { fetchWeather } from "@/lib/weather";

export async function getForecast(input: {
  stationId?: string;
  speciesSlug?: string;
  days?: number;
}): Promise<Forecast> {
  const station =
    getStation(input.stationId ?? DEFAULT_STATION_ID) ??
    getStation(DEFAULT_STATION_ID)!;
  const species =
    getSpecies(input.speciesSlug ?? DEFAULT_SPECIES_SLUG) ??
    getSpecies(DEFAULT_SPECIES_SLUG)!;
  const days = Math.min(14, Math.max(1, input.days ?? 10));

  let source: Forecast["source"] = "noaa";
  let sourceNote: string | undefined;
  let tides;
  let extremes;

  try {
    const live = await fetchNoaaTides(station, days);
    tides = live.tides;
    extremes = live.extremes;
  } catch (error) {
    const fallback = estimateTides(station, days);
    tides = fallback.tides;
    extremes = fallback.extremes;
    source = "estimated";
    sourceNote =
      error instanceof Error
        ? `NOAA unavailable (${error.message}). Showing a harmonic estimate so you can still plan.`
        : "NOAA unavailable. Showing a harmonic estimate.";
  }

  let hours: Awaited<ReturnType<typeof fetchWeather>>["hours"] = [];
  let astro: Awaited<ReturnType<typeof fetchWeather>>["days"] = [];
  let weatherOk = true;
  try {
    const weather = await fetchWeather(station, days);
    hours = weather.hours;
    astro = weather.days;
  } catch {
    weatherOk = false;
  }

  const moon = moonInfo(new Date());
  const windows = buildWindows({
    station,
    species,
    extremes,
    hours,
    astro,
    moon,
  });

  const horizon = Date.now() + days * 24 * 3600 * 1000;
  const upcoming = windows.filter((window) => {
    const peak = new Date(window.peak).getTime();
    return peak >= Date.now() - 30 * 60 * 1000 && peak <= horizon;
  });

  return {
    stationId: station.id,
    speciesSlug: species.slug,
    generatedAt: new Date().toISOString(),
    source,
    sourceNote,
    tides,
    extremes,
    windows: upcoming,
    moon,
    weatherOk,
  };
}
