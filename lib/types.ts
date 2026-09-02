export type TideStage = "flood" | "high-slack" | "ebb" | "low-slack";

export type TideExtreme = {
  time: string;
  heightFt: number;
  type: "H" | "L";
};

export type TidePoint = {
  time: string;
  heightFt: number;
};

export type MoonInfo = {
  name: string;
  illumination: number;
  isSpring: boolean;
};

export type LightPeriod = "dawn" | "day" | "dusk" | "night";

export type HourWeather = {
  time: string;
  tempF: number;
  windMph: number;
  windDir: number;
  precipChance: number;
  cloud: number;
  code: number;
};

export type DayAstro = {
  date: string;
  sunrise: string;
  sunset: string;
};

export type ScoreBreakdown = {
  stage: number;
  light: number;
  current: number;
  moon: number;
  wind: number;
  season: number;
};

export type BiteWindow = {
  id: string;
  start: string;
  peak: string;
  end: string;
  stage: TideStage;
  score: number;
  grade: "prime" | "good" | "fair" | "pass";
  reasons: string[];
  tactic: string;
  breakdown: ScoreBreakdown;
  heightFt: number;
  rangeFt: number;
  weather: HourWeather | null;
  light: LightPeriod;
};

export type Forecast = {
  stationId: string;
  speciesSlug: string;
  generatedAt: string;
  source: "noaa" | "estimated";
  sourceNote?: string;
  tides: TidePoint[];
  extremes: TideExtreme[];
  windows: BiteWindow[];
  moon: MoonInfo;
  weatherOk: boolean;
};
