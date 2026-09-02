"use client";

import Link from "next/link";
import { useState } from "react";

import { CloseDay } from "@/components/close-day";
import { PackList } from "@/components/pack-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { money, useStand } from "@/lib/stand-store";
import { isClosedToday } from "@/lib/today";
import { DEFAULT_CREW, LEMON_SUPPLIES } from "@/lib/types";

export default function SellPage() {
  const { stand, todaySales, todayTotal, todayCups, sell, undo, save } = useStand();
  const live = stand.menu.filter((item) => !item.soldOut);
  const [pop, setPop] = useState<string | null>(null);
  const last = todaySales[0];
  const closed = isClosedToday(stand.closedAt);
  const crew = stand.crew?.length ? stand.crew : DEFAULT_CREW;
  const supplies = stand.supplies ?? [];

  function ringUp(itemId: string) {
    if (closed) return;
    const item = stand.menu.find((row) => row.id === itemId);
    sell(itemId);
    if (!item) return;
    setPop(`+${money(item.price)}`);
    window.setTimeout(() => setPop(null), 900);
  }

  function toggleSupply(id: string) {
    const next = supplies.includes(id) ? supplies.filter((item) => item !== id) : [...supplies, id];
    save({ supplies: next });
  }

  return (
    <div className="grid gap-4">
      <section className="relative overflow-hidden rounded-[2rem] bg-primary px-5 py-6 text-primary-foreground">
        <p className="text-sm font-bold uppercase tracking-wide">{closed ? "Closed" : "Today"}</p>
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

      {closed && (
        <p className="font-display text-center text-xl">You opened the stand. That&apos;s the whole point.</p>
      )}

      {todayCups === 0 && !closed && (
        <div className="grid gap-2">
          <Link
            href="/stand/look"
            className="rounded-[1.6rem] bg-secondary px-5 py-4 text-base font-extrabold"
          >
            Draw the logo →
          </Link>
          <Link
            href="/stand/poster"
            className="rounded-[1.6rem] bg-secondary px-5 py-4 text-base font-extrabold"
          >
            Grown-up runs the printer →
          </Link>
          <Link
            href="/stand/cards"
            className="rounded-[1.6rem] bg-secondary px-5 py-4 text-base font-extrabold"
          >
            Print the price cards →
          </Link>
          <Link
            href="/stand/mix"
            className="rounded-[1.6rem] bg-secondary px-5 py-4 text-base font-extrabold"
          >
            Go mix the lemonade →
          </Link>
        </div>
      )}
      {todayCups > 0 && !closed && (
        <p className="text-center font-display text-xl">You opened the stand. That&apos;s the whole point.</p>
      )}

      {stand.todaysRecipe && (
        <p className="rounded-[1.6rem] bg-secondary px-5 py-3 text-center font-extrabold">
          Today&apos;s pitcher is {stand.todaysRecipe}
        </p>
      )}

      {!closed && <p className="text-center text-lg font-semibold">Tap what they bought</p>}
      <div className="grid gap-3">
        {live.map((item) => {
          const sold = todaySales.filter((sale) => sale.itemId === item.id).length;
          return (
            <button
              key={item.id}
              type="button"
              disabled={closed}
              onClick={() => ringUp(item.id)}
              className={`tap rounded-[1.8rem] px-5 py-6 text-left shadow-sm ring-1 disabled:opacity-60 ${
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

      {todayCups > 0 && (
        <section className="rounded-[1.6rem] bg-card p-4 ring-1 ring-border">
          <p className="text-sm font-extrabold uppercase">Today&apos;s tally</p>
          <ul className="mt-2 grid gap-1 font-semibold">
            {stand.menu.map((item) => {
              const sold = todaySales.filter((sale) => sale.itemId === item.id).length;
              if (!sold) return null;
              return (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>
                    {sold} · {money(item.price * sold)}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <PackList items={LEMON_SUPPLIES} packed={supplies} onToggle={toggleSupply} />

      <section>
        <p className="text-sm font-extrabold uppercase">Crew</p>
        <p className="mt-1 text-sm text-muted-foreground">Who does what. First names only.</p>
        <ul className="mt-2 grid gap-2">
          {crew.map((job) => (
            <li key={job.id} className="grid gap-1 rounded-2xl bg-card px-4 py-3 ring-1 ring-border">
              <p className="text-sm font-extrabold">{job.role}</p>
              <Input
                value={job.who}
                onChange={(event) =>
                  save({
                    crew: crew.map((row) =>
                      row.id === job.id ? { ...row, who: event.target.value } : row,
                    ),
                  })
                }
                placeholder="First name"
                className="h-11 rounded-xl"
                autoComplete="off"
              />
            </li>
          ))}
        </ul>
      </section>

      <Button asChild variant="secondary" className="h-14 rounded-2xl text-lg font-extrabold">
        <Link href="/stand/cards">Price cards</Link>
      </Button>

      <CloseDay
        closed={closed}
        onChange={(closedAt) => save({ closedAt })}
        done="You opened the stand. That's the whole point."
      />
    </div>
  );
}
