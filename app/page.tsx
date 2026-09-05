import { existsSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";

import { PhoneScreens } from "@/components/phone-screens";
import { SiteChrome } from "@/components/site-chrome";
import { StandTable } from "@/components/stand-table";
import { TellMe } from "@/components/tell-me";
import { FACE_LINE, IF_HE_ASKS, MASTER, ONE_JOB, STEPS, TELL_ME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Wild Kit — ${FACE_LINE}`,
  description: MASTER,
};

export default function BrandPage() {
  const photo = existsSync(path.join(process.cwd(), "public", "saturday.jpg"));

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
              <p className="mt-4 max-w-lg text-lg font-semibold">{IF_HE_ASKS}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/kits/lemonade"
                  className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-ink px-6 font-extrabold text-cream"
                >
                  This Saturday
                </Link>
                <a
                  href="#notify"
                  className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-cream px-6 font-extrabold text-ink"
                >
                  {TELL_ME}
                </a>
              </div>
              <p className="mt-4 text-sm font-extrabold tracking-wide text-ink/55 uppercase">
                App Store — coming
              </p>
            </div>
            <div className="relative mx-auto w-full max-w-md pb-16">
              {photo ? (
                <figure>
                  <img
                    src="/saturday.jpg"
                    alt="A lemonade stand. Crooked poster. Pitcher on the table."
                    className="w-full rounded-[1.6rem] ring-1 ring-ink/10"
                  />
                </figure>
              ) : (
                <StandTable />
              )}
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
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:py-16">
            <div>
              <p className="text-sm font-extrabold tracking-wide text-ink/70 uppercase">On the phone</p>
              <h2 className="font-display mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none">
                Invent. Make it real. Open.
              </h2>
              <p className="mt-3 max-w-xl text-lg font-semibold">{ONE_JOB}</p>
            </div>
            <PhoneScreens />
            <TellMe />
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
