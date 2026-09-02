export const PRO_STORAGE_KEY = "bite-window-pro";
export const TRIPS_STORAGE_KEY = "bite-window-trips";
export const FREE_DAYS = 3;
export const PRO_DAYS = 10;

export type SavedTrip = {
  id: string;
  stationId: string;
  stationName: string;
  speciesSlug: string;
  speciesName: string;
  peak: string;
  start: string;
  end: string;
  stage: string;
  score: number;
  grade: string;
  tactic: string;
  savedAt: string;
};

export function readPro(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(PRO_STORAGE_KEY) === "1";
}

export function writePro(on: boolean) {
  window.localStorage.setItem(PRO_STORAGE_KEY, on ? "1" : "0");
  window.dispatchEvent(new Event("bite-window-change"));
}

export function readTrips(): SavedTrip[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(TRIPS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedTrip[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeTrips(trips: SavedTrip[]) {
  window.localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
  window.dispatchEvent(new Event("bite-window-change"));
}

export function upsertTrip(trip: SavedTrip) {
  const trips = readTrips().filter((item) => item.id !== trip.id);
  writeTrips([trip, ...trips]);
}

export function removeTrip(id: string) {
  writeTrips(readTrips().filter((trip) => trip.id !== id));
}
