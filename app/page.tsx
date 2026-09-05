import type { Metadata } from "next";
import Link from "next/link";

import { CrookedPoster } from "@/components/crooked-poster";
import { SiteChrome } from "@/components/site-chrome";
import { ThisNotThis } from "@/components/this-not-this";
import { WhatsNext } from "@/components/whats-next";
import { FACE_LINE, MASTER, MISSING_PIECE, STEPS } from "@/lib/brand";
import { Rascal } from "@/lib/rascal";

export const metadata: Metadata = {
  title: `Wild Kit — ${FACE_LINE}`,
  description: MASTER,
};

export default function BrandPage() {
  return (
    <SiteChrome overlay>
      <main>
        <section className="bg-lemonade text-ink">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pt-20 pb-10 md:grid-cols-2 md:pt-24 md:pb-14">
            <div>
              <p className="text-base font-extrabold text-ink/70">{FACE_LINE}</p>
              <h1 className="font-display mt-3 max-w-xl text-[clamp(2rem,6vw,3.35rem)] leading-[0.95]">
                {MASTER}
              </h1>
              <p className="mt-4 max-w-lg text-lg font-semibold">{MISSING_PIECE}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/apps"
                  className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-ink px-6 font-extrabold text-cream"
                >
                  The app
                </Link>
                <Link
                  href="#next"
                  className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-cream px-6 font-extrabold text-ink"
                >
                  {"What's next"}
                </Link>
              </div>
              <p className="mt-4 text-sm font-extrabold tracking-wide text-ink/55 uppercase">
                App Store — coming
              </p>
            </div>
            <div className="relative mx-auto w-full max-w-md pb-16">
              <CrookedPoster />
              <div className="absolute -bottom-2 left-0 rounded-[1.4rem] bg-cream p-2 ring-1 ring-border sm:-left-4">
                <Rascal pose="boss" size={112} line="" />
              </div>
            </div>
          </div>
          <p className="bg-ink px-4 py-2 text-center text-xs font-extrabold tracking-wide text-cream uppercase">
            The app
          </p>
          <div className="grid shrink-0 grid-cols-3">
            {STEPS.map((step) => (
              <article key={step.title} className={`${step.bg} ${step.ink} px-3 py-3 sm:px-5 sm:py-4`}>
                <p className="font-display text-lg leading-none sm:text-3xl">{step.title}</p>
                <p className="mt-1 hidden text-sm font-semibold sm:block">{step.line}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
            <ThisNotThis />
          </div>
        </section>

        <section id="next" className="bg-cream pb-16">
          <div className="mx-auto w-full max-w-6xl px-4">
            <WhatsNext />
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
