# My Stand

A lemonade-stand kit for a ten-year-old, with a parent door for the grown-up stuff.

Kids ring up cups, flip the menu to the sidewalk, and make a sticker-style logo they can tape to the table. Save the picture to the phone (share sheet on iOS), print a letter-size table sign, or take the file to the shop down the street. Data stays on the phone.

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
| Free | Register, three menu items, logo, table sign |
| $10 this summer | Full menu, share pack |
| $25 lifetime | Same, no season end. No subscription. |

Apple keeps 15–30%. You net about $7 and $17.50. That is fine.

## What we will not do

- Kid Instagram logins
- Last names, emails, or a home address on the kid side
- A branded print-shop deal. We make the picture. They print it wherever.
- Selling this next to On This Water. Different company.

## Run it

```bash
npm install
npm run dev
```

[http://localhost:43143](http://localhost:43143)

## Stack

Next.js, TypeScript, Tailwind, shadcn/ui. Local storage only.
