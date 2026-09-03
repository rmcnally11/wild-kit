import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import { ThisNotThis } from "@/components/this-not-this";
import { FACE_LINE, FIRST_APP, MASTER, STEPS } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Wild Kit — ${FACE_LINE}`,
  description: MASTER,
};

export default function BrandPage() {
  return (
    <SiteChrome overlay>
      <main>
        <section className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-lemonade text-ink">
          <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col justify-center px-4 pt-16 pb-6 sm:pt-[4.25rem]">
            <p className="text-[11px] font-extrabold tracking-wide text-ink/70 uppercase sm:text-xs">
              {FACE_LINE}
            </p>
            <h1 className="font-display mt-2 max-w-4xl text-[clamp(2.2rem,8vw,4.75rem)] leading-[0.92]">
              {MASTER}
            </h1>
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
          <div className="mx-auto w-full max-w-6xl px-4">
            <p className="text-sm font-extrabold tracking-wide uppercase text-ink/70">This Saturday</p>
            <h2 className="font-display mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none">
              {FIRST_APP}
            </h2>
            <Link
              href="/kits/lemonade"
              className="tap mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-lemonade px-6 font-extrabold text-ink"
            >
              Read the brief
            </Link>
            <p className="mt-4 text-sm font-extrabold tracking-wide text-muted-foreground uppercase">
              App Store — coming
            </p>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
