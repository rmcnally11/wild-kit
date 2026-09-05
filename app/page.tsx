import type { Metadata } from "next";
import Link from "next/link";

import { CrookedPoster } from "@/components/crooked-poster";
import { SiteChrome } from "@/components/site-chrome";
import { ThisNotThis } from "@/components/this-not-this";
import {
  FACE_LINE,
  FIRST_APP,
  MASTER,
  MISSING_PIECE,
  STEPS,
  SUBTITLE,
} from "@/lib/brand";
import { kitById } from "@/lib/kits";
import { Rascal } from "@/lib/rascal";

export const metadata: Metadata = {
  title: `Wild Kit — ${FACE_LINE}`,
  description: MASTER,
};

export default function BrandPage() {
  const lemonade = kitById("lemonade");

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
                  href="/kits/lemonade"
                  className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-ink px-6 font-extrabold text-cream"
                >
                  This Saturday
                </Link>
                <Link
                  href="/saturday"
                  className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-cream px-6 font-extrabold text-ink"
                >
                  Fill the sheet
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

        <section className="bg-cream pb-16">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 md:grid-cols-[1.2fr_1fr] md:items-start">
            <div>
              <p className="text-sm font-extrabold tracking-wide text-ink/70 uppercase">This Saturday</p>
              <h2 className="font-display mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none">
                {FIRST_APP}
              </h2>
              <p className="mt-3 text-lg font-semibold">{SUBTITLE}</p>
              {lemonade ? <p className="mt-2 font-semibold text-muted-foreground">{lemonade.hours}</p> : null}
              <p className="mt-4 max-w-xl font-semibold">
                Name the stand. Draw the poster. Pack from the house. Then leave the phone.
              </p>
              <Link
                href="/kits/lemonade"
                className="tap mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-lemonade px-6 font-extrabold text-ink"
              >
                This Saturday
              </Link>
            </div>
            {lemonade ? (
              <div>
                <p className="text-sm font-extrabold tracking-wide text-ink/70 uppercase">From the house</p>
                <ul className="mt-3 grid gap-2">
                  {lemonade.need.map((item) => (
                    <li key={item} className="rounded-2xl bg-card px-4 py-3 font-semibold ring-1 ring-border">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
