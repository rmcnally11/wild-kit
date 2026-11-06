# Cursor lessons

## 2026-10-31 — Unknown kit slugs were HTTP 200

`/kits/[id]` is a dynamic segment. `dynamicParams` defaults to true, so every string is a route. `notFound()` painted "Wrong corner." and the document was still HTTP 200, with `x-nextjs-prerender: 1`. Next commits the status when the shell starts streaming, and a later `notFound()` cannot change it.

A real 404 needs both of these, before any render:

- `export const dynamicParams = false`
- `generateStaticParams` returns only the public slugs

Checked with `next start` after a clean build: `/kits/lemonade` 200, `/kits/bake-sale` 404, `/kits/xyz` 404.

A long-lived `next dev` is the wrong check after this change. It kept `x-nextjs-cache: HIT` prerenders for slugs that used to be generated (`/kits/fort`, `/kits/wash`) as HTTP 200. Slugs that had never been generated (`bake-sale`, `xyz`) became 404 on the same server. Confirm status on a fresh production server.

The Bake Sale kit id is `bake`. `/kits/bake` is already a 307 to `/kits/lemonade` in `next.config.ts`, so it never showed the bake brief. The soft 200 was `/kits/bake-sale`. That slug stays off the list while `JOB_TWO_PUBLIC` is false. Do not flip the flag.

`kitIsPublic` treats a missing `public` field as public, so fort, wash, and the rest of the studio list were live 200 briefs. The route list is `publicKitSlugs` in `lib/kit-routes.ts`, not `publicKits()`.

The old non-public branch rendered a 200 "One job" screen. Replacing that branch with `notFound()` is the fix. Print components, Rascal hints, and locked copy stay put.

`/fort`, `/wash`, and `/camp` still redirect onto `/kits/fort` and `/kits/wash`, which now 404. Those redirects were left as they were.

Node's type strip can import `./brand.ts`. Next's typecheck reports TS5097 on that extension unless `allowImportingTsExtensions` is on. `**/*.test.ts` is excluded from `tsconfig.json` so `npm test` and `npm run build` both pass.

## 2026-11-01 — Unpublished kit aliases must not 404

`/fort`, `/wash`, `/camp`, and `/kits/camp` were redirects in `next.config.ts` onto `/kits/fort` and `/kits/wash`. Those briefs 404 while only lemonade is public. The aliases now go to `/kits/lemonade`, same as `/bake`. The list lives in `lib/redirects.ts`. `lib/redirects.test.ts` fails if a redirect destination is not a public kit, `/apps`, or `/parents`.

`app/fort/page.tsx` and `app/wash/page.tsx` still build. The redirect runs first, so those screens are not the public URL. Do not point the aliases back at unpublished slugs, and do not remove the redirect just to expose the old screens.

Check the status on a fresh `next start`. A long-lived `next dev` can keep old prerenders.

## 2026-11-01 — Cream type fails on leaf and raspberry

`#FFF6E8` on leaf `#3BAF6A` is about 2.6:1. On raspberry `#E85D75` it is about 3.1:1. Ink `#1C1A19` passes (about 6.2:1 and 5.2:1). `HUES.leaf.ink`, `HUES.raspberry.ink`, `STEPS`, and `NEXT_BEATS` use ink on those fields. Faded ink (`opacity-80`, `text-ink/55`) can drop under 4.5:1 on yellow, pink, or green. `lib/field-contrast.test.ts` locks the tokens.

## 2026-11-01 — Dead X link, and which audit fixes to skip

`https://x.com/getwildkit` showed "This account doesn't exist" on 2026-11-01. `HANDLE` stays in `lib/brand.ts`. The footer does not link it until the account is real.

`npm audit fix` without `--force` cleared the critical and high advisories. Next.js 16.3.4 → 16.4.3 is the security line: the SVG image-optimization fix starts at 16.4.1, not a 16.3 patch. What remains needs a major (`eslint` 4, and `shadcn` 1.0.0 for `deepmerge`). Do not `--force` those. A Next.js security release was scheduled for 2026-11-03. Check it on the next sweep.

## 2026-11-02 — Stand map text is inside a compressed stream

The arrow-sign PDF has no generator in the repo. ReportLab stores the words in an ASCII85 + Flate stream. A raw read of `stand-map-letter.pdf` finds `Saturday` in the title and misses `stand map`, `Our stand`, and the landmark blanks. The check has to read each `/Length`, skip the image stream, decode ASCII85, and inflate. Splitting the file on `stream` breaks, because those bytes also appear inside the image.

`/fort`, `/wash`, and `/camp` still 307 to `/kits/fort` and `/kits/wash` on www.getwildkit.com and on this preview. Those kit pages 404. Leave them for PR #16.

Preview hosts are behind Vercel authentication. A plain curl gets 302 to `vercel.com/sso-api`. The sweep needs a cookie from a short-lived share link on that deployment. The branch alias does not accept the deployment host's cookie.

Chrome `--screenshot` writes the file and does not exit. A lazy `next/image` paints as an empty cream box until `naturalWidth` is set. Wait for that before calling the preview loaded.

## 2026-11-04 — Cup tally text is in the same compressed stream

The cup tally sheet is ReportLab, same as the stand map. `Count your cups` is in the title dictionary. `Color one lemon for each cup sold.` and `Cups sold today` are in the ASCII85 + Flate stream. Inflate that stream. The Rascal image has a soft-mask stream too. `/Length` on the image dictionary is not the last key, so a walker that looks for `/Length N >> stream` skips the picture and still reads the words.

Words on the Leaf banner are ink. Cream on `#3BAF6A` is about 2.6:1.

`/fort`, `/wash`, and `/camp` are 307 to `/kits/lemonade` on www.getwildkit.com and on this preview. `/kits/fort` and `/kits/wash` stay 404. The 2026-11-02 note described the preview from before that alias change. Do not point the aliases back at those briefs.

A new commit gets a new deployment host. The share cookie from the previous host does not open it. Mint the share link on the host you sweep. Wait for every print image's `naturalWidth`, including the one above the new sheet. That one still paints as an empty cream box until it loads.
