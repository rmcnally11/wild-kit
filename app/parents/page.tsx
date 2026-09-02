import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import { HUES, type HueId } from "@/lib/hues";

export const metadata: Metadata = {
  title: "For Parents",
  description:
    "You own the account. You hit print. Kids invent the Saturday job. No kid email, no kid payments, no ads.",
};

const RULES: { title: string; line: string; hue: HueId }[] = [
  {
    title: "Parent buys. Kid uses.",
    line: "You own the account. They invent the name, the mark, the prices. You run the printer.",
    hue: "lemonade",
  },
  {
    title: "First name only.",
    line: "No kid email. No birthday. No street address. A zip finds a shop. That is not a house.",
    hue: "raspberry",
  },
  {
    title: "Print is the product.",
    line: "Letter at home, or 11 by 17 at the shop. Fill the sheet. Tape it to a stake or the table.",
    hue: "leaf",
  },
  {
    title: "No ads. No kid payments.",
    line: "Invent and print-your-own stay free. A poster pack is the first dollar. Family later. Nothing rings up on a kid tap.",
    hue: "sky",
  },
  {
    title: "Lifestyle 4+.",
    line: "Not the Kids Category, because a parent and a printer are in the loop. We still treat the data as if it were.",
    hue: "coral",
  },
];

export default function ParentsPage() {
  return (
    <SiteChrome>
      <main>
        <section className="bg-sky text-ink">
          <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
            <p className="text-sm font-extrabold tracking-wide uppercase">For parents</p>
            <h1 className="font-display mt-2 text-[clamp(2.4rem,8vw,4rem)] leading-[0.92]">
              You hit print.
            </h1>
            <p className="mt-4 text-lg font-semibold">
              Saturday. They&apos;re already in the cabinets. Give them a stand. Then everybody
              leaves the phone.
            </p>
          </div>
        </section>
        <div className="mx-auto grid w-full max-w-3xl gap-3 px-4 py-8">
          {RULES.map((rule) => {
            const hue = HUES[rule.hue];
            return (
              <article
                key={rule.title}
                className="rounded-[1.4rem] p-5"
                style={{ background: hue.bg, color: hue.ink }}
              >
                <p className="font-display text-2xl leading-none">{rule.title}</p>
                <p className="mt-2 font-semibold">{rule.line}</p>
              </article>
            );
          })}
          <section className="rounded-[1.6rem] bg-ink p-6 text-cream">
            <p className="font-display text-3xl leading-none">This weekend</p>
            <ol className="mt-4 grid gap-2 text-lg font-semibold">
              <li>1. Start as the parent. Birth year, your email, a zip.</li>
              <li>2. Hand the phone over. They name the stand and draw the mark.</li>
              <li>3. Print the poster and the price cards. Tape them. Go outside.</li>
            </ol>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/setup"
                className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-lemonade px-6 text-lg font-extrabold text-ink"
              >
                Start as the parent
              </Link>
              <Link
                href="/privacy"
                className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-coral px-6 text-lg font-extrabold text-ink"
              >
                Privacy
              </Link>
            </div>
          </section>
        </div>
      </main>
    </SiteChrome>
  );
}
