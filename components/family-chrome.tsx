"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { RascalHint } from "@/components/rascal-hint";
import { kitById } from "@/lib/kits";
import { roomFromPath } from "@/lib/rascal-hints";
import { peekStand, useStand } from "@/lib/stand-store";
import { isClosedToday } from "@/lib/today";

export function FamilyChrome({
  children,
  eyebrow,
  title,
}: {
  children: ReactNode;
  eyebrow?: string;
  title?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { stand } = useStand();

  const room = roomFromPath(pathname);

  useEffect(() => {
    if (!peekStand().setupDone && pathname !== "/setup") {
      router.replace("/setup");
    }
  }, [stand.setupDone, pathname, router]);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 pb-16 pt-5">
      <header className="mb-5 flex items-center justify-between gap-3">
        <Link href="/app" className="flex items-center gap-2">
          <Image src="/rascal-icon.png" alt="" width={40} height={40} className="size-10 rounded-xl" />
          <div>
            <p className="text-sm font-semibold text-accent">{eyebrow || "Wild Kit"}</p>
            <h1 className="font-display text-2xl leading-none">
              {title || stand.kidName || "Saturday Jobs"}
            </h1>
          </div>
        </Link>
        <Link
          href="/stand/parent"
          className="rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold"
        >
          Parent Desk
        </Link>
      </header>
      {room && (
        <RascalHint
          room={room}
          ctx={{
            kidName: stand.kidName,
            standName: stand.standName,
            packed:
              pathname === "/bake"
                ? stand.bake?.packed.length
                : pathname === "/wash"
                  ? stand.wash?.packed.length
                  : stand.camp?.packed.length,
            trail: stand.camp?.trail.length,
            lightsOut: stand.camp?.lightsOut,
            kitOpen: kitById(pathname.split("/")[2] || "")?.status === "open",
            closed:
              pathname === "/bake"
                ? isClosedToday(stand.bake?.closedAt)
                : pathname === "/wash"
                  ? isClosedToday(stand.wash?.closedAt)
                  : isClosedToday(stand.closedAt),
          }}
        />
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}
