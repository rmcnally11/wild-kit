"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ColorDots } from "@/components/color-dots";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StandLogo } from "@/lib/logo";
import { useStand } from "@/lib/stand-store";
import { type PaletteId, type Stand } from "@/lib/types";

export default function SetupPage() {
  const { stand, ready } = useStand();
  if (!ready) {
    return (
      <div className="grid min-h-dvh place-items-center text-lg text-muted-foreground">
        Mixing the pitcher…
      </div>
    );
  }
  return <SetupForm stand={stand} />;
}

function SetupForm({ stand }: { stand: Stand }) {
  const router = useRouter();
  const { save } = useStand();
  const [kidName, setKidName] = useState(stand.kidName);
  const [standName, setStandName] = useState(stand.standName);
  const [palette, setPalette] = useState<PaletteId>(stand.palette);
  const canOpen = kidName.trim().length > 0 && standName.trim().length > 1;

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
          autoComplete="given-name"
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
      <ColorDots value={palette} onChange={setPalette} />
      <div className="grid place-items-center">
        <StandLogo
          key={`${standName}-${palette}`}
          name={standName}
          palette={palette}
          badge="circle"
          mascot="lemon"
          size={200}
        />
      </div>
      <Button
        disabled={!canOpen}
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
      <p className="text-center text-sm text-muted-foreground">You can change the look next.</p>
    </div>
  );
}
