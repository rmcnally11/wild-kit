import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import { KITS } from "@/lib/kits";
import { Rascal } from "@/lib/rascal";

export const metadata: Metadata = {
  title: "Wild Kit — Weekend projects for wild little kits",
  description:
    "Kids invent it. Parents print it. Saturday happens. Lemonade Stand, Bake Sale, Car Wash, Blanket Fort — Saturday Jobs by Wild Kit.",
};

const STEPS = [
  {
    n: "01",
    title: "Invent",
    line: "The kid names it, prices it, and draws the mark. Crooked is fine.",
  },
  {
    n: "02",
    title: "Print",
    line: "A grown-up hits print. Letter at home, or 11 by 17 at the shop. Fill the sheet.",
  },
  {
    n: "03",
    title: "Open",
    line: "Tape the poster. Pour the first cup. The driveway artifact is the product.",
  },
];

export default function BrandPage() {
  const open = KITS.filter((kit) => kit.status === "open");
  const next = KITS.filter((kit) => kit.status === "next");

  return (
    <SiteChrome>
      <main>
        <section className="border-b border-border bg-primary">
          <div className="mx-auto grid w-full max-w-5xl items-center gap-8 px-5 py-12 md:grid-cols-[1.2fr_0.8fr] md:py-20">
            <div>
              <p className="text-sm font-extrabold tracking-wide uppercase">
                Weekend projects for wild little kits
              </p>
              <h1 className="font-display mt-3 text-5xl leading-[0.9] md:text-7xl">
                Kids invent it. Parents print it. Saturday happens.
              </h1>
              <p className="mt-5 max-w-xl text-lg font-semibold md:text-xl">
                Wild Kit is a house of Saturday Jobs. The first one is Lemonade Stand. Open it this
                weekend.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/stand"
                  className="tap inline-flex h-14 items-center justify-center rounded-2xl bg-foreground px-6 text-lg font-extrabold text-background"
                >
                  Open Lemonade Stand
                </Link>
                <Link
                  href="#jobs"
                  className="tap inline-flex h-14 items-center justify-center rounded-2xl bg-secondary px-6 text-lg font-extrabold"
                >
                  See Saturday Jobs
                </Link>
              </div>
            </div>
            <div className="grid justify-items-center gap-3">
              <Image
                src="/rascal-icon.png"
                alt="Rascal, the Wild Kit foreman"
                width={220}
                height={220}
                className="size-44 rounded-[2rem] ring-4 ring-foreground md:size-56"
                priority
              />
              <p className="font-display text-xl">Rascal. Tiny foreman.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-5xl gap-6 px-5 py-14 md:grid-cols-3">
          {STEPS.map((step) => (
            <article key={step.n} className="rounded-[1.8rem] bg-card p-6 ring-1 ring-border">
              <p className="text-sm font-extrabold text-accent">{step.n}</p>
              <h2 className="font-display mt-2 text-4xl leading-none">{step.title}</h2>
              <p className="mt-3 font-semibold text-muted-foreground">{step.line}</p>
            </article>
          ))}
        </section>

        <section id="jobs" className="border-y border-border bg-card">
          <div className="mx-auto w-full max-w-5xl px-5 py-14">
            <p className="text-sm font-extrabold tracking-wide text-[var(--raspberry)] uppercase">
              Always titled [Job] by Wild Kit
            </p>
            <h2 className="font-display mt-2 text-4xl leading-none md:text-5xl">Saturday Jobs</h2>
            <p className="mt-3 max-w-2xl text-lg font-semibold text-muted-foreground">
              Individual project apps. The list is the job. Four are open on the phone today. The
              rest still happen with a marker and what is already in the house.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {open.map((kit) => (
                <Link
                  key={kit.id}
                  href={kit.href || `/kits/${kit.id}`}
                  className="tap rounded-[1.8rem] bg-primary px-5 py-6 text-primary-foreground"
                >
                  <p className="text-xs font-extrabold tracking-wide uppercase opacity-80">
                    {kit.seasonLabel} · Open
                  </p>
                  <p className="font-display mt-1 text-3xl leading-none">{kit.name}</p>
                  <p className="mt-1 text-sm font-semibold">{kit.listing}</p>
                  <p className="mt-3 font-semibold">{kit.line}</p>
                  <p className="mt-4 text-sm font-extrabold">Open this weekend →</p>
                </Link>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {next.map((kit) => (
                <Link
                  key={kit.id}
                  href={`/kits/${kit.id}`}
                  className="tap rounded-[1.4rem] bg-background px-4 py-4 ring-1 ring-border"
                >
                  <p className="text-xs font-extrabold uppercase text-accent">{kit.seasonLabel}</p>
                  <p className="font-display text-2xl leading-none">{kit.name}</p>
                  <p className="mt-1 text-sm font-semibold text-muted-foreground">{kit.line}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-5xl items-center gap-8 px-5 py-14 md:grid-cols-2">
          <div>
            <p className="text-sm font-extrabold tracking-wide uppercase">The face</p>
            <h2 className="font-display mt-2 text-4xl leading-none">Rascal</h2>
            <p className="mt-4 text-lg font-semibold leading-7">
              Tiny foreman. Crooked mask. Too-awake eyes. Grey, black, cream. He whispers one-breath
              hints on the kid screens. Tap him for another. He is not a trash-can joke. He is not a
              teacher.
            </p>
            <p className="mt-3 font-semibold text-muted-foreground">
              Calm. Wry. Specific. Never edutainment. Never screen-time guilt.
            </p>
          </div>
          <div className="grid justify-items-center rounded-[2rem] bg-secondary p-8">
            <Rascal pose="scheme" size={180} line="Draw it however you want." />
          </div>
        </section>

        <section className="border-t border-border bg-secondary">
          <div className="mx-auto grid w-full max-w-5xl gap-6 px-5 py-14 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-extrabold tracking-wide uppercase">For parents</p>
              <h2 className="font-display mt-2 text-4xl leading-none">You hit print.</h2>
              <p className="mt-4 text-lg font-semibold leading-7">
                You own the account. Kids invent the stand. First name only. No kid email. No kid
                payments. No ads. Print and Parent Desk are gated. Lifestyle 4+, not the Kids
                Category, because a parent and a printer are in the loop.
              </p>
              <Link href="/parents" className="mt-5 inline-block font-extrabold underline">
                The parent page →
              </Link>
            </div>
            <div className="rounded-[1.8rem] bg-card p-6 ring-1 ring-border">
              <p className="font-display text-2xl">This weekend</p>
              <ol className="mt-3 grid gap-2 font-semibold">
                <li>1. Open Lemonade Stand on this phone.</li>
                <li>2. Let them name it and draw the mark.</li>
                <li>3. Print the poster. Tape it. Go outside.</li>
              </ol>
              <Link
                href="/setup"
                className="tap mt-5 inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-5 font-extrabold"
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
