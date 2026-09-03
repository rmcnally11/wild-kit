# Lemonade Stand by Wild Kit

This is the product. The website is the door.

**Design. Print. Open the stand.**

Serious work on the first Saturday Job happens here, not in `app/(website)/`. The old web prototype in `app/(jobs)/stand` is the design reference.

## Loop

1. **Setup** — Grown-up first. Then first name only.
2. **Invent** — Name, field, prices. Three templates, not a blank canvas.
3. **Print** — Grown-up runs the printer. The poster is the product.
4. **Open** — Tap what they bought. Then leave the phone.

Parent desk stays a grown-up room. No ads. No kid inbox.

## Run it

```bash
cd apps/lemonade
npm install
npx expo start
```

- iPhone: Expo Go, or `npx expo start --ios` on a Mac
- This Linux box can run Metro and the web preview (`npx expo start --web`). It cannot archive for the App Store.

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

Do not rewrite those lines. Enrollment steps: [`docs/APPLE_DEVELOPER_LLC.md`](../../docs/APPLE_DEVELOPER_LLC.md).

## Next (in this folder)

- Real poster / menu / price-card PDFs (`expo-print` + share sheet)
- Logo mark from the three templates
- Mix the pitcher
- Crew first names
- TestFlight via EAS once the LLC account is live

Do not add a second Saturday Job here. Next listing gets its own `apps/<job>/`.
