import { money } from "@/lib/money";
import type { MenuItem } from "@/lib/types";

export function PriceCards({
  name,
  kidName,
  menu,
}: {
  name: string;
  kidName: string;
  menu: MenuItem[];
}) {
  const items = menu.filter((item) => !item.soldOut).slice(0, 6);
  const cards = [...items];
  while (cards.length < 6) {
    cards.push({ id: `blank-${cards.length}`, name: "Tape me on", price: 0, soldOut: false });
  }

  return (
    <div
      id="price-cards"
      className="grid aspect-[8.5/11] grid-cols-2 grid-rows-3 gap-3 bg-[#fff6e8] p-4"
    >
      {cards.map((item) => (
        <article
          key={item.id}
          className="flex flex-col justify-between rounded-xl border-4 border-[#1c1a19] bg-[#f5c518] p-3"
        >
          <p className="text-[10px] font-extrabold tracking-wide uppercase">{name || "Saturday job"}</p>
          <p className="font-display text-2xl leading-none">{item.name}</p>
          <p className="font-display text-4xl leading-none">{item.price ? money(item.price) : "—"}</p>
          <p className="text-[10px] font-bold">{kidName ? `Ask for ${kidName}.` : "Cash is perfect."}</p>
        </article>
      ))}
    </div>
  );
}
