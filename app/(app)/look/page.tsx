"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { downloadSvgAsPng, fileName } from "@/lib/download";
import { StandLogo } from "@/lib/logo";
import { useStand } from "@/lib/stand-store";
import {
  BADGE_LABELS,
  MASCOT_LABELS,
  PALETTES,
  type BadgeId,
  type MascotId,
  type PaletteId,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const BADGES = Object.keys(BADGE_LABELS) as BadgeId[];
const MASCOTS = Object.keys(MASCOT_LABELS) as MascotId[];

export default function LookPage() {
  const { stand, save } = useStand();
  const logoRef = useRef<SVGSVGElement>(null);
  const [saving, setSaving] = useState(false);

  async function saveLogo() {
    if (!logoRef.current) return;
    setSaving(true);
    try {
      await downloadSvgAsPng(logoRef.current, fileName(stand.standName, "logo"));
    } catch {
      window.print();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-5">
      <div>
        <h2 className="font-display text-3xl">Make a logo</h2>
        <p className="mt-1 text-muted-foreground">
          Something you can tape to the table. Save the picture, print it at home, or take the
          file to the print shop down the street.
        </p>
      </div>
      <div className="grid place-items-center rounded-[2rem] bg-card p-4 ring-1 ring-border">
        <StandLogo
          ref={logoRef}
          name={stand.standName}
          palette={stand.palette}
          badge={stand.badge}
          mascot={stand.mascot}
          size={280}
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
        options={BADGES.map((id) => ({ id, label: BADGE_LABELS[id] }))}
        value={stand.badge}
        onChange={(badge) => save({ badge })}
      />
      <Picker
        label="Mascot"
        options={MASCOTS.map((id) => ({ id, label: MASCOT_LABELS[id] }))}
        value={stand.mascot}
        onChange={(mascot) => save({ mascot })}
      />
      <Button
        className="h-14 rounded-2xl text-lg font-extrabold"
        disabled={saving}
        onClick={saveLogo}
      >
        {saving ? "Saving…" : "Save the logo"}
      </Button>
      <Button asChild variant="secondary" className="h-14 rounded-2xl text-lg font-extrabold">
        <Link href="/poster">Print a table sign</Link>
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
              "tap rounded-full px-4 py-2 text-sm font-extrabold",
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
