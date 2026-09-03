import { COLORS, fieldColor, type TemplateId } from "@/brand";

export type BoardId = "half" | "standard" | "large" | "letter";

export const BOARDS: Record<
  BoardId,
  { id: BoardId; name: string; short: string; inches: { w: number; h: number }; ask: string }
> = {
  half: {
    id: "half",
    name: "Half board",
    short: "14 × 22",
    inches: { w: 14, h: 22 },
    ask: "Ask for a 14 by 22 half poster board. Fill the sheet. No extra white border.",
  },
  standard: {
    id: "standard",
    name: "Poster board",
    short: "22 × 28",
    inches: { w: 22, h: 28 },
    ask: "Ask for a 22 by 28 poster board. Fill the sheet. No extra white border.",
  },
  large: {
    id: "large",
    name: "Yard board",
    short: "28 × 44",
    inches: { w: 28, h: 44 },
    ask: "Ask for a 28 by 44 poster board. Fill the sheet. No extra white border.",
  },
  letter: {
    id: "letter",
    name: "Letter",
    short: "8½ × 11",
    inches: { w: 8.5, h: 11 },
    ask: "Home printer. Letter, 8½ by 11. Fill the sheet.",
  },
};

export const BOARD_ORDER: BoardId[] = ["half", "standard", "large", "letter"];

export type Point = { x: number; y: number };

export type Stroke = {
  id: string;
  points: Point[];
  color: string;
  width: number;
  erase: boolean;
};

export type StickerKind = "star" | "sun" | "lemon" | "cup" | "heart" | "arrow";

export type Sticker = {
  id: string;
  kind: StickerKind;
  x: number;
  y: number;
  scale: number;
};

export type Poster = {
  board: BoardId;
  strokes: Stroke[];
  stickers: Sticker[];
  history: Array<"stroke" | "sticker">;
};

export const PAINT_COLORS = [
  COLORS.ink,
  COLORS.lemonade,
  COLORS.raspberry,
  COLORS.leaf,
  COLORS.sky,
  COLORS.coral,
  COLORS.cream,
  "#FFFFFF",
] as const;

export const BRUSHES = [
  { id: "skinny", name: "Skinny", width: 0.012 },
  { id: "fat", name: "Fat", width: 0.028 },
  { id: "poster", name: "Poster", width: 0.05 },
] as const;

export const STICKERS: { id: StickerKind; name: string }[] = [
  { id: "star", name: "Star" },
  { id: "sun", name: "Sun" },
  { id: "lemon", name: "Lemon" },
  { id: "cup", name: "Cup" },
  { id: "heart", name: "Heart" },
  { id: "arrow", name: "Arrow" },
];

export function emptyPoster(): Poster {
  return { board: "standard", strokes: [], stickers: [], history: [] };
}

export function hydratePoster(raw: unknown): Poster {
  const base = emptyPoster();
  if (!raw || typeof raw !== "object") return base;
  const parsed = raw as Partial<Poster>;
  const board = parsed.board && parsed.board in BOARDS ? parsed.board : "standard";
  return {
    board,
    strokes: Array.isArray(parsed.strokes) ? parsed.strokes : [],
    stickers: Array.isArray(parsed.stickers) ? parsed.stickers : [],
    history: Array.isArray(parsed.history) ? parsed.history : [],
  };
}

export function pointsToPath(points: Point[], w: number, h: number) {
  if (!points.length) return "";
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x * w} ${point.y * h}`)
    .join(" ");
}

export function boardPoints(board: BoardId) {
  const inches = BOARDS[board].inches;
  return { width: inches.w * 72, height: inches.h * 72 };
}

export function stickerSvg(kind: StickerKind, x: number, y: number, size: number, ink = COLORS.ink) {
  const s = size;
  if (kind === "star") {
    return `<polygon transform="translate(${x} ${y})" points="0,${-s} ${s * 0.22},${-s * 0.28} ${s * 0.95},${-s * 0.3} ${s * 0.36},${s * 0.12} ${s * 0.59},${s * 0.88} 0,${s * 0.4} ${-s * 0.59},${s * 0.88} ${-s * 0.36},${s * 0.12} ${-s * 0.95},${-s * 0.3} ${-s * 0.22},${-s * 0.28}" fill="${COLORS.lemonade}" stroke="${ink}" stroke-width="${s * 0.08}"/>`;
  }
  if (kind === "sun") {
    return `<g transform="translate(${x} ${y})">
      <circle r="${s * 0.42}" fill="${COLORS.lemonade}" stroke="${ink}" stroke-width="${s * 0.08}"/>
      <circle r="${s * 0.12}" fill="${ink}"/>
    </g>`;
  }
  if (kind === "lemon") {
    return `<g transform="translate(${x} ${y})">
      <ellipse rx="${s * 0.55}" ry="${s * 0.4}" fill="${COLORS.lemonade}" stroke="${ink}" stroke-width="${s * 0.08}"/>
      <ellipse rx="${s * 0.12}" ry="${s * 0.08}" cx="${-s * 0.12}" cy="${-s * 0.08}" fill="${COLORS.cream}"/>
    </g>`;
  }
  if (kind === "cup") {
    return `<g transform="translate(${x} ${y})">
      <path d="M ${-s * 0.35} ${-s * 0.35} L ${s * 0.35} ${-s * 0.35} L ${s * 0.22} ${s * 0.45} L ${-s * 0.22} ${s * 0.45} Z" fill="${COLORS.cream}" stroke="${ink}" stroke-width="${s * 0.08}"/>
      <ellipse cx="0" cy="${-s * 0.35}" rx="${s * 0.35}" ry="${s * 0.1}" fill="${COLORS.lemonade}" stroke="${ink}" stroke-width="${s * 0.06}"/>
    </g>`;
  }
  if (kind === "heart") {
    return `<path transform="translate(${x} ${y})" d="M 0 ${s * 0.42} C ${-s * 0.7} ${s * 0.05} ${-s * 0.55} ${-s * 0.5} 0 ${-s * 0.18} C ${s * 0.55} ${-s * 0.5} ${s * 0.7} ${s * 0.05} 0 ${s * 0.42} Z" fill="${COLORS.raspberry}" stroke="${ink}" stroke-width="${s * 0.08}"/>`;
  }
  return `<g transform="translate(${x} ${y})">
    <path d="M ${-s * 0.5} 0 L ${s * 0.2} 0 L ${s * 0.2} ${-s * 0.28} L ${s * 0.55} 0 L ${s * 0.2} ${s * 0.28} L ${s * 0.2} 0 Z" fill="${COLORS.coral}" stroke="${ink}" stroke-width="${s * 0.08}"/>
  </g>`;
}

export function drawingSvg(poster: Poster, w: number, h: number, paper: string, template: TemplateId) {
  const field = fieldColor(template);
  const erase = poster.strokes
    .map((stroke) => {
      const d = pointsToPath(stroke.points, w, h);
      if (!d) return "";
      const color = stroke.erase ? paper || field : stroke.color;
      return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${stroke.width * w}" stroke-linecap="round" stroke-linejoin="round"/>`;
    })
    .join("");
  const stickers = poster.stickers
    .map((sticker) => stickerSvg(sticker.kind, sticker.x * w, sticker.y * h, sticker.scale * w))
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="position:absolute;inset:0;width:100%;height:100%;">${erase}${stickers}</svg>`;
}
