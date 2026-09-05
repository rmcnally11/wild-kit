"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PAY_OFFERS } from "@/lib/pay";
import { useStand } from "@/lib/stand-store";

export function PayDesk() {
  const { stand, save, isPaid } = useStand();
  const [year, setYear] = useState(stand.parentYear);
  const [open, setOpen] = useState(isPaid || Boolean(stand.parentYear));
  const adult = Number(year) > 1900 && Number(year) <= new Date().getFullYear() - 18;

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-4 px-4 py-8">
      {!open && (
        <section className="rounded-[1.6rem] bg-ink p-6 text-cream">
          <p className="font-display text-3xl leading-none">Ask a grown-up.</p>
          <p className="mt-3 font-semibold">
            Kids do not pay. Birth year only. Then the card belongs to the parent.
          </p>
          <label className="mt-4 grid gap-1 font-semibold">
            What year were you born?
            <Input
              inputMode="numeric"
              value={year}
              onChange={(event) => setYear(event.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="1990"
              className="h-14 rounded-2xl bg-cream text-lg text-ink"
            />
          </label>
          {year.length === 4 && !adult && (
            <p className="mt-2 font-extrabold text-raspberry">Ask a grown-up.</p>
          )}
          <Button
            className="mt-4 h-14 rounded-2xl text-lg font-extrabold"
            disabled={!adult}
            onClick={() => {
              save({ parentYear: year });
              setOpen(true);
            }}
          >
            I am the parent
          </Button>
        </section>
      )}

      {open && (
        <>
          {isPaid && (
            <p className="rounded-[1.4rem] bg-leaf px-5 py-4 font-semibold text-cream">
              Paid on this phone. They invent it. You make it real.
            </p>
          )}
          <div className="grid gap-3">
            {PAY_OFFERS.map((offer) => (
              <a
                key={offer.id}
                href={offer.href}
                className={`tap rounded-[1.6rem] px-5 py-6 ${offer.hue} ${offer.ink}`}
              >
                <p className="text-xs font-extrabold tracking-wide uppercase opacity-80">
                  {offer.cadence}
                </p>
                <p className="font-display mt-1 text-3xl leading-none">{offer.name}</p>
                <p className="font-display mt-2 text-5xl leading-none">{offer.price}</p>
                <p className="mt-3 font-semibold">{offer.line}</p>
                <p className="mt-5 text-sm font-extrabold">Pay on Stripe →</p>
              </a>
            ))}
          </div>
          <p className="text-sm font-semibold text-muted-foreground">
            Card, Apple Pay, Google Pay — Stripe takes it. No Venmo. No kid tap. No ads. Ever.
          </p>
        </>
      )}
    </div>
  );
}
