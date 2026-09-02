"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { money } from "@/lib/money";
import { MENU_CAP, type MenuItem } from "@/lib/types";

function snapPrice(value: number) {
  return Math.round(value * 4) / 4;
}

export function SideMenu({
  menu,
  onChange,
  addLabel,
}: {
  menu: MenuItem[];
  onChange: (menu: MenuItem[]) => void;
  addLabel: string;
}) {
  function update(id: string, patch: Partial<MenuItem>) {
    onChange(menu.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  return (
    <div className="grid gap-3">
      {menu.map((item) => (
        <div key={item.id} className="rounded-3xl bg-card p-4 ring-1 ring-border">
          <Input
            value={item.name}
            onChange={(event) => update(item.id, { name: event.target.value })}
            className="h-12 rounded-2xl text-lg font-bold"
            aria-label="Item name"
          />
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              className="tap grid size-12 place-items-center rounded-2xl bg-secondary text-2xl font-extrabold"
              onClick={() => update(item.id, { price: Math.max(0, snapPrice(item.price - 0.25)) })}
              aria-label="Lower price"
            >
              −
            </button>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="text-lg font-extrabold">$</span>
              <Input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.25"
                value={item.price}
                onChange={(event) => update(item.id, { price: Number(event.target.value) || 0 })}
                className="h-12 rounded-2xl text-lg font-bold"
                aria-label="Price"
              />
            </div>
            <button
              type="button"
              className="tap grid size-12 place-items-center rounded-2xl bg-secondary text-2xl font-extrabold"
              onClick={() => update(item.id, { price: Math.min(99, snapPrice(item.price + 0.25)) })}
              aria-label="Raise price"
            >
              +
            </button>
          </div>
          <p className="mt-2 text-sm font-bold text-muted-foreground">{money(item.price)}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              type="button"
              variant={item.soldOut ? "default" : "secondary"}
              className="rounded-full font-extrabold"
              onClick={() => update(item.id, { soldOut: !item.soldOut })}
            >
              {item.soldOut ? "Sold out — tap to put back" : "On the table"}
            </Button>
            {menu.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                className="rounded-full"
                onClick={() => onChange(menu.filter((row) => row.id !== item.id))}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      ))}
      {menu.length < MENU_CAP ? (
        <Button
          type="button"
          variant="secondary"
          className="h-14 rounded-2xl font-extrabold"
          onClick={() =>
            onChange([
              ...menu,
              { id: `item-${Date.now()}`, name: addLabel, price: 1, soldOut: false },
            ])
          }
        >
          Add one more
        </Button>
      ) : (
        <p className="text-sm font-semibold text-muted-foreground">Six things is a real menu.</p>
      )}
    </div>
  );
}
