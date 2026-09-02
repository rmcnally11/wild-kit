import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import { ThisNotThis } from "@/components/this-not-this";
import {
  APP_STORE,
  DEVELOPER,
  FIRST_APP,
  KID_MOUTH,
  LEGAL,
  LEGAL_LINE,
  LEGAL_RULES,
  MASTER,
  MISSING_PIECE,
  MONEY,
  OTHER_COMPANY,
  PARENT_MOUTH,
  PATTERN,
  PROMO,
  RASCAL_DRAWING,
  RASCAL_MOUTH,
  SERIES,
  SITE,
  STEPS,
  SUBTITLE,
  TAGLINE,
} from "@/lib/brand";
import { Rascal } from "@/lib/rascal";

export const metadata: Metadata = {
  title: "About",
  description: `${MASTER} ${MISSING_PIECE}`,
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <main>
        <section className="bg-lemonade text-ink">
          <div className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
            <p className="text-sm font-extrabold tracking-wide uppercase">{TAGLINE}</p>
            <h1 className="font-display mt-2 text-[clamp(2.4rem,8vw,4.4rem)] leading-[0.92]">
              {MASTER}
            </h1>
            <p className="mt-4 text-lg font-semibold">{MISSING_PIECE}</p>
          </div>
        </section>

        <div className="mx-auto grid w-full max-w-3xl gap-3 px-4 py-8">
          <ThisNotThis />
        </div>

        <section className="bg-coral text-ink">
          <div className="mx-auto w-full max-w-3xl px-4 py-12">
            <p className="text-sm font-extrabold tracking-wide uppercase">How a Saturday works</p>
            <h2 className="font-display mt-2 text-4xl leading-none">Invent. Print. Open.</h2>
            <ol className="mt-5 grid gap-4">
              {STEPS.map((step, index) => (
                <li key={step.title}>
                  <p className="font-display text-2xl">
                    {index + 1}. {step.title}
                  </p>
                  <p className="mt-1 font-semibold">{step.line}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-ink text-cream">
          <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-12">
            <div>
              <p className="text-sm font-extrabold tracking-wide uppercase opacity-80">App Store</p>
              <h2 className="font-display mt-2 text-4xl leading-none">{APP_STORE.name}</h2>
              <p className="mt-3 font-semibold">{APP_STORE.description}</p>
            </div>
            <div className="rounded-[1.4rem] bg-lemonade p-5 text-ink">
              <ul className="grid gap-1 font-semibold">
                <li>Developer: {DEVELOPER}</li>
                <li>Subtitle: {APP_STORE.subtitle}</li>
                <li>Promo: {APP_STORE.promo}</li>
                <li>Category: {APP_STORE.category}</li>
                <li>Rating: {APP_STORE.rating}</li>
                <li>Price: {APP_STORE.price}</li>
                <li>Coming. Open it here until the listing is real.</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-extrabold tracking-wide uppercase opacity-80">
                Screenshot captions
              </p>
              <ol className="mt-3 grid gap-2 font-semibold">
                {APP_STORE.captions.map((line, index) => (
                  <li key={line}>
                    {index + 1}. {line}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-12">
            <div>
              <p className="text-sm font-extrabold tracking-wide text-raspberry uppercase">
                How to word it
              </p>
              <h2 className="font-display mt-2 text-4xl leading-none">Three mouths.</h2>
              <p className="mt-3 font-semibold text-muted-foreground">
                Second person. One breath. One idea.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <Mouth title="Parent" hue="bg-sky text-ink" lines={PARENT_MOUTH} />
              <Mouth title="Kid" hue="bg-lemonade text-ink" lines={KID_MOUTH} />
              <Mouth title="Rascal" hue="bg-coral text-ink" lines={RASCAL_MOUTH} />
            </div>
          </div>
        </section>

        <section className="bg-raspberry text-cream">
          <div className="mx-auto grid w-full max-w-3xl items-center gap-8 px-4 py-12 md:grid-cols-2">
            <div>
              <p className="text-sm font-extrabold tracking-wide uppercase opacity-80">The face</p>
              <h2 className="font-display mt-2 text-4xl leading-none">Rascal</h2>
              <p className="mt-4 font-semibold leading-7">{RASCAL_DRAWING}</p>
            </div>
            <div className="grid justify-items-center rounded-[2rem] bg-lemonade p-6 text-ink">
              <Rascal pose="boss" size={140} line="You opened. That's the whole point." />
            </div>
          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-12">
            <div>
              <p className="text-sm font-extrabold tracking-wide text-leaf uppercase">The house</p>
              <h2 className="font-display mt-2 text-4xl leading-none">{LEGAL}</h2>
              <p className="mt-3 font-semibold leading-7">
                Developer {DEVELOPER}. Face Rascal. First app {FIRST_APP}. Series {SERIES}. Pattern{" "}
                {PATTERN}. Site {SITE}.
              </p>
              <p className="mt-3 font-semibold">{PROMO}</p>
              <p className="mt-3 font-semibold">{SUBTITLE}</p>
            </div>
            <div>
              <p className="text-sm font-extrabold tracking-wide text-coral uppercase">Money</p>
              <ul className="mt-3 grid gap-2 font-semibold">
                <li>{MONEY.app}</li>
                <li>{MONEY.firstDollar}</li>
                <li>{MONEY.family}</li>
                <li>{MONEY.noVenmo}</li>
                <li>The poster is the product.</li>
              </ul>
              <Link href="/pay" className="mt-4 inline-block font-extrabold underline">
                Pay →
              </Link>
            </div>
            <div>
              <p className="text-sm font-extrabold tracking-wide text-raspberry uppercase">
                The line, and it matters
              </p>
              <p className="mt-3 font-semibold leading-7">{LEGAL_LINE}</p>
              <ul className="mt-3 grid gap-2">
                {LEGAL_RULES.map((line) => (
                  <li key={line} className="rounded-2xl bg-ink px-4 py-3 font-semibold text-cream">
                    {line}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-semibold text-muted-foreground">{OTHER_COMPANY}</p>
            </div>
            <p className="flex flex-wrap gap-4 font-extrabold">
              <Link href="/parents" className="underline">
                Parents
              </Link>
              <Link href="/privacy" className="underline">
                Privacy
              </Link>
              <Link href="/apps" className="underline">
                The apps
              </Link>
              <Link href="/saturday" className="underline">
                This Saturday
              </Link>
            </p>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}

function Mouth({ title, hue, lines }: { title: string; hue: string; lines: readonly string[] }) {
  return (
    <article className={`rounded-[1.4rem] px-4 py-5 ${hue}`}>
      <p className="text-xs font-extrabold tracking-wide uppercase opacity-80">{title}</p>
      <ul className="mt-3 grid gap-3 font-semibold">
        {lines.map((line) => (
          <li key={line}>“{line}”</li>
        ))}
      </ul>
    </article>
  );
}
