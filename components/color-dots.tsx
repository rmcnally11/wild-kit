"use client";

import { PALETTES, type PaletteId } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ColorDots({
  value,
  onChange,
}: {
  value: PaletteId;
  onChange: (palette: PaletteId) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {(Object.keys(PALETTES) as PaletteId[]).map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            "tap size-11 rounded-full ring-4 ring-offset-2 ring-offset-background",
            value === id ? "ring-foreground" : "ring-transparent",
          )}
          style={{ background: PALETTES[id].pop }}
          aria-label={PALETTES[id].name}
          aria-pressed={value === id}
        />
      ))}
    </div>
  );
}
