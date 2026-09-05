import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import { APP_STORE, FIRST_APP, MASTER, STORE_DOOR, SUBTITLE } from "@/lib/brand";
import { kitById } from "@/lib/kits";

export const metadata: Metadata = {
  title: "The apps",
  description: `${FIRST_APP}. ${SUBTITLE} ${MASTER}`,
};

export default function AppsPage() {
  const lemonade = kitById("lemonade");

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
            <p className="mt-2 max-w-2xl font-semibold">{STORE_DOOR}</p>
          </div>
        </section>
        <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-12">
          <section className="rounded-[1.6rem] bg-ink px-5 py-6 text-cream">
            <p className="text-xs font-extrabold tracking-wide uppercase opacity-80">
              App Store — coming
            </p>
            <p className="font-display mt-1 text-3xl leading-none">{FIRST_APP}</p>
            <p className="mt-3 font-semibold">
              {SUBTITLE} Lifestyle 4+. Not Kids. Free. The badge goes up when the listing is real.
            </p>
            <Link
              href="/kits/lemonade"
              className="mt-5 inline-flex h-12 items-center justify-center rounded-2xl bg-lemonade px-6 font-extrabold text-ink"
            >
              This Saturday
            </Link>
          </section>
          {lemonade ? (
            <p className="font-semibold text-muted-foreground">{lemonade.hours}</p>
          ) : null}
          <p className="font-semibold text-muted-foreground">
            The rest of the shelf waits. One job until one stand has opened.
          </p>
        </div>
      </main>
    </SiteChrome>
  );
}
