"use client";

import { FEDEX_PRINT_URL } from "@/lib/copy";
import { StandLogo } from "@/lib/logo";
import { money, useStand } from "@/lib/stand-store";

export default function PosterPage() {
  const { stand, isPaid } = useStand();
  const live = stand.menu.filter((item) => !item.soldOut);

  return (
    <div className="grid gap-4">
      <h2 className="font-display text-3xl">The poster</h2>
      <p className="text-muted-foreground">
        Print it from this phone. A parent can upload the PDF at FedEx Office. We do not charge
        for the paper — they do.
      </p>
      <div
        id="poster"
        className="rounded-[1.5rem] bg-card p-6 text-center ring-1 ring-border print:rounded-none print:ring-0"
      >
        <StandLogo
          name={stand.standName}
          palette={stand.palette}
          badge={stand.badge}
          mascot={stand.mascot}
          size={200}
        />
        <p className="font-display mt-4 text-5xl leading-none">{stand.standName || "Lemonade"}</p>
        {stand.corner && <p className="mt-2 text-xl font-bold">{stand.corner}</p>}
        <p className="mt-1 text-lg">Open today</p>
        <div className="mx-auto mt-6 grid max-w-sm gap-2 text-left">
          {live.map((item) => (
            <div key={item.id} className="flex justify-between text-2xl font-extrabold">
              <span>{item.name}</span>
              <span>{money(item.price)}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-lg font-bold">
          {stand.venmo ? `Cash or Venmo ${stand.venmo}` : "Bring cash"}
        </p>
      </div>
      <button
        type="button"
        disabled={!isPaid}
        onClick={() => window.print()}
        className="tap h-14 rounded-2xl bg-primary text-lg font-extrabold disabled:opacity-50"
      >
        {isPaid ? "Print or save PDF" : "Parents unlock print"}
      </button>
      <a
        href={isPaid ? FEDEX_PRINT_URL : "/parent"}
        target={isPaid ? "_blank" : undefined}
        rel="noreferrer"
        className="tap grid h-14 place-items-center rounded-2xl bg-secondary text-lg font-extrabold"
      >
        {isPaid ? "Open FedEx Office print" : "Ask a parent for FedEx"}
      </a>
    </div>
  );
}
