"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { ColorDots } from "@/components/color-dots";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { downloadSvgAsPng, fileName, type SaveHow } from "@/lib/download";
import { StandLogo } from "@/lib/logo";
import { useStand } from "@/lib/stand-store";
import { BADGE_LABELS, MASCOT_LABELS, type BadgeId, type MascotId } from "@/lib/types";
import { cn } from "@/lib/utils";

const BADGES = Object.keys(BADGE_LABELS) as BadgeId[];
const MASCOTS = Object.keys(MASCOT_LABELS) as MascotId[];

const SAVE_COPY: Record<SaveHow, string> = {
  shared: "Use the share sheet — Save Image, Messages, or Files.",
  downloaded: "Saved. Check Downloads, then tape it to the table.",
  opened: "The picture opened. Hold it and tap Add to Photos, or take it to the shop.",
};

export default function LookPage() {
  const { stand, save } = useStand();
  const logoRef = useRef<SVGSVGElement>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function saveLogo() {
    if (!logoRef.current) return;
    setSaving(true);
    setStatus(null);
    try {
      const how = await downloadSvgAsPng(logoRef.current, fileName(stand.standName, "logo"));
      setStatus(SAVE_COPY[how]);
    } catch {
      setStatus("Could not save the picture. Try Print a table sign instead.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-5">
      <div>
        <h2 className="font-display text-3xl">Make a logo</h2>
        <p className="mt-1 text-muted-foreground">
          A sticker you tape to the table. Save the picture, print it at home, or take the file
          to the shop down the street.
        </p>
      </div>
      <div className="grid place-items-center rounded-[2rem] bg-card p-5 ring-1 ring-border">
        <StandLogo
          ref={logoRef}
          name={stand.standName}
          palette={stand.palette}
          badge={stand.badge}
          mascot={stand.mascot}
          size={280}
        />
      </div>
      <label className="grid gap-1 font-bold">
        Stand name
        <Input
          value={stand.standName}
          onChange={(event) => save({ standName: event.target.value })}
          className="h-12 rounded-2xl text-lg font-bold"
        />
      </label>
      <div>
        <p className="mb-2 text-sm font-extrabold uppercase">Color</p>
        <ColorDots value={stand.palette} onChange={(palette) => save({ palette })} />
      </div>
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
      {status && <p className="rounded-3xl bg-secondary p-4 text-sm font-semibold">{status}</p>}
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
