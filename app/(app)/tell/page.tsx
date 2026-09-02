"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { flyerCopy, mailLink, textLink } from "@/lib/copy";
import { money, useStand } from "@/lib/stand-store";

export default function TellPage() {
  const { stand, todayCups, todayTotal, isPaid } = useStand();
  const body = flyerCopy(stand, todayCups);
  const [copied, setCopied] = useState(false);

  async function shareNative() {
    const payload = { title: stand.standName || "Lemonade stand", text: body };
    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch {
        // cancelled or failed — copy instead
      }
    }
    await navigator.clipboard.writeText(body);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="grid gap-4">
      <h2 className="font-display text-3xl">Tell the block</h2>
      <p className="text-muted-foreground">
        A ten-year-old does not log into Instagram. You write the words. Mom or Dad hits send.
      </p>
      <div className="rounded-[2rem] bg-card p-5 ring-1 ring-border">
        <p className="text-sm font-extrabold uppercase text-accent">Today so far</p>
        <p className="font-display mt-1 text-4xl">{money(todayTotal)}</p>
        <p className="mt-1 font-semibold">{todayCups} sold</p>
        <p className="mt-4 text-lg leading-7">{body}</p>
      </div>
      {!isPaid && (
        <p className="rounded-3xl bg-secondary p-4 text-sm font-semibold">
          Sharing is a parent unlock. Open Parents if you want the buttons to actually send.
        </p>
      )}
      {copied && (
        <p className="rounded-3xl bg-secondary p-4 text-sm font-semibold">
          Copied. Paste it into Messages or Mail.
        </p>
      )}
      <div className="grid gap-3">
        <Button
          className="h-14 rounded-2xl text-lg font-extrabold"
          disabled={!isPaid}
          onClick={shareNative}
        >
          Share this
        </Button>
        <Button asChild variant="secondary" className="h-14 rounded-2xl text-lg font-extrabold">
          <a href={isPaid ? textLink(body) : "/parent"}>{isPaid ? "Text a parent" : "Ask a parent first"}</a>
        </Button>
        <Button asChild variant="secondary" className="h-14 rounded-2xl text-lg font-extrabold">
          <a href={isPaid ? mailLink(stand.standName, body) : "/parent"}>
            {isPaid ? "Email the street" : "Parents unlock email"}
          </a>
        </Button>
      </div>
    </div>
  );
}
