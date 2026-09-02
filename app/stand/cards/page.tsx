"use client";

import { Button } from "@/components/ui/button";
import { PriceCards } from "@/components/price-cards";
import { usePrintMode } from "@/lib/print-mode";
import { useStand } from "@/lib/stand-store";

export default function CardsPage() {
  const { stand } = useStand();
  usePrintMode("cards");

  return (
    <div className="grid gap-4">
      <style>{`@media print { @page { size: letter portrait; margin: 0; } }`}</style>
      <div className="print:hidden">
        <h2 className="font-display text-3xl">Price cards</h2>
        <p className="mt-1 text-muted-foreground">
          Letter sheet. Six cards. Tape them to the table so nobody has to ask twice.
        </p>
      </div>
      <div className="overflow-hidden rounded-[1.4rem] ring-1 ring-border print:rounded-none print:ring-0">
        <PriceCards
          name={stand.standName || "Lemonade Stand"}
          kidName={stand.kidName}
          menu={stand.menu}
        />
      </div>
      <Button
        type="button"
        className="h-16 rounded-2xl text-xl font-extrabold print:hidden"
        onClick={() => window.print()}
      >
        Print the cards
      </Button>
      <p className="text-center text-sm text-muted-foreground print:hidden">
        Ask for a letter-size color print. Cut on the lines if you want. Tape is fine.
      </p>
    </div>
  );
}
