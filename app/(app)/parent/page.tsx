"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStand } from "@/lib/stand-store";

export default function ParentPage() {
  const { stand, save, unlock, isPaid } = useStand();
  const [year, setYear] = useState("");
  const [gateOpen, setGateOpen] = useState(isPaid);
  const adult = Number(year) > 1900 && Number(year) <= new Date().getFullYear() - 18;

  return (
    <div className="grid gap-4">
      <h2 className="font-display text-3xl">Parents</h2>
      <p className="text-muted-foreground">
        This side is for grown-ups. Kids keep the register. You pay once, post the corner,
        and print the poster.
      </p>

      {!gateOpen && (
        <div className="rounded-[2rem] bg-card p-5 ring-1 ring-border">
          <p className="font-bold">What year were you born?</p>
          <Input
            inputMode="numeric"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            placeholder="1990"
            className="mt-3 h-14 rounded-2xl text-lg"
          />
          <Button
            className="mt-3 h-12 rounded-2xl font-extrabold"
            disabled={!adult}
            onClick={() => {
              save({ parentYear: year });
              setGateOpen(true);
            }}
          >
            I am the parent
          </Button>
        </div>
      )}

      {gateOpen && (
        <>
          <label className="grid gap-1 text-sm font-bold">
            Where is the stand?
            <Input
              value={stand.corner}
              onChange={(event) => save({ corner: event.target.value })}
              placeholder="Oak and 4th, by the oak tree"
              className="h-12 rounded-2xl"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold">
            Venmo, if you use it
            <Input
              value={stand.venmo}
              onChange={(event) => save({ venmo: event.target.value })}
              placeholder="@yourname"
              className="h-12 rounded-2xl"
            />
          </label>

          <div className="grid gap-3 md:grid-cols-2">
            <PlanCard
              name="This summer"
              price="$10"
              note="About a hundred days. Apple will take their cut when this is in the store."
              active={stand.plan === "season"}
              onPick={() => unlock("season")}
            />
            <PlanCard
              name="Lifetime"
              price="$25"
              note="One stand, every summer after this. No subscription."
              active={stand.plan === "lifetime"}
              onPick={() => unlock("lifetime")}
            />
          </div>
          {isPaid && (
            <p className="rounded-3xl bg-secondary p-4 font-semibold">
              Unlocked on this device. StoreKit receipts come when you put it on the App Store.
            </p>
          )}
          <p className="text-sm leading-6 text-muted-foreground">
            Kids do not create social accounts in here. Share uses the parent&apos;s Messages,
            Mail, or share sheet. Nothing leaves this phone unless a grown-up taps it. Read the{" "}
            <a className="font-bold underline" href="/privacy">
              privacy page
            </a>
            .
          </p>
        </>
      )}
    </div>
  );
}

function PlanCard({
  name,
  price,
  note,
  active,
  onPick,
}: {
  name: string;
  price: string;
  note: string;
  active: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      className={`tap rounded-[1.6rem] p-5 text-left ring-1 ${active ? "bg-primary ring-primary" : "bg-card ring-border"}`}
    >
      <p className="text-sm font-bold">{name}</p>
      <p className="font-display text-4xl">{price}</p>
      <p className="mt-2 text-sm leading-5">{note}</p>
    </button>
  );
}
