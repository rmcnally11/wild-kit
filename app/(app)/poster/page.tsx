"use client";

import { StandLogo } from "@/lib/logo";
import { money, useStand } from "@/lib/stand-store";

export default function TableSignPage() {
  const { stand } = useStand();
  const live = stand.menu.filter((item) => !item.soldOut);

  return (
    <div className="grid gap-4">
      <div>
        <h2 className="font-display text-3xl">Tape it to the table</h2>
        <p className="mt-1 text-muted-foreground">
          Print this at home, or take the file to any print shop down the street. Staples,
          the pharmacy, the copy place — whoever does posters. We just make the picture.
        </p>
      </div>
      <div
        id="table-sign"
        className="rounded-[1.5rem] bg-white p-6 text-center ring-1 ring-border print:rounded-none print:ring-0"
      >
        <StandLogo
          name={stand.standName}
          palette={stand.palette}
          badge={stand.badge}
          mascot={stand.mascot}
          size={220}
        />
        <p className="font-display mt-5 text-5xl leading-none">
          {stand.standName || "Lemonade"}
        </p>
        <p className="mt-2 text-2xl font-extrabold tracking-wide uppercase">Open</p>
        {stand.corner && <p className="mt-1 text-lg font-bold">{stand.corner}</p>}
        <div className="mx-auto mt-6 grid max-w-sm gap-2 text-left">
          {live.map((item) => (
            <div key={item.id} className="flex justify-between text-2xl font-extrabold">
              <span>{item.name}</span>
              <span>{money(item.price)}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-lg font-bold">
          {stand.venmo ? `Cash or Venmo ${stand.venmo}` : "Cash is great"}
        </p>
      </div>
      <button
        type="button"
        onClick={() => window.print()}
        className="tap h-14 rounded-2xl bg-primary text-lg font-extrabold"
      >
        Print the table sign
      </button>
      <p className="text-center text-sm text-muted-foreground">
        On a phone, Print usually means Save as PDF. Hand that to the shop.
      </p>
    </div>
  );
}
