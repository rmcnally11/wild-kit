# Wild Kit

Weekend projects for wild little kits.

**Kids invent it. Parents make it real. Saturday happens.**

Most family apps keep the Saturday on the phone. We hand you the missing piece and send everybody outside.

Wild Kit Co. First listing: **Lemonade Stand by Wild Kit**. Rascal is the face. Always titled `[Job] by Wild Kit`. Site we want: getwildkit.com.

The poster is the product.

## On this site

| Path | What it is |
| --- | --- |
| `/` | Picture of the Saturday. This Saturday. Tell me when it's on the store. |
| `/apps` | First listing: Lemonade Stand by Wild Kit. App Store — coming. |
| `/about` | Who this is. Rascal. The privacy line. |
| `/parents` | Grown-up account. Privacy. This / not this. |
| `/privacy` | Parent-owned account. First name only. No kid inbox. |
| `/kits/[id]` | Saturday brief. Print this Saturday. Not a playable app. |
| `/pay` | Grown-up pays in the App Store. Not here. |

## This

- A Saturday job you finish
- Kid invents. Parent makes it real.
- The poster is the product
- No ads. First name only.

## Not this

- A chore chart
- A lemonade game
- A payments app
- Babysitter TV

## First listing

**Lemonade Stand by Wild Kit.** App Store — coming. Lifestyle 4+. Not Kids. The badge goes up when the listing is real. No fake App Store button.

The live site does not host the kits. Inventing happens in the app. Until the badge is real, this Saturday's brief is the job. Drop a real photo at `public/saturday.jpg` and it becomes the homepage.

## Saturday Jobs

One job until one stand has opened: **Lemonade Stand by Wild Kit**.

The rest of the shelf waits. Bake Sale stays in the drawer until a driveway photo exists. Do not put Job 2 on a public page early.

Studio list (not live): Car Wash, Blanket Fort, Birdhouse, Garden Box, Neighborhood Newspaper, Pet Parade, Treasure Map, Garage Sale, Puppet Theater, Backyard Olympics.

The lemonade brief is on `/kits/lemonade`. The apps open in the App Store, not here.

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

App free. No ads. Ever. Grown-up pays in the App Store. Not on this website. No Venmo. No kid payments.

## What we will not do

- Kid Instagram, kid email, kid-to-stranger chat
- A chore chart, a lemonade game, a payments app, babysitter TV
- The word “coon.” A trash-can joke for Rascal.
- Selling this next to Waterdog, Dock Posted, or On This Water. Different company.

## Print

Letter 8½ × 11 at home is the first-Saturday path. Grown-up runs the printer. Poster board (14×22, 22×28, 28×44) and 11×17 are extra if you want the yard. PDF first. Fill the sheet.

After you opened: one driveway photo. Grown-up. The stand, the table, the sign. No kid face. That photo is App Store fuel and the lock on Job 2.

Copy `.env.example` to `.env.local` for Resend. Do not send Wild Kit mail from another company’s domain.

## The app

Lemonade Stand lives in `apps/lemonade`. That is the product. This folder is getwildkit.com.

```bash
cd apps/lemonade
npm install
npx expo start
```

Web preview: `npm run web` on port 43147. A Mac archives for TestFlight. See `apps/lemonade/README.md`.

## Run the site

```bash
npm install
npm run dev
```

[http://localhost:43143](http://localhost:43143)

## Stack

Site: Next.js, TypeScript, Tailwind, shadcn/ui. App: Expo. Fredoka display · Nunito body. Cream #FFF6E8, Lemonade #F5C518, Mask Ink #1C1A19.
