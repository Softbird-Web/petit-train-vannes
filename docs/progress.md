# Progress Log

## Done

- **i18n round 2 — fix FR-leakage on non-FR locales** (Apr 28, 2026 — evening):
  - **`<br/>` rendering bug**: next-intl 4 `t.rich` doesn't parse self-closing void tags even with a handler. Split `hero.noteImportanteBody` into two keys (`noteImportanteBody` + `noteImportanteBodyExtra`) across 6 locales, render with explicit `<br /><br />` JSX in [Hero.tsx](vibe-coding/projects/petit-train-carnac/components/sections/Hero.tsx).
  - **RoutesTimeline** (homepage + /routes): extracted ~25 hardcoded FR strings to `sections.routesTimeline.*`, refactored to consume `useTranslations`. Translated to en/es/de/it/nl manually.
  - **FAQsSection** (/faqs): 14 Q&A pairs (~500 FR words) extracted to `sections.faqsSection.q1..q14` / `a1..a14`, with rich-link variants for q9 (Prices link) and q14 (Privatisation link). Translated × 6 locales. JSON-LD FAQPage schema now also localized.
  - **InformationsSchedule UI labels** (/informations + /prices): wrapper labels (Période d'exploitation, Météo, Horaires, Saturday rule note, online-booking note, closures heading + body, Départ prefix) extracted to `sections.informationsScheduleLabels.*`. Schedule data cells (period names, hours, frequencies, locations) intentionally stay FR to match the printed flyer.
  - **RoutesHero** (/routes): default flyer button labels, Google badge text (`<strong>` rich), reviews count, lightbox aria-labels — all extracted to `sections.routesHeroDefaults.*`.
  - **ReviewsSlider** (homepage + /informations + /careers): customer testimonials kept in original FR (preserves authenticity) but wrapped with `<p lang="fr">` for accessibility + SEO. Surrounding UI labels (Avis Google subtitle, slide aria-label, region/prev/next aria-labels) extracted to `sections.reviews.*` and translated × 6 locales.
  - **Gallery**: added 5 more photos (gallery-18..22, 249K–483K compressed) bringing total to 22.
  - **Deferred to commit B2**: CareersHero + CareersInfo (~46 strings, low traffic), PrivatisationHero form (~35 strings, low traffic), Playwright i18n-coverage spec.
  - All 6 locale JSON files validate; `tsc --noEmit` 0 errors. Verified live via curl across 12 page-locale combos.

- **SEO follow-up: site-wide audit** (Apr 28, 2026 — same day):
  - **OG / Twitter cards** in `app/[locale]/layout.tsx` were stale FR copy ("Visite guidée touristique") on every page × every locale → updated to "Le Petit Train de Carnac / Menhir Tour" + mégalithes-led description. One canonical share card for now (per-locale OG deferred).
  - **`metadata.title.default` + `metadata.description`** fallbacks in layout.tsx aligned with new branding (was the pre-rebrand long FR title).
  - **Subpage descriptions × 6 locales** for the 4 SEO-critical pages (prices / faqs / book / informations) rewritten to lead with mégalithes / megaliths / megalitos / Megalithen / megaliti / megalieten — keyword sits in the first ~80 chars where search engines weight it highest.
  - **Title template `%s — Petit Train de Carnac Morbihan` left as-is** per call. Subpages render e.g. "Tarifs & Billets — Petit Train de Carnac Morbihan" (unchanged); homepage bypasses the template (Next.js doesn't apply it when the page sets the full title via getTranslations).
  - Verified live via `curl localhost` across 12 page-locale combos: title / description / og:title all correct.

- **QA round post-Maryannick call** (Apr 28, 2026) — live-site corrections driven by the 2026 flyer:
  - **Schedule rewrite** (`components/sections/InformationsSchedule.tsx`): refactored from per-month list to a 3-departure × seasonal-band grid that mirrors the flyer. Le Ménec now correctly shows every 20 min (was 30), close time 17h30 in low season (was 18h00), plus the missing Oct 17-31 reduced schedule (10H–17H every 30 min) and Oct 9-16 closure. Carnac Plage low-season times: 10H15–17H15 every 30 min Saturdays included (was hourly with midday break). La Trinité low-season: 10H30–17H every 30 min Saturdays included (was 10h15–11h15 + 14h15–17h15 hourly). Jul/Aug schedules now show discrete departure-time slots and the Saturday-uses-orange-schedule rule. Closed period corrected to "novembre à mars + 9-16 octobre" (was "décembre à février" with November shown open). Color-coded period bands (yellow / purple / green for Le Ménec; orange / blue for the other two) match the flyer's swim-lanes. Saturday-rule and "online booking only at Le Ménec" notices added below the timetable.
  - **Typo fix on live site**: "Arrêt de bus Courqué" → "Cours des Quais" (with "avant le rond-point Alain Barrière" qualifier). Updated `messages/{fr,en,es,de,it,nl}.json` `item3Description` + `components/sections/OurLocation.tsx` Google Maps URL.
  - **Bons Plans badge** moved out of the card corner into an inline-flex pill directly below the "Premiers départs du matin" heading. Same fix applied on `Prices.tsx` (homepage + /prices) and `InformationsPrices.tsx` (/informations). Bonus: `InformationsPrices.tsx` had hardcoded English `"Great Deal"` — wired to `t("earlyBird.badge")` so it renders the localized label in all 6 locales.
  - **Audioguides copy** (`sections.features.f2Desc` × 6 locales): dropped the "in French and English" tail (HDV Dricker is fixing the other languages) and added the flyer's "casques hygiéniques fournis" / "hygienic headphones provided".
  - **47 commented points of interest** (`sections.features.f3Desc` × 6 locales): replaced the generic "menhirs, beaches, harbour" line with the flyer's number + named alignments (Ménec, Kermario, Kerlescan).
  - **Free admission** (`sections.prices.individual.note` × 6 locales): appended "Gratuit : enfants de moins de 3 ans et chiens" / locale equivalents (rendered via `t.rich` so `<strong>` tags work).
  - **Minimum-6-adults rule** added as `sections.beforeYouBook.bullet7` × 6 locales + wired into `BeforeYouBook.tsx`'s bullet list.
  - **Homepage SEO**: title across all 6 locales now reads "Le Petit Train de Carnac / Menhir Tour"; descriptions rewritten to lead with "Visite des mégalithes" / "Megalith tour" / etc. so the keyword sits in the first ~100 chars.
  - **Gallery**: added 6 new photos (`gallery-12`–`gallery-17.jpg`, all 273K–521K compressed) interleaved with deliberate aspect ratios for masonry stagger. `gallery-12` is `carnac-main.jpg` (drone-style brand hero, 16:9). Manifest updated.
  - All 6 locale JSON files validate; `tsc --noEmit` 0 errors.

- **i18n Phase 2** (Apr 25, 2026) — translated rendering across the homepage + every page's hero/metadata/breadcrumbs in all 6 locales (fr/en/es/de/it/nl):
  - Section components refactored to consume `useTranslations()` / `getTranslations()`: PracticalInfo, Prices, BeforeYouBook, Features, GroupBookingCTA, Locations, Reviews, BookingSection, Gallery, OurLocation, FAQ (default + faqs prop), InformationsIntro, InformationsCTA, FAQsHero
  - Pages migrated to async server components with `setRequestLocale` + `generateMetadata` + locale-aware breadcrumbs + Hero override translation: /prices (incl. FAQ data array), /routes, /book, /faqs, /careers, /informations, /privatisation
  - All ~120 keys × 6 locales (~720 translation entries) authored manually
  - QA: zero French leaks on /it/prices, /de/prices, etc. for translated keys; all 21 sampled (locale × path) routes return 200; no MISSING_MESSAGE / runtime errors in dev log
  - **Deferred (Phase 3 backlog):** Hero variants used only on inner pages (RoutesHero, CareersHero, PrivatisationHero, InformationsHero) keep their internal hardcoded French strings — only the page-passed props are translated. Section components with bulky content (RoutesTimeline, InformationsSchedule, CareersInfo, FAQsSection, PrivatisationHero form) and the /routes route-FAQ data array render French in non-FR locales via fallback. Legal pages (mentions-legales, politique-de-confidentialite) intentionally kept FR-only.

- **QA Round 3** (Apr 24, 2026) — client polish pass:
  - Global color swap `#f7f7f0` → `#f5ebdd` (new cream brand token)
  - Font overhaul: Libre Baskerville / Roboto / Inter / Nunito / Raleway → Bricolage Grotesque (headings) + Manrope (body), all via `next/font/google`
  - Hero gradient on homepage: `from-[#f5ebdd] to-white to-[60%]` + Note Importante banner → white
  - PracticalInfo cards: hover-to-reveal photo behind purple gradient, 48×48 icon badges (Icon01–05.svg) with 8px radius + purple drop shadow, body text `text-white/75`
  - Tarifs section: hexagonal-pattern.svg background at `opacity-[0.03]`
  - Booking widget: moved to homepage after Note Importante, BookingSection bg → white
  - /prices hero image → PricesHero.jpg
  - Flyer buttons wired on /prices + /routes (FlyerIndividual.pdf + GroupFlyer.pdf, download icons), removed dead `href="#"`
  - Reviews: dropped `min-h-[100vh]`, regular `py-20`
  - Pricing cards: `rounded-[16px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)]`; middle card note updated with -1,50€ reduction + 10H20/10H30 timing
  - New **Gallery** masonry section (GSAP Flip lightbox + shortest-column packing, varied aspect ratios, 11 compressed client photos at `gallery-1…11.jpg`) replacing Souvenirs on homepage + /routes. Souvenirs.tsx deleted.

- **All 12 homepage sections** built, polished, QA-passed (Apr 11–12)
- **Global font fix** — `next/font/google` in `app/layout.tsx`: Libre Baskerville, Roboto, Inter, Nunito, Raleway via CSS variables on `<html>` (Apr 13)
- **`app/informations/page.tsx`** — 6 sections from node 1:13939 (Apr 13):
  - InformationsHero, InformationsSchedule, InformationsPrices, InformationsIntro, InformationsReviews, InformationsCTA
  - Reused Locations section component
  - TypeScript: 0 errors

- **`app/prices/page.tsx`** — Prices & Tickets page with parameterized Hero, InformationsSchedule, Reviews, Locations, FAQ (Apr 14)
- **`app/routes/page.tsx`** — Routes page with RoutesHero (lightbox + flip), Souvenirs, RoutesTimeline, FAQ (route-specific), Locations (Apr 14)
  - Routes page QA pass: RoutesHero.jpg hero image, WhiteBridge.png route section image, DownloadWhite/DownloadBlack icons on flyer buttons (Apr 14)
- **`app/careers/page.tsx`** — Careers page with CareersHero (job listings + tall image), CareersInfo (who we are looking for / working with us / how to apply / join the team), Locations (Apr 14)
  - TypeScript: 0 errors

- **Careers page QA pass** (Apr 15):
  - Navbar: added "Careers" link between FAQ and Contact
  - CareersHero: background → CareersHeroBg.png, hero image → CareersHero.jpg, image now fills 100% section height via `self-stretch`
  - CareersInfo: left image → CareersLooking.png
  - CarnacMap: fixed Leaflet "Map container is already initialized" error (React Strict Mode race condition — added `cancelled` flag to async effect)

- **`app/book/page.tsx`** — Bookings page (Apr 15):
  - `BookingHero` (new) — purple hero section, left copy, right tabbed booking form card
    - Tab 1: Individual booking (date, time, adults, children, name, email, phone)
    - Tab 2: Group booking (all individual fields + organisation, total participants, preferred contact, special requirements)
    - States: idle → loading → success | error
  - `BeforeYouBook` (new) — cream 2-col section, megalith photo + bullet list
  - Reused: `Features`, `PracticalInfo`, `GroupBookingCTA`, `Locations`
  - `app/actions/booking.ts` — Server Action: validates form data, POSTs JSON to `MAKE_WEBHOOK_URL`
  - TypeScript: 0 errors

  **Env var required:**
  ```
  MAKE_WEBHOOK_URL=https://hook.eu2.make.com/your-webhook-id
  ```
  Add to `.env.local` and to Vercel project settings.

  **Webhook payload shape Make will receive:**
  ```json
  {
    "type": "individual" | "group",
    "submittedAt": "2026-04-15T10:30:00.000Z",
    "contact": { "firstName", "lastName", "email", "phone" },
    "booking": { "date", "departureTime", "adults", "children" },
    "group": {                    ← only present for group bookings
      "organizationName",
      "totalParticipants",
      "specialRequirements",
      "preferredContact": "email" | "phone"
    }
  }
  ```

- **QA pass — /book page + global fixes** (Apr 15):
  - `BookingHero`: replaced `icon-map-pin.svg` (bookmark icon) with `LocationWhite.svg` for the departure text
  - `BeforeYouBook`: updated hero image to `BeforeYouBook.png`
  - `Navbar`: fixed mobile drawer positioning bug — drawer was `absolute top-full` relative to inner div (h~44px), causing it to overlap the logo; moved drawer to `<nav>` level where `top-full = 80px`; increased `max-h` from 400px to 600px for all nav items to fit; fixed `aria-expanded` to boolean
  - `GroupBookingCTA` + `InformationsCTA`: reduced mobile gap from `gap-16` → `gap-8` on mobile
  - `Prices.tsx` + `InformationsPrices.tsx`: individual adult price updated `8€` → `8,5€`
  - `Footer.tsx`: CTA overlay changed from purple `rgba(58,40,83,0.75)` → `black/70`

- **`app/privatisation/page.tsx`** — Privatisation page (Apr 15):
  - `PrivatisationHero` (new) — full-width 2-panel hero: left is scenic image with purple overlay + heading/description, right is privatisation request form
  - Form fields: Your Details (first name, last name, phone, email, company) + Event Details (event type, departure location, departure time, date, guest count min 10, additional info)
  - `app/actions/privatisation.ts` — Server Action: validates, POSTs to `MAKE_PRIVATISATION_WEBHOOK_URL`
  - Navbar: added "Privatisation" link
  - TypeScript: 0 errors

  **Env var required:**
  ```
  MAKE_PRIVATISATION_WEBHOOK_URL=https://hook.eu2.make.com/your-privatisation-webhook-id
  ```

- **QA pass 2 — image visibility + navbar** (Apr 15):
  - `BeforeYouBook`: moved image div after content in DOM + added `xl:order-first`; now shows below content on mobile/tablet with responsive height (`260px` → `360px` → `487px`)
  - `PrivatisationHero`: moved image panel after form in DOM + added `xl:order-first`; visible on mobile/tablet below the form
  - `Navbar`: removed "Contact" link

- **`app/faqs/page.tsx`** — FAQs page (Apr 15):
  - `FAQsHero` (new) — split-layout hero: left has label/heading/description/Google badge/supporting text; right has scenic photo with card overlay (16 languages)
  - `FAQsSection` (new) — full-width cream accordion with all 14 FAQ items from Figma; first item open by default; inline links to /prices and /privatisation
  - TypeScript: 0 errors

- **QA sprint + image refresh + lessons system** (Apr 21):
  - `Reviews` section rebuilt: GSAP draggable slider with 9 testimonials, clip-path diagonal on images, mobile 1x1 stacking, expo.out easing + 0.1s blur polish
  - `Locations` cards: whole card clickable, purple hover overlay with "Découvrir" + down arrow, 500ms expo-style easing
  - All `<h1>`/`<h2>`/`<h3>` set to `font-normal` (Libre Baskerville rendering at 400); patched 24 files via Python regex
  - Hero + FAQsHero: removed purple clip-path diagonals (the triangle), reworked as direct image clip-path
  - 14 images replaced with contextually correct Carnac photos, all compressed to 142K–400K via `sips -Z 1920 --setProperty formatOptions 50`
  - Hydration bug fix: `BookingHero` had `new Date()` at render (min prop on date input) → moved to `useEffect` + `useState`
  - Image cache fix: wiped `.next/cache/images` after filename-collision replacements
  - `docs/lessons.md` expanded to 12 new sections (SSR/hydration, Tailwind v4, git hygiene, Vercel gotchas, tool selection, etc.)
  - `.claude/settings.json` SessionStart hook: auto-loads `docs/lessons.md` into every new session context
  - CLAUDE.md: blocking top-line directive to read `docs/lessons.md` first

- **GSAP animation refactor — unified 2-attribute contract** (Apr 21):
  - `components/providers/AnimationInit.tsx` rewritten: `data-anim-section` on `<section>` + `data-anim-item` on staggered blocks inside
  - 19 sections tagged + Navbar (animates first on page load, persists across transitions)
  - Hero sections play immediately; others on scroll-into-view (`top 80%`)
  - Zero items = whole-section fallback fade (sliders, accordions)
  - Full PageTransitionProvider compatibility preserved via `page-transition-start` event
  - TypeScript: 0 errors; `next build` → 13/13 pages prerender clean

- **SEO foundation** (Apr 21):
  - `lib/site.ts` with `SITE_URL` (env-driven, 1-line swap for custom domain) + `absoluteUrl` helper
  - `metadataBase` in `app/layout.tsx`; `alternates.canonical` on all 10 page metadata exports
  - `app/sitemap.ts` → `/sitemap.xml` with all 10 routes; `app/robots.ts` → `/robots.txt`
  - Fix JSON-LD image path (relative → absolute); route `url` field through `SITE_URL`
  - AEO: `FAQPage` JSON-LD on `/faqs` + reusable FAQ component; wrap FAQ question text in `<h3>` (semantic)
  - `BreadcrumbList` schema on 7 subpages via new `<BreadcrumbSchema>` component
  - `docs/seo/migration-redirect-map.xlsx` — 3-sheet workbook: 301 redirect map (Carnac + Quiberon + Vannes from old petittrain-morbihan.com sitemap), backlinks to update (TripAdvisor, OT, Google Business, tourism boards), post-migration checklist

- **Regiondo booking widget integration** (Apr 21):
  - Replaced custom `BookingHero` form + Make webhook with client's actual booking provider
  - `components/ui/RegiondoWidget.tsx` — client component, `next/script afterInteractive`, TS custom-element type via React 19 `declare module 'react'`, `onError` fallback to phone/email
  - `components/sections/BookingSection.tsx` — branded wrapper (section label + heading + description + cream bg + widget card)
  - Carnac widget ID: `5712cb43-2e72-445b-956b-947f1f624735`
  - Deleted `components/sections/BookingHero.tsx` + `app/actions/booking.ts`
  - `tests/booking-widget.spec.ts` — 5 Playwright tests (metadata intact, widget in DOM, script loaded, 3-breakpoint screenshots, homepage regression). All pass.
  - Widget verified rendering real booking UI (calendar, pricing, "Ajouter au panier", related offers)

## Next Steps
- [ ] Gallery scrolling carousel / film strip (Maryannick request — post-launch, ~½ day dev per Alexandre)
- [ ] Add `MAKE_PRIVATISATION_WEBHOOK_URL` to Vercel env vars + wire up Make scenario (privatisation form still custom)
- [ ] All 7 pages complete ✅
- [ ] Classify Regiondo cookies in cookie-consent banner (GDPR)
- [ ] Cleanup: unused `index` in `Features.tsx:81` map callback; unused `reviews` array in `InformationsReviews.tsx`
- [ ] Client: set up 301 redirects at `petittrain-morbihan.com` (see `docs/seo/migration-redirect-map.xlsx`)
- [ ] Optional: translate `InformationsSchedule.tsx` (currently FR-only across all locales by design — moved to backlog)

- **Czech (cs) language added** (May 1, 2026):
  - Added `cs` locale to `i18n/routing.ts` — `locales` array + `localeLabels` (`Čeština` / 🇨🇿)
  - Added `cs` / `Czech` to `scripts/translate-i18n.ts` `ALL_TARGETS` + `LOCALE_NAMES`
  - Created `messages/cs.json` — 405 keys manually translated to Czech
  - Site now supports 7 languages: fr, en, es, de, it, nl, cs
  - Live at `/cs` on lepetittraindecarnac.fr
