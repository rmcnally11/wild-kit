import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import { Rascal } from "@/lib/rascal";
import {
  FACE_LINE,
  FIRST_APP,
  LEGAL,
  LEGAL_LINE,
  LEGAL_RULES,
  MASTER,
  MISSING_PIECE,
  PARENT_OWNED,
  PROMO,
  RASCAL_DRAWING,
  STEP_SPINE,
  STEPS,
  SUBTITLE,
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
              {MASTER}
            </h1>
            <p className="mt-4 text-lg font-semibold">{MISSING_PIECE}</p>
          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-12">
            <p className="text-sm font-extrabold tracking-wide text-raspberry uppercase">Who this is</p>
            <h2 className="font-display text-4xl leading-none">A small studio for one Saturday.</h2>
            <p className="text-lg font-semibold leading-7">
              Wild Kit builds weekend jobs for families to finish together. The kid invents the
              name, the mark, the prices. The grown-up brings the missing piece. Then you leave
              the phone and open it.
            </p>
            <p className="text-lg font-semibold leading-7">
              One job. One morning. Something you can point at when it is done.
            </p>
          </div>
        </section>

        <section className="bg-coral text-ink">
          <div className="mx-auto w-full max-w-3xl px-4 py-12">
            <p className="text-sm font-extrabold tracking-wide uppercase">How a Saturday works</p>
            <h2 className="font-display mt-2 text-4xl leading-none">{STEP_SPINE}</h2>
            <ol className="mt-5 grid gap-4">
              {STEPS.map((step, index) => (
                <li key={step.title}>
                  <p className="font-display text-2xl">
                    {index + 1}. {step.title}
                  </p>
                  <p className="mt-1 font-semibold">{step.line}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 font-semibold">
              First job is {FIRST_APP}. {SUBTITLE}
            </p>
            <Link href="/kits/lemonade" className="mt-4 inline-block font-extrabold underline">
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
              <p className="mt-4 text-lg font-semibold leading-7">{RASCAL_DRAWING}</p>
              <p className="mt-4 font-semibold">{PROMO}</p>
            </div>
            <div className="grid justify-items-center rounded-[2rem] bg-lemonade p-6 text-ink">
              <Rascal pose="boss" size={140} line="You opened. That's the whole point." />
            </div>
          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto flex w-full max-w-3xl flex-wrap gap-4 px-4 py-12 font-extrabold">
            <Link href="/saturday" className="underline">
              This Saturday
            </Link>
            <Link href="/parents" className="underline">
              Parents
            </Link>
            <Link href="/privacy" className="underline">
              Privacy
            </Link>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
