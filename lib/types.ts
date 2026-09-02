export type PaletteId = "citrus" | "strawberry" | "mint" | "blueberry" | "sunset";
export type BadgeId = "circle" | "ticket" | "banner" | "diamond";
export type MascotId = "lemon" | "cup" | "sun" | "bolt";

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
export type PaperId = "yellow" | "pink" | "lime" | "sky" | "cream";
export type DecoId = "stars" | "suns" | "arrows" | "hearts" | "drips";

export type Poster = {
  paper: PaperId;
  headline: string;
  subhead: string;
  deco: DecoId;
};

export type Stand = {
  standName: string;
  kidName: string;
  palette: PaletteId;
  badge: BadgeId;
  mascot: MascotId;
  corner: string;
  venmo: string;
  parentEmail: string;
  zip: string;
  poster: Poster;
  menu: MenuItem[];
  sales: Sale[];
  plan: Plan;
  seasonEnds: string | null;
  parentYear: string;
  setupDone: boolean;
  todaysRecipe: string;
};

export const PALETTES: Record<
  PaletteId,
  { name: string; ink: string; paper: string; pop: string; leaf: string; shine: string }
> = {
  citrus: {
    name: "Citrus",
    ink: "#2A2416",
    paper: "#FFF6C8",
    pop: "#FFD400",
    leaf: "#2F7A14",
    shine: "#FFFBE6",
  },
  strawberry: {
    name: "Strawberry",
    ink: "#3A1420",
    paper: "#FFE4EC",
    pop: "#FF4F86",
    leaf: "#2E7D4F",
    shine: "#FFEAF1",
  },
  mint: {
    name: "Mint",
    ink: "#14302A",
    paper: "#D4F8E8",
    pop: "#1ED760",
    leaf: "#0B6B4F",
    shine: "#ECFFF5",
  },
  blueberry: {
    name: "Blueberry",
    ink: "#142033",
    paper: "#D7E6FF",
    pop: "#3D7EFF",
    leaf: "#1F4E79",
    shine: "#EEF4FF",
  },
  sunset: {
    name: "Sunset",
    ink: "#2C1A12",
    paper: "#FFE2C8",
    pop: "#FF6A1A",
    leaf: "#B5441A",
    shine: "#FFF1E4",
  },
};

export const BADGE_LABELS: Record<BadgeId, string> = {
  circle: "Sticker",
  ticket: "Ticket",
  banner: "Banner",
  diamond: "Stamp",
};

export const MASCOT_LABELS: Record<MascotId, string> = {
  lemon: "Lemon",
  cup: "Cup",
  sun: "Sun",
  bolt: "Bolt",
};

export const DEFAULT_MENU: MenuItem[] = [
  { id: "lemonade", name: "Lemonade", price: 2, soldOut: false },
  { id: "pink", name: "Pink lemonade", price: 2.5, soldOut: false },
  { id: "cookie", name: "Cookie", price: 1, soldOut: false },
];

export const PAPERS: Record<PaperId, { name: string; fill: string; ink: string }> = {
  yellow: { name: "Poster yellow", fill: "#FFE14A", ink: "#2A2416" },
  pink: { name: "Construction pink", fill: "#FF8AB5", ink: "#3A1420" },
  lime: { name: "Marker green", fill: "#8DFF4A", ink: "#143016" },
  sky: { name: "Sky blue", fill: "#7EC8FF", ink: "#142033" },
  cream: { name: "Notebook", fill: "#FFF4D2", ink: "#2A2416" },
};

export const DECO_LABELS: Record<DecoId, string> = {
  stars: "Stars",
  suns: "Suns",
  arrows: "Arrows",
  hearts: "Hearts",
  drips: "Drips",
};

export const DEFAULT_POSTER: Poster = {
  paper: "yellow",
  headline: "",
  subhead: "",
  deco: "stars",
};

export function emptyStand(): Stand {
  return {
    standName: "",
    kidName: "",
    palette: "citrus",
    badge: "circle",
    mascot: "lemon",
    corner: "",
    venmo: "",
    parentEmail: "",
    zip: "",
    poster: DEFAULT_POSTER,
    menu: DEFAULT_MENU,
    sales: [],
    plan: "free",
    seasonEnds: null,
    parentYear: "",
    setupDone: false,
    todaysRecipe: "",
  };
}
