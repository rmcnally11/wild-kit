import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import {
  APP_STORE,
  FIRST_APP,
  IF_HE_ASKS,
  LISTING,
  MASTER,
  ONE_JOB,
  STEPS,
  SUBTITLE,
} from "@/lib/brand";

export const metadata: Metadata = {
  title: "The app",
  description: `${FIRST_APP}. ${SUBTITLE} ${MASTER}`,
};

export default function AppsPage() {
  return (
    <SiteChrome>
      <main className="bg-cream">
        <section className="bg-lemonade text-ink">
          <div className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
            <p className="text-sm font-extrabold tracking-wide uppercase">First listing</p>
            <h1 className="font-display mt-2 text-[clamp(2.4rem,8vw,4.4rem)] leading-[0.92]">
              {APP_STORE.name}
            </h1>
            <p className="mt-3 text-lg font-semibold">{APP_STORE.subtitle}</p>
            <p className="mt-2 max-w-2xl font-semibold">{IF_HE_ASKS}</p>
          </div>
        </section>
        <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-12">
          <section className="rounded-[1.6rem] bg-ink px-5 py-6 text-cream">
            <p className="text-xs font-extrabold tracking-wide uppercase opacity-80">
              App Store — coming
            </p>
            <p className="font-display mt-2 text-3xl leading-none">{FIRST_APP}</p>
            <p className="mt-3 font-semibold">
              {SUBTITLE} Lifestyle 4+. Not Kids. Free. {LISTING}
            </p>
          </section>
          <section className="grid gap-3">
            {STEPS.map((step) => (
              <article
                key={step.title}
                className={`rounded-[1.4rem] px-5 py-4 ${step.bg} ${step.ink}`}
              >
                <p className="font-display text-2xl leading-none">{step.title}</p>
                <p className="mt-1 font-semibold">{step.line}</p>
              </article>
            ))}
          </section>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kits/lemonade"
              className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-lemonade px-6 font-extrabold text-ink"
            >
              This Saturday
            </Link>
            <Link
              href="/saturday"
              className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-cream px-6 font-extrabold text-ink ring-1 ring-border"
            >
              {"What's next"}
            </Link>
          </div>
          <p className="font-semibold text-muted-foreground">
            The rest of the shelf waits. {ONE_JOB}
          </p>
        </div>
      </main>
    </SiteChrome>
  );
}
