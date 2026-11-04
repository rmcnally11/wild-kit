import type { ReactNode } from "react";

export function PhoneScreens() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Phone title="Invent" kicker="1" field="bg-raspberry text-ink">
        <p className="text-[10px] font-extrabold tracking-wide uppercase">Name of the stand</p>
        <p className="font-display mt-1 text-xl leading-none">Crooked Lemonade</p>
        <p className="mt-3 text-[10px] font-extrabold tracking-wide uppercase">The menu</p>
        <p className="mt-1 rounded-xl bg-lemonade px-3 py-2 text-sm font-extrabold text-ink">Cup · $1</p>
        <p className="mt-2 rounded-xl bg-cream px-3 py-2 text-sm font-extrabold text-ink">Pitcher · $4</p>
      </Phone>
      <Phone title="Make it real" kicker="2" field="bg-leaf text-ink">
        <div className="grid place-items-center rounded-xl bg-cream py-4 text-ink">
          <p className="font-display text-2xl leading-none">LEMONADE</p>
          <p className="mt-1 text-sm font-extrabold">OPEN</p>
          <p className="mt-3 font-display text-3xl">$1</p>
        </div>
        <p className="mt-3 text-sm font-semibold">Grown-up brings the missing piece.</p>
      </Phone>
      <Phone title="Open" kicker="3" field="bg-sky text-ink">
        <p className="font-display text-2xl leading-none">You opened.</p>
        <p className="mt-2 text-sm font-semibold">That&apos;s the whole point.</p>
        <p className="mt-4 rounded-xl bg-ink px-3 py-3 text-sm font-extrabold text-cream">
          Then one driveway photo. Grown-up. No kid face.
        </p>
      </Phone>
    </div>
  );
}

function Phone({
  title,
  kicker,
  field,
  children,
}: {
  title: string;
  kicker: string;
  field: string;
  children: ReactNode;
}) {
  return (
    <article>
      <p className="mb-2 text-xs font-extrabold tracking-wide uppercase text-ink/70">
        {kicker} · {title}
      </p>
      <div className="rounded-[2rem] bg-ink p-3">
        <div className={`rounded-[1.4rem] px-4 py-5 ${field}`}>{children}</div>
      </div>
    </article>
  );
}
