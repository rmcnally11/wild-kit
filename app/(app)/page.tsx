"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { money, useStand } from "@/lib/stand-store";

export default function SellPage() {
  const { stand, todayTotal, todayCups, sell, undo } = useStand();
  const live = stand.menu.filter((item) => !item.soldOut);

  return (
    <div className="grid gap-4">
      <section className="rounded-[2rem] bg-primary px-5 py-6 text-primary-foreground">
        <p className="text-sm font-bold uppercase tracking-wide">Today</p>
        <p className="font-display mt-1 text-6xl leading-none">{money(todayTotal)}</p>
        <p className="mt-2 text-lg font-semibold">
          {todayCups} {todayCups === 1 ? "cup" : "cups"}
        </p>
      </section>

      <p className="text-center text-lg font-semibold">Tap what they bought</p>
      <div className="grid gap-3">
        {live.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => sell(item.id)}
            className="tap rounded-[1.8rem] bg-card px-5 py-6 text-left shadow-sm ring-1 ring-border"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-3xl">{item.name}</span>
              <span className="font-display text-3xl">{money(item.price)}</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">Tap to sell one</p>
          </button>
        ))}
        {live.length === 0 && (
          <p className="rounded-3xl bg-secondary p-6 text-center">
            Everything is sold out. Open Menu and turn something back on.
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" className="h-14 rounded-2xl text-base font-extrabold" onClick={undo}>
          Oops, undo
        </Button>
        <Button asChild className="h-14 rounded-2xl text-base font-extrabold">
          <Link href="/customer">Show customers</Link>
        </Button>
      </div>
    </div>
  );
}
