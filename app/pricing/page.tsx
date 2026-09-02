"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { readPro, writePro } from "@/lib/storage";

export default function PricingPage() {
  const [pro, setPro] = useState(false);

  useEffect(() => {
    const sync = () => setPro(readPro());
    sync();
    window.addEventListener("bite-window-change", sync);
    return () => window.removeEventListener("bite-window-change", sync);
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.2em] text-primary uppercase">Secondary income, v1</p>
      <h1 className="font-heading mt-3 max-w-3xl text-4xl sm:text-6xl">
        Free is the tide table. Pro is the decision.
      </h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        The business is a $9/month almanac for people who already own a skiff. Checkout is not
        wired yet — you can turn Pro on for this browser so you can see the full horizon.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Plan
          name="Free"
          price="$0"
          note="Forever, on this device"
          points={[
            "3-day bite horizon",
            "Live NOAA tides + weather",
            "All eight species models",
            "Save windows to a local logbook",
          ]}
          action={
            <Button asChild variant="outline">
              <Link href="/planner">Use the planner</Link>
            </Button>
          }
        />
        <Plan
          name="Pro"
          price="$9"
          note="per month, when billing ships"
          featured
          points={[
            "10-day horizon so you can plan around work",
            "Same scoring, just more water in view",
            "Logbook stays on-device until accounts exist",
            "SMS ‘green window’ alerts are the next paid slice",
          ]}
          action={
            <Button onClick={() => writePro(!pro)}>
              {pro ? "Pro is on — turn off" : "Unlock Pro on this device"}
            </Button>
          }
        />
      </div>

      {pro && (
        <p className="mt-6 text-sm text-primary">
          Pro is active in this browser. The planner will show ten days instead of three.
        </p>
      )}

      <section className="mt-16 max-w-2xl">
        <h2 className="font-heading text-3xl">Why this, not the other two ideas</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          The Leader Bench makes money on the first weekend you can tie and ship, but it
          trades hours for dollars until you batch. Open Seat is the biggest number if it
          works, and the ugliest if captains do not show up. Bite Window is the one you can
          launch tonight, keep fishing, and grow with inlet-level pages that Google already
          understands.
        </p>
      </section>
    </div>
  );
}

function Plan({
  name,
  price,
  note,
  points,
  action,
  featured,
}: {
  name: string;
  price: string;
  note: string;
  points: string[];
  action: ReactNode;
  featured?: boolean;
}) {
  return (
    <article
      className={
        featured
          ? "rounded-3xl bg-card p-6 ring-1 ring-primary/40"
          : "rounded-3xl bg-card/70 p-6 ring-1 ring-foreground/10"
      }
    >
      <p className="text-sm text-muted-foreground">{name}</p>
      <p className="font-heading mt-2 text-5xl">
        {price}
        {name === "Pro" && <span className="text-2xl text-muted-foreground">/mo</span>}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{note}</p>
      <ul className="mt-6 space-y-2 text-sm leading-6">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <div className="mt-6">{action}</div>
    </article>
  );
}
