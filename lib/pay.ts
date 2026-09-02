export type PayOfferId = "pack" | "family_month" | "family_year";

export type PayOffer = {
  id: PayOfferId;
  plan: "pack" | "family";
  name: string;
  price: string;
  cadence: string;
  line: string;
  href: string;
  hue: string;
  ink: string;
};

export const PAY_OFFERS: PayOffer[] = [
  {
    id: "pack",
    plan: "pack",
    name: "Print Pack",
    price: "$9",
    cadence: "Once",
    line: "Poster, menu, and price cards. PDF first. Grown-up runs the printer.",
    href: "https://buy.stripe.com/bJe6oHdqeb038Mv3R78k800",
    hue: "bg-lemonade",
    ink: "text-ink",
  },
  {
    id: "family_month",
    plan: "family",
    name: "Wild Kit Family",
    price: "$4.99",
    cadence: "A month",
    line: "The house plan. No ads. Parent-owned account. Cancel when the Saturday is done.",
    href: "https://buy.stripe.com/4gMbJ14TIecfd2Lbjz8k801",
    hue: "bg-sky",
    ink: "text-ink",
  },
  {
    id: "family_year",
    plan: "family",
    name: "Wild Kit Family",
    price: "$29",
    cadence: "A year",
    line: "Same house plan. One payment. About two months free.",
    href: "https://buy.stripe.com/cNi7sL1Hwc470fZcnD8k802",
    hue: "bg-coral",
    ink: "text-ink",
  },
];

export const PRINT_PACK = PAY_OFFERS[0];
