"use client";

import Link from "next/link";
import { useEffect } from "react";

import { useStand } from "@/lib/stand-store";

export function PayThanks({ plan }: { plan: "pack" | "family" }) {
  const { unlock } = useStand();

  useEffect(() => {
    unlock(plan);
  }, [plan, unlock]);

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-4 px-4 py-14">
      <p className="text-sm font-extrabold tracking-wide uppercase opacity-80">Parent paid</p>
      <h1 className="font-display text-[clamp(2.4rem,8vw,4rem)] leading-[0.92]">
        You opened. That’s the whole point.
      </h1>
      <p className="text-lg font-semibold">
        {plan === "family"
          ? "Wild Kit Family is on this phone. They invent it. You make it real."
          : "The print pack is paid. Grown-up runs the printer. Tape it to the table."}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/apps"
          className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-ink px-6 font-extrabold text-cream"
        >
          The app
        </Link>
        <Link
          href="/kits/lemonade"
          className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-lemonade px-6 font-extrabold text-ink"
        >
          This Saturday
        </Link>
      </div>
    </div>
  );
}
