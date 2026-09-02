import type { Metadata } from "next";

import { JobShelf } from "@/components/job-shelf";
import { SiteChrome } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "The apps",
  description:
    "Saturday Jobs by Wild Kit. Four open on this phone. Eight coming soon. App Store listing coming — Lemonade Stand by Wild Kit.",
};

export default function AppsPage() {
  return (
    <SiteChrome>
      <main className="bg-cream">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
          <JobShelf
            heading="Where to get them"
            intro="Open the kits here. App Store wrap is later. Coming-soon jobs still have a Saturday brief."
          />
        </div>
      </main>
    </SiteChrome>
  );
}
