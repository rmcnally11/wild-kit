import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { JobShelf } from "@/components/job-shelf";
import { SiteChrome } from "@/components/site-chrome";
import { ThisNotThis } from "@/components/this-not-this";
import {
  FIRST_APP,
  IF_HE_ASKS,
  MASTER,
  MISSING_PIECE,
  OPEN_WITH_SATURDAY,
  PARENT_OWNED,
  PROMO,
  STEPS,
  STORE_DOOR,
  SUBTITLE,
  TAGLINE,
} from "@/lib/brand";
import { Rascal } from "@/lib/rascal";

export const metadata: Metadata = {
  title: "Wild Kit — Weekend projects for wild little kits",
  description: `${MASTER} ${MISSING_PIECE}`,
};

export default function BrandPage() {
  return (
    <SiteChrome overlay>
      <main>
        <section className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-lemonade text-ink">
          <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col justify-between gap-4 px-4 pt-16 pb-3 sm:pt-[4.25rem] md:flex-row md:items-center md:gap-10 md:pb-4">
            <div className="min-w-0 max-w-2xl">
              <p className="text-[11px] font-extrabold tracking-wide text-ink/70 uppercase sm:text-xs">
                {TAGLINE}
              </p>
              <h1 className="font-display mt-2 text-[clamp(2rem,8vw,4.75rem)] leading-[0.92]">
                {MASTER}
              </h1>
              <p className="mt-3 max-w-xl text-sm font-semibold sm:mt-4 sm:text-lg">
                {MISSING_PIECE}
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row">
                <Link
                  href="/kits/lemonade"
                  className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-ink px-5 text-base font-extrabold text-cream sm:h-14 sm:text-lg"
                >
                  Read the brief
                </Link>
                <Link
                  href="/saturday"
                  className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-coral px-5 text-base font-extrabold text-ink sm:h-14 sm:text-lg"
                >
                  This Saturday
                </Link>
              </div>
              <p className="mt-3 text-sm font-extrabold tracking-wide uppercase text-ink/70">
                App Store — coming
              </p>
            </div>
            <div className="hidden shrink-0 justify-items-center md:grid">
              <div className="grid place-items-center rounded-[2rem] bg-coral p-6 ring-4 ring-ink">
                <Image
                  src="/rascal-icon.png"
                  alt="Rascal, the Wild Kit foreman"
                  width={220}
                  height={220}
                  className="size-44 lg:size-56"
                  priority
                />
              </div>
              <p className="font-display mt-3 text-xl">{PROMO}</p>
            </div>
            <div className="flex items-center gap-3 md:hidden">
              <Image
                src="/rascal-icon.png"
                alt="Rascal"
                width={72}
                height={72}
                className="size-16 rounded-2xl ring-2 ring-ink"
                priority
              />
              <p className="font-display text-lg leading-tight">{PROMO}</p>
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

        <section className="bg-lemonade text-ink">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-[1.2fr_0.8fr] md:py-16">
            <div>
              <p className="text-sm font-extrabold tracking-wide uppercase">First job</p>
              <h2 className="font-display mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none">
                {FIRST_APP}
              </h2>
              <p className="mt-3 text-lg font-semibold">{SUBTITLE}</p>
              <p className="mt-2 font-semibold">{PROMO}</p>
              <Link
                href="/kits/lemonade"
                className="tap mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-ink px-5 font-extrabold text-cream"
              >
                Read the brief
              </Link>
            </div>
            <div className="rounded-[1.8rem] bg-ink p-6 text-cream">
              <p className="font-display text-2xl">The first dollar</p>
              <p className="mt-3 font-semibold">
                Print pack $9. You hit pay. They hit the driveway. {PARENT_OWNED}.
              </p>
              <Link
                href="/pay"
                className="tap mt-5 inline-flex h-12 items-center justify-center rounded-2xl bg-coral px-5 font-extrabold text-ink"
              >
                Pay the pack
              </Link>
            </div>
          </div>
        </section>

        <section id="jobs" className="bg-cream">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
            <JobShelf heading="Saturday Jobs" intro={STORE_DOOR} />
          </div>
        </section>

        <section className="bg-sky text-ink">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-16">
            <div>
              <p className="text-sm font-extrabold tracking-wide uppercase">For the driveway</p>
              <h2 className="font-display mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none">
                {OPEN_WITH_SATURDAY}
              </h2>
              <p className="mt-4 text-lg font-semibold leading-7">{IF_HE_ASKS}</p>
              <Link href="/parents" className="mt-5 inline-block font-extrabold underline">
                The parent page →
              </Link>
            </div>
            <div className="rounded-[1.8rem] bg-cream p-6 text-ink">
              <p className="font-display text-2xl">This Saturday</p>
              <p className="mt-3 font-semibold">
                Five minutes. No obligation. You keep the sheet. If the sheet is empty, do not open
                the app and wander. Fill the sheet first.
              </p>
              <Link
                href="/saturday"
                className="tap mt-5 inline-flex h-12 items-center justify-center rounded-2xl bg-coral px-5 font-extrabold"
              >
                Fill the sheet
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-raspberry text-cream">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
            <div>
              <p className="text-sm font-extrabold tracking-wide uppercase opacity-80">The face</p>
              <h2 className="font-display mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none">Rascal</h2>
              <p className="mt-4 text-lg font-semibold leading-7">
                Tiny foreman. Crooked mask. Too-awake eyes. One-breath hints. Never a teacher. Never
                a trash-can joke.
              </p>
            </div>
            <div className="grid justify-items-center rounded-[2rem] bg-lemonade p-6 text-ink">
              <Rascal pose="scheme" size={160} line="The poster is the product." />
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
