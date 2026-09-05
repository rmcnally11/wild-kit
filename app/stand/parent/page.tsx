"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStand } from "@/lib/stand-store";

export default function ParentPage() {
  const { stand, save, isPaid } = useStand();
  const [year, setYear] = useState("");
  const [gateOpen, setGateOpen] = useState(isPaid || Boolean(stand.parentYear));
  const adult = Number(year) > 1900 && Number(year) <= new Date().getFullYear() - 18;

  return (
    <div className="grid gap-4">
      <h2 className="font-display text-3xl">Parent Desk</h2>
      <p className="text-muted-foreground">
        You own the account. You hit print. You keep it safe. Kids invent the stand.
      </p>

      {!gateOpen && (
        <div className="rounded-[2rem] bg-card p-5 ring-1 ring-border">
          <p className="font-bold">What year were you born?</p>
          <Input
            inputMode="numeric"
            value={year}
            onChange={(event) => setYear(event.target.value.replace(/\D/g, "").slice(0, 4))}
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
          {year.length === 4 && !adult && (
            <p className="mt-2 font-extrabold text-[var(--raspberry)]">Ask a grown-up.</p>
          )}
        </div>
      )}

      {gateOpen && (
        <>
          <label className="grid gap-1 text-sm font-bold">
            Kid&apos;s first name
            <Input
              value={stand.kidName}
              onChange={(event) => save({ kidName: event.target.value })}
              className="h-12 rounded-2xl"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold">
            Your email
            <Input
              type="email"
              value={stand.parentEmail}
              onChange={(event) => save({ parentEmail: event.target.value })}
              placeholder="you@email.com"
              className="h-12 rounded-2xl"
              autoComplete="email"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold">
            Zip
            <Input
              inputMode="numeric"
              value={stand.zip}
              onChange={(event) => save({ zip: event.target.value.replace(/\D/g, "").slice(0, 5) })}
              placeholder="78701"
              className="h-12 rounded-2xl"
            />
          </label>
          <p className="text-sm text-muted-foreground">
            Email gets the poster file. Zip finds a print shop. Not a street address.
          </p>
          <label className="grid gap-1 text-sm font-bold">
            Where is the stand?
            <Input
              value={stand.corner}
              onChange={(event) => save({ corner: event.target.value })}
              placeholder="Oak and 4th, by the oak tree"
              className="h-12 rounded-2xl"
            />
          </label>
          <p className="rounded-3xl bg-secondary p-4 font-semibold">
            Grown-up pays in the App Store. Not here. App free. No ads. Ever.
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            Kids do not create social accounts in here. Share uses your Messages, Mail, or share
            sheet. Nothing leaves this phone unless a grown-up taps it. Read the{" "}
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
