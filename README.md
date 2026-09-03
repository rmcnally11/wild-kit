# Wild Kit

Weekend projects for wild little kits.

**Kids invent it. Parents print it. Saturday happens.**

Most family apps keep the Saturday on the phone. We print the one missing piece and send everybody outside.

Wild Kit Co. First listing: **Lemonade Stand by Wild Kit**. Rascal is the face. Always titled `[Job] by Wild Kit`. Site: getwildkit.com.

The poster is the product.

## Two workstreams

This repo is one company and two jobs. Read [`docs/README.md`](docs/README.md) before you edit.

| | Website | Apps |
| --- | --- | --- |
| Purpose | Studio door. Briefs, Saturday sheet, pay. | Saturday Jobs. Real products. |
| Code | `app/(website)/` | `apps/lemonade` first, then the rest of the shelf |
| Ships to | getwildkit.com | App Store |
| How to run | `npm run dev` | `cd apps/lemonade && npx expo start` |
| Guide | [docs/PURPOSE.md](docs/PURPOSE.md) | [docs/APPS.md](docs/APPS.md) |

The live site does not host the kits. Old web prototypes sit in `app/(jobs)/` and redirect to briefs. Put serious app work in `apps/`.

LLC + Apple Developer organization setup: **[docs/APPLE_DEVELOPER_LLC.md](docs/APPLE_DEVELOPER_LLC.md)**.

## On the website

| Path | What it is |
| --- | --- |
| `/pay` | Grown-up pays. Print pack $9. Family $4.99 / $29. Stripe. |
| `/` | The one-pager. Invent → Print → Open. This / not this. First job. |
| `/saturday` | This Saturday. Fill the sheet together first. |
| `/about` | How to word it. App Store lift. Three mouths. The line that matters. |
| `/apps` | Saturday Jobs. Store listings and briefs. App Store — coming. |
| `/parents` | They're already in the cabinets. This gives them a stand. |
| `/privacy` | Parent-owned account. First name only. No kid inbox. |
| `/kits/[id]` | Saturday brief for that job. Not a playable app. |

## This

- A Saturday job you finish
- Kid invents. Parent prints.
- The poster is the product
- No ads. First name only.

## Not this

- A chore chart
- A lemonade game
- A payments app
- Babysitter TV

## First listing

**Lemonade Stand by Wild Kit.** App Store — coming. Lifestyle 4+. Not Kids. The badge goes up when the listing is real. No fake App Store button.

## Saturday Jobs

1. Lemonade Stand
2. Bake Sale
3. Car Wash
4. Blanket Fort
5. Birdhouse
6. Garden Box
7. Neighborhood Newspaper
8. Pet Parade
9. Treasure Map
10. Garage Sale
11. Puppet Theater
12. Backyard Olympics

The list is the job. Briefs are on `/kits`. The apps open in the App Store, not here.

## App Store

Lift-ready. Do not rewrite.

- Name: Lemonade Stand by Wild Kit
- Subtitle: Design. Print. Open the stand.
- Promo: When the house is full of raccoons, make lemonade.
- Category: Lifestyle · not Kids
- Rating: 4+
- Price: Free · print packs extra later
- Developer: Wild Kit
- Legal: Wild Kit Co.

## Money

App free. No ads. Ever. First dollar is the print pack: $9 on `/pay`. Wild Kit Family: $4.99 / mo or $29 / yr. Grown-up pays on Stripe. No Venmo. No kid payments.

## What we will not do

- Kid Instagram, kid email, kid-to-stranger chat
- A chore chart, a lemonade game, a payments app, babysitter TV
- The word “coon.” A trash-can joke for Rascal.
- Selling this next to Waterdog, Dock Posted, or On This Water. Different company.

## Print

Grown-up runs the printer. Poster, menu, price cards. PDF first. Letter or 11×17, fill the sheet.

Copy `.env.example` to `.env.local` for Resend. Do not send Wild Kit mail from another company’s domain.

## Run it

Website:

```bash
npm install
npm run dev
```

[http://localhost:43143](http://localhost:43143)

Lemonade Stand (native):

```bash
cd apps/lemonade
npm install
npx expo start
```

## Stack

Website: Next.js, TypeScript, Tailwind, shadcn/ui. Local storage only. Fredoka display · Nunito body. Cream #FFF6E8, Lemonade #F5C518, Mask Ink #1C1A19.

Apps: Expo / React Native. Same brand. Parent-first. Local-first. See `apps/lemonade`.
