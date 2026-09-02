"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { money } from "@/lib/money";
import { todaySalesOf, todayTotalOf } from "@/lib/today";
import type { MenuItem, Sale } from "@/lib/types";

export function JobTill({
  unit,
  units,
  menu,
  sales,
  closed,
  onSell,
  onUndo,
}: {
  unit: string;
  units?: string;
  menu: MenuItem[];
  sales: Sale[];
  closed: boolean;
  onSell: (itemId: string) => void;
  onUndo: () => void;
}) {
  const today = todaySalesOf(sales);
  const total = todayTotalOf(sales);
  const live = menu.filter((item) => !item.soldOut);
  const last = today[0];
  const [pop, setPop] = useState<string | null>(null);

  function ringUp(itemId: string) {
    if (closed) return;
    const item = menu.find((row) => row.id === itemId);
    onSell(itemId);
    if (!item) return;
    setPop(`+${money(item.price)}`);
    window.setTimeout(() => setPop(null), 900);
  }

  return (
    <div className="grid gap-4">
      <section className="relative overflow-hidden rounded-[2rem] bg-primary px-5 py-6 text-primary-foreground">
        <p className="text-sm font-bold uppercase tracking-wide">{closed ? "Closed" : "Today"}</p>
        <p className="font-display mt-1 text-6xl leading-none">{money(total)}</p>
        <p className="mt-2 text-lg font-semibold">
          {today.length} {today.length === 1 ? unit : units || `${unit}s`}
        </p>
        {last && (
          <p className="mt-1 text-sm font-semibold opacity-80">Last: {last.itemName}</p>
        )}
        {pop && (
          <p className="font-display pointer-events-none absolute top-4 right-5 text-4xl">{pop}</p>
        )}
      </section>

      {closed ? (
        <p className="font-display text-center text-xl">You opened. That&apos;s the whole point.</p>
      ) : (
        <p className="text-center text-lg font-semibold">Tap what they bought</p>
      )}

      <div className="grid gap-3">
        {live.map((item) => {
          const sold = today.filter((sale) => sale.itemId === item.id).length;
          return (
            <button
              key={item.id}
              type="button"
              disabled={closed}
              onClick={() => ringUp(item.id)}
              className="tap rounded-[1.8rem] bg-card px-5 py-6 text-left shadow-sm ring-1 ring-border disabled:opacity-60"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-display text-3xl">{item.name}</span>
                <span className="font-display text-3xl">{money(item.price)}</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">
                {sold > 0 ? `${sold} today · tap again` : "Tap to sell one"}
              </p>
            </button>
          );
        })}
        {live.length === 0 && (
          <p className="rounded-3xl bg-secondary p-6 text-center font-semibold">
            Everything is sold out. Turn something back on in the menu.
          </p>
        )}
      </div>

      <Button
        variant="secondary"
        className="h-14 rounded-2xl text-base font-extrabold"
        disabled={today.length === 0}
        onClick={onUndo}
      >
        Oops, undo
      </Button>
    </div>
  );
}
