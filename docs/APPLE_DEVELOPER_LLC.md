# Set up an LLC Apple Developer account

This is the path for **Wild Kit Co.** to appear on the App Store as an organization, not as a person.

Seller on the store will be the LLC’s **exact legal name**.  
Developer name (the public byline under the app) can be set to **Wild Kit** when you create the first app.

Do this as **Organization**. Do not enroll as Individual and hope to “add the company later.” Conversion is possible, but it is slower and Apple will ask for the same documents anyway.

This is operational guidance from Apple’s current enrollment docs. It is not legal or tax advice. File the LLC with a lawyer or formation service if you want that reviewed.

Official sources:

- [Enroll in the Apple Developer Program](https://developer.apple.com/programs/enroll/)
- [Program enrollment requirements](https://developer.apple.com/help/account/membership/program-enrollment)
- [Enroll with the Apple Developer app](https://developer.apple.com/help/account/membership/enrolling-in-the-app)
- [D‑U‑N‑S Number](https://developer.apple.com/help/account/membership/D-U-N-S)
- [D‑U‑N‑S lookup](https://developer.apple.com/enroll/duns-lookup/)
- [Identity verification](https://developer.apple.com/support/identity-verification)
- [Add a new app](https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app)
- [Paid Apps Agreement](https://developer.apple.com/help/app-store-connect/manage-agreements/sign-and-update-agreements)

---

## What you are creating

| Apple field | Wild Kit lock | Notes |
| --- | --- | --- |
| Entity type | Company / Organization (LLC) | Not Individual. Not sole proprietor. |
| Legal entity name | The name on your Articles of Organization | Example you *want*: `Wild Kit Co., LLC`. Must match D‑U‑N‑S, EIN, and bank. Apple does **not** accept a DBA here. |
| Seller on the App Store | That same legal name | Example: `Seller: Wild Kit Co., LLC` |
| Developer name | Wild Kit | Set this when you create the first app record (company accounts get this field). |
| First app | Lemonade Stand by Wild Kit | Lifestyle, 4+, not Kids. |
| Website | https://getwildkit.com | Must be live, real content, domain tied to the company. This site already is the door. |
| Work email | an address on that domain | Example: `hello@getwildkit.com` or `robert@getwildkit.com`. Not a personal Gmail. |
| Account Holder | You, using your **personal legal name** | Owner / founder. You can bind the LLC to contracts. |

If the LLC is not formed yet, do Part 0 first. If it already exists, skip to Part 1 and match every later form to the **filed** name, not the brand name.

---

## Part 0 — Form the LLC (United States)

Do this before you touch Apple. Apple will not enroll “Wild Kit” as a trade name.

1. **Pick the legal name you will show as seller.**  
   Closest to the brand lock *Wild Kit Co.* is **`Wild Kit Co., LLC`**.  
   Check your state’s business-name search so it is available. Some states reject `Co.` or require `Limited Liability Company` spelled out. File whatever the state accepts, then use **that exact string** forever after.

2. **File Articles of Organization** with the Secretary of State in the state where the company will live (usually the state you operate from, unless counsel tells you otherwise).

   You will need:
   - Exact legal name
   - Principal office address (a real street address; **no P.O. box** — Apple and D&B both reject those)
   - Registered agent in that state
   - Organizer / member names

3. **Get an EIN** from the IRS.  
   [IRS EIN online](https://www.irs.gov/ein) (Form SS-4). Instant for most US applicants.  
   Legal name on the EIN must match the Articles.

4. **Write an operating agreement** even if the state does not require one. Apple may later ask who has authority to bind the company. You are the Account Holder; the agreement should make that obvious.

5. **Open a business bank account** in the LLC name. You will need this for App Store proceeds and for the credit card that pays the $99 membership. Use the EIN, Articles, and operating agreement.

6. **Put the company on the internet.**
   - Domain: `getwildkit.com` (already the lock).
   - Website: this repo, live, with real pages. Apple rejects parked pages, “coming soon,” and social-only links.
   - Work email on that domain. Create `hello@getwildkit.com` (or your name) before enrollment. Forward it if you want; the address itself must be `@getwildkit.com`.
   - Optional: a one-line footer on the site with the legal name (`Wild Kit Co., LLC`) so the domain is obviously the company’s. The public brand can stay Wild Kit.

7. **Keep a folder of PDFs** you will upload or email later:
   - Filed Articles of Organization (stamped)
   - EIN confirmation (CP 575 or the IRS issuance page)
   - Operating agreement
   - Government photo ID of the Account Holder (passport or driver’s license)
   - A utility bill or bank statement that matches the headquarters address, if you have one

Apple may ask for **notarized** copies of business registration documents. If they do, take the stamped Articles to a notary and get a “true copy” certification.

---

## Part 1 — Get a D‑U‑N‑S Number

Apple verifies an LLC through Dun & Bradstreet. No D‑U‑N‑S, no organization account.

1. Wait until the LLC exists and has a street address and phone number.
2. Open Apple’s lookup: [developer.apple.com/enroll/duns-lookup](https://developer.apple.com/enroll/duns-lookup/).
3. Enter the **legal entity name** and headquarters address exactly as filed.
4. If a number already exists, write it down. If not, request one through that flow. It is free in most jurisdictions. Paying D&B to “expedite” does **not** shorten Apple’s wait.
5. D&B may call or email to confirm the business. Answer. Have the Articles ready.
6. Allow **up to 5 business days** for D&B to issue the number.
7. Then allow **up to 2 more business days** for that record to reach Apple before you enroll.

The D‑U‑N‑S profile must list the company as a **legal entity** (LLC), not a sole proprietorship and not a DBA. If Apple later says “Your organization is not listed as a legal entity,” email D&B with the filed Articles and ask them to correct the legal status. Then wait two days and try Apple again.

Update rule: if you change address or legal name, email D&B first. Apple reads from D&B. Edits take about two business days to show up at Apple.

---

## Part 2 — Make the Apple Account you will enroll with

Create a **company** Apple Account. Do not enroll with a personal iCloud you use for photos if you can avoid it.

1. Create the mailbox `hello@getwildkit.com` (or the address you chose) and confirm you can receive mail there.
2. Go to [account.apple.com](https://account.apple.com) and create an Apple Account with **that work email**.
3. First name and last name = **your legal name**. Not “Rascal.” Not “Wild Kit.” A nickname delays identity review.
4. Turn on **two-factor authentication**. Add a trusted phone number you will have during enrollment.
5. Sign in to iCloud on the iPhone, iPad, or Mac you will use for the Apple Developer app.

You need:

- That device for the **entire** enrollment (same phone/Mac from start to purchase)
- Face ID, Touch ID, or a passcode (iPhone/iPad), or a Mac with T2 / Apple silicon
- The latest **Apple Developer** app from the App Store
- A government photo ID (passport works in most regions; many US enrollments accept a driver’s license)

Apple will photograph the ID to verify you. They use it for identity and fraud checks, not as your seller name.

---

## Part 3 — Enroll the LLC (Apple Developer app)

Apple’s preferred path for organizations is the **Apple Developer app**. Web enrollment exists; the app is what they document for identity capture. Use the app.

### Start

1. Install [Apple Developer](https://apps.apple.com/app/apple-developer/id640199958) on the device from Part 2.
2. Open the app → **Account**.
3. Sign in with the **work** Apple Account (it can differ from the iCloud account on the device, but that work account must have 2FA).
4. Agree to the Apple Developer Agreement if asked.
5. Tap **Enroll Now**.
6. Read the benefits and continue.

### You (Account Holder)

1. Enter your legal first name, legal last name, and phone number.
2. Photograph your government ID when asked.
3. Continue.

### The LLC

On the next screens, enter:

| Field | What to type |
| --- | --- |
| Entity type | Company / Organization (the LLC option in the list) |
| Legal entity name | Exact name from the Articles. Not “Wild Kit.” Not a DBA. |
| D‑U‑N‑S Number | The nine digits from Part 1 |
| Headquarters address and phone | Same street address as D&B. No P.O. box. |
| Website | `https://getwildkit.com` |
| Signing authority | Confirm you are owner/founder (or have written authority). If you are not the owner, you must give a reference who can confirm you may bind the LLC. |
| Fee waiver | Skip. We are not a nonprofit, school, or government. |

Submit. Apple reviews. You get email with next steps. This is the slow part — often days, sometimes a couple of weeks if they ask for notarized documents.

If they email for documents: reply with the PDF folder from Part 0, using the Enrollment ID they cite. Do not start a second enrollment.

### Pay after they approve

You **cannot** pay until Apple verifies the LLC. Individuals can pay on day one. Organizations wait for the “complete your enrollment” email.

1. Open the **same** Apple Developer app on the **same** device.
2. Account → sign in with the enrollment Apple Account.
3. Tap **Continue Your Enrollment**.
4. Read and agree to the [Apple Developer Program License Agreement](https://developer.apple.com/support/terms/).
5. Subscribe. **$99 USD per year** (local currency where offered). Auto-renews until cancelled.

Payment notes from Apple:

- Use an Apple Account payment method. Add the **LLC debit/credit card** to the Apple Account signed into the *device* if you want the company to pay (that Apple Account may differ from the enrollment account).
- Apple Account store credit / gift-card balance is **not** accepted (except India).
- If you enroll on the web instead, and pay by credit card as if you were an individual, Apple says the card must be yours or they will demand more ID. Prefer the LLC card on the device’s Apple Account.
- Membership fees for the year you cancel are not refunded.

After purchase you should get a confirmation email. Sign in at [developer.apple.com/account](https://developer.apple.com/account) with the same Apple Account to check status. If there is no confirmation within 24 hours of the charge, contact Apple Developer Support and include the Enrollment ID.

---

## Part 4 — Open App Store Connect and make it a real company account

1. Sign in at [appstoreconnect.apple.com](https://appstoreconnect.apple.com) with the Account Holder Apple Account. 2FA is required.
2. Confirm **Business** shows the LLC legal name and address.
3. **Users and Access** — add anyone else. Organization teams can have unlimited members. Only one Account Holder. You stay Account Holder unless you formally transfer it.
4. Set the **developer name** when you create the first app (next part). Company enrollments get that field. Use **Wild Kit**.

### Agreements and money (do this even if the first app is free)

The first listing is free. Grown-up pays in the App Store, not on the website. When you want in-app print packs or a paid app, the Account Holder must sign the **Paid Apps Agreement**.

1. App Store Connect → **Business** → **Agreements**.
2. Paid Apps row → **View and Agree to Terms**.
3. Complete **tax** and **banking**:
   - US: W-9 in the LLC name / EIN
   - Bank account in the LLC name
4. Complete any **tax category / nexus** questions honestly. Ask a CPA about sales tax on App Store IAP.

You cannot create some paid products until this agreement is Active.

---

## Part 5 — Create the first app record

Do this before you archive a build.

1. App Store Connect → **Apps** → **+** → **New App**.
2. Platform: iOS.
3. Fill the lock:

   | Field | Value |
   | --- | --- |
   | Name | Lemonade Stand by Wild Kit |
   | Primary language | English (US) |
   | Bundle ID | Create `com.wildkit.lemonade` under [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/identifiers/list) first, then select it |
   | SKU | `lemonade-stand-wild-kit` (internal; not public) |
   | User access | Full Access until there is a reason not to |
   | Developer name | **Wild Kit** (offered because you enrolled as a company) |

4. Category when you fill the listing: **Lifestyle**. Not Kids.
5. Age rating questionnaire: answer so you land **4+**. We do not collect location, do not have user-generated public content, do not have third-party ads.
6. Privacy: parent-owned account, first name only, no kid inbox. The `/privacy` page on the website must match what you declare in App Store Connect Privacy Nutrition Labels.
7. Paste the locked store copy from `lib/brand.ts` → `APP_STORE`. Do not rewrite.

   - Subtitle: Design. Print. Open the stand.
   - Promotional text: When the house is full of raccoons, make lemonade.
   - Description: the `APP_STORE.description` paragraph.
   - Screenshot captions: the six locked lines.

8. Do not upload a fake “Download on the App Store” badge to getwildkit.com until this record is **Ready for Sale**.

---

## Part 6 — Ship from this repo

The native app lives in `apps/lemonade`.

On a Mac:

```bash
cd apps/lemonade
npx expo start
# later, when you are ready to upload:
npx eas-cli login          # Apple Account = the company Account Holder, or an Admin you invited
npx eas build --platform ios
npx eas submit --platform ios
```

You will need:

- Xcode (latest stable)
- An Apple Distribution certificate and an App Store provisioning profile (EAS can create these once you sign in)
- A physical Mac. This Linux environment can develop the JS, not archive for the store.

TestFlight first. Then submit for review.

---

## Common ways this fails

| Mistake | What Apple / D&B do | Fix |
| --- | --- | --- |
| Enroll as Individual | Seller becomes your personal legal name | Enroll as Organization. If you already enrolled as an individual, [request a conversion](https://developer.apple.com/contact/request/account-conversion/) and still do Parts 0–1. |
| Legal name is “Wild Kit” (a DBA) | Rejected. Apple does not accept DBAs, trade names, or branches. | File or amend the LLC. Use the filed name everywhere. |
| Work email is Gmail | Rejected or delayed | Create mail on getwildkit.com, new Apple Account, start over if they already refused. |
| Website is parked or “coming soon” | Rejected | Ship this site. Real pages. Domain matches the company. |
| Address is a P.O. box | Rejected | Use a street address on Articles, D&B, and Apple. |
| First/last name is the company name | Identity review stalls | Use your personal legal name on the Apple Account. |
| D‑U‑N‑S says sole proprietor | “Not listed as a legal entity” | Send Articles to D&B. Wait two days. |
| Pay before verification | You cannot | Wait for the complete-enrollment email. |
| Kids Category “because it’s for families” | Extra review, parental gates, and a product we said we are not | Lifestyle, 4+. Parent-owned. First name only. |
| Second enrollment while the first is pending | Confusion, duplicate IDs | Reply to the existing Enrollment ID. |

---

## Checklist (print this)

- [ ] LLC filed. Exact legal name written down.
- [ ] EIN matches that name.
- [ ] Operating agreement names you as the person who can bind the company.
- [ ] Business bank account open.
- [ ] getwildkit.com live with real content.
- [ ] Work email on that domain receives mail.
- [ ] D‑U‑N‑S issued to the LLC. Apple has had it for 2+ business days.
- [ ] Company Apple Account, legal personal name, 2FA on.
- [ ] Apple Developer app enrollment submitted as **Organization**.
- [ ] Documents sent if asked. Same Enrollment ID.
- [ ] Approval email received.
- [ ] License agreed. $99 paid from a card you intend the company to use.
- [ ] App Store Connect opens. Business name is the LLC.
- [ ] Paid Apps Agreement signed when you need IAP or paid apps. Tax + bank complete.
- [ ] Bundle ID `com.wildkit.lemonade` created.
- [ ] App record created. Developer name = Wild Kit. Listing copy locked.
- [ ] First TestFlight build from `apps/lemonade`.

When the listing is Ready for Sale, the website badge may go up. Not before.
