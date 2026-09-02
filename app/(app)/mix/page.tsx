"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { RECIPES } from "@/lib/recipes";
import { money, useStand } from "@/lib/stand-store";

export default function MixPage() {
  const { stand, serveRecipe } = useStand();
  const already = RECIPES.find((recipe) => recipe.name === stand.todaysRecipe);
  const [openId, setOpenId] = useState<string | null>(already?.id ?? "house");
  const [note, setNote] = useState<string | null>(null);

  return (
    <div className="grid gap-4">
      <div>
        <h2 className="font-display text-3xl">Mix a pitcher</h2>
        <p className="mt-1 text-muted-foreground">
          Saturday morning work. Kid juices. Grown-up has the knife. One special pitcher and
          the block can taste it.
        </p>
      </div>

      {stand.todaysRecipe && (
        <p className="rounded-[1.6rem] bg-primary px-5 py-4 font-extrabold">
          Today&apos;s pitcher: {stand.todaysRecipe}
        </p>
      )}

      {note && <p className="rounded-3xl bg-secondary p-4 text-sm font-semibold">{note}</p>}

      <div className="grid gap-3">
        {RECIPES.map((recipe) => {
          const open = openId === recipe.id;
          const today = stand.todaysRecipe === recipe.name;
          return (
            <article key={recipe.id} className="rounded-[1.8rem] bg-card ring-1 ring-border">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : recipe.id)}
                className="tap w-full px-5 py-4 text-left"
              >
                <p className="text-xs font-extrabold tracking-wide text-accent uppercase">
                  {recipe.tag}
                </p>
                <p className="font-display text-3xl leading-none">{recipe.name}</p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">{recipe.why}</p>
              </button>
              {open && (
                <div className="grid gap-3 border-t border-border px-5 py-4">
                  <p className="text-sm font-bold">
                    {recipe.makes} · {recipe.time} · {money(recipe.price)} a cup
                  </p>
                  <p>
                    <span className="font-extrabold">Kid: </span>
                    {recipe.kid}
                  </p>
                  <p>
                    <span className="font-extrabold">Grown-up: </span>
                    {recipe.grownup}
                  </p>
                  <div>
                    <p className="text-sm font-extrabold uppercase">What you need</p>
                    <ul className="mt-1 list-disc pl-5">
                      {recipe.stuff.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-extrabold uppercase">How</p>
                    <ol className="mt-1 list-decimal space-y-1 pl-5">
                      {recipe.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <p className="rounded-2xl bg-secondary p-3 text-sm font-semibold">
                    {recipe.secret}
                  </p>
                  <Button
                    className="h-14 rounded-2xl text-base font-extrabold"
                    onClick={() => {
                      const result = serveRecipe(recipe.name, recipe.price);
                      if (result === "locked") {
                        setNote(
                          "Free stands get three menu items. Put this on after a parent unlocks, or swap one off the menu first.",
                        );
                        return;
                      }
                      setNote(
                        result === "on"
                          ? `${recipe.name} is today's pitcher. It is already on the menu.`
                          : `${recipe.name} is on the menu. Go sell it.`,
                      );
                    }}
                  >
                    {today ? "This is today's pitcher" : "Put it on the menu"}
                  </Button>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
