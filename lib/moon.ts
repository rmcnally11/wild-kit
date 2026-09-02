import type { MoonInfo } from "@/lib/types";

const SYNODIC = 29.53058867;
const KNOWN_NEW = Date.UTC(2000, 0, 6, 18, 14);

export function moonInfo(date: Date): MoonInfo {
  const days = (date.getTime() - KNOWN_NEW) / 86_400_000;
  const age = ((days % SYNODIC) + SYNODIC) % SYNODIC;
  const illumination = (1 - Math.cos((2 * Math.PI * age) / SYNODIC)) / 2;
  const name = phaseName(age);
  const isSpring = age < 2.2 || age > 27.3 || (age > 13.4 && age < 16.1);
  return { name, illumination, isSpring };
}

function phaseName(age: number) {
  if (age < 1.8 || age > 27.7) return "New moon";
  if (age < 6.1) return "Waxing crescent";
  if (age < 9.1) return "First quarter";
  if (age < 13.4) return "Waxing gibbous";
  if (age < 16.1) return "Full moon";
  if (age < 20.4) return "Waning gibbous";
  if (age < 23.4) return "Last quarter";
  return "Waning crescent";
}
