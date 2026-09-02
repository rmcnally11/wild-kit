import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto grid max-w-2xl gap-4 px-5 py-10">
      <p className="text-sm font-extrabold text-accent uppercase">Family Time</p>
      <h1 className="font-display text-4xl">Privacy</h1>
      <p>
        Family Time is a house of Saturday kits for kids with a parent nearby. My Stand and
        Living Room Camp are two of those kits. It is not a social network.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>We ask kids for a first name, and a stand name if they open the lemonade kit. That stays on this device.</li>
        <li>We do not ask kids for an email, a birthday, or a home address.</li>
        <li>A parent may add their own email and a zip so we can email a poster file and suggest a print shop. Zip is not a street address.</li>
        <li>Sales, the menu, the logo, the poster, and the camp log live in the phone&apos;s local storage. Shop lookup uses the zip only.</li>
        <li>Sharing uses the parent&apos;s own Messages, Mail, or share sheet. We do not post for you.</li>
        <li>When this is on the App Store, $10 and $25 will go through Apple. We will not sell kid data.</li>
      </ul>
      <p className="text-sm text-muted-foreground">Last updated September 2, 2026.</p>
      <Link href="/" className="font-extrabold">
        Back to Family Time
      </Link>
    </article>
  );
}
