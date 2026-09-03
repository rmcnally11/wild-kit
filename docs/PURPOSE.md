# The website — what it is for

**Kids invent it. Parents print it. Saturday happens.**

Most family apps keep the Saturday on the phone. We print the one missing piece and send everybody outside.

This site is the studio door. It is not the kits.

## What the site does

1. **Say the job in one breath.** Invent → Print → Open. This / not this. Rascal. The first listing.
2. **Hand a parent a Saturday.** `/saturday` is the sheet you fill together first. If the sheet is empty, do not open an app and wander.
3. **Sell the print pack.** Grown-up pays on `/pay`. Print pack $9. Wild Kit Family $4.99 / mo or $29 / yr. Stripe. No Venmo. No kid payments.
4. **Show the shelf.** `/apps` and `/kits/[id]` are store briefs and Saturday briefs. Not playable apps. The badge goes up when the App Store listing is real.
5. **Keep the legal line.** Parent-owned account. First name only. No kid inbox. Lifestyle 4+. Not Kids Category unless we enter it on purpose.

## What the site is not

- A chore chart
- A lemonade game
- A payments app
- Babysitter TV
- A place to “try the kit in the browser”

The playable Saturday Jobs used to live on this same Next.js app (`/stand`, `/bake`, `/wash`, `/fort`). They are redirected to briefs on purpose. That leftover prototype now sits in `app/(jobs)/` so it cannot be mistaken for the live site. Serious app work happens in `apps/`.

## Pages that belong on the website

| Path | Job |
| --- | --- |
| `/` | The one-pager |
| `/about` | How to word it. App Store lift. Three mouths. |
| `/apps` | Saturday Jobs shelf. Store listings and briefs. |
| `/kits/[id]` | Saturday brief for that job |
| `/saturday` | This Saturday. Fill the sheet together first. |
| `/parents` | They're already in the cabinets. This gives them a stand. |
| `/pay` | Grown-up pays |
| `/privacy` | Parent-owned account. First name only. |

## How to work on the website

- Edit files under `app/(website)/`, plus shared `components/`, `lib/`, `brand/`.
- Do not add a playable kit to a public route. If you need a driveway loop, add it under `apps/`.
- Do not rewrite the spine lines in `lib/brand.ts` or `brand/`.
- Do not sell this next to Waterdog, Dock Posted, or On This Water. Different company.
- Run the site: `npm run dev` → [http://localhost:43143](http://localhost:43143)

## Why this split exists

The website has to stay a door: short, printable, parent-facing, ready for Apple to look at when they verify Wild Kit Co.

The apps have to become real products: Invent, Print, Open, then leave the phone. That work is too big to keep inside the marketing site.
