/** Locked lines from the Wild Kit Marketing Kit, Sept 2026. Do not rewrite. */

export const LEGAL = "Wild Kit Co.";
export const DEVELOPER = "Wild Kit";
export const FACE = "Rascal";
export const FIRST_APP = "Lemonade Stand by Wild Kit";
export const SERIES = "Saturday Jobs";

export const FACE_LINE = "Wild kids. Hands-on parents.";
export const MASTER = "Kids invent it. Parents make it real. Saturday happens.";
export const TAGLINE = FACE_LINE;
export const STUDIO = "Weekend projects for wild little kits.";
export const PROMO = "When the house is full of raccoons, make lemonade.";
export const SUBTITLE = "Design. Print. Open the stand.";
export const STEP_SPINE = "Invent. Make it real. Open.";

export const SITE = "getwildkit.com";
export const SITE_URL = "https://getwildkit.com";
export const PAY_URL = "https://getwildkit.com/pay";
export const SATURDAY_URL = "https://getwildkit.com/saturday";

export const GROWN_UP_FIRST = "Grown-up first. Then you invent it.";
export const FIRST_NAME_ONLY = "First name only. No kid inbox.";

export const COLORS = {
  lemonade: "#F5C518",
  raspberry: "#E85D75",
  leaf: "#3BAF6A",
  sky: "#4EB3E8",
  coral: "#FF7A59",
  cream: "#FFF6E8",
  card: "#FFFAF0",
  ink: "#1C1A19",
  muted: "#5B564F",
  border: "#EAD7A2",
} as const;

/** Lemonade job verbs. Print stays here. It does not go in the company mouth. */
export const STEPS = [
  { title: "Invent", line: "Name, mark, menu, prices. Three templates, not a blank canvas." },
  { title: "Print", line: "Grown-up runs the printer. Poster, menu, price cards." },
  { title: "Open", line: "Tape it to the table. Then leave the phone." },
] as const;

export const DEFAULT_MENU = [
  { id: "lemonade", name: "Lemonade", price: 2 },
  { id: "pink", name: "Pink lemonade", price: 2.5 },
  { id: "cookie", name: "Cookie", price: 1 },
] as const;

export const TEMPLATES = [
  { id: "citrus", name: "Citrus", field: COLORS.lemonade },
  { id: "berry", name: "Berry", field: COLORS.raspberry },
  { id: "sky", name: "Sky", field: COLORS.sky },
] as const;

export type TemplateId = (typeof TEMPLATES)[number]["id"];

export const MENU_CAP = 6;

export const LEMON_SUPPLIES = [
  { id: "table", name: "A table or a box" },
  { id: "pitcher", name: "A pitcher and cups" },
  { id: "lemons", name: "Lemons or a mix" },
  { id: "ice", name: "Ice" },
  { id: "marker", name: "A marker" },
  { id: "chair", name: "A chair" },
  { id: "jar", name: "A jar for cash" },
] as const;

export const DEFAULT_CREW = [
  { id: "boss", role: "Boss", who: "" },
  { id: "pours", role: "Pours", who: "" },
  { id: "talks", role: "Talks to the line", who: "" },
] as const;

export const PITCHERS = [
  {
    id: "house",
    name: "House pitcher",
    kid: "Roll the lemons. Juice. Stir. Taste.",
    grownup: "The knife. Warm water if the sugar sticks.",
    price: 2,
  },
  {
    id: "pink",
    name: "Pink porch",
    kid: "Mash the berries. Taste.",
    grownup: "Hull the strawberries. Knife stays with you.",
    price: 2.5,
  },
  {
    id: "mint",
    name: "Mint porch",
    kid: "Tear the mint. Taste.",
    grownup: "The knife for lemon. No blender.",
    price: 2,
  },
] as const;

export const LEGAL_RULES = [
  "Parent owns the account.",
  "First name only on the kid profile.",
  "No kid inbox. No kid-to-stranger chat.",
  "No third-party ads. Ever.",
  "The poster is the product.",
] as const;

export function fieldColor(template: TemplateId) {
  return TEMPLATES.find((item) => item.id === template)?.field ?? COLORS.lemonade;
}

export function isAdultYear(year: string) {
  if (!/^\d{4}$/.test(year)) return false;
  const n = Number(year);
  const now = new Date().getFullYear();
  return n > 1900 && n <= now - 18;
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
