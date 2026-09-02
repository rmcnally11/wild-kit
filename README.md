# Family Time

Saturday kits for a family. Kids projects backed by the house, the driveway, and the kitchen. Not a game.

The house is **Family Time**. Each kit is a branch you can launch on a Saturday, a Sunday, or a rainy day. Two are open on the phone today. The rest are written as real Saturdays — the list is the kit until the buttons land.

## Open now

| Kit | When | What it is |
| --- | --- | --- |
| **My Stand** | Outside Saturday | Lemonade table. Register, menu, mix, logo, yard poster that prints full-sheet. |
| **Living Room Camp** | Rainy day | Pack a bag from the house, walk a four-stop trail, write the log, lights out. |

## The rest of the shelf

Each one is a Saturday you can do from the brief on the kit page.

1. **Saturday Kitchen** — the kid runs one meal
2. **Driveway Wash** — cars, bikes, or the dog
3. **Yard Sale** — tags, a cash box, a sold pile
4. **Block Paper** — one page, fridge circulation
5. **Window Farm** — a pot, a seed, water days
6. **Card Route** — five cards, walked to real people
7. **Bike Shop** — air, chain, bell
8. **Showtime** — living room tickets and a set list
9. **Rock Shop** — painted rocks on the stoop
10. **Repair Bench** — one broken thing
11. **Cocoa Hut** — winter sister of the stand
12. **Paper Derby** — hallway heats, paper trophy
13. **Porch Library** — a basket of books and an index card

## App Store

One Family Time app. Kits are branches, not fifteen separate downloads. Apple will still want:

- An Apple Developer account ($99/year)
- In-app purchases for $10 / $25 — you cannot Venmo around the store
- This privacy page
- A parental gate before Mail or Messages
- **Not** the Kids Category if you use a share sheet. Use 9+ Education or Business.

This repo is the product. It runs as a phone web app today (Add to Home Screen). Putting the same thing on the App Store is an Expo / EAS wrap plus StoreKit after you have the developer account — not a second invention.

## Pricing

| | |
| --- | --- |
| Free | The shelf, My Stand (register, three items, logo, poster, recipes), Living Room Camp |
| $10 this season | Full menu, share pack, later kits as they open |
| $25 the house | Same, no season end. No subscription. |

Apple keeps 15–30%. You net about $7 and $17.50. That is fine.

## What we will not do

- Kid Instagram logins
- Last names, emails, or a home address on the kid side
- A branded print-shop deal
- Selling this next to On This Water. Different company.

## Poster print (My Stand)

Mom or Dad enter an email and a zip on setup or the Parents page. The kid designs the yard poster — letter (8½ × 11) for the home printer, or 11 × 17 for the shop. **Let's get this printed** saves a full-sheet 300 dpi PNG.

Copy `.env.example` to `.env.local` to turn on real sending. Do not send Family Time mail from another company's domain.

## Run it

```bash
npm install
npm run dev
```

[http://localhost:43143](http://localhost:43143)

## Stack

Next.js, TypeScript, Tailwind, shadcn/ui. Local storage only.
