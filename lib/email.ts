export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function printMailBody(input: {
  standName: string;
  kidName: string;
  city?: string;
  state?: string;
  shops: { name: string; address: string }[];
}) {
  const where = input.city && input.state ? `${input.city}, ${input.state}` : "your zip";
  const list = input.shops
    .map((shop, index) => `${index + 1}. ${shop.name} — ${shop.address}`)
    .join("\n");
  return [
    `The ${input.standName || "lemonade"} poster is ready.`,
    input.kidName ? `${input.kidName} made it.` : "",
    `Ask the shop for a letter-size color print. Tape it to a stake or the front of the table.`,
    `Shops near ${where}:`,
    list || "Any copy shop, Staples, or the UPS Store.",
    `Attach the PNG if this draft did not keep the picture.`,
  ]
    .filter(Boolean)
    .join("\n\n");
}
