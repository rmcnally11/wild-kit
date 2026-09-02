import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "For Parents",
  description:
    "You own the account. You hit print. Kids invent the Saturday job. No kid email, no kid payments, no ads.",
};

const RULES = [
  {
    title: "Parent buys. Kid uses.",
    line: "You own the account. They invent the name, the mark, the prices. You run the printer.",
  },
  {
    title: "First name only.",
    line: "No kid email. No birthday. No street address. A zip finds a shop. That is not a house.",
  },
  {
    title: "Print is the product.",
    line: "Letter at home, or 11 by 17 at the shop. Fill the sheet. Tape it to a stake or the table.",
  },
  {
    title: "No ads. No kid payments.",
    line: "Invent and print-your-own stay free. A poster pack is the first dollar. Family later. Nothing rings up on a kid tap.",
  },
  {
    title: "Lifestyle 4+.",
    line: "Not the Kids Category, because a parent and a printer are in the loop. We still treat the data as if it were.",
  },
];

export default function ParentsPage() {
  return (
    <SiteChrome>
      <main className="mx-auto grid w-full max-w-3xl gap-8 px-5 py-12">
        <div>
          <p className="text-sm font-extrabold tracking-wide text-accent uppercase">For parents</p>
          <h1 className="font-display mt-2 text-5xl leading-none">You hit print.</h1>
          <p className="mt-4 text-lg font-semibold text-muted-foreground">
            Saturday. They&apos;re already in the cabinets. Give them a stand. Then everybody leaves
            the phone.
          </p>
        </div>

        <ul className="grid gap-4">
          {RULES.map((rule) => (
            <li key={rule.title} className="rounded-[1.6rem] bg-card p-5 ring-1 ring-border">
              <p className="font-display text-2xl leading-none">{rule.title}</p>
              <p className="mt-2 font-semibold text-muted-foreground">{rule.line}</p>
            </li>
          ))}
        </ul>

        <section className="rounded-[1.8rem] bg-primary p-6">
          <p className="font-display text-3xl leading-none">This weekend</p>
          <ol className="mt-4 grid gap-2 text-lg font-semibold">
            <li>1. Start as the parent. Birth year, your email, a zip.</li>
            <li>2. Hand the phone over. They name the stand and draw the mark.</li>
            <li>3. Print the poster and the price cards. Tape them. Go outside.</li>
          </ol>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/setup"
              className="tap inline-flex h-14 items-center justify-center rounded-2xl bg-foreground px-6 text-lg font-extrabold text-background"
            >
              Start as the parent
            </Link>
            <Link
              href="/privacy"
              className="tap inline-flex h-14 items-center justify-center rounded-2xl bg-secondary px-6 text-lg font-extrabold"
            >
              Privacy
            </Link>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
