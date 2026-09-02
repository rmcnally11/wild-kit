"use client";

import { Button } from "@/components/ui/button";
import { todayKey } from "@/lib/today";

export function CloseDay({
  closed,
  onChange,
  done,
}: {
  closed: boolean;
  onChange: (closedAt: string | null) => void;
  done: string;
}) {
  return (
    <section className="rounded-[1.8rem] bg-card p-5 ring-1 ring-border">
      <p className="text-sm font-extrabold uppercase">Close the day</p>
      <p className="mt-1 font-semibold text-muted-foreground">{closed ? done : "When the sun is gone, or the tray is empty."}</p>
      <Button
        type="button"
        className="mt-4 h-16 w-full rounded-2xl text-xl font-extrabold"
        variant={closed ? "secondary" : "default"}
        onClick={() => onChange(closed ? null : todayKey())}
      >
        {closed ? "Open it again" : "Close the day"}
      </Button>
    </section>
  );
}
