# Site Onboarding Questionnaire — CARNAC (worked example)

This is the retroactively-filled questionnaire for Carnac. Use as a reference when filling `SITE-ONBOARDING-QUESTIONNAIRE.md` for Vannes / Quiberon / Morbihan.

**Filled:** 2026-04-22 (retroactive, derived from the shipped codebase).

---

## 1. Identity

- Location name (French): **Carnac**
- Legal business name: **Petit Train de Carnac Morbihan**
- Site slug: **petit-train-carnac**
- Production domain: **TBD** (currently on `petit-train-carnac.vercel.app`)
- Primary SEO keyword (FR): **petit train de Carnac menhirs**
- Secondary keywords: petit train Carnac, menhirs Carnac, visite guidée Carnac, audio guide 16 langues, alignements Carnac, La Trinité-sur-Mer
- Languages: **French only** (old site had 6 variants EN/DE/ES/IT/NL/FR; we dropped 5)

---

## 2. Business data

- Street address: **Parking du Ménec**
- Postal + city: **56340 Carnac**
- Region: **Morbihan**
- Country code: **FR**
- Main phone: **+33297240629** (displayed as `+33 2 97 24 06 29`)
- Primary email: **petittrain-lebayon@orange.fr**
- Lat/lng: **47.593, -3.079** (approximate — Parking du Ménec, in front of Maison des Mégalithes)
- Season: **April 1 → November 8** (approximate; see InformationsSchedule.tsx for exact months)
- Main opening hours: **10:00–18:00** in April–June + September–November; **9:30–18:30** in July + August
- Open on public holidays: **Yes** — identical hours to regular days

---

## 3. Brand

- Primary color: **`#54206d`** (violet)
- Deep variant: **`#4d1c64`** (deeper purple for hover + dark backgrounds)
- Dark navbar variant: **`#33114d`** (announcement banner bg)
- Cream background: **`#f7f7f0`**
- Heading text: **`#181d27`**
- Body text: **`#535862`**
- Heading font: **Libre Baskerville** (Google Fonts, weight 400, italic supported)
- Body font: **Roboto** (400, 500, 700)
- Supporting fonts: **Inter** (large body copy), **Nunito** (Google badge small text), **Raleway** (decorative)
- Logo SVG: **`public/figma-assets/logo.svg`**
- Webclip: **`public/figma-assets/Webclip.png`**
- OpenGraph image: **`public/figma-assets/OpenGraph.png`** (1200 × 630)

---

## 4. Booking (Regiondo)

- Regiondo widget ID: **`5712cb43-2e72-445b-956b-947f1f624735`**
- Fallback phone: **+33 2 97 24 06 29**
- Fallback email: **petittrain-lebayon@orange.fr**
- Minimum group size: **20**
- Tour duration: **55 minutes**

---

## 5. Hero + homepage content

- Hero heading: **"Découvrez _Carnac_ à bord du Petit Train"**
- Hero tagline (label): **"Le Petit Trains de Morbihan · Carnac"**
- Hero description: *"Le Petit Train de Carnac propose une visite guidée touristique à travers la ville et ses environs. Découvrez le plus beau site néolithique du monde lors de cette visite guidée de 50 minutes. C'est une façon simple et confortable de découvrir Carnac, son patrimoine et ses paysages emblématiques, sans avoir besoin de marcher longtemps."*
- Hero tagline secondary (under description): *"Idéal pour les familles, les couples, les seniors et les visiteurs de tous âges."*
- Bottom banner heading: **"Réservation en Ligne"**
- Bottom banner body: (see Hero.tsx default) — 2-hour reservation rule, ticket window fallback
- Google rating: **4.7**
- Review count: **6000+**
- Google reviews link: **`https://www.google.com/maps/search/Petit+Train+de+Carnac`**
- Facebook: **`https://www.facebook.com/lespetitstrainsdumorbihan`**
- Instagram: *(not set; icon unused — consider removing or wiring up)*

---

## 6. Routes / departure points

### Stop 1 — Parking du Ménec, Carnac
- Address: **Parking du Ménec, face à la Maison des Mégalithes**
- Point de départ obligatoire: **yes** for both groups and individual reservations
- Achetez sur place: **yes** (ticket window available)
- Photo: `/figma-assets/stop-1.jpg`

### Stop 2 — Port en Drô, Carnac Plage
- Address: **Carnac-Plage**
- Point de départ obligatoire: **no**
- Achetez sur place: **yes — pas de réservation possible, ticket purchase only at departure**
- Photo: `/figma-assets/stop-2.jpg`

### Stop 3 — Port de La Trinité-sur-Mer
- Address: **Arrêt de bus Courqué, côté mer, juste avant le rond-point Alain Barrière**
- Point de départ obligatoire: **no**
- Achetez sur place: **yes**
- Photo: `/figma-assets/stop-3.jpg`

