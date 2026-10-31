import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OpenSign } from "@/components/open-sign";
import { PrintArrowSigns } from "@/components/print-arrow-signs";
import { PrintBrief } from "@/components/print-brief";
import { PrintOpenSign } from "@/components/print-open-sign";
import { SiteChrome } from "@/components/site-chrome";
import { TellMe } from "@/components/tell-me";
import { HOME_PRINT, JOB_TWO_PUBLIC, STAND_CASH } from "@/lib/brand";
import { hueOf } from "@/lib/hues";
import { kitIdForPublicSlug, publicKitSlugs } from "@/lib/kit-routes";
import { kitById } from "@/lib/kits";

type Props = { params: Promise<{ id: string }> };

// Unknown slugs must 404 before the shell streams. notFound() alone was HTTP 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return publicKitSlugs(JOB_TWO_PUBLIC).map((id) => ({ id }));
}

function kitFromSlug(id: string) {
  const kitId = kitIdForPublicSlug(id, JOB_TWO_PUBLIC);
  if (!kitId) return undefined;
  return kitById(kitId);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const kit = kitFromSlug(id);
  if (!kit) return { title: "That Saturday" };
  return {
    title: kit.listing,
    description: kit.line,
  };
}

export default async function KitPage({ params }: Props) {
  const { id } = await params;
  const kit = kitFromSlug(id);
  if (!kit) notFound();

  const hue = hueOf(kit.id);

  return (
    <SiteChrome>
      <main className="bg-cream">
        <section className="px-4 py-10" style={{ background: hue.bg, color: hue.ink }}>
          <div className="mx-auto w-full max-w-3xl">
            <p className="text-sm font-extrabold uppercase opacity-80">{kit.listing}</p>
            <p className="mt-1 text-sm font-extrabold uppercase">
              {kit.id === "lemonade"
                ? `${kit.seasonLabel} · App Store — coming`
                : `${kit.seasonLabel} · Coming to the App Store`}
            </p>
            <h1 className="font-display mt-2 text-[clamp(2.4rem,8vw,4rem)] leading-[0.92]">
              {kit.name}
            </h1>
            <p className="mt-3 text-lg font-semibold">{kit.line}</p>
            <p className="mt-1 text-sm font-semibold">{kit.hours}</p>
          </div>
        </section>

        <div id="saturday-brief" className="mx-auto grid w-full max-w-3xl gap-4 px-4 py-8">
          <section className="rounded-[1.6rem] bg-card p-5 ring-1 ring-border">
            <p className="text-sm font-extrabold uppercase">This Saturday</p>
            <p className="mt-2 text-lg leading-7">{kit.saturday}</p>
          </section>

          <section>
            <p className="mb-2 text-sm font-extrabold uppercase">From the house</p>
            <ul className="grid gap-2">
              {kit.need.map((item) => (
                <li key={item} className="rounded-2xl bg-lemonade px-4 py-3 font-semibold text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="grid gap-3 md:grid-cols-2">
            <div className="rounded-[1.4rem] bg-sky p-4 text-ink">
              <p className="text-sm font-extrabold uppercase">The kid</p>
              <p className="mt-1 font-semibold">{kit.kid}</p>
            </div>
            <div className="rounded-[1.4rem] bg-leaf p-4 text-cream">
              <p className="text-sm font-extrabold uppercase">The grown-up</p>
              <p className="mt-1 font-semibold">{kit.parent}</p>
              {kit.id === "lemonade" ? (
                <p className="no-print mt-2 font-semibold">{STAND_CASH}</p>
              ) : null}
            </div>
            <div className="rounded-[1.4rem] bg-coral p-4 text-ink md:col-span-2">
              <p className="text-sm font-extrabold uppercase">You are done when</p>
              <p className="mt-1 font-semibold">{kit.done}</p>
            </div>
          </section>
        </div>

        {kit.id === "lemonade" ? (
          <section className="no-print mx-auto w-full max-w-3xl px-4 pb-4" aria-labelledby="lemonade-print">
            <div className="rounded-[1.6rem] bg-card p-5 ring-1 ring-border">
              <h2 id="lemonade-print" className="text-sm font-extrabold uppercase">
                Print
              </h2>
              <p className="mt-2 text-lg font-semibold leading-7">{HOME_PRINT}</p>
              <div className="mt-5">
                <p className="text-sm font-extrabold uppercase">Open sign</p>
                <p className="mt-1 font-semibold">The top half prints upside down. It reads when you stand it up.</p>
                <div className="open-sign-frame mt-3 overflow-hidden rounded-2xl ring-1 ring-ink/10">
                  <OpenSign />
                </div>
                <div className="mt-4">
                  <PrintOpenSign />
                </div>
              </div>
              <div className="mt-8">
                <p className="text-sm font-extrabold uppercase">Arrow signs</p>
                <p className="mt-1 font-semibold">
                  Two letter sheets. One points left. One points right. Tape on the dashed line.
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Image
                    src="/print/arrow-signs-left.png"
                    alt="Lemonade this way. The arrow points left. Tape on the dashed line."
                    width={700}
                    height={906}
                    className="h-auto w-full rounded-2xl ring-1 ring-ink/10"
                  />
                  <Image
                    src="/print/arrow-signs-right.png"
                    alt="Lemonade this way. The arrow points right. Tape on the dashed line."
                    width={700}
                    height={906}
                    className="h-auto w-full rounded-2xl ring-1 ring-ink/10"
                  />
                </div>
                <div className="mt-4">
                  <PrintArrowSigns />
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <div className="no-print mx-auto grid w-full max-w-3xl gap-4 px-4 pb-12">
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrintBrief />
            <Link
              href="/apps"
              className="tap inline-flex h-14 items-center justify-center rounded-2xl bg-card px-6 text-lg font-extrabold text-ink ring-1 ring-border"
            >
              The app
            </Link>
          </div>
          {kit.id === "lemonade" ? <TellMe ink /> : null}
        </div>
      </main>
    </SiteChrome>
  );
}
