import { astroFor, weatherAt } from "@/lib/weather";
import type { Species } from "@/lib/species";
import type { Station } from "@/lib/stations";
import type {
  BiteWindow,
  DayAstro,
  HourWeather,
  LightPeriod,
  MoonInfo,
  ScoreBreakdown,
  TideExtreme,
  TideStage,
} from "@/lib/types";

const WINDOW_MS = 90 * 60 * 1000;

export function buildWindows(input: {
  station: Station;
  species: Species;
  extremes: TideExtreme[];
  hours: HourWeather[];
  astro: DayAstro[];
  moon: MoonInfo;
}): BiteWindow[] {
  const events = buildEvents(input.extremes);
  const windows: BiteWindow[] = [];

  for (const event of events) {
    const peak = new Date(event.time);
    const weather = weatherAt(input.hours, event.time);
    const astro = astroFor(input.astro, event.time, input.station.timezone);
    const light = lightPeriod(peak, astro);
    const month = Number(
      new Intl.DateTimeFormat("en-US", {
        timeZone: input.station.timezone,
        month: "numeric",
      }).format(peak),
    );
    const { score, breakdown, reasons } = scoreWindow({
      species: input.species,
      stage: event.stage,
      rangeFt: event.rangeFt,
      light,
      moon: input.moon,
      weather,
      month,
    });

    windows.push({
      id: `${event.stage}-${peak.toISOString()}`,
      start: new Date(peak.getTime() - WINDOW_MS).toISOString(),
      peak: peak.toISOString(),
      end: new Date(peak.getTime() + WINDOW_MS).toISOString(),
      stage: event.stage,
      score,
      grade: gradeFor(score),
      reasons,
      tactic: input.species.tactics[event.stage],
      breakdown,
      heightFt: event.heightFt,
      rangeFt: event.rangeFt,
      weather,
      light,
    });
  }

  return windows.sort(
    (a, b) => new Date(a.peak).getTime() - new Date(b.peak).getTime(),
  );
}

function buildEvents(extremes: TideExtreme[]) {
  const sorted = [...extremes].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
  );
  const events: {
    time: string;
    stage: TideStage;
    heightFt: number;
    rangeFt: number;
  }[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i];
    const next = sorted[i + 1];
    const prev = sorted[i - 1];
    const neighbor = next ?? prev;
    const rangeFt = neighbor
      ? Math.abs(current.heightFt - neighbor.heightFt)
      : 1.5;

    events.push({
      time: current.time,
      stage: current.type === "H" ? "high-slack" : "low-slack",
      heightFt: current.heightFt,
      rangeFt,
    });

    if (next) {
      const mid =
        (new Date(current.time).getTime() + new Date(next.time).getTime()) / 2;
      const stage: TideStage =
        current.type === "L" && next.type === "H"
          ? "flood"
          : current.type === "H" && next.type === "L"
            ? "ebb"
            : current.heightFt < next.heightFt
              ? "flood"
              : "ebb";
      events.push({
        time: new Date(mid).toISOString(),
        stage,
        heightFt: (current.heightFt + next.heightFt) / 2,
        rangeFt,
      });
    }
  }

  return events;
}

function lightPeriod(peak: Date, astro: DayAstro | null): LightPeriod {
  if (!astro) {
    const hour = peak.getHours();
    if (hour < 6 || hour >= 20) return "night";
    if (hour < 8) return "dawn";
    if (hour >= 17) return "dusk";
    return "day";
  }
  const t = peak.getTime();
  const sunrise = new Date(astro.sunrise).getTime();
  const sunset = new Date(astro.sunset).getTime();
  const dawnPad = 90 * 60 * 1000;
  if (t >= sunrise - dawnPad && t <= sunrise + dawnPad) return "dawn";
  if (t >= sunset - dawnPad && t <= sunset + dawnPad) return "dusk";
  if (t > sunrise && t < sunset) return "day";
  return "night";
}

function scoreWindow(input: {
  species: Species;
  stage: TideStage;
  rangeFt: number;
  light: LightPeriod;
  moon: MoonInfo;
  weather: HourWeather | null;
  month: number;
}) {
  const stageScore = input.species.stageWeight[input.stage] * 32;
  const lightScore = input.species.lightWeight[input.light] * 24;

  const rangeNorm = clamp(input.rangeFt / 4.5, 0, 1);
  const currentPref = input.species.likesCurrent
    ? rangeNorm
    : 1 - Math.abs(rangeNorm - 0.4);
  const currentScore = currentPref * 16;

  let moonScore = 7;
  if (input.species.likesSpringTides) {
    moonScore = input.moon.isSpring ? 10 : 6;
  } else {
    moonScore = input.moon.isSpring ? 6 : 10;
  }

  let windScore = 8;
  if (input.weather) {
    const over = input.weather.windMph - input.species.windToleranceMph;
    if (over <= 0) windScore = 10;
    else if (over < 8) windScore = 6;
    else windScore = 2;
    if (input.weather.precipChance > 70) windScore = Math.max(2, windScore - 3);
  }

  const inSeason = input.species.months.includes(input.month);
  const seasonScore = inSeason ? 8 : 2;

  const raw =
    stageScore + lightScore + currentScore + moonScore + windScore + seasonScore;
  const score = Math.round(clamp(raw, 8, 99));

  const reasons: string[] = [];
  reasons.push(
    `${labelStage(input.stage)} is a ${weightWord(input.species.stageWeight[input.stage])} tide for ${input.species.name.toLowerCase()}.`,
  );
  reasons.push(
    `${labelLight(input.light)} lines up ${weightWord(input.species.lightWeight[input.light])} with how they hunt.`,
  );
  reasons.push(
    `${input.rangeFt.toFixed(1)} ft of swing — ${input.species.likesCurrent ? "current is a feature" : "they prefer a quieter push"}.`,
  );
  if (input.moon.isSpring) {
    reasons.push(
      `${input.moon.name}. Spring tides ${input.species.likesSpringTides ? "help this bite" : "can blow out skinny water"}.`,
    );
  } else {
    reasons.push(`${input.moon.name}. Mid-cycle water, more moderate current.`);
  }
  if (input.weather) {
    reasons.push(
      `${Math.round(input.weather.windMph)} mph wind, ${Math.round(input.weather.tempF)}°F air${input.weather.precipChance > 40 ? `, ${input.weather.precipChance}% rain` : ""}.`,
    );
  }
  if (!inSeason) {
    reasons.push("Outside the usual season here — treat the score as a maybe.");
  }

  const breakdown: ScoreBreakdown = {
    stage: Math.round(stageScore),
    light: Math.round(lightScore),
    current: Math.round(currentScore),
    moon: Math.round(moonScore),
    wind: Math.round(windScore),
    season: Math.round(seasonScore),
  };

  return { score, breakdown, reasons };
}

function gradeFor(score: number): BiteWindow["grade"] {
  if (score >= 82) return "prime";
  if (score >= 68) return "good";
  if (score >= 54) return "fair";
  return "pass";
}

function weightWord(weight: number) {
  if (weight >= 0.9) return "prime";
  if (weight >= 0.7) return "strong";
  if (weight >= 0.5) return "workable";
  return "weak";
}

function labelStage(stage: TideStage) {
  switch (stage) {
    case "flood":
      return "Flood";
    case "ebb":
      return "Ebb";
    case "high-slack":
      return "High slack";
    case "low-slack":
      return "Low slack";
  }
}

function labelLight(light: LightPeriod) {
  switch (light) {
    case "dawn":
      return "Dawn";
    case "dusk":
      return "Dusk";
    case "day":
      return "Midday";
    case "night":
      return "Night";
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
