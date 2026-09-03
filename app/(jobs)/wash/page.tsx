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
import { DEFAULT_WASH, WASH_PACK } from "@/lib/types";

export default function WashPage() {
  const { stand, save, sellSide, undoSide } = useStand();
  const wash = stand.wash ?? DEFAULT_WASH;
  const closed = isClosedToday(wash.closedAt);
  usePrintMode("cards");

  function togglePacked(id: string) {
    const packed = wash.packed.includes(id)
      ? wash.packed.filter((item) => item !== id)
      : [...wash.packed, id];
    save({ wash: { ...wash, packed } });
  }

  return (
    <FamilyChrome eyebrow="Car Wash by Wild Kit" title={wash.name || "Car Wash"}>
      <style>{`@media print { @page { size: letter portrait; margin: 0; } }`}</style>
      <div className="grid gap-6">
        <p className="text-lg text-muted-foreground">
          A wash on the drive. Price a car and a bike. Grown-up runs the tap. Cars in park.
        </p>

        <label className="grid gap-1 font-bold">
          Name of the wash
          <Input
            value={wash.name}
            onChange={(event) => save({ wash: { ...wash, name: event.target.value } })}
            placeholder="The wash needs a name."
            className="h-14 rounded-2xl text-lg"
          />
        </label>

        <PackList items={WASH_PACK} packed={wash.packed} onToggle={togglePacked} />

        <JobTill
          unit="wash"
          units="washes"
          menu={wash.menu}
          sales={wash.sales}
          closed={closed}
          onSell={(id) => sellSide("wash", id)}
          onUndo={() => undoSide("wash")}
        />

        <section>
          <p className="mb-2 text-sm font-extrabold uppercase">Tickets</p>
          <SideMenu
            menu={wash.menu}
            onChange={(menu) => save({ wash: { ...wash, menu } })}
            addLabel="New ticket"
          />
        </section>

        <section className="grid gap-3">
          <p className="text-sm font-extrabold uppercase">Tickets</p>
          <div className="overflow-hidden rounded-[1.4rem] ring-1 ring-border">
            <PriceCards
              name={wash.name || "Car Wash"}
              kidName={stand.kidName}
              menu={wash.menu}
            />
          </div>
          <Button
            type="button"
            className="h-14 rounded-2xl text-lg font-extrabold"
            onClick={() => window.print()}
          >
            Print the tickets
          </Button>
          <p className="text-sm text-muted-foreground">
            Letter sheet. Six cards. Hand one over when the car is in park.
          </p>
        </section>

        <CloseDay
          closed={closed}
          onChange={(closedAt) => save({ wash: { ...wash, closedAt } })}
          done="The buckets are empty and the drive is not a pond."
        />
      </div>
    </FamilyChrome>
  );
}
