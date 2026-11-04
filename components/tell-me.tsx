"use client";

import { useId, useState } from "react";

import { TELL_ME, TELL_ME_LINE } from "@/lib/brand";

export function TellMe({ ink = false }: { ink?: boolean }) {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "need" | "fail">("idle");
  const statusLine =
    status === "ok"
      ? "You're on the list. We'll send the listing."
      : status === "need"
        ? "Need a grown-up email."
        : status === "fail"
          ? "Couldn't send. Email parents@getwildkit.com."
          : "";

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
      <p className="text-xs font-extrabold tracking-wide uppercase">App Store — coming</p>
      <h2 className="font-display mt-2 text-3xl leading-none">{TELL_ME}</h2>
      <p className="mt-3 font-semibold">{TELL_ME_LINE}</p>
      {status === "ok" ? null : (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor={emailId}>
            Grown-up email
          </label>
          <input
            id={emailId}
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
      <p role="status" aria-live="polite" className={statusLine ? "mt-5 font-extrabold" : "sr-only"}>
        {status === "fail" ? (
          <>
            Couldn&apos;t send. Email{" "}
            <a className="underline" href="mailto:parents@getwildkit.com">
              parents@getwildkit.com
            </a>
            .
          </>
        ) : (
          statusLine
        )}
      </p>
    </form>
  );
}
