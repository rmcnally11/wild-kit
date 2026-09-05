import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import { MONEY } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Pay",
  description: MONEY.firstDollar,
};

export default function PayThanksPage() {
  return (
    <SiteChrome>
      <main className="bg-leaf text-cream">
        <div className="mx-auto grid w-full max-w-3xl gap-4 px-4 py-14">
          <p className="text-sm font-extrabold tracking-wide uppercase opacity-80">Not here</p>
          <h1 className="font-display text-[clamp(2.4rem,8vw,4rem)] leading-[0.92]">
            {MONEY.firstDollar}
          </h1>
          <p className="text-lg font-semibold">{MONEY.app}</p>
          <Link
            href="/kits/lemonade"
            className="tap mt-4 inline-flex h-12 w-fit items-center justify-center rounded-2xl bg-lemonade px-6 font-extrabold text-ink"
          >
            This Saturday
          </Link>
        </div>
      </main>
    </SiteChrome>
  );
}
