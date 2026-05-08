# Progress Log — Petit Train de Vannes

## Done

- **Project bootstrap — cloned from Carnac template** (May 2026):
  - Forked Softbird-Web/petit-train-carnac → Softbird-Web/petit-train-vannes
  - Full brand swap: purple `#4d1c64` / `#54206d` → amber `#f7a427` throughout all 26 section components
  - City name: all "Carnac" → "Vannes" in fr.json (canonical translation source)
  - Contact: email `petittrain-lebayon@orange.fr`, phone `02 97 24 06 29` (same operator, different departure)
  - Departure: "Place Gambetta" (Vannes historic centre, near remparts) — replaced all "Parking du Ménec" refs
  - Route duration: 55 min → 40 min
  - Google rating: 6 000+ avis → 1 385 avis
  - VannesMap.tsx: Leaflet map centred on Place Gambetta (47.6539, -2.7591) replacing CarnacMap
  - CarnacMap.tsx left as dead code — import in OurLocation.tsx updated to VannesMap

- **lib/brand.ts created — single source of truth for city values** (May 2026):
  - `brand.city`, `brand.contact`, `brand.social`, `brand.prices.individual`, `brand.prices.earlyBird`
  - `brand.regiondoWidgetId` = **PLACEHOLDER** — awaiting real Vannes Regiondo widget ID from client
  - `Prices.tsx`, `InformationsPrices.tsx`, `Footer.tsx` refactored to import from brand
  - Pattern established: for Quiberon clone, edit `lib/brand.ts` only — no component changes needed

- **Images replaced with Vannes content** (May 2026):
  - Hero, stop, gallery, practical info, careers, FAQ, privatisation, footer images all swapped from Carnac photos to Vannes images sourced from `~/Desktop/vannes-images/`
  - Gallery: `vannes-g11.jpg` – `vannes-g16.jpg` added (Vannes-3, 5, 7, 9, 11, 13 from client folder)
  - Compression: `sips -Z 1920 --setProperty formatOptions 52` — all assets < 1MB

- **InformationsSchedule rebuilt for Vannes** (May 2026):
  - Single departure point (Place Gambetta only — no Carnac Plage / La Trinité stops)
  - Seasonal bands updated to reflect Vannes 2026 schedule
  - Operating period: April – November

- **FAQ content updated for Vannes** (May 2026):
  - 14 Q&A pairs rewritten for Vannes context (remparts, 40 min, Place Gambetta)
  - FAQPage JSON-LD schema present and localised

- **Translations — all 7 locales complete** (May 2026):
  - `messages/fr.json` is the canonical source — fully updated for Vannes
  - `messages/en.json`, `es.json`, `de.json`, `it.json`, `nl.json`, `cs.json` — manually written (no ANTHROPIC_API_KEY needed; manual = higher quality for Morbihan train sites)
  - All files JSON-validated: `node -e "JSON.parse(...)"` passes on all 7
  - German `„..."` quotes handled correctly (U+201C escape, not ASCII `"`)

- **Playwright QA — full suite green** (May 2026):
  - `tests/qa.spec.ts` — 23 tests updated for Vannes (video selector, amber color, departure point, holiday text, weather, pricing cards, careers roles)
  - `tests/booking-widget.spec.ts` — title updated to Vannes; 2 widget ID tests intentionally skipped (pending real Vannes Regiondo ID from client)
  - `tests/i18n-coverage.spec.ts` — `cs` locale added; Vannes proper nouns added to FR allowlist
  - `playwright.config.ts` — `locale: 'fr-FR'` added so next-intl serves French at `/`
  - Result: **106 passed, 2 skipped** (the 2 skips are intentional — widget ID placeholder)

