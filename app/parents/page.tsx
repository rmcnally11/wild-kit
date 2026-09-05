import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import { TellMe } from "@/components/tell-me";
import { ThisNotThis } from "@/components/this-not-this";
import {
  FIRST_NAME_ONLY,
  GROWN_UP_FIRST,
  IF_HE_ASKS,
  LEGAL_LINE,
  LEGAL_RULES,
  OPEN_WITH_SATURDAY,
  PARENT_OWNED,
} from "@/lib/brand";

export const metadata: Metadata = {
  title: "For Parents",
  description: `${OPEN_WITH_SATURDAY} ${IF_HE_ASKS}`,
};

export default function ParentsPage() {
  return (
    <SiteChrome>
      <main>
        <section className="bg-sky text-ink">
          <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
            <p className="text-sm font-extrabold tracking-wide uppercase">For parents</p>
            <h1 className="font-display mt-2 text-[clamp(2.4rem,8vw,4rem)] leading-[0.92]">
              {OPEN_WITH_SATURDAY}
            </h1>
            <p className="mt-4 text-lg font-semibold">{IF_HE_ASKS}</p>
            <p className="mt-3 font-semibold">
              {PARENT_OWNED}. {FIRST_NAME_ONLY}
            </p>
          </div>
        </section>
        <div className="mx-auto grid w-full max-w-3xl gap-3 px-4 py-8">
          <ThisNotThis />
          <section className="rounded-[1.6rem] bg-lemonade p-6 text-ink">
            <p className="font-display text-3xl leading-none">The line, and it matters</p>
            <p className="mt-3 font-semibold leading-7">{LEGAL_LINE}</p>
            <ul className="mt-4 grid gap-2 font-semibold">
              {LEGAL_RULES.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-[1.6rem] bg-ink p-6 text-cream">
            <p className="font-display text-3xl leading-none">{GROWN_UP_FIRST}</p>
            <p className="mt-3 font-semibold">
              They invent the name, the poster, the prices. You own the account. You bring the
              missing piece. Then you go outside.
            </p>
            <Link
              href="/kits/lemonade"
              className="tap mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-lemonade px-6 text-lg font-extrabold text-ink"
            >
              This Saturday
            </Link>
          </section>
          <TellMe />
        </div>
      </main>
    </SiteChrome>
  );
}
