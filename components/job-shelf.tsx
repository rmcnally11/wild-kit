import Link from "next/link";

import { hueOf } from "@/lib/hues";
import { KITS } from "@/lib/kits";

export function JobShelf({
  heading = "The apps",
  intro,
}: {
  heading?: string;
  intro?: string;
}) {
  const open = KITS.filter((kit) => kit.status === "open");
  const next = KITS.filter((kit) => kit.status === "next");

  return (
    <div>
      <p className="text-sm font-extrabold tracking-wide text-raspberry uppercase">
        Always titled [Job] by Wild Kit
      </p>
      <h2 className="font-display mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-none">{heading}</h2>
      {intro && <p className="mt-3 max-w-2xl font-semibold text-muted-foreground">{intro}</p>}

      <div className="mt-6 rounded-[1.4rem] bg-ink px-5 py-5 text-cream">
        <p className="text-xs font-extrabold tracking-wide uppercase opacity-80">Where to get them</p>
        <p className="font-display mt-1 text-2xl leading-none">App Store — coming.</p>
        <p className="mt-2 font-semibold">
          Developer name: Wild Kit. First listing: Lemonade Stand by Wild Kit. Subtitle: Design.
          Print. Open the stand. Lifestyle 4+. The badge goes up when the listing is real. Until
          then, open the kits on this phone.
        </p>
      </div>

      <p className="mt-8 text-sm font-extrabold tracking-wide text-leaf uppercase">Open here</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
                {kit.seasonLabel} · Open here
              </p>
              <p className="font-display mt-1 text-3xl leading-none">{kit.name}</p>
              <p className="mt-1 text-sm font-semibold">{kit.listing}</p>
              <p className="mt-2 font-semibold">{kit.line}</p>
              <p className="mt-4 text-sm font-extrabold">Open this weekend →</p>
            </Link>
          );
        })}
      </div>

      <p className="mt-8 text-sm font-extrabold tracking-wide text-coral uppercase">Coming soon</p>
      <p className="mt-1 font-semibold text-muted-foreground">
        The list is still the job. A marker and what is already in the house. Briefs are up.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {next.map((kit) => {
          const hue = hueOf(kit.id);
          return (
            <Link
              key={kit.id}
              href={`/kits/${kit.id}`}
              className="tap rounded-[1.3rem] px-4 py-4"
              style={{ background: hue.bg, color: hue.ink }}
            >
              <p className="text-[10px] font-extrabold uppercase opacity-80">Coming soon</p>
              <p className="font-display text-xl leading-none">{kit.name}</p>
              <p className="mt-1 text-sm font-semibold">{kit.line}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
