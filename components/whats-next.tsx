import Link from "next/link";

import { NEXT_BEATS, ONE_JOB } from "@/lib/brand";

export function WhatsNext({
  cta = true,
  heading = true,
}: {
  cta?: boolean;
  heading?: boolean;
}) {
  return (
    <div className="grid gap-6">
      {heading ? (
        <div>
          <p className="text-sm font-extrabold tracking-wide text-ink/70 uppercase">{"What's next"}</p>
          <h2 className="font-display mt-2 max-w-xl text-[clamp(2rem,5vw,3.5rem)] leading-none">
            {ONE_JOB}
          </h2>
        </div>
      ) : null}
      <div className="grid gap-3 md:grid-cols-3">
        {NEXT_BEATS.map((beat) => (
          <article
            key={beat.when}
            className={`rounded-[1.6rem] px-5 py-6 ${beat.bg} ${beat.ink}`}
          >
            <p className="text-xs font-extrabold tracking-wide uppercase opacity-80">{beat.when}</p>
            <p className="font-display mt-2 text-2xl leading-none">{beat.title}</p>
            <p className="mt-3 font-semibold">{beat.line}</p>
          </article>
        ))}
      </div>
      {cta ? (
        <Link
          href="/apps"
          className="tap inline-flex h-12 w-fit items-center justify-center rounded-2xl bg-ink px-6 font-extrabold text-cream"
        >
          The app
        </Link>
      ) : null}
    </div>
  );
}
