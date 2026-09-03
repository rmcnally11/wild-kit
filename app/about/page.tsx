import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import {
  FACE_LINE,
  LEGAL_LINE,
  MASTER,
  MISSING_PIECE,
  RASCAL_DRAWING,
  STEP_SPINE,
  STEPS,
} from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description: MASTER,
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <main className="bg-cream">
        <section className="bg-lemonade text-ink">
          <div className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16">
            <p className="text-sm font-extrabold tracking-wide uppercase">{FACE_LINE}</p>
            <h1 className="font-display mt-2 text-[clamp(2.4rem,8vw,4.4rem)] leading-[0.92]">
              {MASTER}
            </h1>
            <p className="mt-4 text-lg font-semibold">{MISSING_PIECE}</p>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-3xl gap-10 px-4 py-12">
          <div>
            <p className="text-sm font-extrabold tracking-wide uppercase">How Saturday works</p>
            <h2 className="font-display mt-2 text-4xl leading-none">{STEP_SPINE}</h2>
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

          <div>
            <p className="text-sm font-extrabold tracking-wide uppercase">Rascal</p>
            <p className="mt-3 text-lg font-semibold leading-7">{RASCAL_DRAWING}</p>
          </div>

          <div>
            <p className="text-sm font-extrabold tracking-wide uppercase">The line</p>
            <p className="mt-3 text-lg font-semibold leading-7">{LEGAL_LINE}</p>
            <p className="mt-5 flex flex-wrap gap-4 font-extrabold">
              <Link href="/privacy" className="underline">
                Privacy
              </Link>
              <Link href="/parents" className="underline">
                Parents
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
