import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import { WhatsNext } from "@/components/whats-next";
import { ONE_JOB } from "@/lib/brand";

export const metadata: Metadata = {
  title: "What's next",
  description: ONE_JOB,
};

export default function SaturdayPage() {
  return (
    <SiteChrome>
      <main className="bg-cream">
        <section className="bg-coral text-ink">
          <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
            <p className="text-sm font-extrabold tracking-wide uppercase">{"What's next"}</p>
            <h1 className="font-display mt-2 text-[clamp(2.4rem,8vw,4rem)] leading-[0.92]">
              {ONE_JOB}
            </h1>
            <p className="mt-4 text-lg font-semibold">
              Lemonade Stand first. After one opened stand, Bake Sale. Not twelve apps.
            </p>
          </div>
        </section>
        <div className="mx-auto w-full max-w-6xl px-4 py-12">
          <WhatsNext cta={false} heading={false} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/apps"
              className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-ink px-6 font-extrabold text-cream"
            >
              The app
            </Link>
            <Link
              href="/kits/lemonade"
              className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-lemonade px-6 font-extrabold text-ink"
            >
              This Saturday
            </Link>
          </div>
        </div>
      </main>
    </SiteChrome>
  );
}
