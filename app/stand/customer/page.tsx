"use client";

import Link from "next/link";

import { StandLogo } from "@/lib/logo";
import { money, useStand } from "@/lib/stand-store";

export default function CustomerMenuPage() {
  const { stand } = useStand();
  const live = stand.menu.filter((item) => !item.soldOut);

  return (
    <div className="min-h-dvh bg-[var(--background)] px-5 py-6">
      <div className="mx-auto grid max-w-2xl justify-items-center gap-5">
        <StandLogo
          name={stand.standName}
          palette={stand.palette}
          badge={stand.badge}
          mascot={stand.mascot}
          size={200}
        />
        <p className="font-display text-4xl tracking-[0.2em]">OPEN</p>
        {stand.corner && (
          <p className="text-center text-xl font-semibold">{stand.corner}</p>
        )}
        <div className="grid w-full gap-3">
          {live.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-[2rem] bg-card px-6 py-5 ring-1 ring-border"
            >
              <span className={`font-display leading-none ${item.name.length > 14 ? "text-3xl" : "text-4xl"}`}>
                {item.name}
              </span>
              <span className="font-display text-4xl">{money(item.price)}</span>
            </div>
          ))}
          {live.length === 0 && (
            <p className="rounded-[2rem] bg-secondary p-6 text-center text-2xl font-extrabold">
              Be right back
            </p>
          )}
        </div>
        <p className="text-lg font-semibold">
          {stand.venmo ? `Cash or Venmo ${stand.venmo}` : "Cash is great"}
        </p>
        {stand.kidName && <p className="text-muted-foreground">Ask for {stand.kidName}</p>}
        <Link
          href="/stand"
          className="mt-6 text-xs font-bold tracking-wide text-muted-foreground uppercase"
        >
          Kid side
        </Link>
      </div>
    </div>
  );
}
