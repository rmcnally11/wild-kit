"use client";

import { cn } from "@/lib/utils";

export function PackList({
  items,
  packed,
  onToggle,
}: {
  items: { id: string; name: string }[];
  packed: string[];
  onToggle: (id: string) => void;
}) {
  const count = items.filter((item) => packed.includes(item.id)).length;

  return (
    <section>
      <p className="text-sm font-extrabold uppercase">
        From the house · {count}/{items.length}
      </p>
      <ul className="mt-2 grid gap-2">
        {items.map((item) => {
          const on = packed.includes(item.id);
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onToggle(item.id)}
                className={cn(
                  "tap w-full rounded-2xl px-4 py-3 text-left font-extrabold",
                  on ? "bg-primary" : "bg-secondary",
                )}
              >
                {on ? "Packed · " : ""}
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
