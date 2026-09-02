"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { peekStand, useStand } from "@/lib/stand-store";

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

  useEffect(() => {
    if (!peekStand().setupDone && pathname !== "/setup") {
      router.replace("/setup");
    }
  }, [stand.setupDone, pathname, router]);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 pb-16 pt-5">
      <header className="mb-5 flex items-center justify-between gap-3">
        <div>
          <Link href="/" className="text-sm font-semibold text-accent">
            {eyebrow || "Family Time"}
          </Link>
          <h1 className="font-display text-2xl leading-none">
            {title || stand.kidName || "This Saturday"}
          </h1>
        </div>
        <Link
          href="/stand/parent"
          className="rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold"
        >
          Parents
        </Link>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
