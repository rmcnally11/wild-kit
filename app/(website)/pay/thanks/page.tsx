import type { Metadata } from "next";

import { PayThanks } from "@/components/pay-thanks";
import { SiteChrome } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "You paid",
  description: "Grown-up ran the card. The poster is the product.",
};

export default async function PayThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  return (
    <SiteChrome>
      <main className="bg-leaf text-cream">
        <PayThanks plan={plan === "family" ? "family" : "pack"} />
      </main>
    </SiteChrome>
  );
}
