"use client";

import Link from "next/link";

import { StandLogo } from "@/lib/logo";
import { money, useStand } from "@/lib/stand-store";

export default function CustomerMenuPage() {
  const { stand, ready } = useStand();
  if (!ready) return null;
  const live = stand.menu.filter((item) => !item.soldOut);

  return (
    <div className="min-h-dvh bg-[var(--background)] px-5 py-6">
      <div className="mx-auto grid max-w-2xl justify-items-center gap-6">
        <StandLogo
          name={stand.standName}
          palette={stand.palette}
          badge={stand.badge}
          mascot={stand.mascot}
          size={180}
        />
        <p className="font-display text-center text-5xl leading-none">
          {stand.standName || "Lemonade"}
        </p>
        {stand.corner && (
          <p className="text-center text-xl font-semibold">{stand.corner}</p>
        )}
        <div className="grid w-full gap-3">
          {live.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-[2rem] bg-card px-6 py-5 ring-1 ring-border"
            >
              <span className="font-display text-4xl">{item.name}</span>
              <span className="font-display text-4xl">{money(item.price)}</span>
            </div>
          ))}
        </div>
        <p className="text-lg font-semibold">
          {stand.venmo ? `Cash or Venmo ${stand.venmo}` : "Cash is great"}
        </p>
        {stand.kidName && <p className="text-muted-foreground">Ask for {stand.kidName}</p>}
        <Link
          href="/"
          className="mt-4 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-muted-foreground"
        >
          Back to selling
        </Link>
      </div>
    </div>
  );
}
