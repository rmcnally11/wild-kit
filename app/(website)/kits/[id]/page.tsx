import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteChrome } from "@/components/site-chrome";
import { hueOf } from "@/lib/hues";
import { kitById, KITS } from "@/lib/kits";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return KITS.map((kit) => ({ id: kit.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const kit = kitById(id);
  if (!kit) return { title: "That Saturday" };
  return {
    title: kit.listing,
    description: kit.line,
  };
}

export default async function KitPage({ params }: Props) {
  const { id } = await params;
  const kit = kitById(id);
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

        <div className="mx-auto grid w-full max-w-3xl gap-4 px-4 py-8">
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
            </div>
            <div className="rounded-[1.4rem] bg-coral p-4 text-ink md:col-span-2">
              <p className="text-sm font-extrabold uppercase">You are done when</p>
              <p className="mt-1 font-semibold">{kit.done}</p>
            </div>
          </section>

          <p className="rounded-[1.4rem] bg-ink px-5 py-4 font-semibold text-cream">
            {kit.id === "lemonade"
              ? "App Store — coming. The badge goes up when the listing is real. Until then, the brief is the job."
              : "Coming to the App Store. You do not need the buttons. The list is the job. Pack from the house. Then go."}
          </p>

          <Link
            href="/saturday"
            className="tap inline-flex h-14 items-center justify-center rounded-2xl bg-coral text-lg font-extrabold text-ink"
          >
            This Saturday
          </Link>

          <p className="flex flex-wrap gap-4 font-extrabold">
            <Link href="/apps" className="underline">
              All apps
            </Link>
            <Link href="/about" className="underline">
              About
            </Link>
          </p>
        </div>
      </main>
    </SiteChrome>
  );
}
