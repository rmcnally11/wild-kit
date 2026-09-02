export type RascalRoom =
  | "home"
  | "kit"
  | "sell"
  | "menu"
  | "mix"
  | "look"
  | "tell"
  | "poster"
  | "fort"
  | "setup"
  | "who";

export type HintCtx = {
  kidName?: string;
  standName?: string;
  cups?: number;
  soldOut?: boolean;
  hasRecipe?: boolean;
  packed?: number;
  trail?: number;
  lightsOut?: boolean;
  kitOpen?: boolean;
};

const POOL: Record<RascalRoom, string[]> = {
  who: [
    "Grown-up first. Then you invent it.",
    "Parent buys. Kid uses.",
    "No kid email. That's the rule.",
  ],
  setup: [
    "First name only.",
    "The stand needs a name.",
    "You're the boss of this stand.",
    "Grown-up runs the printer.",
  ],
  home: [
    "Pick a job. Then go outside.",
    "Lemonade first. The rest can wait.",
    "You're the boss of this Saturday.",
    "Kids invent it. Then everybody leaves the phone.",
  ],
  kit: [
    "The list is the job.",
    "You don't need the buttons.",
    "Saturday still happens.",
    "From the house. Then go.",
  ],
  sell: [
    "Tap what they bought.",
    "You're the boss of this stand.",
    "Another cup. Go.",
    "Flip the phone when they walk up.",
  ],
  menu: [
    "You set the price.",
    "Three things is a real menu.",
    "Name it whatever you want.",
    "Sold out? Flip it back later.",
  ],
  mix: [
    "Kid juices. Grown-up has the knife.",
    "Taste it. Then put it on the menu.",
    "One special pitcher. That's the secret.",
    "Go mix the lemonade.",
  ],
  look: [
    "Draw it however you want.",
    "Tape it to the table.",
    "Crooked is fine.",
    "That's your mark.",
  ],
  tell: [
    "You write the words.",
    "Grown-up hits send.",
    "No kid Instagram.",
    "Tell the block. Then go outside.",
  ],
  poster: [
    "Grown-up runs the printer.",
    "Big words. Then go outside.",
    "Ask for the whole sheet.",
    "The poster is the product.",
  ],
  fort: [
    "Pack from the house.",
    "Walk the trail.",
    "Write what you heard.",
    "Lights out ends the day.",
  ],
};

export function rascalLines(room: RascalRoom, ctx: HintCtx = {}): string[] {
  const first = priority(room, ctx);
  const rest = POOL[room].filter((line) => line !== first);
  return [first, ...rest];
}

export function rascalPose(room: RascalRoom): "boss" | "scheme" | "done" {
  if (room === "sell" || room === "home") return "boss";
  if (room === "poster" || room === "tell" || room === "fort") return "done";
  return "scheme";
}

function priority(room: RascalRoom, ctx: HintCtx): string {
  if (room === "sell") {
    if (!ctx.standName) return "The stand needs a name.";
    if (ctx.soldOut) return "Menu. Turn something back on.";
    if (!ctx.cups) return "Tap what they bought.";
    if (ctx.cups >= 3) return "You already sold a few. Keep going.";
    return "Another cup. Go.";
  }
  if (room === "menu" && !ctx.standName) return "The stand needs a name.";
  if (room === "mix" && ctx.hasRecipe) return "That's today's pitcher. Go sell it.";
  if (room === "look" && !ctx.standName) return "The stand needs a name.";
  if (room === "poster" && !ctx.standName) return "The stand needs a name.";
  if (room === "fort") {
    if (ctx.lightsOut) return "You built the fort.";
    if ((ctx.packed ?? 0) < 3) return "Pack from the house.";
    if ((ctx.trail ?? 0) < 4) return "Walk the trail.";
    return "Write what you heard.";
  }
  if (room === "kit" && ctx.kitOpen) return "Open it. Then go outside.";
  if (room === "home" && ctx.kidName) return `${ctx.kidName} invents it. Then go outside.`;
  return POOL[room][0];
}

export function roomFromPath(pathname: string): RascalRoom | null {
  if (pathname === "/") return "home";
  if (pathname === "/fort") return "fort";
  if (pathname.startsWith("/kits/")) return "kit";
  if (pathname === "/setup") return "setup";
  if (pathname === "/stand") return "sell";
  if (pathname === "/stand/menu") return "menu";
  if (pathname.startsWith("/stand/mix")) return "mix";
  if (pathname === "/stand/look") return "look";
  if (pathname === "/stand/tell") return "tell";
  if (pathname === "/stand/poster") return "poster";
  return null;
}
