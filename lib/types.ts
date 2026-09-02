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
export type SheetId = "letter" | "tabloid";

export type Poster = {
  paper: PaperId;
  headline: string;
  subhead: string;
  deco: DecoId;
  sheet: SheetId;
};

export type CampNote = {
  id: string;
  text: string;
};

export type Camp = {
  packed: string[];
  trail: string[];
  notes: CampNote[];
  lightsOut: boolean;
};

export type CrewJob = {
  id: string;
  role: string;
  who: string;
};

export type SideJob = {
  name: string;
  menu: MenuItem[];
  sales: Sale[];
  packed: string[];
  closedAt: string | null;
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
  camp: Camp;
  supplies: string[];
  crew: CrewJob[];
  closedAt: string | null;
  bake: SideJob;
  wash: SideJob;
};

export const MENU_CAP = 6;

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

export const SHEETS: Record<
  SheetId,
  {
    name: string;
    short: string;
    ask: string;
    view: { w: number; h: number };
    inches: { w: number; h: number };
    png: { width: number; height: number };
    page: string;
  }
> = {
  letter: {
    name: "Letter — 8½ × 11",
    short: "8½ × 11",
    ask: "Ask for a letter-size (8½ by 11) color print. Fill the sheet. No extra white border.",
    view: { w: 850, h: 1100 },
    inches: { w: 8.5, h: 11 },
    png: { width: 2550, height: 3300 },
    page: "letter portrait",
  },
  tabloid: {
    name: "Yard — 11 × 17",
    short: "11 × 17",
    ask: "Ask for an 11 by 17 color poster. Fill the sheet. No extra white border.",
    view: { w: 850, h: 1314 },
    inches: { w: 11, h: 17 },
    png: { width: 3300, height: 5100 },
    page: "11in 17in",
  },
};

export const DEFAULT_POSTER: Poster = {
  paper: "yellow",
  headline: "",
  subhead: "",
  deco: "stars",
  sheet: "tabloid",
};

export const DEFAULT_CAMP: Camp = {
  packed: [],
  trail: [],
  notes: [],
  lightsOut: false,
};

export const DEFAULT_CREW: CrewJob[] = [
  { id: "boss", role: "Boss", who: "" },
  { id: "pours", role: "Pours", who: "" },
  { id: "talks", role: "Talks to the line", who: "" },
];

export const LEMON_SUPPLIES = [
  { id: "table", name: "A table or a box" },
  { id: "pitcher", name: "A pitcher and cups" },
  { id: "lemons", name: "Lemons or a mix" },
  { id: "ice", name: "Ice" },
  { id: "marker", name: "A marker" },
  { id: "chair", name: "A chair" },
  { id: "jar", name: "A jar for cash" },
];

export const DEFAULT_BAKE: SideJob = {
  name: "",
  menu: [
    { id: "cookies", name: "Cookies", price: 2, soldOut: false },
    { id: "brownies", name: "Brownies", price: 2.5, soldOut: false },
    { id: "muffins", name: "Muffins", price: 2, soldOut: false },
  ],
  sales: [],
  packed: [],
  closedAt: null,
};

export const BAKE_PACK = [
  { id: "bake", name: "What you already bake" },
  { id: "tray", name: "A tray" },
  { id: "paper", name: "Paper for prices" },
  { id: "table", name: "A table" },
  { id: "oven", name: "A grown-up on the oven" },
];

export const DEFAULT_WASH: SideJob = {
  name: "",
  menu: [
    { id: "car", name: "Car", price: 8, soldOut: false },
    { id: "bike", name: "Bike", price: 3, soldOut: false },
    { id: "rinse", name: "Extra rinse", price: 2, soldOut: false },
  ],
  sales: [],
  packed: [],
  closedAt: null,
};

export const WASH_PACK = [
  { id: "hose", name: "A hose or two buckets" },
  { id: "soap", name: "Soap that is allowed on the drive" },
  { id: "rags", name: "Rags" },
  { id: "cards", name: "Index cards" },
  { id: "chair", name: "A chair" },
];

export function emptySideJob(base: SideJob): SideJob {
  return {
    ...base,
    menu: base.menu.map((item) => ({ ...item })),
    sales: [],
    packed: [],
    closedAt: null,
  };
}

export const CAMP_PACK = [
  { id: "light", name: "Flashlight or phone light" },
  { id: "pillows", name: "Pillows" },
  { id: "blankets", name: "Blankets" },
  { id: "water", name: "Water" },
  { id: "snack", name: "A snack" },
  { id: "book", name: "A book" },
  { id: "friend", name: "One stuffed friend" },
];

export const CAMP_TRAIL = [
  { id: "base", name: "Living room", note: "Base camp. Build the fort here." },
  { id: "mess", name: "Kitchen", note: "Mess hall. Get the water and the snack." },
  { id: "pass", name: "Hall", note: "The pass. Quiet feet." },
  { id: "lookout", name: "Back door", note: "Lookout. Weather check. Come back in." },
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
    camp: DEFAULT_CAMP,
    supplies: [],
    crew: DEFAULT_CREW.map((job) => ({ ...job })),
    closedAt: null,
    bake: emptySideJob(DEFAULT_BAKE),
    wash: emptySideJob(DEFAULT_WASH),
  };
}
