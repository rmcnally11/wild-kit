# My Stand

A lemonade-stand kit for a ten-year-old, with a parent door for the grown-up stuff.

Kids ring up cups, flip the menu to the sidewalk, and make a sticker-style logo they can tape to the table. They also design a handmade yard poster. Mix is the Saturday kitchen: six simple lemonade recipes the kid and a grown-up make together, then put on the menu. Mom or Dad starts the account with an email and a zip. Let's get this printed emails the file (when a Resend key is set) or opens a mail draft, and suggests a copy shop near that zip. Data stays on the phone.

## Why this is a real App Store app

It is a register, not a lemonade tycoon game. Apple will still want:

- An Apple Developer account ($99/year)
- In-app purchases for $10 / $25 — you cannot Venmo around the store
- This privacy page
- A parental gate before Mail or Messages
- **Not** the Kids Category if you use a share sheet. Use 9+ Education or Business.

This repo is the product. It runs as a phone web app today (Add to Home Screen). Putting the same thing on the App Store is an Expo / EAS wrap plus StoreKit after you have the developer account — not a second invention.

## Pricing

| | |
| --- | --- |
| Free | Register, three menu items, logo, yard poster, recipes |
| $10 this summer | Full menu, share pack |
| $25 lifetime | Same, no season end. No subscription. |

Apple keeps 15–30%. You net about $7 and $17.50. That is fine.

## What we will not do

- Kid Instagram logins
- Last names, emails, or a home address on the kid side
- A branded print-shop deal. We make the picture. They print it wherever.
- Selling this next to On This Water. Different company.

## Poster print

Mom or Dad enter an email and a zip on setup or the Parents page. The kid designs the yard poster — letter (8½ × 11) for the home printer, or 11 × 17 for the shop. **Let's get this printed** saves a full-sheet 300 dpi PNG and either:

- emails it, if `RESEND_API_KEY` and `RESEND_FROM` are set, or
- opens a mail draft and suggests Staples, the UPS Store, or a copy shop near that zip.

Copy `.env.example` to `.env.local` to turn on real sending. Do not send My Stand mail from another company's domain.

## Run it

```bash
npm install
npm run dev
```

[http://localhost:43143](http://localhost:43143)

## Stack

Next.js, TypeScript, Tailwind, shadcn/ui. Local storage only.
