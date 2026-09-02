"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { StandLogo } from "@/lib/logo";
import { useStand } from "@/lib/stand-store";
import { PALETTES, type BadgeId, type MascotId, type PaletteId } from "@/lib/types";
import { cn } from "@/lib/utils";

const BADGES: BadgeId[] = ["circle", "ticket", "banner", "diamond"];
const MASCOTS: MascotId[] = ["lemon", "cup", "sun"];

export default function LookPage() {
  const { stand, save } = useStand();

  return (
    <div className="grid gap-5">
      <h2 className="font-display text-3xl">Make the logo</h2>
      <div className="grid place-items-center rounded-[2rem] bg-card p-6 ring-1 ring-border">
        <StandLogo
          name={stand.standName}
          palette={stand.palette}
          badge={stand.badge}
          mascot={stand.mascot}
          size={240}
        />
      </div>
      <Picker
        label="Color"
        options={(Object.keys(PALETTES) as PaletteId[]).map((id) => ({
          id,
          label: PALETTES[id].name,
        }))}
        value={stand.palette}
        onChange={(palette) => save({ palette })}
      />
      <Picker
        label="Shape"
        options={BADGES.map((id) => ({ id, label: id }))}
        value={stand.badge}
        onChange={(badge) => save({ badge })}
      />
      <Picker
        label="Mascot"
        options={MASCOTS.map((id) => ({ id, label: id }))}
        value={stand.mascot}
        onChange={(mascot) => save({ mascot })}
      />
      <Button asChild className="h-14 rounded-2xl text-lg font-extrabold">
        <Link href="/poster">Make a poster</Link>
      </Button>
    </div>
  );
}

function Picker<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-extrabold uppercase">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "tap rounded-full px-4 py-2 text-sm font-extrabold capitalize",
              value === option.id ? "bg-primary" : "bg-secondary",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
