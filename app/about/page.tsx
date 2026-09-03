import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import {
  FACE_LINE,
  FIRST_APP,
  LEGAL_LINE,
  LEGAL_RULES,
  MASTER,
  MISSING_PIECE,
  PROMO,
  STEP_SPINE,
  STEPS,
  STUDIO,
  SUBTITLE,
} from "@/lib/brand";
import { Rascal } from "@/lib/rascal";

export const metadata: Metadata = {
  title: "About",
  description: `${MASTER} ${STUDIO}`,
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <main className="bg-cream text-ink">
        <section className="bg-lemonade">
          <div className="mx-auto w-full max-w-3xl px-4 py-14 md:py-20">
            <p className="text-sm font-extrabold tracking-wide uppercase">{FACE_LINE}</p>
            <h1 className="font-display mt-2 text-[clamp(2.4rem,8vw,4.4rem)] leading-[0.92]">
              {STUDIO}
            </h1>
            <p className="mt-5 text-2xl font-extrabold leading-snug md:text-3xl">{MASTER}</p>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-7">{MISSING_PIECE}</p>
            <p className="mt-4 max-w-xl text-lg font-semibold leading-7">
              Wild Kit is a small studio. The kid designs the thing. The grown-up brings the missing
              piece. Then you leave the phone and open it. One job. One morning. Something you can
              point at when it is done.
            </p>
          </div>
        </section>

        <section className="bg-coral">
          <div className="mx-auto w-full max-w-3xl px-4 py-14">
            <p className="text-sm font-extrabold tracking-wide uppercase">How a Saturday works</p>
            <h2 className="font-display mt-2 text-4xl leading-none">{STEP_SPINE}</h2>
            <ol className="mt-6 grid gap-5">
              {STEPS.map((step, index) => (
                <li key={step.title}>
                  <p className="font-display text-2xl">
                    {index + 1}. {step.title}
                  </p>
                  <p className="mt-1 font-semibold leading-7">{step.line}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 font-semibold leading-7">
              First job is {FIRST_APP}. {SUBTITLE}
            </p>
            <Link
              href="/kits/lemonade"
              className="tap mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-ink px-5 font-extrabold text-cream"
            >
              Read the brief
            </Link>
          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto w-full max-w-3xl px-4 py-14">
            <p className="text-sm font-extrabold tracking-wide uppercase text-leaf">The house</p>
            <h2 className="font-display mt-2 text-4xl leading-none">Parent owns the account.</h2>
            <p className="mt-4 text-lg font-semibold leading-7">{LEGAL_LINE}</p>
            <ul className="mt-6 grid gap-2">
              {LEGAL_RULES.map((line) => (
                <li key={line} className="rounded-2xl bg-ink px-4 py-3 font-semibold text-cream">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-raspberry text-cream">
          <div className="mx-auto grid w-full max-w-3xl items-center gap-8 px-4 py-14 md:grid-cols-2">
            <div>
              <p className="text-sm font-extrabold tracking-wide uppercase opacity-80">The face</p>
              <h2 className="font-display mt-2 text-4xl leading-none">Rascal</h2>
              <p className="mt-4 text-lg font-semibold leading-7">
                Tiny foreman. Crooked mask. Too-awake eyes. One-breath hints. He is not a teacher.
                He does not grade the sign.
              </p>
              <p className="mt-4 text-lg font-semibold leading-7">{PROMO}</p>
            </div>
            <div className="grid justify-items-center rounded-[2rem] bg-lemonade p-6 text-ink">
              <Rascal pose="boss" size={160} line="You opened. That's the whole point." />
            </div>
          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto flex w-full max-w-3xl flex-wrap gap-4 px-4 py-10 font-extrabold">
            <Link href="/saturday" className="underline">
              This Saturday
            </Link>
            <Link href="/parents" className="underline">
              Parents
            </Link>
            <Link href="/privacy" className="underline">
              Privacy
            </Link>
            <Link href="/kits/lemonade" className="underline">
              Lemonade brief
            </Link>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
