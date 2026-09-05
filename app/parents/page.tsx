import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import { ThisNotThis } from "@/components/this-not-this";
import {
  FIRST_NAME_ONLY,
  IF_HE_ASKS,
  LEGAL_LINE,
  LEGAL_RULES,
  MONEY,
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
            <p className="font-display text-3xl leading-none">This Saturday</p>
            <p className="mt-3 font-semibold">
              Five minutes. No obligation. You keep the sheet. If the sheet is empty, do not open
              the app and wander. Fill the sheet first.
            </p>
            <p className="mt-3 font-semibold">
              {MONEY.firstDollar} {MONEY.app}
            </p>
            <ol className="mt-4 grid gap-2 text-lg font-semibold">
              <li>1. Circle the job.</li>
              <li>2. First name only. Grown-up on the account.</li>
              <li>3. Name the sign. Crooked is fine.</li>
              <li>4. Print the poster, or hand-letter it.</li>
              <li>5. Pack from the house. Buy only the missing two things.</li>
              <li>6. Tape it. Then leave the phone.</li>
            </ol>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pay"
                className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-lemonade px-6 text-lg font-extrabold text-ink"
              >
                Pay the pack
              </Link>
              <Link
                href="/saturday"
                className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-cream px-6 text-lg font-extrabold text-ink ring-1 ring-border"
              >
                Fill the sheet
              </Link>
              <Link
                href="/privacy"
                className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-cream px-6 text-lg font-extrabold text-ink ring-1 ring-border"
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
