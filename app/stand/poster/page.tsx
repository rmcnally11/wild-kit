"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { downloadSvgAsPng, fileName, svgToPngBlob } from "@/lib/download";
import { isEmail, printMailBody } from "@/lib/email";
import { StandPoster } from "@/lib/poster";
import { isZip, type PrintShop } from "@/lib/shops";
import { useStand } from "@/lib/stand-store";
import { DECO_LABELS, PAPERS, SHEETS, type DecoId, type PaperId, type SheetId } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function PosterPage() {
  const { stand, save } = useStand();
  const posterRef = useRef<SVGSVGElement>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [shops, setShops] = useState<PrintShop[]>([]);
  const [place, setPlace] = useState("");
  const poster = stand.poster;
  const sheet = poster.sheet in SHEETS ? poster.sheet : "tabloid";
  const spec = SHEETS[sheet];
  const canPrint = isEmail(stand.parentEmail) && isZip(stand.zip);

  useEffect(() => {
    if (!isZip(stand.zip)) return;
    let cancelled = false;
    fetch(`/api/print-shops?zip=${stand.zip}`)
      .then((response) => response.json())
      .then((data: { city?: string; state?: string; shops?: PrintShop[]; error?: string }) => {
        if (cancelled || data.error) return;
        setShops(data.shops || []);
        if (data.city && data.state) setPlace(`${data.city}, ${data.state}`);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [stand.zip]);

  function updatePoster(next: Partial<typeof poster>) {
    save({ poster: { ...poster, ...next } });
  }

  async function getPng() {
    if (!posterRef.current) throw new Error("No poster");
    return svgToPngBlob(posterRef.current, spec.png);
  }

  async function saveShopFile() {
    if (!posterRef.current) return;
    setBusy(true);
    setStatus(null);
    try {
      const how = await downloadSvgAsPng(
        posterRef.current,
        fileName(stand.standName, "poster"),
        spec.png,
      );
      setStatus(
        how === "shared"
          ? `Use the share sheet. The file is ${spec.short} at 300 dpi — the shop can print it edge to edge.`
          : how === "opened"
            ? `The picture opened. It is ${spec.short} at 300 dpi. Hold it and tap Add to Photos, then take it to the shop.`
            : `Saved. ${spec.short} at 300 dpi. Take that file to the shop and ask them to fill the sheet.`,
      );
    } catch {
      setStatus("Could not save the picture. Try Print this poster instead.");
    } finally {
      setBusy(false);
    }
  }

  async function printIt() {
    if (!posterRef.current) return;
    setBusy(true);
    setStatus(null);
    try {
      const blob = await getPng();
      const buffer = await blob.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = "";
      bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
      });
      const image = btoa(binary);
      const filename = fileName(stand.standName, "poster");

      const response = await fetch("/api/send-poster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: stand.parentEmail,
          zip: stand.zip,
          standName: stand.standName,
          kidName: stand.kidName,
          filename,
          image,
          sheet,
        }),
      });
      const result = (await response.json()) as {
        sent?: boolean;
        fallback?: boolean;
        error?: string;
        subject?: string;
        text?: string;
        shops?: PrintShop[];
        city?: string;
        state?: string;
      };

      if (result.shops) setShops(result.shops);
      if (result.city && result.state) setPlace(`${result.city}, ${result.state}`);

      if (result.sent) {
        setStatus(`Poster's on the way. Go mix the lemonade.`);
        return;
      }

      await downloadSvgAsPng(posterRef.current, filename, spec.png);
      const body =
        result.text ||
        printMailBody({
          standName: stand.standName,
          kidName: stand.kidName,
          city: result.city,
          state: result.state,
          shops: result.shops || shops,
          sheet,
        });
      window.location.href = `mailto:${encodeURIComponent(stand.parentEmail)}?subject=${encodeURIComponent(result.subject || `${stand.standName} poster for the printer`)}&body=${encodeURIComponent(body)}`;
      setStatus(
        "Saved the picture. Attach the PNG if Mail did not keep it. Then go mix the lemonade.",
      );
    } catch {
      setStatus("Could not build the file. Try Print this poster instead.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-4">
      <style>{`@media print { @page { size: ${spec.page}; margin: 0; } }`}</style>
      <div>
        <h2 className="font-display text-3xl">The yard poster</h2>
        <p className="mt-1 text-muted-foreground">
          Marker board. Crooked tape. Sized to fill the sheet — home letter, or 11 by 17 at the shop.
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-extrabold uppercase">Sheet</p>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(SHEETS) as SheetId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => updatePoster({ sheet: id })}
              className={cn(
                "tap rounded-2xl px-3 py-3 text-left ring-2",
                sheet === id ? "bg-primary ring-foreground" : "bg-secondary ring-transparent",
              )}
            >
              <span className="block text-sm font-extrabold">{SHEETS[id].name}</span>
              <span className="block text-xs font-semibold text-muted-foreground">
                {id === "tabloid" ? "The yard sign. Shop print." : "Home printer. Fills the page."}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        id="yard-poster"
        className="overflow-hidden rounded-[1.5rem] bg-white p-0 ring-1 ring-border print:rounded-none print:ring-0 print:aspect-auto"
        style={{ aspectRatio: `${spec.view.w} / ${spec.view.h}` }}
      >
        <StandPoster
          ref={posterRef}
          name={stand.standName}
          kidName={stand.kidName}
          headline={poster.headline}
          subhead={poster.subhead}
          paper={poster.paper}
          deco={poster.deco}
          sheet={sheet}
          corner={stand.corner}
          venmo={stand.venmo}
          menu={stand.menu}
        />
      </div>

      <label className="grid gap-1 font-bold">
        Big words
        <Input
          value={poster.headline}
          onChange={(event) => updatePoster({ headline: event.target.value })}
          placeholder={stand.standName || "LEMONADE"}
          className="h-12 rounded-2xl text-lg font-bold"
        />
      </label>
      <label className="grid gap-1 font-bold">
        Under that
        <Input
          value={poster.subhead}
          onChange={(event) => updatePoster({ subhead: event.target.value })}
          placeholder="OPEN TODAY"
          className="h-12 rounded-2xl text-lg font-bold"
        />
      </label>

      <div>
        <p className="mb-2 text-sm font-extrabold uppercase">Paper</p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PAPERS) as PaperId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => updatePoster({ paper: id })}
              className={cn(
                "tap size-11 rounded-full ring-4 ring-offset-2 ring-offset-background",
                poster.paper === id ? "ring-foreground" : "ring-transparent",
              )}
              style={{ background: PAPERS[id].fill }}
              aria-label={PAPERS[id].name}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-extrabold uppercase">Doodles</p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(DECO_LABELS) as DecoId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => updatePoster({ deco: id })}
              className={cn(
                "tap rounded-full px-4 py-2 text-sm font-extrabold",
                poster.deco === id ? "bg-primary" : "bg-secondary",
              )}
            >
              {DECO_LABELS[id]}
            </button>
          ))}
        </div>
      </div>

      {canPrint ? (
        <div className="rounded-[1.6rem] bg-card p-4 ring-1 ring-border">
          <p className="font-extrabold">Print shop near {place || stand.zip}</p>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">{spec.ask}</p>
          <ul className="mt-2 grid gap-2 text-sm">
            {shops.map((shop) => (
              <li key={shop.maps}>
                <a href={shop.maps} className="font-bold underline" target="_blank" rel="noreferrer">
                  {shop.name}
                </a>
                <span className="block text-muted-foreground">{shop.address}</span>
              </li>
            ))}
            {shops.length === 0 && (
              <li className="text-muted-foreground">Looking up shops for that zip…</li>
            )}
          </ul>
        </div>
      ) : (
        <p className="rounded-3xl bg-secondary p-4 text-sm font-semibold">
          A parent adds an email and a zip first. That&apos;s how the file leaves the phone.{" "}
          <Link href="/stand/parent" className="underline">
            Parents page
          </Link>
          .
        </p>
      )}

      <Button className="h-16 rounded-2xl text-xl font-extrabold" disabled={busy || !canPrint} onClick={printIt}>
        {busy ? "Sending…" : "Send to printer"}
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="h-14 rounded-2xl text-lg font-extrabold"
        disabled={busy}
        onClick={saveShopFile}
      >
        Save the shop file
      </Button>
      {status && <p className="rounded-3xl bg-secondary p-4 text-sm font-semibold">{status}</p>}
      <Button
        type="button"
        variant="secondary"
        className="h-14 rounded-2xl text-lg font-extrabold"
        onClick={() => window.print()}
      >
        Print this poster
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {spec.ask} Tape it to a stake, or to the front of the table.
      </p>
    </div>
  );
}
