import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import { TellMe } from "@/components/tell-me";
import { MONEY } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Pay",
  description: MONEY.firstDollar,
};

export default function PayPage() {
  return (
    <SiteChrome>
      <main>
        <section className="bg-lemonade text-ink">
          <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
            <p className="text-sm font-extrabold tracking-wide uppercase">Grown-up first</p>
            <h1 className="font-display mt-2 text-[clamp(2.4rem,8vw,4rem)] leading-[0.92]">
              {MONEY.firstDollar}
            </h1>
            <p className="mt-4 text-lg font-semibold">
              {MONEY.app} {MONEY.noVenmo} The listing isn't real yet.
            </p>
            <Link
              href="/kits/lemonade"
              className="tap mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-ink px-6 font-extrabold text-cream"
            >
              This Saturday
            </Link>
          </div>
        </section>
        <div className="mx-auto w-full max-w-3xl px-4 py-10">
          <TellMe ink />
        </div>
      </main>
    </SiteChrome>
  );
}
