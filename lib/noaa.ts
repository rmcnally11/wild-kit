import { noaaDate } from "@/lib/format";
import type { Station } from "@/lib/stations";
import type { TideExtreme, TidePoint } from "@/lib/types";

type NoaaResponse = {
  predictions?: { t: string; v: string; type?: "H" | "L" }[];
  error?: { message: string };
};

export async function fetchNoaaTides(station: Station, days: number) {
  const start = new Date();
  start.setUTCDate(start.getUTCDate() - 1);
  const end = new Date();
  end.setUTCDate(end.getUTCDate() + days + 1);

  const [hourly, extremes] = await Promise.all([
    fetchPredictions(station.id, start, end, "h"),
    fetchPredictions(station.id, start, end, "hilo"),
  ]);

  return {
    tides: hourly.map((row) => ({
      time: toIso(row.t, station.timezone),
      heightFt: Number(row.v),
    })),
    extremes: extremes
      .filter((row) => row.type === "H" || row.type === "L")
      .map(
        (row): TideExtreme => ({
          time: toIso(row.t, station.timezone),
          heightFt: Number(row.v),
          type: row.type as "H" | "L",
        }),
      ),
  };
}

async function fetchPredictions(
  stationId: string,
  start: Date,
  end: Date,
  interval: "h" | "hilo",
) {
  const params = new URLSearchParams({
    product: "predictions",
    application: "BiteWindow",
    begin_date: noaaDate(start),
    end_date: noaaDate(end),
    datum: "MLLW",
    station: stationId,
    time_zone: "lst_ldt",
    units: "english",
    interval,
    format: "json",
  });
  const response = await fetch(
    `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?${params}`,
    { next: { revalidate: 1800 } },
  );
  if (!response.ok) {
    throw new Error(`NOAA ${response.status}`);
  }
  const data = (await response.json()) as NoaaResponse;
  if (data.error?.message || !data.predictions?.length) {
    throw new Error(data.error?.message ?? "NOAA returned no predictions");
  }
  return data.predictions;
}

function toIso(localStamp: string, timeZone: string) {
  const [date, time] = localStamp.split(" ");
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return zonedTimeToUtc(
    { year, month, day, hour, minute },
    timeZone,
  ).toISOString();
}

function zonedTimeToUtc(
  parts: { year: number; month: number; day: number; hour: number; minute: number },
  timeZone: string,
) {
  const utcGuess = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
  );
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const asRecord = (date: Date) => {
    const bag: Record<string, string> = {};
    for (const item of formatter.formatToParts(date)) {
      if (item.type !== "literal") bag[item.type] = item.value;
    }
    return bag;
  };
  const wanted = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
  );
  let millis = utcGuess;
  for (let i = 0; i < 3; i++) {
    const got = asRecord(new Date(millis));
    const gotUtc = Date.UTC(
      Number(got.year),
      Number(got.month) - 1,
      Number(got.day),
      Number(got.hour),
      Number(got.minute),
    );
    millis += wanted - gotUtc;
  }
  return new Date(millis);
}

export function estimateTides(station: Station, days: number) {
  const meanRange = typicalRange(station);
  const now = Date.now();
  const tides: TidePoint[] = [];
  const extremes: TideExtreme[] = [];
  const periodMs = 12.42 * 3600 * 1000;
  const start = now - 6 * 3600 * 1000;
  const hours = (days + 1) * 24;
  for (let i = 0; i <= hours; i++) {
    const t = start + i * 3600 * 1000;
    const height =
      meanRange / 2 + (meanRange / 2) * Math.cos((2 * Math.PI * t) / periodMs);
    tides.push({ time: new Date(t).toISOString(), heightFt: Number(height.toFixed(2)) });
  }
  for (let i = 0; i < days * 2 + 4; i++) {
    const t = start + i * (periodMs / 2);
    const isHigh = i % 2 === 0;
    const height = isHigh ? meanRange * 0.92 : meanRange * 0.12;
    extremes.push({
      time: new Date(t).toISOString(),
      heightFt: Number(height.toFixed(2)),
      type: isHigh ? "H" : "L",
    });
  }
  return { tides, extremes };
}

function typicalRange(station: Station) {
  if (station.coast === "gulf" || station.coast === "florida-west") return 2.4;
  if (station.coast === "hawaii") return 1.8;
  if (station.coast === "pacific") return 5.4;
  if (station.coast === "northeast") return 9.2;
  if (station.coast === "mid-atlantic") return 4.6;
  return 3.4;
}
