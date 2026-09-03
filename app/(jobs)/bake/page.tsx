"use client";

import { CloseDay } from "@/components/close-day";
import { FamilyChrome } from "@/components/family-chrome";
import { JobTill } from "@/components/job-till";
import { PackList } from "@/components/pack-list";
import { PriceCards } from "@/components/price-cards";
import { SideMenu } from "@/components/side-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePrintMode } from "@/lib/print-mode";
import { useStand } from "@/lib/stand-store";
import { isClosedToday } from "@/lib/today";
import { BAKE_PACK, DEFAULT_BAKE } from "@/lib/types";

export default function BakePage() {
  const { stand, save, sellSide, undoSide } = useStand();
  const bake = stand.bake ?? DEFAULT_BAKE;
  const closed = isClosedToday(bake.closedAt);
  usePrintMode("cards");

  function togglePacked(id: string) {
    const packed = bake.packed.includes(id)
      ? bake.packed.filter((item) => item !== id)
      : [...bake.packed, id];
    save({ bake: { ...bake, packed } });
  }

  return (
    <FamilyChrome eyebrow="Bake Sale by Wild Kit" title={bake.name || "Bake Sale"}>
      <style>{`@media print { @page { size: letter portrait; margin: 0; } }`}</style>
      <div className="grid gap-6">
        <p className="text-lg text-muted-foreground">
          One kind of thing, not a bakery. Name it. Price it. Grown-up has the oven. The tray is
          the product.
        </p>

        <label className="grid gap-1 font-bold">
          Name of the sale
          <Input
            value={bake.name}
            onChange={(event) => save({ bake: { ...bake, name: event.target.value } })}
            placeholder="The sale needs a name."
            className="h-14 rounded-2xl text-lg"
          />
        </label>

        <PackList items={BAKE_PACK} packed={bake.packed} onToggle={togglePacked} />

        <JobTill
          unit="treat"
          menu={bake.menu}
          sales={bake.sales}
          closed={closed}
          onSell={(id) => sellSide("bake", id)}
          onUndo={() => undoSide("bake")}
        />

        <section>
          <p className="mb-2 text-sm font-extrabold uppercase">The tray</p>
          <SideMenu
            menu={bake.menu}
            onChange={(menu) => save({ bake: { ...bake, menu } })}
            addLabel="New treat"
          />
        </section>

        <section className="grid gap-3">
          <p className="text-sm font-extrabold uppercase">Price cards</p>
          <div className="overflow-hidden rounded-[1.4rem] ring-1 ring-border">
            <PriceCards
              name={bake.name || "Bake Sale"}
              kidName={stand.kidName}
              menu={bake.menu}
            />
          </div>
          <Button
            type="button"
            className="h-14 rounded-2xl text-lg font-extrabold"
            onClick={() => window.print()}
          >
            Print the cards
          </Button>
          <p className="text-sm text-muted-foreground">
            Letter sheet. Six cards. Tape them to the tray.
          </p>
        </section>

        <CloseDay
          closed={closed}
          onChange={(closedAt) => save({ bake: { ...bake, closedAt } })}
          done="The tray is empty or the sun is gone."
        />
      </div>
    </FamilyChrome>
  );
}
