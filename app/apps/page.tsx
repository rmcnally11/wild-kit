import type { Metadata } from "next";
import Link from "next/link";

import { PhoneScreens } from "@/components/phone-screens";
import { SiteChrome } from "@/components/site-chrome";
import { TellMe } from "@/components/tell-me";
import { APP_STORE, FIRST_APP, IF_HE_ASKS, LISTING, MASTER, ONE_JOB, SUBTITLE } from "@/lib/brand";

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
        <div className="mx-auto grid w-full max-w-3xl gap-8 px-4 py-12">
          <section className="rounded-[1.6rem] bg-ink px-5 py-6 text-cream">
            <p className="text-xs font-extrabold tracking-wide uppercase opacity-80">
              App Store — coming
            </p>
            <p className="font-display mt-2 text-3xl leading-none">{FIRST_APP}</p>
            <p className="mt-3 font-semibold">
              Lifestyle 4+. Not Kids. Free. {LISTING}
            </p>
          </section>
          <PhoneScreens />
          <TellMe />
          <Link
            href="/kits/lemonade"
            className="tap inline-flex h-12 w-fit items-center justify-center rounded-2xl bg-lemonade px-6 font-extrabold text-ink"
          >
            This Saturday
          </Link>
          <p className="font-semibold text-muted-foreground">
            The rest of the shelf waits. {ONE_JOB}
          </p>
        </div>
      </main>
    </SiteChrome>
  );
}
