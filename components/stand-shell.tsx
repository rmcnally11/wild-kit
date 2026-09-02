"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { useStand } from "@/lib/stand-store";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "Sell" },
  { href: "/menu", label: "Menu" },
  { href: "/look", label: "Look" },
  { href: "/tell", label: "Tell" },
];

export function StandShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { stand, ready } = useStand();

  useEffect(() => {
    if (!ready) return;
    if (!stand.setupDone && pathname !== "/setup") {
      router.replace("/setup");
    }
  }, [ready, stand.setupDone, pathname, router]);

  if (!ready) {
    return (
      <div className="grid min-h-dvh place-items-center text-lg text-muted-foreground">
        Opening the stand…
      </div>
    );
  }

  if (pathname === "/setup") {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 pb-28 pt-5">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-accent">My Stand</p>
          <h1 className="font-display text-2xl leading-none">
            {stand.standName || "Your stand"}
          </h1>
        </div>
        <Link
          href="/parent"
          className="rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold"
        >
          Parents
        </Link>
      </header>
      <div className="flex-1">{children}</div>
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur">
        <div className="mx-auto grid max-w-lg grid-cols-4 gap-2">
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "tap rounded-2xl py-3 text-center text-base font-extrabold",
                  active ? "bg-primary text-primary-foreground" : "bg-secondary",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
