"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { money, useStand } from "@/lib/stand-store";

export default function SellPage() {
  const { stand, todaySales, todayTotal, todayCups, sell, undo } = useStand();
  const live = stand.menu.filter((item) => !item.soldOut);
  const [pop, setPop] = useState<string | null>(null);
  const last = todaySales[0];

  function ringUp(itemId: string) {
    const item = stand.menu.find((row) => row.id === itemId);
    sell(itemId);
    if (!item) return;
    setPop(`+${money(item.price)}`);
    window.setTimeout(() => setPop(null), 900);
  }

  return (
    <div className="grid gap-4">
      <section className="relative overflow-hidden rounded-[2rem] bg-primary px-5 py-6 text-primary-foreground">
        <p className="text-sm font-bold uppercase tracking-wide">Today</p>
        <p className="font-display mt-1 text-6xl leading-none">{money(todayTotal)}</p>
        <p className="mt-2 text-lg font-semibold">
          {todayCups} {todayCups === 1 ? "cup" : "cups"}
        </p>
        {last && (
          <p className="mt-1 text-sm font-semibold opacity-80">Last cup: {last.itemName}</p>
        )}
        {pop && (
          <p className="font-display pointer-events-none absolute top-4 right-5 text-4xl">{pop}</p>
        )}
      </section>

      {todayCups === 0 && (
        <div className="grid gap-2">
          <Link
            href="/stand/look"
            className="rounded-[1.6rem] bg-secondary px-5 py-4 text-base font-extrabold"
          >
            Make the logo you tape to the table →
          </Link>
          <Link
            href="/stand/poster"
            className="rounded-[1.6rem] bg-secondary px-5 py-4 text-base font-extrabold"
          >
            Draw the yard poster →
          </Link>
          <Link
            href="/stand/mix"
            className="rounded-[1.6rem] bg-secondary px-5 py-4 text-base font-extrabold"
          >
            Mix a special pitcher →
          </Link>
        </div>
      )}

      {stand.todaysRecipe && (
        <p className="rounded-[1.6rem] bg-secondary px-5 py-3 text-center font-extrabold">
          Today&apos;s pitcher is {stand.todaysRecipe}
        </p>
      )}
      <p className="text-center text-lg font-semibold">Tap what they bought</p>
      <div className="grid gap-3">
        {live.map((item) => {
          const sold = todaySales.filter((sale) => sale.itemId === item.id).length;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => ringUp(item.id)}
              className={`tap rounded-[1.8rem] px-5 py-6 text-left shadow-sm ring-1 ${
                stand.todaysRecipe === item.name
                  ? "bg-primary ring-primary"
                  : "bg-card ring-border"
              }`}
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
            Everything is sold out. Open Menu and turn something back on.
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          className="h-14 rounded-2xl text-base font-extrabold"
          disabled={todayCups === 0}
          onClick={undo}
        >
          Oops, undo
        </Button>
        <Button asChild className="h-14 rounded-2xl text-base font-extrabold">
          <Link href="/stand/customer">Show customers</Link>
        </Button>
      </div>
    </div>
  );
}
