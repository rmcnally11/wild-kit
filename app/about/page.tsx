import type { Metadata } from "next";
import Link from "next/link";

import { JobShelf } from "@/components/job-shelf";
import { SiteChrome } from "@/components/site-chrome";
import { Rascal } from "@/lib/rascal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Wild Kit Co. is a Texas family studio. Kids invent it. Parents print it. Saturday happens. The apps, the App Store plan, and what we will not do.",
};

const WILL_NOT = [
  "Kid Instagram, kid email, kid-to-stranger chat",
  "Venmo in v1. No kid payments. No ads.",
  "A chore chart, a lemonade game, or babysitter TV",
  "A fake App Store badge or a fake waitlist",
  "Selling this next to On This Water. Different company.",
  "The word “coon.” A trash-can joke for Rascal.",
];

const OUTLINE = [
  {
    hue: "bg-lemonade text-ink",
    kicker: "What this is",
    title: "A house of Saturday Jobs.",
    body: "Wild Kit Co. is a Texas family studio. The website is the door: who we are, why we exist, the apps, and where to open them. The kits live on the phone. The product is what you tape to the table.",
  },
  {
    hue: "bg-raspberry text-cream",
    kicker: "The purpose",
    title: "Kids invent it. Parents print it. Saturday happens.",
    body: "Give a house one job. The kid is the boss of the inventing — the name, the mark, the prices. A grown-up owns the account and hits print. Then everybody leaves the phone. That is the whole point.",
  },
  {
    hue: "bg-leaf text-cream",
    kicker: "The goal",
    title: "A real Saturday. Not a screen.",
    body: "Twelve jobs. Always titled [Job] by Wild Kit. Individual project apps first. Lemonade Stand is the first listing. The rest of the shelf is coming. Until the buttons land, the list is still the job.",
  },
  {
    hue: "bg-sky text-ink",
    kicker: "Who it’s for",
    title: "A parent who will print. A kid who will name it.",
    body: "First name only. No kid inbox. No birthday. No street address. Lifestyle 4+, not the Kids Category, because a parent and a printer are in the loop. We still treat the data as if they were.",
  },
];

export default function AboutPage() {
  return (
    <SiteChrome>
      <main>
        <section className="bg-lemonade text-ink">
          <div className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
            <p className="text-sm font-extrabold tracking-wide uppercase">About Wild Kit</p>
            <h1 className="font-display mt-2 text-[clamp(2.4rem,8vw,4.4rem)] leading-[0.92]">
              The studio door.
            </h1>
            <p className="mt-4 text-lg font-semibold">
              This site is the outline. About us. The purpose. The goal. The apps, where to get
              them, and what is coming soon. Wild Kit Co. Weekend projects for wild little kits.
            </p>
          </div>
        </section>

        <div className="mx-auto grid w-full max-w-3xl gap-3 px-4 py-8">
          {OUTLINE.map((block) => (
            <article key={block.kicker} className={`rounded-[1.5rem] px-5 py-6 ${block.hue}`}>
              <p className="text-xs font-extrabold tracking-wide uppercase opacity-80">{block.kicker}</p>
              <h2 className="font-display mt-1 text-3xl leading-none">{block.title}</h2>
              <p className="mt-3 font-semibold leading-7">{block.body}</p>
            </article>
          ))}
        </div>

        <section className="bg-coral text-ink">
          <div className="mx-auto w-full max-w-3xl px-4 py-12">
            <p className="text-sm font-extrabold tracking-wide uppercase">How a Saturday works</p>
            <h2 className="font-display mt-2 text-4xl leading-none">Invent. Print. Open.</h2>
            <ol className="mt-5 grid gap-3 text-lg font-semibold">
              <li>1. The kid names it, prices it, and draws the mark. Crooked is fine.</li>
              <li>2. A grown-up hits print. Letter at home, or 11 by 17 at the shop. Fill the sheet.</li>
              <li>3. Tape the poster. Pour the first cup. Go outside.</li>
            </ol>
          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto w-full max-w-6xl px-4 py-12">
            <JobShelf
              heading="The apps"
              intro="Open four on this phone today. Eight more are coming. The App Store listing is not live. No fake badge."
            />
          </div>
        </section>

        <section className="bg-ink text-cream">
          <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-12">
            <div>
              <p className="text-sm font-extrabold tracking-wide uppercase opacity-80">The house</p>
              <h2 className="font-display mt-2 text-4xl leading-none">Wild Kit Co.</h2>
              <p className="mt-4 font-semibold leading-7">
                Texas LLC. App Store developer display name: Wild Kit. That name gets set on the
                first app and does not change later. First listing: Lemonade Stand by Wild Kit.
                Domain we want: getwildkit.com. This site is the door until that badge is real.
              </p>
            </div>
            <div className="rounded-[1.4rem] bg-lemonade p-5 text-ink">
              <p className="font-display text-2xl">App Store</p>
              <ul className="mt-2 grid gap-1 font-semibold">
                <li>Lemonade Stand by Wild Kit</li>
                <li>Subtitle: Design. Print. Open the stand.</li>
                <li>Category: Lifestyle. Rating 4+.</li>
                <li>Coming. Open it here in the meantime.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-raspberry text-cream">
          <div className="mx-auto grid w-full max-w-3xl items-center gap-8 px-4 py-12 md:grid-cols-2">
            <div>
              <p className="text-sm font-extrabold tracking-wide uppercase opacity-80">The face</p>
              <h2 className="font-display mt-2 text-4xl leading-none">Rascal</h2>
              <p className="mt-4 font-semibold leading-7">
                Tiny foreman. Crooked mask. Too-awake eyes. Grey, black, cream. One-breath hints on
                the kid screens. Never a teacher. Never a trash-can joke.
              </p>
            </div>
            <div className="grid justify-items-center rounded-[2rem] bg-lemonade p-6 text-ink">
              <Rascal pose="boss" size={140} line="You’re the boss of this stand." />
            </div>
          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-12">
            <div>
              <p className="text-sm font-extrabold tracking-wide text-leaf uppercase">Money</p>
              <h2 className="font-display mt-2 text-4xl leading-none">Free invent. Print your own.</h2>
              <p className="mt-3 font-semibold leading-7 text-muted-foreground">
                First dollar is the poster pack. Wild Kit Family later. No ads. Nothing rings up on
                a kid tap.
              </p>
            </div>
            <div>
              <p className="text-sm font-extrabold tracking-wide text-raspberry uppercase">
                What we will not do
              </p>
              <ul className="mt-3 grid gap-2">
                {WILL_NOT.map((line) => (
                  <li key={line} className="rounded-2xl bg-ink px-4 py-3 font-semibold text-cream">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex flex-wrap gap-4 font-extrabold">
              <Link href="/parents" className="underline">
                For parents
              </Link>
              <Link href="/privacy" className="underline">
                Privacy
              </Link>
              <Link href="/apps" className="underline">
                The apps
              </Link>
            </p>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
