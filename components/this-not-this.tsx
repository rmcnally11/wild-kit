import { NOT_THIS, THIS } from "@/lib/brand";

export function ThisNotThis() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <article className="rounded-[1.6rem] bg-leaf px-5 py-6 text-cream">
        <p className="text-xs font-extrabold tracking-wide uppercase opacity-80">This</p>
        <ul className="mt-3 grid gap-2">
          {THIS.map((line) => (
            <li key={line} className="font-semibold">
              {line}
            </li>
          ))}
        </ul>
      </article>
      <article className="rounded-[1.6rem] bg-card px-5 py-6 text-ink ring-1 ring-border">
        <p className="text-xs font-extrabold tracking-wide uppercase text-muted-foreground">Not this</p>
        <ul className="mt-3 grid gap-2">
          {NOT_THIS.map((line) => (
            <li key={line} className="font-semibold">
              × {line}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
