import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto grid max-w-2xl gap-4 px-5 py-10">
      <p className="text-sm font-extrabold text-accent uppercase">My Stand</p>
      <h1 className="font-display text-4xl">Privacy</h1>
      <p>
        My Stand is a lemonade-stand kit. It is meant for kids with a parent nearby. It is not
        a social network.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>We ask for a first name and a stand name. That stays on this device.</li>
        <li>We do not ask kids for an email, a birthday, or a home address.</li>
        <li>Sales, the menu, and the logo live in the phone&apos;s local storage. Not on our servers.</li>
        <li>Sharing uses the parent&apos;s own Messages, Mail, or share sheet. We do not post for you.</li>
        <li>FedEx Office is a separate company. A parent opens their print site if they want a poster.</li>
        <li>When this is on the App Store, $10 and $25 will go through Apple. We will not sell kid data.</li>
      </ul>
      <p className="text-sm text-muted-foreground">Last updated September 2, 2026.</p>
      <Link href="/" className="font-extrabold">
        Back to the stand
      </Link>
    </article>
  );
}
