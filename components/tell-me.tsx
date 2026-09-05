"use client";

import { useState } from "react";

import { TELL_ME, TELL_ME_LINE } from "@/lib/brand";

export function TellMe({ ink = false }: { ink?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "need" | "fail">("idle");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (res.status === 400) {
        setStatus("need");
        return;
      }
      if (!res.ok || !data.ok) {
        setStatus("fail");
        return;
      }
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("fail");
    }
  }

  return (
    <form
      id="notify"
      onSubmit={submit}
      className={`rounded-[1.6rem] px-5 py-6 ${ink ? "bg-ink text-cream" : "bg-sky text-ink"}`}
    >
      <p className="text-xs font-extrabold tracking-wide uppercase opacity-80">App Store — coming</p>
      <p className="font-display mt-2 text-3xl leading-none">{TELL_ME}</p>
      <p className="mt-3 font-semibold">{TELL_ME_LINE}</p>
      {status === "ok" ? (
        <p className="mt-5 font-extrabold">You're on the list. We'll send the listing.</p>
      ) : (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="parent-email">
            Grown-up email
          </label>
          <input
            id="parent-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Grown-up email"
            className="h-12 w-full rounded-2xl bg-cream px-4 font-semibold text-ink outline-none ring-1 ring-border"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="tap inline-flex h-12 shrink-0 items-center justify-center rounded-2xl bg-lemonade px-6 font-extrabold text-ink"
          >
            {status === "sending" ? "Sending…" : "Send it"}
          </button>
        </div>
      )}
      {status === "need" ? (
        <p className="mt-3 font-extrabold">Need a grown-up email.</p>
      ) : null}
      {status === "fail" ? (
        <p className="mt-3 font-semibold">
          Couldn't send. Email{" "}
          <a className="underline" href="mailto:parents@getwildkit.com">
            parents@getwildkit.com
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
