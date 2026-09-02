import type { Metadata } from "next";

import { JobShelf } from "@/components/job-shelf";
import { SiteChrome } from "@/components/site-chrome";
import { APP_STORE, FIRST_APP, MASTER, SUBTITLE } from "@/lib/brand";

export const metadata: Metadata = {
  title: "The apps",
  description: `${FIRST_APP}. ${SUBTITLE} ${MASTER}`,
};

export default function AppsPage() {
  return (
    <SiteChrome>
      <main className="bg-cream">
        <section className="bg-lemonade text-ink">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
            <p className="text-sm font-extrabold tracking-wide uppercase">First listing</p>
            <h1 className="font-display mt-2 text-[clamp(2.4rem,8vw,4.4rem)] leading-[0.92]">
              {APP_STORE.name}
            </h1>
            <p className="mt-3 text-lg font-semibold">{APP_STORE.subtitle}</p>
            <p className="mt-2 max-w-2xl font-semibold">{APP_STORE.description}</p>
          </div>
        </section>
        <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
          <JobShelf
            heading="Saturday Jobs"
            intro="Open the kits here. App Store wrap is later. Coming-soon jobs still have a Saturday brief."
          />
        </div>
      </main>
    </SiteChrome>
  );
}
