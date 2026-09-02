"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { FamilyChrome } from "@/components/family-chrome";
import { Button } from "@/components/ui/button";
import { kitById } from "@/lib/kits";

export default function KitPage() {
  const params = useParams<{ id: string }>();
  const kit = kitById(params.id);

  if (!kit) {
    return (
      <FamilyChrome title="That kit">
        <p className="text-lg text-muted-foreground">That Saturday is not on the shelf.</p>
        <Button asChild className="mt-4 h-14 rounded-2xl text-lg font-extrabold">
          <Link href="/">Back to Wild Kit</Link>
        </Button>
      </FamilyChrome>
    );
  }

  return (
    <FamilyChrome eyebrow="Saturday Jobs" title={kit.name}>
      <div className="grid gap-5">
        <div>
          <p className="text-sm font-extrabold uppercase text-[var(--raspberry)]">{kit.listing}</p>
          <p className="mt-1 text-sm font-extrabold uppercase text-accent">{kit.seasonLabel}</p>
          <h2 className="font-display mt-1 text-4xl leading-none">{kit.name}</h2>
          <p className="mt-2 text-lg text-muted-foreground">{kit.line}</p>
          <p className="mt-1 text-sm font-semibold">{kit.hours}</p>
        </div>

        <section className="rounded-[1.8rem] bg-card p-5 ring-1 ring-border">
          <p className="text-sm font-extrabold uppercase">This Saturday</p>
          <p className="mt-2 text-lg leading-7">{kit.saturday}</p>
        </section>

        <section>
          <p className="mb-2 text-sm font-extrabold uppercase">From the house</p>
          <ul className="grid gap-2">
            {kit.need.map((item) => (
              <li key={item} className="rounded-2xl bg-secondary px-4 py-3 font-semibold">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-3">
          <div className="rounded-[1.6rem] bg-card p-4 ring-1 ring-border">
            <p className="text-sm font-extrabold uppercase">The kid</p>
            <p className="mt-1 font-semibold">{kit.kid}</p>
          </div>
          <div className="rounded-[1.6rem] bg-card p-4 ring-1 ring-border">
            <p className="text-sm font-extrabold uppercase">The grown-up</p>
            <p className="mt-1 font-semibold">{kit.parent}</p>
          </div>
          <div className="rounded-[1.6rem] bg-secondary p-4">
            <p className="text-sm font-extrabold uppercase">You are done when</p>
            <p className="mt-1 font-semibold">{kit.done}</p>
          </div>
        </section>

        {kit.status === "open" && kit.href ? (
          <Button asChild className="h-16 rounded-2xl text-xl font-extrabold">
            <Link href={kit.href}>Open {kit.name}</Link>
          </Button>
        ) : (
          <p className="rounded-[1.6rem] bg-secondary p-4 text-sm font-semibold">
            You do not need the buttons to do this Saturday. The list is the job. Lemonade
            Stand is the first app. The rest wait for fifty real stands.
          </p>
        )}
      </div>
    </FamilyChrome>
  );
}
