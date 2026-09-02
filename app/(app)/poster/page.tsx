"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { downloadSvgAsPng, fileName, type SaveHow } from "@/lib/download";
import { StandSign } from "@/lib/logo";
import { useStand } from "@/lib/stand-store";

const SAVE_COPY: Record<SaveHow, string> = {
  shared: "Use the share sheet. The shop can print from that picture.",
  downloaded: "Saved. Hand that file to any print shop, or print it at home.",
  opened: "The picture opened. Hold it and tap Add to Photos, then take it to the shop.",
};

export default function TableSignPage() {
  const { stand } = useStand();
  const signRef = useRef<SVGSVGElement>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function saveSign() {
    if (!signRef.current) return;
    setSaving(true);
    setStatus(null);
    try {
      const how = await downloadSvgAsPng(signRef.current, fileName(stand.standName, "sign"));
      setStatus(SAVE_COPY[how]);
    } catch {
      window.print();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-4">
      <div>
        <h2 className="font-display text-3xl">Tape it to the table</h2>
        <p className="mt-1 text-muted-foreground">
          Print this at home, or take the picture to any shop down the street. Staples, the
          pharmacy, the copy place — whoever does posters. We just make the picture.
        </p>
      </div>
      <div
        id="table-sign"
        className="overflow-hidden rounded-[1.5rem] bg-white p-3 ring-1 ring-border print:rounded-none print:p-0 print:ring-0"
      >
        <StandSign
          ref={signRef}
          name={stand.standName}
          palette={stand.palette}
          badge={stand.badge}
          mascot={stand.mascot}
          menu={stand.menu}
          corner={stand.corner}
          venmo={stand.venmo}
          width={360}
        />
      </div>
      <Button
        className="h-14 rounded-2xl text-lg font-extrabold"
        disabled={saving}
        onClick={saveSign}
      >
        {saving ? "Saving…" : "Save the sign as a picture"}
      </Button>
      {status && <p className="rounded-3xl bg-secondary p-4 text-sm font-semibold">{status}</p>}
      <Button
        type="button"
        variant="secondary"
        className="h-14 rounded-2xl text-lg font-extrabold"
        onClick={() => window.print()}
      >
        Print the table sign
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        On a phone, Print usually means Save as PDF. Hand that to the shop.
      </p>
    </div>
  );
}
