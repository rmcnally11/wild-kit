"use client";

import { useState } from "react";

import { FamilyChrome } from "@/components/family-chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStand } from "@/lib/stand-store";
import { CAMP_PACK, CAMP_TRAIL, DEFAULT_CAMP } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function FortPage() {
  const { stand, save } = useStand();
  const camp = stand.camp ?? DEFAULT_CAMP;
  const [note, setNote] = useState("");
  const packedCount = CAMP_PACK.filter((item) => camp.packed.includes(item.id)).length;
  const trailCount = CAMP_TRAIL.filter((stop) => camp.trail.includes(stop.id)).length;

  function togglePacked(id: string) {
    const packed = camp.packed.includes(id)
      ? camp.packed.filter((item) => item !== id)
      : [...camp.packed, id];
    save({ camp: { ...camp, packed } });
  }

  function toggleTrail(id: string) {
    const trail = camp.trail.includes(id)
      ? camp.trail.filter((item) => item !== id)
      : [...camp.trail, id];
    save({ camp: { ...camp, trail } });
  }

  function addNote() {
    const text = note.trim();
    if (!text) return;
    save({
      camp: {
        ...camp,
        notes: [{ id: `note-${Date.now()}`, text }, ...camp.notes].slice(0, 12),
      },
    });
    setNote("");
  }

  return (
    <FamilyChrome eyebrow="Blanket Fort by Wild Kit" title="Blanket Fort">
      <div className="grid gap-6">
        <p className="text-lg text-muted-foreground">
          Pack from the house. Walk the trail. Write what you heard. Lights out ends the day.
        </p>

        <section>
          <p className="text-sm font-extrabold uppercase">
            Pack the bag · {packedCount}/{CAMP_PACK.length}
          </p>
          <ul className="mt-2 grid gap-2">
            {CAMP_PACK.map((item) => {
              const on = camp.packed.includes(item.id);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => togglePacked(item.id)}
                    className={cn(
                      "tap w-full rounded-2xl px-4 py-3 text-left font-extrabold",
                      on ? "bg-primary" : "bg-secondary",
                    )}
                  >
                    {on ? "Packed · " : ""}
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <p className="text-sm font-extrabold uppercase">
            The trail · {trailCount}/{CAMP_TRAIL.length}
          </p>
          <ul className="mt-2 grid gap-2">
            {CAMP_TRAIL.map((stop) => {
              const on = camp.trail.includes(stop.id);
              return (
                <li key={stop.id}>
                  <button
                    type="button"
                    onClick={() => toggleTrail(stop.id)}
                    className={cn(
                      "tap w-full rounded-[1.4rem] px-4 py-4 text-left",
                      on ? "bg-primary" : "bg-card ring-1 ring-border",
                    )}
                  >
                    <span className="font-display text-2xl leading-none">{stop.name}</span>
                    <span className="mt-1 block text-sm font-semibold">{stop.note}</span>
                    <span className="mt-2 block text-sm font-extrabold">
                      {on ? "Been here" : "Tap when you get here"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <p className="text-sm font-extrabold uppercase">Fort log</p>
          <p className="mt-1 text-sm text-muted-foreground">What you heard. What you ate.</p>
          <div className="mt-2 flex gap-2">
            <Input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="We heard the fridge"
              className="h-12 rounded-2xl font-semibold"
              onKeyDown={(event) => {
                if (event.key === "Enter") addNote();
              }}
            />
            <Button
              type="button"
              className="h-12 rounded-2xl font-extrabold"
              disabled={!note.trim()}
              onClick={addNote}
            >
              Add
            </Button>
          </div>
          <ul className="mt-3 grid gap-2">
            {camp.notes.map((row) => (
              <li key={row.id} className="rounded-2xl bg-card px-4 py-3 font-semibold ring-1 ring-border">
                {row.text}
              </li>
            ))}
            {camp.notes.length === 0 && (
              <li className="rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold text-muted-foreground">
                Write the first thing you notice.
              </li>
            )}
          </ul>
        </section>

        <section className="rounded-[1.8rem] bg-card p-5 ring-1 ring-border">
          <p className="text-sm font-extrabold uppercase">Lights out</p>
          <p className="mt-1 font-semibold text-muted-foreground">
            Even if it is still afternoon. The fort can stay up.
          </p>
          <Button
            type="button"
            className="mt-4 h-16 w-full rounded-2xl text-xl font-extrabold"
            variant={camp.lightsOut ? "secondary" : "default"}
            onClick={() => save({ camp: { ...camp, lightsOut: !camp.lightsOut } })}
          >
            {camp.lightsOut ? "You built the fort." : "Lights out"}
          </Button>
        </section>
      </div>
    </FamilyChrome>
  );
}
