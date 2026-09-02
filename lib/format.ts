import type { TideStage } from "@/lib/types";

export function formatClock(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatDay(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

export function formatDayLong(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export function formatRange(start: string, end: string, timeZone: string) {
  return `${formatClock(start, timeZone)} – ${formatClock(end, timeZone)}`;
}

export function stageLabel(stage: TideStage) {
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

export function stageVerb(stage: TideStage) {
  switch (stage) {
    case "flood":
      return "Water is pushing in";
    case "ebb":
      return "Water is falling out";
    case "high-slack":
      return "High water going slack";
    case "low-slack":
      return "Low water going slack";
  }
}

export function gradeLabel(grade: "prime" | "good" | "fair" | "pass") {
  switch (grade) {
    case "prime":
      return "Prime window";
    case "good":
      return "Good window";
    case "fair":
      return "Fair window";
    case "pass":
      return "Thin window";
  }
}

export function windCardinal(deg: number) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

export function noaaDate(date: Date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

export function localDateKey(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

export function windLabel(mph: number, deg: number) {
  return `${Math.round(mph)} mph ${windCardinal(deg)}`;
}
