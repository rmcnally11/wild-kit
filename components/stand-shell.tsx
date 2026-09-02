"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { RascalHint } from "@/components/rascal-hint";
import { roomFromPath } from "@/lib/rascal-hints";
import { peekStand, useStand } from "@/lib/stand-store";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/stand", label: "Sell" },
  { href: "/stand/menu", label: "Menu" },
  { href: "/stand/mix", label: "Mix" },
  { href: "/stand/look", label: "Look" },
  { href: "/stand/tell", label: "Tell" },
];

export function StandShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { stand, todayCups } = useStand();
  const room = roomFromPath(pathname);

  useEffect(() => {
    if (!peekStand().setupDone && pathname !== "/setup") {
      router.replace("/setup");
    }
  }, [stand.setupDone, pathname, router]);

  if (pathname === "/stand/customer") {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 pb-28 pt-5 print:max-w-none print:px-0 print:pb-0 print:pt-0">
      <header className="mb-4 flex items-center justify-between gap-3 print:hidden">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/rascal-icon.png" alt="" width={36} height={36} className="size-9 rounded-lg" />
            <span>
              <span className="block text-sm font-semibold text-accent">Wild Kit</span>
              <span className="font-display block text-2xl leading-none">
                {stand.standName || "Lemonade Stand"}
              </span>
            </span>
          </Link>
        </div>
        <Link
          href="/stand/parent"
          className="rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold"
        >
          Parent Desk
        </Link>
      </header>
      {pathname !== "/stand/parent" && room && (
        <RascalHint
          room={room}
          ctx={{
            kidName: stand.kidName,
            standName: stand.standName,
            cups: todayCups,
            soldOut: stand.menu.every((item) => item.soldOut),
            hasRecipe: Boolean(stand.todaysRecipe),
          }}
        />
      )}
      <div className="flex-1">{children}</div>
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur print:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5 gap-1.5">
          {TABS.map((tab) => {
            const active =
              pathname === tab.href ||
              (tab.href === "/stand/mix" && pathname.startsWith("/stand/mix"));
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "tap rounded-2xl py-3 text-center text-sm font-extrabold",
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
