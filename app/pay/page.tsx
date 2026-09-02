import type { Metadata } from "next";

import { PayDesk } from "@/components/pay-desk";
import { SiteChrome } from "@/components/site-chrome";
import { FIRST_NAME_ONLY, PARENT_OWNED } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Pay",
  description: "Print pack $9. Wild Kit Family $4.99 a month or $29 a year. Grown-up first. No kid payments.",
};

export default function PayPage() {
  return (
    <SiteChrome>
      <main>
        <section className="bg-lemonade text-ink">
          <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
            <p className="text-sm font-extrabold tracking-wide uppercase">Grown-up first</p>
            <h1 className="font-display mt-2 text-[clamp(2.4rem,8vw,4rem)] leading-[0.92]">
              The first dollar is the print pack.
            </h1>
            <p className="mt-4 text-lg font-semibold">
              Invent stays free. You hit pay. They hit the driveway. {PARENT_OWNED}. {FIRST_NAME_ONLY}
            </p>
          </div>
        </section>
        <PayDesk />
      </main>
    </SiteChrome>
  );
}
