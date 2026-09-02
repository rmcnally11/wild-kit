import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import { hueOf } from "@/lib/hues";
import { KITS } from "@/lib/kits";
import { Rascal } from "@/lib/rascal";

export const metadata: Metadata = {
  title: "Wild Kit — Weekend projects for wild little kits",
  description:
    "Kids invent it. Parents print it. Saturday happens. Lemonade Stand, Bake Sale, Car Wash, Blanket Fort — Saturday Jobs by Wild Kit.",
};

const STEPS = [
  {
    title: "Invent",
    line: "Name it. Price it. Draw the mark.",
    bg: "bg-raspberry",
    ink: "text-cream",
  },
  {
    title: "Print",
    line: "Grown-up hits print. Fill the sheet.",
    bg: "bg-leaf",
    ink: "text-cream",
  },
  {
    title: "Open",
    line: "Tape it. Pour one. Go outside.",
    bg: "bg-sky",
    ink: "text-ink",
  },
];

export default function BrandPage() {
  const open = KITS.filter((kit) => kit.status === "open");
  const next = KITS.filter((kit) => kit.status === "next");

  return (
    <SiteChrome overlay>
      <main>
        <section className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-lemonade text-ink">
          <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col justify-between gap-4 px-4 pt-16 pb-3 sm:pt-[4.25rem] md:flex-row md:items-center md:gap-10 md:pb-4">
            <div className="min-w-0 max-w-2xl">
              <p className="text-[11px] font-extrabold tracking-wide text-ink/70 uppercase sm:text-xs">
                Weekend projects for wild little kits
              </p>
              <h1 className="font-display mt-2 text-[clamp(2rem,8vw,4.75rem)] leading-[0.92]">
                Kids invent it. Parents print it. Saturday happens.
              </h1>
              <p className="mt-3 max-w-xl text-sm font-semibold sm:mt-4 sm:text-lg">
                Wild Kit is a house of Saturday Jobs. Open Lemonade Stand this weekend.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row">
                <Link
                  href="/stand"
                  className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-ink px-5 text-base font-extrabold text-cream sm:h-14 sm:text-lg"
                >
                  Open Lemonade Stand
                </Link>
                <Link
                  href="#jobs"
                  className="tap inline-flex h-12 items-center justify-center rounded-2xl bg-coral px-5 text-base font-extrabold text-ink sm:h-14 sm:text-lg"
                >
                  Saturday Jobs
                </Link>
              </div>
            </div>
            <div className="hidden shrink-0 justify-items-center md:grid">
              <div className="grid place-items-center rounded-[2rem] bg-coral p-6 ring-4 ring-ink">
                <Image
                  src="/rascal-icon.png"
                  alt="Rascal, the Wild Kit foreman"
                  width={220}
                  height={220}
                  className="size-44 lg:size-56"
                  priority
                />
              </div>
              <p className="font-display mt-3 text-xl">Rascal. Tiny foreman.</p>
            </div>
            <div className="flex items-center gap-3 md:hidden">
              <Image
                src="/rascal-icon.png"
                alt="Rascal"
                width={72}
                height={72}
                className="size-16 rounded-2xl ring-2 ring-ink"
                priority
              />
              <p className="font-display text-lg leading-tight">Rascal. Tiny foreman.</p>
            </div>
          </div>
          <div className="grid shrink-0 grid-cols-3">
            {STEPS.map((step) => (
              <article key={step.title} className={`${step.bg} ${step.ink} px-3 py-3 sm:px-5 sm:py-4`}>
                <p className="font-display text-lg leading-none sm:text-3xl">{step.title}</p>
                <p className="mt-1 hidden text-sm font-semibold sm:block">{step.line}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="jobs" className="bg-cream">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
            <p className="text-sm font-extrabold tracking-wide text-raspberry uppercase">
              Always titled [Job] by Wild Kit
            </p>
            <h2 className="font-display mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none">
              Saturday Jobs
            </h2>
            <p className="mt-3 max-w-2xl font-semibold text-muted-foreground">
              Four are open on the phone today. The rest still happen with a marker and what is
              already in the house.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {open.map((kit) => {
                const hue = hueOf(kit.id);
                return (
                  <Link
                    key={kit.id}
                    href={kit.href || `/kits/${kit.id}`}
                    className="tap rounded-[1.6rem] px-5 py-5"
                    style={{ background: hue.bg, color: hue.ink }}
                  >
                    <p className="text-xs font-extrabold tracking-wide uppercase opacity-80">
                      {kit.seasonLabel} · Open
                    </p>
                    <p className="font-display mt-1 text-3xl leading-none">{kit.name}</p>
                    <p className="mt-2 font-semibold">{kit.line}</p>
                    <p className="mt-4 text-sm font-extrabold">Open this weekend →</p>
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {next.map((kit) => {
                const hue = hueOf(kit.id);
                return (
                  <Link
                    key={kit.id}
                    href={`/kits/${kit.id}`}
                    className="tap rounded-[1.3rem] px-4 py-4 ring-2"
                    style={{
                      background: hue.bg,
                      color: hue.ink,
                      boxShadow: "none",
                    }}
                  >
                    <p className="text-[10px] font-extrabold uppercase opacity-80">{kit.seasonLabel}</p>
                    <p className="font-display text-xl leading-none">{kit.name}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-raspberry text-cream">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
            <div>
              <p className="text-sm font-extrabold tracking-wide uppercase opacity-80">The face</p>
              <h2 className="font-display mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none">Rascal</h2>
              <p className="mt-4 text-lg font-semibold leading-7">
                Tiny foreman. Crooked mask. Too-awake eyes. He whispers one-breath hints. Tap him
                for another. He is not a trash-can joke. He is not a teacher.
              </p>
            </div>
            <div className="grid justify-items-center rounded-[2rem] bg-lemonade p-6 text-ink">
              <Rascal pose="scheme" size={160} line="Draw it however you want." />
            </div>
          </div>
        </section>

        <section className="bg-sky text-ink">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-16">
            <div>
              <p className="text-sm font-extrabold tracking-wide uppercase">For parents</p>
              <h2 className="font-display mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none">
                You hit print.
              </h2>
              <p className="mt-4 text-lg font-semibold leading-7">
                You own the account. Kids invent the stand. First name only. No kid email. No kid
                payments. No ads.
              </p>
              <Link href="/parents" className="mt-5 inline-block font-extrabold underline">
                The parent page →
              </Link>
            </div>
            <div className="rounded-[1.8rem] bg-cream p-6 text-ink">
              <p className="font-display text-2xl">This weekend</p>
              <ol className="mt-3 grid gap-2 font-semibold">
                <li>1. Open Lemonade Stand on this phone.</li>
                <li>2. Let them name it and draw the mark.</li>
                <li>3. Print the poster. Tape it. Go outside.</li>
              </ol>
              <Link
                href="/setup"
                className="tap mt-5 inline-flex h-12 items-center justify-center rounded-2xl bg-coral px-5 font-extrabold"
              >
                Start as the parent
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
