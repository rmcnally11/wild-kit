import type { Metadata } from "next";

import { SaturdaySheet } from "@/components/saturday-sheet";
import { SiteChrome } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "This Saturday",
  description:
    "Five minutes. No obligation. You keep the sheet. If the sheet is empty, do not open the app and wander.",
};

export default function SaturdayPage() {
  return (
    <SiteChrome>
      <main className="bg-cream">
        <section className="bg-coral text-ink">
          <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
            <p className="text-sm font-extrabold tracking-wide uppercase">This Saturday</p>
            <h1 className="font-display mt-2 text-[clamp(2.4rem,8vw,4rem)] leading-[0.92]">
              Fill this in together.
            </h1>
            <p className="mt-4 text-lg font-semibold">
              Five minutes. No obligation. You keep the sheet. If the sheet is empty, do not open
              the app and wander. Fill the sheet first.
            </p>
          </div>
        </section>
        <SaturdaySheet />
      </main>
    </SiteChrome>
  );
}
