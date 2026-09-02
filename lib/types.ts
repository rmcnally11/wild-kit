export type PaletteId = "citrus" | "strawberry" | "mint" | "blueberry" | "sunset";
export type BadgeId = "circle" | "ticket" | "banner" | "diamond";
export type MascotId = "lemon" | "cup" | "sun";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  soldOut: boolean;
};

export type Sale = {
  id: string;
  itemId: string;
  itemName: string;
  price: number;
  at: string;
};

export type Plan = "free" | "season" | "lifetime";

export type Stand = {
  standName: string;
  kidName: string;
  palette: PaletteId;
  badge: BadgeId;
  mascot: MascotId;
  corner: string;
  venmo: string;
  menu: MenuItem[];
  sales: Sale[];
  plan: Plan;
  seasonEnds: string | null;
  parentYear: string;
  setupDone: boolean;
};

export const PALETTES: Record<
  PaletteId,
  { name: string; ink: string; paper: string; pop: string; leaf: string }
> = {
  citrus: {
    name: "Citrus",
    ink: "#2A2416",
    paper: "#FFF4C2",
    pop: "#F4C430",
    leaf: "#3F7A1A",
  },
  strawberry: {
    name: "Strawberry",
    ink: "#3A1420",
    paper: "#FFE4EC",
    pop: "#F06292",
    leaf: "#2E7D4F",
  },
  mint: {
    name: "Mint",
    ink: "#14302A",
    paper: "#D9F5E8",
    pop: "#3DDC97",
    leaf: "#0B6B4F",
  },
  blueberry: {
    name: "Blueberry",
    ink: "#142033",
    paper: "#D7E6FF",
    pop: "#5B8DEF",
    leaf: "#1F4E79",
  },
  sunset: {
    name: "Sunset",
    ink: "#2C1A12",
    paper: "#FFE2C8",
    pop: "#FF8A4C",
    leaf: "#B5441A",
  },
};

export const DEFAULT_MENU: MenuItem[] = [
  { id: "lemonade", name: "Lemonade", price: 2, soldOut: false },
  { id: "pink", name: "Pink lemonade", price: 2.5, soldOut: false },
  { id: "cookie", name: "Cookie", price: 1, soldOut: false },
];

export function emptyStand(): Stand {
  return {
    standName: "",
    kidName: "",
    palette: "citrus",
    badge: "circle",
    mascot: "lemon",
    corner: "",
    venmo: "",
    menu: DEFAULT_MENU,
    sales: [],
    plan: "free",
    seasonEnds: null,
    parentYear: "",
    setupDone: false,
  };
}
