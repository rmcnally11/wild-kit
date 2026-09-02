export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

import { SHEETS, type SheetId } from "@/lib/types";

export function printMailBody(input: {
  standName: string;
  kidName: string;
  city?: string;
  state?: string;
  shops: { name: string; address: string }[];
  sheet?: SheetId;
}) {
  const where = input.city && input.state ? `${input.city}, ${input.state}` : "your zip";
  const sheet = input.sheet && input.sheet in SHEETS ? input.sheet : "tabloid";
  const list = input.shops
    .map((shop, index) => `${index + 1}. ${shop.name} — ${shop.address}`)
    .join("\n");
  return [
    `The ${input.standName || "lemonade"} poster is ready.`,
    input.kidName ? `${input.kidName} made it.` : "",
    SHEETS[sheet].ask,
    `The file is a full-sheet PNG at 300 dpi. Tape it to a stake or the front of the table.`,
    `Shops near ${where}:`,
    list || "Any copy shop, Staples, or the UPS Store.",
    `Attach the PNG if this draft did not keep the picture.`,
  ]
    .filter(Boolean)
    .join("\n\n");
}
