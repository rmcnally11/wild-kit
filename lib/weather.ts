import type { Station } from "@/lib/stations";
import type { DayAstro, HourWeather } from "@/lib/types";

type OpenMeteo = {
  hourly?: {
    time: string[];
    temperature_2m: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    precipitation_probability: number[];
    cloud_cover: number[];
    weather_code: number[];
  };
  daily?: {
    time: string[];
    sunrise: string[];
    sunset: string[];
  };
};

export async function fetchWeather(station: Station, days: number) {
  const params = new URLSearchParams({
    latitude: String(station.lat),
    longitude: String(station.lon),
    hourly:
      "temperature_2m,wind_speed_10m,wind_direction_10m,precipitation_probability,cloud_cover,weather_code",
    daily: "sunrise,sunset",
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    timezone: station.timezone,
    forecast_days: String(Math.min(16, Math.max(1, days + 1))),
  });
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`,
    { next: { revalidate: 1800 } },
  );
  if (!response.ok) {
    throw new Error(`Weather ${response.status}`);
  }
  const data = (await response.json()) as OpenMeteo;
  if (!data.hourly?.time?.length) {
    throw new Error("Weather returned no hours");
  }

  const hours: HourWeather[] = data.hourly.time.map((time, index) => ({
    time: new Date(time).toISOString(),
    tempF: data.hourly!.temperature_2m[index] ?? 0,
    windMph: data.hourly!.wind_speed_10m[index] ?? 0,
    windDir: data.hourly!.wind_direction_10m[index] ?? 0,
    precipChance: data.hourly!.precipitation_probability[index] ?? 0,
    cloud: data.hourly!.cloud_cover[index] ?? 0,
    code: data.hourly!.weather_code[index] ?? 0,
  }));

  const daysAstro: DayAstro[] = (data.daily?.time ?? []).map((date, index) => ({
    date,
    sunrise: new Date(data.daily!.sunrise[index]).toISOString(),
    sunset: new Date(data.daily!.sunset[index]).toISOString(),
  }));

  return { hours, days: daysAstro };
}

export function weatherAt(
  hours: HourWeather[],
  iso: string,
): HourWeather | null {
  if (!hours.length) return null;
  const target = new Date(iso).getTime();
  let best = hours[0];
  let bestDelta = Math.abs(new Date(best.time).getTime() - target);
  for (const hour of hours) {
    const delta = Math.abs(new Date(hour.time).getTime() - target);
    if (delta < bestDelta) {
      best = hour;
      bestDelta = delta;
    }
  }
  return bestDelta > 2 * 3600 * 1000 ? null : best;
}

export function astroFor(days: DayAstro[], iso: string, timeZone: string) {
  const key = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
  return days.find((day) => day.date === key) ?? null;
}
