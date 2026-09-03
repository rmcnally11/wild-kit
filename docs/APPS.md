# The apps — Saturday Jobs

Always titled **`[Job] by Wild Kit`**.

The kits live in the App Store. This repo’s `apps/` folder is where we build them.

## The series

| # | Listing | Season | Status |
| --- | --- | --- | --- |
| 1 | Lemonade Stand by Wild Kit | Apr–Aug | First listing. Serious work starts here. |
| 2 | Bake Sale by Wild Kit | Sep–Nov | Brief only |
| 3 | Car Wash by Wild Kit | Spring / warm | Brief only |
| 4 | Blanket Fort by Wild Kit | Rain day | Brief only |
| 5 | Birdhouse by Wild Kit | Spring | Brief only |
| 6 | Garden Box by Wild Kit | Mar–Apr | Brief only |
| 7 | Neighborhood Newspaper by Wild Kit | Anytime | Brief only |
| 8 | Pet Parade by Wild Kit | Weekend | Brief only |
| 9 | Treasure Map by Wild Kit | Anytime | Brief only |
| 10 | Garage Sale by Wild Kit | Sat morning | Brief only |
| 11 | Puppet Theater by Wild Kit | Indoor | Brief only |
| 12 | Backyard Olympics by Wild Kit | Summer | Brief only |

Briefs stay on the website (`/kits/[id]`). Apps open in the App Store.

## One loop. Every job.

1. **Invent** — Kid designs the name, the mark, the menu, the prices. Three templates, not a blank canvas.
2. **Print** — Grown-up runs the printer. Poster, menu, price cards. PDF first.
3. **Open** — Tape it to the table. Then leave the phone.

The poster is the product. The app is the missing piece that gets everybody outside.

## First listing (do not rewrite)

- **Name:** Lemonade Stand by Wild Kit
- **Subtitle:** Design. Print. Open the stand.
- **Promo:** When the house is full of raccoons, make lemonade.
- **Category:** Lifestyle · not Kids
- **Rating:** 4+
- **Price:** Free · print packs extra later
- **Developer:** Wild Kit
- **Legal / seller:** Wild Kit Co. (the LLC’s exact legal name)
- **Bundle ID:** `com.wildkit.lemonade`

No fake App Store button on the site until this listing is real.

## Where the code lives

```
apps/
  lemonade/          ← THE product. Put serious work here.
    README.md
    app/             Expo Router screens (Invent / Print / Open)
    src/             brand, store, types
app/(jobs)/          ← old web prototype. Reference only. Redirected on the live site.
  stand/             Lemonade Stand web loop
  bake/ wash/ fort/  thinner web sketches
```

`apps/lemonade` is an Expo (React Native) app so it can ship on the App Store under the LLC account. The old `/stand` web loop is the design reference: till, menu, mix, look, poster, cards, parent desk, grown-up-first setup.

Do not rebuild the kits inside `app/(website)/`.

## How we will ship a series (not a mega-app)

Each Saturday Job is its own App Store listing. Same developer. Same face. Same loop. Different driveway artifact.

| Piece | Shared later | Per job |
| --- | --- | --- |
| Brand, Rascal, parent-first setup | `packages/brand` when a second app starts | — |
| Invent / Print / Open shell | a future `packages/job-engine` | copy, pack list, print layouts |
| Bundle ID | `com.wildkit.*` | `lemonade`, `bake`, `wash`, … |
| Listing title | `by Wild Kit` | the job name |

Do not extract shared packages until the second job is real. One excellent lemonade stand first.

## Rules the apps must keep

- Grown-up first. Then you invent it.
- First name only. No kid inbox.
- Parent owns the account.
- No ads. Ever.
- No kid Instagram, kid email, kid-to-stranger chat.
- No chore chart. No lemonade *game*. No payments app. No babysitter TV.
- Never the word “coon.” Never a trash-can joke for Rascal.
- Lifestyle, 4+. Not Kids Category unless we enter it on purpose.

Money: app is free. First dollar is the print pack on the website. In-app print packs come after the LLC is on App Store Connect and the Paid Apps Agreement is signed. See [APPLE_DEVELOPER_LLC.md](./APPLE_DEVELOPER_LLC.md).

## How to work on Lemonade Stand

```bash
cd apps/lemonade
npm install
npx expo start
```

Then open iOS Simulator from the Expo menu, or scan the QR code with Expo Go. A Mac with Xcode is required to archive for TestFlight and the App Store.

Read `apps/lemonade/README.md` before editing screens.
