/** Locked lines from the Wild Kit Marketing Kit. Do not rewrite. */

export const LEGAL = "Wild Kit Co.";
export const DEVELOPER = "Wild Kit";
export const FIRST_APP = "Lemonade Stand by Wild Kit";
export const MASTER = "Kids invent it. Parents print it. Saturday happens.";
export const TAGLINE = "Weekend projects for wild little kits.";
export const PROMO = "When the house is full of raccoons, make lemonade.";
export const SUBTITLE = "Design. Print. Open the stand.";
export const SITE = "getwildkit.com";

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