---

## 7. Schedules

(See `components/sections/InformationsSchedule.tsx` arrays `months` and `monthsBottom` for the full structured form.)

Months covered: April, May, June, July & August, September, October, November.

- Main season (Apr–Jun, Sep–Nov): 10:00–18:00, Parking du Ménec every 30 min
- Peak (July + August): 9:30–18:30, Parking du Ménec every 30 min
- Carnac Plage: hourly from 10:00 (buy on site)
- La Trinité-sur-Mer: hourly from 10:15 (buy on site)
- Public holidays: same as regular days
- Winter / off-season: closed December → March

---

## 8. FAQs

14 questions on `/faqs` (FAQsSection) + 7 default on `/prices`/`/routes`/`/informations` (FAQ component).

See `components/sections/FAQsSection.tsx` (full array) and `components/sections/FAQ.tsx` (defaults).

Topics: what it is, duration, departure point, operating days, weather, what you'll see, languages, kids, pricing, reservations, arrival time, groups, privatisation.

---

## 9. Careers

- Enabled: **yes**
- Jobs (3 seasonal):
  1. **Conducteur de Petit Train** — Permis D requis
  2. **Agent de Billetterie** — public-facing, langues étrangères appréciées
  3. **Agent de Quai** — accompanies passengers at embarkation only

(See `components/sections/CareersHero.tsx` for exact strings.)

---

## 10. Privatisation

- Enabled: **yes** (may remove later per client)
- Form: `components/sections/PrivatisationHero.tsx` — contact details + event details
- Submission: Server Action at `app/actions/privatisation.ts` → Make webhook at `MAKE_PRIVATISATION_WEBHOOK_URL` env var

---

## 11. Pricing

- Individual adult: **8,50€**
- Individual child (4–12): **5,00€** (under 4 free)
- Bon Plan (early-morning departures): adult **7,00€**, child **3,50€**
- Group prices: **hidden publicly** — "Nous contacter" card with email + phone

---

## 12. Photo inventory

### Video + opening
- Hero video: `/figma-assets/carnac-hero.mp4` (currently ~66MB — **needs re-edit**: open on menhirs, cut intro, under 10MB ideal)
- Opening static image: **not currently set** — client to provide locomotive close-up photo

### Section photos (from `docs/image-manifest.md`)
- Hero fallback: `/figma-assets/hero-image.jpg`
- Features: `/figma-assets/features-photo.jpg`
- Practical info: `/figma-assets/PracticalInfo1.jpg` through `.5.jpg`
- Routes stops: `stop-1.jpg`, `stop-2.jpg`, `stop-3.jpg`
- Prices bg: `/figma-assets/prices-bg.jpg`
- Group booking bg: `/figma-assets/group-booking-bg.jpg`
- Before you book: `/figma-assets/BeforeYouBook.jpg`
- FAQsHero: `/figma-assets/FAQsHero.jpg`
- Prices hero: `/figma-assets/ImagePricesHero.jpg`
- Informations hero: `/figma-assets/PracticalInformationHero.jpg`
- Careers hero: `/figma-assets/CareersHero.jpg`
- OpenGraph: `/figma-assets/OpenGraph.png`

### Gallery (Souvenirs — 8 photos)
- `/figma-assets/souvenir-1.jpg` through `/figma-assets/souvenir-8.jpg`

---

## 13. SEO migration (from old site)

- Old FR slug: **`/carnac-menhirs-petit-train/`** (on petittrain-morbihan.com — highest-authority URL)
- Old EN URL: **`/en/carnac/`** (TripAdvisor + OT Carnac backlinks point here)
- Other lang variants: `/de/carnac/`, `/es/carnac/`, `/it/carnac/`, `/nl/carnac/` (all being dropped)
- Indexed PDFs: `Brochure-Individuel-2024.pdf`, `Brochure-GROUPE-2024.pdf`
- Backlinks to update: see `docs/seo/migration-redirect-map.xlsx` sheet 2

---

## 14. Legal

- Hosting: **Vercel** (Next.js 16)
- Company: Softbird (via Eldardiz → Softbird-Web org after transfer)
- Legal mentions + privacy: French pages at `/mentions-legales` and `/politique-de-confidentialite`

---

## Known pending items (client side, as of 2026-04-22)

Items blocked on Maryannick:

- Re-edited hero video (cut intro, open on menhirs)
- Locomotive close-up photo (for pre-video opening)
- Dolmen photo (flyer-cover photo, prominent placement)
- Wooden chalet photo (ticket booth replacement)
- Guichet (ticket booth) close-up for the Horaires card
- Direction on "photo gallery improvement" (Souvenirs hover trail — partially addressed with 8 new photos)

See the parent email thread for full list. Tracked in `docs/progress.md` Next Steps.
