# Wild Kit

Weekend projects for wild little kits.

**Kids invent it. Parents make it real. Saturday happens.**

Most family apps keep the Saturday on the phone. We hand you the missing piece and send everybody outside.

Wild Kit Co. First listing: **Lemonade Stand by Wild Kit**. Rascal is the face. Always titled `[Job] by Wild Kit`. Site we want: getwildkit.com.

The poster is the product.

## On this site

| Path | What it is |
| --- | --- |
| `/pay` | Grown-up pays. Print pack $9. Family $4.99 / $29. Stripe. |
| `/` | The door. Rascal, the poster, the app. Highlights. What's next. |
| `/apps` | First listing: Lemonade Stand by Wild Kit. App Store — coming. |
| `/saturday` | What's next. The app now. Bake Sale after one opened stand. |
| `/about` | What it is. How Saturday works. Rascal. The privacy line. |
| `/parents` | Grown-up account. Pay. Privacy. |
| `/privacy` | Parent-owned account. First name only. No kid inbox. |
| `/kits/[id]` | Saturday brief for that job. Not a playable app. |

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

The live site does not host the kits. It is the studio door: the app, the Saturday brief, pay, and (later) the App Store badge. Inventing happens in the app.

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

## The app

Lemonade Stand lives in `apps/lemonade`. That is the product. This folder is the studio door.

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
