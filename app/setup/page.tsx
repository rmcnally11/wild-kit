"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StandLogo } from "@/lib/logo";
import { useStand } from "@/lib/stand-store";
import { PALETTES, type PaletteId } from "@/lib/types";

export default function SetupPage() {
  const router = useRouter();
  const { stand, save } = useStand();
  const [kidName, setKidName] = useState(stand.kidName);
  const [standName, setStandName] = useState(stand.standName);
  const [palette, setPalette] = useState<PaletteId>(stand.palette);
  const ready = kidName.trim().length > 0 && standName.trim().length > 1;

  return (
    <div className="mx-auto grid min-h-dvh max-w-lg content-center gap-5 px-5 py-10">
      <p className="text-sm font-extrabold tracking-wide text-accent uppercase">My Stand</p>
      <h1 className="font-display text-5xl leading-none">Name the stand.</h1>
      <p className="text-lg text-muted-foreground">
        First name only. No last names, no emails. This lives on this phone.
      </p>
      <label className="grid gap-1 font-bold">
        Your first name
        <Input
          value={kidName}
          onChange={(event) => setKidName(event.target.value)}
          placeholder="Sam"
          className="h-14 rounded-2xl text-lg"
        />
      </label>
      <label className="grid gap-1 font-bold">
        Stand name
        <Input
          value={standName}
          onChange={(event) => setStandName(event.target.value)}
          placeholder="Sunny Sip"
          className="h-14 rounded-2xl text-lg"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(PALETTES) as PaletteId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setPalette(id)}
            className="tap size-10 rounded-full ring-2 ring-offset-2"
            style={{
              background: PALETTES[id].pop,
              outlineColor: palette === id ? PALETTES[id].ink : "transparent",
            }}
            aria-label={PALETTES[id].name}
          />
        ))}
      </div>
      <div className="grid place-items-center">
        <StandLogo name={standName} palette={palette} badge="circle" mascot="lemon" size={180} />
      </div>
      <Button
        disabled={!ready}
        className="h-16 rounded-2xl text-xl font-extrabold"
        onClick={() => {
          save({
            kidName: kidName.trim(),
            standName: standName.trim(),
            palette,
            setupDone: true,
          });
          router.replace("/");
        }}
      >
        Open the stand
      </Button>
    </div>
  );
}
