"use client";

import { useState } from "react";

import { SATURDAY_JOBS } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function SaturdaySheet() {
  const [job, setJob] = useState<(typeof SATURDAY_JOBS)[number] | "">("");
  const [other, setOther] = useState("");
  const [kid, setKid] = useState("");
  const [grownup, setGrownup] = useState("");
  const [sign, setSign] = useState("");
  const [print, setPrint] = useState("");
  const [have, setHave] = useState("");
  const [need, setNeed] = useState("");
  const [where, setWhere] = useState("");
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");
  const [point, setPoint] = useState("");

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-4 px-4 py-8">
      <section className="rounded-[1.6rem] bg-lemonade p-5 text-ink">
        <p className="text-xs font-extrabold tracking-wide uppercase">1 · The job · circle one</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SATURDAY_JOBS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setJob(name)}
              className={cn(
                "tap rounded-full px-4 py-2 text-sm font-extrabold",
                job === name ? "bg-ink text-cream" : "bg-cream text-ink",
              )}
            >
              {name}
            </button>
          ))}
        </div>
        {job === "Other" && (
          <input
            value={other}
            onChange={(event) => setOther(event.target.value)}
            placeholder="What job"
            className="mt-3 h-12 w-full rounded-2xl bg-cream px-4 font-semibold outline-none"
          />
        )}
      </section>

      <section className="rounded-[1.6rem] bg-raspberry p-5 text-cream">
        <p className="text-xs font-extrabold tracking-wide uppercase">2 · Who invents it</p>
        <label className="mt-3 grid gap-1 font-semibold">
          Kid first name only
          <input
            value={kid}
            onChange={(event) => setKid(event.target.value)}
            autoComplete="off"
            className="h-12 rounded-2xl bg-cream px-4 font-semibold text-ink outline-none"
          />
        </label>
        <label className="mt-3 grid gap-1 font-semibold">
          Grown-up on the account
          <input
            value={grownup}
            onChange={(event) => setGrownup(event.target.value)}
            autoComplete="off"
            className="h-12 rounded-2xl bg-cream px-4 font-semibold text-ink outline-none"
          />
        </label>
        <p className="mt-3 text-sm font-semibold">First name only. No kid inbox.</p>
      </section>

      <section className="rounded-[1.6rem] bg-sky p-5 text-ink">
        <p className="text-xs font-extrabold tracking-wide uppercase">3 · The name on the sign</p>
        <p className="mt-1 text-sm font-semibold">Crooked is fine.</p>
        <input
          value={sign}
          onChange={(event) => setSign(event.target.value)}
          className="mt-3 h-12 w-full rounded-2xl bg-cream px-4 font-semibold outline-none"
        />
      </section>

      <section className="rounded-[1.6rem] bg-leaf p-5 text-cream">
        <p className="text-xs font-extrabold tracking-wide uppercase">4 · Print?</p>
        <div className="mt-3 grid gap-2">
          {[
            "Yes — poster + menu + cards",
            "Hand-letter it",
            "PDF now, shop later",
          ].map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => setPrint(choice)}
              className={cn(
                "tap rounded-2xl px-4 py-3 text-left font-extrabold",
                print === choice ? "bg-ink text-cream" : "bg-cream text-ink",
              )}
            >
              {choice}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[1.6rem] bg-coral p-5 text-ink">
        <p className="text-xs font-extrabold tracking-wide uppercase">5 · Pack from the house</p>
        <p className="mt-1 text-sm font-semibold">
          The list is the job. Buy only the missing two things.
        </p>
        <label className="mt-3 grid gap-1 font-semibold">
          Have
          <input
            value={have}
            onChange={(event) => setHave(event.target.value)}
            className="h-12 rounded-2xl bg-cream px-4 font-semibold outline-none"
          />
        </label>
        <label className="mt-3 grid gap-1 font-semibold">
          Need
          <input
            value={need}
            onChange={(event) => setNeed(event.target.value)}
            className="h-12 rounded-2xl bg-cream px-4 font-semibold outline-none"
          />
        </label>
      </section>

      <section className="rounded-[1.6rem] bg-lemonade p-5 text-ink">
        <p className="text-xs font-extrabold tracking-wide uppercase">6 · Where it opens</p>
        <label className="mt-3 grid gap-1 font-semibold">
          Corner / driveway
          <input
            value={where}
            onChange={(event) => setWhere(event.target.value)}
            className="h-12 rounded-2xl bg-cream px-4 font-semibold outline-none"
          />
        </label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 font-semibold">
            Open
            <input
              value={open}
              onChange={(event) => setOpen(event.target.value)}
              className="h-12 rounded-2xl bg-cream px-4 font-semibold outline-none"
            />
          </label>
          <label className="grid gap-1 font-semibold">
            Close
            <input
              value={close}
              onChange={(event) => setClose(event.target.value)}
              className="h-12 rounded-2xl bg-cream px-4 font-semibold outline-none"
            />
          </label>
        </div>
      </section>

      <section className="rounded-[1.6rem] bg-ink p-5 text-cream">
        <p className="text-xs font-extrabold tracking-wide uppercase">7 · The point</p>
        <p className="mt-1 font-semibold">At close, one sentence: We opened.</p>
        <input
          value={point}
          onChange={(event) => setPoint(event.target.value)}
          className="mt-3 h-12 w-full rounded-2xl bg-cream px-4 font-semibold text-ink outline-none"
        />
        <p className="mt-4 font-display text-2xl">You opened. That’s the whole point.</p>
      </section>
    </div>
  );
}
