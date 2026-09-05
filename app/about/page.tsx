import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import { Rascal } from "@/lib/rascal";
import {
  FACE_LINE,
  FIRST_APP,
  IF_HE_ASKS,
  LEGAL,
  LEGAL_LINE,
  LEGAL_RULES,
  MASTER,
  OPEN_WITH_SATURDAY,
  PARENT_MOUTH,
  PARENT_OWNED,
  PROMO,
} from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description: MASTER,
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <main>
        <section className="bg-lemonade text-ink">
          <div className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
            <p className="text-sm font-extrabold tracking-wide uppercase">{FACE_LINE}</p>
            <h1 className="font-display mt-2 text-[clamp(2.4rem,8vw,4.4rem)] leading-[0.92]">
              {OPEN_WITH_SATURDAY}
            </h1>
            <p className="mt-4 text-lg font-semibold">{PARENT_MOUTH[0]}</p>
            <p className="mt-3 text-lg font-semibold">{IF_HE_ASKS}</p>
          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-12">
            <p className="text-sm font-extrabold tracking-wide text-raspberry uppercase">Who this is</p>
            <h2 className="font-display text-4xl leading-none">A small studio for one Saturday.</h2>
            <p className="text-lg font-semibold leading-7">
              First job is {FIRST_APP}. The kid invents the name, the mark, the prices. The grown-up
              brings the missing piece. Then you leave the phone and open it.
            </p>
            <Link href="/kits/lemonade" className="font-extrabold underline">
              This Saturday →
            </Link>
          </div>
        </section>

        <section className="bg-ink text-cream">
          <div className="mx-auto grid w-full max-w-3xl gap-5 px-4 py-12">
            <p className="text-sm font-extrabold tracking-wide uppercase opacity-80">The house</p>
            <h2 className="font-display text-4xl leading-none">{LEGAL}</h2>
            <p className="text-lg font-semibold leading-7">{LEGAL_LINE}</p>
            <ul className="grid gap-2">
              {LEGAL_RULES.map((line) => (
                <li key={line} className="rounded-2xl bg-cream px-4 py-3 font-semibold text-ink">
                  {line}
                </li>
              ))}
            </ul>
            <p className="font-semibold">{PARENT_OWNED}. First name only. No kid inbox.</p>
          </div>
        </section>

        <section className="bg-raspberry text-cream">
          <div className="mx-auto grid w-full max-w-3xl items-center gap-8 px-4 py-12 md:grid-cols-2">
            <div>
              <p className="text-sm font-extrabold tracking-wide uppercase opacity-80">The face</p>
              <h2 className="font-display mt-2 text-4xl leading-none">Rascal</h2>
              <p className="mt-4 text-lg font-semibold leading-7">{PROMO}</p>
            </div>
            <div className="grid justify-items-center rounded-[2rem] bg-lemonade p-6 text-ink">
              <Rascal pose="boss" size={140} line="You opened. That's the whole point." />
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
