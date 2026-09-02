import { money } from "@/lib/money";
import type { Stand } from "@/lib/types";

export function flyerCopy(stand: Stand, totalItems: number) {
  const drinks = stand.menu
    .filter((item) => !item.soldOut)
    .map((item) => `${item.name} ${money(item.price)}`)
    .join(" · ");
  const where = stand.corner.trim() || "the corner";
  const pay = "Cash is perfect.";
  return `${stand.standName || "Our lemonade stand"} is open at ${where}. ${drinks || "Come thirsty."} ${pay} ${stand.kidName ? `Ask for ${stand.kidName}.` : ""} We already sold ${totalItems} today.`.replace(/\s+/g, " ").trim();
}

export function textLink(body: string) {
  return `sms:?&body=${encodeURIComponent(body)}`;
}

export function mailLink(standName: string, body: string) {
  const subject = `${standName || "Lemonade stand"} is open`;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
