"use client";

import { useState } from "react";

import { Rascal } from "@/lib/rascal";
import { rascalLines, rascalPose, type HintCtx, type RascalRoom } from "@/lib/rascal-hints";

export function RascalHint({
  room,
  ctx = {},
}: {
  room: RascalRoom;
  ctx?: HintCtx;
}) {
  const lines = rascalLines(room, ctx);
  const [picked, setPicked] = useState<string | null>(null);
  const current = picked && lines.includes(picked) ? picked : lines[0];

  function nextHint() {
    const at = Math.max(0, lines.indexOf(current));
    setPicked(lines[(at + 1) % lines.length]);
  }

  return (
    <button
      type="button"
      onClick={nextHint}
      className="tap print:hidden mb-4 flex w-full items-center gap-3 rounded-[1.5rem] bg-card px-3 py-3 text-left ring-1 ring-border"
      aria-label={`Rascal says: ${current}. Tap for another hint.`}
    >
      <Rascal pose={rascalPose(room)} size={56} line="" />
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-extrabold uppercase tracking-wide text-[var(--raspberry)]">
          Rascal
        </span>
        <span className="font-display mt-0.5 block text-xl leading-tight">{current}</span>
        <span className="mt-1 block text-xs font-semibold text-muted-foreground">
          Tap for another
        </span>
      </span>
    </button>
  );
}
