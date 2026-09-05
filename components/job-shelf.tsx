import Link from "next/link";

import { FIRST_APP, LISTING, SUBTITLE } from "@/lib/brand";
import { hueOf } from "@/lib/hues";
import { KITS } from "@/lib/kits";

export function JobShelf({
  heading = "The apps",
  intro = LISTING,
}: {
  heading?: string;
  intro?: string;
}) {
  const first = KITS.find((kit) => kit.id === "lemonade");
  const rest = KITS.filter((kit) => kit.id !== "lemonade");

  return (
    <div>
      <p className="text-sm font-extrabold tracking-wide text-raspberry uppercase">
        Always titled [Job] by Wild Kit
      </p>
      <h2 className="font-display mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none">{heading}</h2>
      {intro && <p className="mt-3 max-w-2xl font-semibold text-muted-foreground">{intro}</p>}

      <div className="mt-6 rounded-[1.4rem] bg-ink px-5 py-5 text-cream">
        <p className="text-xs font-extrabold tracking-wide uppercase opacity-80">App Store — coming</p>
        <p className="font-display mt-1 text-2xl leading-none">{FIRST_APP}</p>
        <p className="mt-2 font-semibold">
          {SUBTITLE} When the house is full of raccoons, make lemonade. Lifestyle 4+. Not Kids.
          Free. The badge goes up when the listing is real.
        </p>
        {first && (
          <Link href={`/kits/${first.id}`} className="mt-4 inline-block font-extrabold underline">
            Read the brief →
          </Link>
        )}
      </div>

      <p className="mt-8 text-sm font-extrabold tracking-wide text-leaf uppercase">Saturday briefs</p>
      <p className="mt-1 font-semibold text-muted-foreground">
        The list is still the job. A marker and what is already in the house. The apps open in the
        App Store, not here.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rest.map((kit) => {
          const hue = hueOf(kit.id);
          return (
            <Link
              key={kit.id}
              href={`/kits/${kit.id}`}
              className="tap rounded-[1.3rem] px-4 py-4"
              style={{ background: hue.bg, color: hue.ink }}
            >
              <p className="text-[10px] font-extrabold uppercase opacity-80">
                {kit.seasonLabel} · App Store — coming
              </p>
              <p className="font-display text-xl leading-none">{kit.listing}</p>
              <p className="mt-1 text-sm font-semibold">{kit.line}</p>
              <p className="mt-3 text-sm font-extrabold">Read the brief →</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
