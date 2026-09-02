import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";
import { FIRST_NAME_ONLY, LEGAL, LEGAL_LINE, LEGAL_RULES, PARENT_OWNED } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy",
  description: `${PARENT_OWNED}. ${FIRST_NAME_ONLY}`,
};

export default function PrivacyPage() {
  return (
    <SiteChrome>
      <div className="grid h-2 grid-cols-5">
        <span className="bg-lemonade" />
        <span className="bg-raspberry" />
        <span className="bg-leaf" />
        <span className="bg-sky" />
        <span className="bg-coral" />
      </div>
      <article className="mx-auto grid max-w-2xl gap-4 px-5 py-10">
        <p className="text-sm font-extrabold text-leaf uppercase">{LEGAL}</p>
        <h1 className="font-display text-4xl">Privacy</h1>
        <p className="text-lg font-semibold">{LEGAL_LINE}</p>
        <p>
          {PARENT_OWNED}. {FIRST_NAME_ONLY} We treat this as if it were in Apple&apos;s Kids
          Category even though the listing is Lifestyle 4+.
        </p>
        <ul className="grid gap-2">
          {LEGAL_RULES.map((line) => (
            <li key={line} className="rounded-2xl bg-lemonade px-4 py-3 font-semibold">
              {line}
            </li>
          ))}
        </ul>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            We ask kids for a first name, and a stand name if they open Lemonade Stand. That stays
            on this device.
          </li>
          <li>We do not ask kids for an email, a birthday, or a home address.</li>
          <li>
            A parent may add their own email and a zip so a poster file can go to a printer. Zip is
            not a street address.
          </li>
          <li>
            Sales, the menu, the logo, the poster, and the other jobs live in the phone&apos;s local
            storage. Shop lookup uses the zip only.
          </li>
          <li>
            Sharing uses the parent&apos;s own Messages, Mail, or share sheet. We do not post for
            you. No kid Instagram.
          </li>
          <li>No ads. No kid data sold. Ever. Print and Parent Desk are gated.</li>
        </ul>
        <p className="text-sm text-muted-foreground">Last updated September 2, 2026.</p>
        <Link href="/" className="font-extrabold">
          Back to Wild Kit
        </Link>
      </article>
    </SiteChrome>
  );
}
