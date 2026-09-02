import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto grid max-w-2xl gap-4 px-5 py-10">
      <p className="text-sm font-extrabold text-accent uppercase">Wild Kit Co.</p>
      <h1 className="font-display text-4xl">Privacy</h1>
      <p>
        Parent is the account holder. Kids invent the project. We treat this as if it were in
        Apple&apos;s Kids Category even though the listing is 4+ Lifestyle.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>We ask kids for a first name, and a stand name if they open Lemonade Stand. That stays on this device.</li>
        <li>We do not ask kids for an email, a birthday, or a home address.</li>
        <li>A parent may add their own email and a zip so a poster file can go to a printer. Zip is not a street address.</li>
        <li>Sales, the menu, the logo, the poster, and the fort log live in the phone&apos;s local storage. Shop lookup uses the zip only.</li>
        <li>Sharing uses the parent&apos;s own Messages, Mail, or share sheet. We do not post for you.</li>
        <li>No ads. No kid data sold. Ever. Print and Parent Desk are gated.</li>
      </ul>
      <p className="text-sm text-muted-foreground">Last updated September 2, 2026.</p>
      <Link href="/" className="font-extrabold">
        Back to Wild Kit
      </Link>
    </article>
  );
}
