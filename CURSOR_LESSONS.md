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
