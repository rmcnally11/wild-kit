import { PlannerView } from "@/components/planner-view";
import { getForecast } from "@/lib/forecast";
import { DEFAULT_SPECIES_SLUG, getSpecies } from "@/lib/species";
import { DEFAULT_STATION_ID, getStation } from "@/lib/stations";

export const revalidate = 1800;

export default async function PlannerPage({
  searchParams,
}: {
  searchParams: Promise<{ station?: string | string[]; species?: string | string[] }>;
}) {
  const params = await searchParams;
  const stationId = String(params.station ?? DEFAULT_STATION_ID);
  const speciesSlug = String(params.species ?? DEFAULT_SPECIES_SLUG);
  const station = getStation(stationId) ?? getStation(DEFAULT_STATION_ID)!;
  const species = getSpecies(speciesSlug) ?? getSpecies(DEFAULT_SPECIES_SLUG)!;
  const forecast = await getForecast({
    stationId: station.id,
    speciesSlug: species.slug,
    days: 10,
  });

  return <PlannerView forecast={forecast} station={station} species={species} />;
}