- **SEO audit — 9 issues fixed across P1/P2/P3 priority levels** (May 7, 2026):
  - `lib/page-metadata.ts` helper: every `generateMetadata` now emits `openGraph` + `twitter` cards, locale-aware `canonical`, and `hreflang alternates` for all 7 locales
  - All 8 subpages updated to use `buildPageMetadata(locale, title, description, href)`
  - Legal pages (`mentions-legales`, `politique-de-confidentialite`) marked `noindex`
  - 78 `<Image fill>` components across 24 section files given correct `sizes` props
  - JSON-LD enhanced: `openingHoursSpecification`, `availableLanguage`, `touristType`, `WebSite` schema with `SearchAction`
  - Root layout OG: added `locale_alternate` for all 6 non-default locales
  - Sitemap: legal pages removed (crawl budget)

- **i18n coverage — all 104 tests green** (May 7–8, 2026):
  - Fixed `InformationsSchedule.tsx`: 4 hardcoded French strings moved to `t()` + translation keys added to all 7 locales (`departureLocation`, `departureFrequency`, `periodClosed`, `periodClosureNote`)
  - Fixed `app/[locale]/routes/page.tsx`: `routeFaqs` array was at module scope with hardcoded French Q&A — moved inside page function; 16 new keys (`faqQ1`–`faqA8`) added to all 7 locales
  - Fixed i18n test: JS `\b` word boundaries don't understand accented Latin chars; replaced with Unicode-aware lookahead/lookbehind; added per-locale exclusions (`que`/`les` for `es`, `des` for `de`)
  - Result: **104 passed** (was 8 failing i18n tests)

- **GSAP animation tuning** (May 2026):
  - ScrollTrigger `start: 'top 85%'` (sweet spot — 80% too late, 90% too early)
  - `/faqs` page: all `data-anim-section` / `data-anim-item` removed (was causing jank on FAQ accordion)

- **Mobile QA — 8 issues fixed** (May 6, 2026):
  1. Hero CTA buttons stack vertically + w-full on mobile
  2. Bottom banner body text capped at 16px on mobile (was 20px)
  3. Gallery images border-radius 24px → 8px
  4. Informations schedule cards: full rounding on mobile (was asymmetric desktop rounding)
  5. RoutesTimeline: content first, image below on mobile (images were hidden)
  6. FAQsHero overlay card: full width on mobile (was pinned to left-1/4)
  7. CareersHero image visible on mobile (was hidden lg:flex)
  8. Mobile navbar language selector: dark text on orange background (was white = fails contrast)

- **RoutesTimeline stop number badges** (May 2026):
  - Changed italic → not-italic, tracking-[-2.8px] → tracking-normal (numbers were visually off-centre)

- **Brain training** (May 2026):
  - `docs/NEW-SITE-PLAYBOOK.md` updated: Phase 0 image folder + ANTHROPIC_API_KEY pre-flight checks; Phase 2 now mandatory brand.ts
  - `docs/CUSTOMIZATION-MAP.md` updated: SVG fill audit, hardcoded prices section, image folder rule
  - `.claude/commands/new-morbihan-train.md` updated: brand.ts step 1, Phase 0 checks
  - `docs/lessons.md` updated: 4 new entries (brand.ts pattern, SVG fill trap, translation pre-flight, spec-before-code)

## Blocked / Pending client input

- **Regiondo widget ID for Vannes** — `lib/brand.ts:5` has placeholder. `BookingSection.tsx` still uses Carnac widget `5712cb43`. Get from client Regiondo dashboard.
- **OG image for Vannes** — `/public/figma-assets/OpenGraph.png` is shared with Carnac. Need a Vannes-specific image (1200×630) then update `app/[locale]/layout.tsx` og.images path.
- **Privatisation webhook** — `MAKE_PRIVATISATION_WEBHOOK_URL` is empty in `.env.local`. Add to Vercel env vars when client sets up Make scenario.

## Next Steps

- [ ] Get Vannes Regiondo widget ID → update `lib/brand.ts` → widget works on `/book`; unskip 2 Playwright tests in `booking-widget.spec.ts`
- [ ] Create Vannes OG image → update `app/[locale]/layout.tsx`
- [ ] Add `MAKE_PRIVATISATION_WEBHOOK_URL` to Vercel env vars
- [ ] Verify live on Vercel: all 7 pages × mobile viewport pass
- [ ] Client: set up 301 redirects from old petittrain-morbihan.com/vannes URLs
