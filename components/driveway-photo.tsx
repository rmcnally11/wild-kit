"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DRIVEWAY_PHOTO,
  DRIVEWAY_PHOTO_LINE,
  FIRST_NAME_ONLY,
  PARENT_OWNED,
} from "@/lib/brand";
import { compressDrivewayPhoto } from "@/lib/driveway-photo";

export function DrivewayPhoto({
  photo,
  onChange,
}: {
  photo: string | null;
  onChange: (photo: string | null) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function pick(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      onChange(await compressDrivewayPhoto(file));
    } catch {
      setError("Could not keep that picture. Try another.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-[1.8rem] bg-card p-5 ring-1 ring-border">
      <p className="text-sm font-extrabold uppercase">Driveway photo</p>
      <p className="font-display mt-2 text-2xl leading-none">{DRIVEWAY_PHOTO}</p>
      <p className="mt-2 font-semibold text-muted-foreground">{DRIVEWAY_PHOTO_LINE}</p>
      <p className="mt-1 text-sm font-semibold text-muted-foreground">
        {PARENT_OWNED}. {FIRST_NAME_ONLY} Stays on this device.
      </p>

      {photo ? (
        <figure className="mt-4 overflow-hidden rounded-[1.4rem] ring-1 ring-border">
          <img src={photo} alt="The stand on the driveway. No kid face." className="w-full" />
        </figure>
      ) : null}

      <input
        ref={input}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          void pick(file);
        }}
      />

      <Button
        type="button"
        className="mt-4 h-14 w-full rounded-2xl text-lg font-extrabold"
        disabled={busy}
        onClick={() => input.current?.click()}
      >
        {busy ? "Keeping it…" : photo ? "Try another" : "Take the picture"}
      </Button>
      {photo ? (
        <Button
          type="button"
          variant="secondary"
          className="mt-2 h-12 w-full rounded-2xl text-base font-extrabold"
          onClick={() => onChange(null)}
        >
          Forget this photo
        </Button>
      ) : null}
      {error ? <p className="mt-3 font-extrabold text-raspberry">{error}</p> : null}
    </section>
  );
}
