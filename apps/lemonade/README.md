# Lemonade Stand by Wild Kit

This is the product. getwildkit.com is the listing and the brief. Grown-up pays in the App Store.

**Design. Print. Open the stand.**

Serious work on the first Saturday Job happens here. The old web prototype in `app/stand` is the design reference.

## Loop

1. **Setup** — Grown-up first. Birth year 18+. Parent email. Then first name only.
2. **Invent** — Name, field, menu, one pitcher, pack from the house, crew.
3. **Print** — Draw the poster like a paint board. Stickers. Print on 14×22, 22×28, or 28×44 poster board — or letter at home.
4. **Open** — Tap what they bought. Then leave the phone.

Parent desk stays a grown-up room. Pay and the Saturday sheet live on getwildkit.com. No ads. No kid inbox. No zip.

## Run it

```bash
cd apps/lemonade
npm install
npx expo start
```

- iPhone: Expo Go, or `npx expo start --ios` on a Mac
- Web preview: `npm run web` (port 43147)
- This Linux box can run Metro and the web preview. It cannot archive for the App Store.

## App Store lock

| Field | Value |
| --- | --- |
| Name | Lemonade Stand by Wild Kit |
| Subtitle | Design. Print. Open the stand. |
| Promo | When the house is full of raccoons, make lemonade. |
| Bundle ID | `com.wildkit.lemonade` |
| Category | Lifestyle · not Kids |
| Rating | 4+ |
| Developer | Wild Kit |
| Seller | the LLC legal name |

Do not rewrite those lines. Locked mouth lives in `src/brand.ts` and must match the website. Enrollment: [`docs/APPLE_DEVELOPER_LLC.md`](../../docs/APPLE_DEVELOPER_LLC.md).

## Not yet

- TestFlight via EAS once the LLC account is live
- A second Saturday Job. Next listing gets its own `apps/<job>/`.
