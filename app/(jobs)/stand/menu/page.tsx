"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { money, useStand } from "@/lib/stand-store";
import { MENU_CAP } from "@/lib/types";

function snapPrice(value: number) {
  return Math.round(value * 4) / 4;
}

export default function MenuPage() {
  const { stand, addItem, updateItem, removeItem } = useStand();
  const canAdd = stand.menu.length < MENU_CAP;

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-3xl">The menu</h2>
        <Button asChild className="rounded-full font-extrabold">
          <Link href="/stand/customer">Flip to customers</Link>
        </Button>
      </div>
      <p className="text-muted-foreground">
        Change names and prices. Flip the phone around when someone walks up. Want it to taste
        like a secret? Open Mix.
      </p>
      <Button asChild variant="secondary" className="h-12 rounded-2xl font-extrabold">
        <Link href="/stand/mix">Mix a special pitcher</Link>
      </Button>
      <div className="grid gap-3">
        {stand.menu.map((item) => (
          <div key={item.id} className="rounded-3xl bg-card p-4 ring-1 ring-border">
            <Input
              value={item.name}
              onChange={(event) => updateItem(item.id, { name: event.target.value })}
              className="h-12 rounded-2xl text-lg font-bold"
              aria-label="Item name"
            />
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                className="tap grid size-12 place-items-center rounded-2xl bg-secondary text-2xl font-extrabold"
                onClick={() =>
                  updateItem(item.id, { price: Math.max(0, snapPrice(item.price - 0.25)) })
                }
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
                  onChange={(event) =>
                    updateItem(item.id, { price: Number(event.target.value) || 0 })
                  }
                  className="h-12 rounded-2xl text-lg font-bold"
                  aria-label="Price"
                />
              </div>
              <button
                type="button"
                className="tap grid size-12 place-items-center rounded-2xl bg-secondary text-2xl font-extrabold"
                onClick={() =>
                  updateItem(item.id, { price: Math.min(99, snapPrice(item.price + 0.25)) })
                }
                aria-label="Raise price"
              >
                +
              </button>
            </div>
            <p className="mt-2 text-sm font-bold text-muted-foreground">{money(item.price)} a cup</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                type="button"
                variant={item.soldOut ? "default" : "secondary"}
                className="rounded-full font-extrabold"
                onClick={() => updateItem(item.id, { soldOut: !item.soldOut })}
              >
                {item.soldOut ? "Sold out — tap to put back" : "On the menu"}
              </Button>
              {stand.menu.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {canAdd ? (
        <Button type="button" variant="secondary" className="h-14 rounded-2xl font-extrabold" onClick={addItem}>
          Add a drink or snack
        </Button>
      ) : (
        <p className="rounded-3xl bg-secondary p-4 text-sm font-semibold">
          Six things is a real menu. Sold out flips a card off the table.
        </p>
      )}
    </div>
  );
}
