# Customization Map

**Every Carnac-hardcoded value, by category.** Use this as the checklist when cloning this repo to spawn a new Petit Train site.

**Big picture counts** (refreshed 2026-04-25 after font swap, color swap, Gallery rebuild, i18n Phase 2):
- `"carnac"` (case-insensitive) appears across .tsx/.ts/.css files (much of it now lives in `messages/*.json`)
- `#54206d` (primary violet) | `#4d1c64` (deep purple) | `#f5ebdd` (cream — was `#f7f7f0`) | `#181d27` (heading) | `#33114d` (dark navbar)
- Contact (phone+email): centralized in Footer, Prices group card, BookingSection fallback, RegiondoWidget fallback, JSON-LD
- Regiondo widget ID: **1 ref** (`components/sections/BookingSection.tsx`)
- **i18n: ~200+ keys × 6 locales** in `messages/{fr,en,es,de,it,nl}.json`. French is canonical; others derived. Legal pages stay French in all locales.

**When to use this:**
1. **Reading** — to understand scope before quoting a timeline
2. **Executing Phase 2 (brand extraction)** — checklist of every file to touch when building `lib/brand.ts`
3. **Executing Phase 3 (content swap)** — if brand extraction hasn't happened yet, this is the shopping list of manual edits

---

## 1. Identity + meta

**Note:** Page metadata + breadcrumbs now live in `messages/*.json` under `metadata.<page>` and `breadcrumb.<route>`. Editing fr.json + running `npm run translate` propagates to all 6 locales.

| File | Line / key | What | Carnac value |
|---|---|---|---|
| `app/[locale]/layout.tsx` | 27–65 | Root metadata (title template, default title, description, OpenGraph, Twitter) | `"Petit Train de Carnac Morbihan — ..."` |
| `app/[locale]/layout.tsx` | 75 | `<html lang={locale}>` | `locale` from params (no hardcoded `"fr"`) |
| `app/[locale]/layout.tsx` | 80–105 | JSON-LD schema (TouristAttraction, LocalBusiness) — name, description, address | `"Petit Train de Carnac"` etc. |
| `app/[locale]/<page>/page.tsx` | each | Page metadata via `generateMetadata` → `getTranslations({locale, namespace: 'metadata.<page>'})` | — |
| `messages/fr.json` | `metadata.<page>.title/description` | Per-page titles + descriptions across 8 pages | source of truth |
| `messages/fr.json` | `breadcrumb.*` | All breadcrumb labels (home/prices/routes/book/...) | — |
| `app/[locale]/mentions-legales/page.tsx` | body | Legal entity copy (FR-only by design) | full legal text |
| `app/[locale]/politique-de-confidentialite/page.tsx` | body | Privacy policy (FR-only by design) | full privacy copy |
| `package.json` | 2 | `"name": "petit-train-carnac"` | swap to `petit-train-<location>` |
| `CLAUDE.md` | all | Project brain — references "Carnac" throughout | rewrite for new site |

**When cloning:** edit `messages/fr.json` for all titles/descriptions/breadcrumbs once; `npm run translate` syncs the other 5 locales. Update root layout JSON-LD schema for the new location's address/geo.

---

## 2. Business contact data

All 18 references — split into one-line-per-file bucket. Ideal target for `brand.business.*`.

| File | Line(s) | What |
|---|---|---|
| `app/layout.tsx` | 100–108 | JSON-LD: telephone, email, address (street, locality, postal, region, country) |
| `components/ui/RegiondoWidget.tsx` | 36, 39, 43, 46 | Fallback phone + email (shown if script blocked) |
| `components/sections/Footer.tsx` | 22 | Facebook URL (`lespetitstrainsdumorbihan`) |
| `components/sections/Footer.tsx` | 115, 121 | Footer email link + text |
| `components/sections/Footer.tsx` | 124, 130 | Footer phone link + text |
| `components/sections/CareersHero.tsx` | 92 | Apply via email CTA |
| `components/sections/CareersInfo.tsx` | 74 | Apply via email CTA |
| `components/sections/Prices.tsx` | 184, 191, 195 | Group booking contact card (email + phone) |
| `components/sections/InformationsPrices.tsx` | 135, 140, 143 | Group booking contact card (email + phone) |

**When cloning:** every `petittrain-lebayon@orange.fr` → new email, every `+33297240629` (or `+33 2 97 24 06 29`) → new phone, and check JSON-LD address.

---

## 3. Address + geo

| File | Line(s) | What |
|---|---|---|
| `app/layout.tsx` | 103–107 | JSON-LD postal address |
| `components/sections/OurLocation.tsx` | 17, descriptions | Departure point titles + directions copy |
| `components/sections/RoutesTimeline.tsx` | 18–54 | `stops` array (3 stops, each: name, bullets, note, image) |
| `components/sections/InformationsSchedule.tsx` | 3–103 | `months` + `monthsBottom` arrays (departure point names embedded in JSX) |
| `components/sections/PracticalInfo.tsx` | 24–30 | Departure-point copy on the practical-info cards |
| `app/mentions-legales/page.tsx` | ~50 | Legal entity address (NOT the business address — this is the company HQ in Vannes) |

**When cloning:** rewrite all 3 departure points, the schedule matrix, the lat/lng for the Google Maps links, and the geo in JSON-LD. Legal entity address likely stays (unless new microsite has a different legal owner).

---

## 4. Brand colors

| Hex | Used as | Primary files |
|---|---|---|
| `#54206d` | Primary violet (buttons, italic accent, active states) | Hero, Footer, every section using accent |
| `#4d1c64` | Deep purple (hover, dark section bg, Prices/Reviews) | Reviews, GroupBookingCTA, Prices, Gallery |
| `#f5ebdd` | Cream background (was `#f7f7f0` before 2026-04-25 swap) | Hero, Features, BeforeYouBook, Prices cards, Footer logo bg |
| `#181d27` | Heading text | All h1/h2/h3 classNames |
| `#535862` | Body text muted | Manrope body paragraphs |
| `#33114d` | Announcement banner bg | Navbar |

**Semantic tokens** in `styles/figma-tokens.css`: `--color-primary`, `--color-bg` (= `#f5ebdd`), `--color-bg-dark`, `--color-text`, `--color-text-muted`. Most components hardcode the hex; when extracting to `brand.ts`, the tokens file becomes the bridge: brand constants → CSS vars → utility classes.

**When cloning:** replace all hex values globally with sed (`grep -rl "#54206d" app components | xargs sed -i '' 's/#54206d/#NEW/g'`). If the new site adds tones (e.g., 2 accents), requires component-by-component review.

---

## 4b. Fonts (locked post-swap)

**Stack:** Bricolage Grotesque (headings) + Manrope (body), both via `next/font/google` in `app/[locale]/layout.tsx`.

| File | What |
|---|---|
| `app/[locale]/layout.tsx` | `next/font/google` imports + CSS var declarations (`--font-bricolage`, `--font-manrope`) |
| All `.tsx` files | className strings reference `font-['Bricolage_Grotesque',sans-serif]` (headings + italic labels) and `font-['Manrope',sans-serif]` (body + buttons) |

**When cloning:** font stack is brand-neutral. Don't swap unless the new site's brand explicitly mandates different fonts. If swapping: edit the imports in layout, then global find/replace on the className strings (~165 occurrences across the codebase). Always keep `font-normal` on headings (browser default is 700; Tailwind v4 preflight doesn't reset).

---

## 5. Booking

| File | Line | What | Carnac value |
|---|---|---|---|
| `components/sections/BookingSection.tsx` | 4 | Regiondo widget ID constant | `'5712cb43-2e72-445b-956b-947f1f624735'` |

**When cloning:** single-line swap. Confirm new widget ID corresponds to the new location's Regiondo product.

---

## 6. Hero content

| File | Line(s) | What |
|---|---|---|
| `components/sections/Hero.tsx` | 21–27 | `defaultHeading` JSX (H1) |
| `components/sections/Hero.tsx` | 29–38 | `defaultDescription` |
| `components/sections/Hero.tsx` | 61–82 | `defaultRightCard` (audio guide language badge) |
| `components/sections/Hero.tsx` | 85, 88, 90 | Default props (label, tagline, googleBadgeText) |
| `components/sections/Hero.tsx` | 91, 92 | `rightImageSrc`, `rightImageAlt` defaults |
| `app/page.tsx` | ~16 | Homepage Hero usage — `rightVideoSrc` + `openingImageSrc` |

**When cloning:** all default copy on Hero moves to `brand.content.hero*`. Video + opening image filenames are per-location.

---

## 7. Aggregate rating + Google copy

| File | Line | What |
|---|---|---|
| `app/layout.tsx` | 115–116 | JSON-LD aggregateRating (4.7 / 6000 reviews) |
| `components/sections/Hero.tsx` | 90 | `googleBadgeText` default prop |
| `components/sections/Hero.tsx` | 162, 167, 174 | Hero Google badge "4,7" + "6 000+ avis" |
| `components/sections/Reviews.tsx` | ~43 | Google reviews link + supporting text |
| `components/sections/FAQsHero.tsx` | 62–89 | FAQsHero Google badge |
| `components/sections/RoutesHero.tsx` | 143–177 | RoutesHero Google badge |
| `app/prices/page.tsx` | 110 | Prices page Hero Google badge text prop override |

**When cloning:** update rating + review count + link to the new location's Google Business Profile.

---

## 8. Routes / departure points

| File | Line(s) | What |
|---|---|---|
| `components/sections/RoutesTimeline.tsx` | 18–54 | `stops` array (3 objects) — name, bullets, note, image, imageAlt, flip |
| `components/sections/OurLocation.tsx` | 10–49 | `locationItems` array + departure descriptions |
| `components/ui/CarnacMap.tsx` | entire | Leaflet map with 3 hardcoded pins (lat/lng of Carnac stops) |
| `components/sections/PracticalInfo.tsx` | 24–30 | Info-card departure copy |

**When cloning:** rewrite the 3 stops + the map pins + the map center lat/lng. The map component itself is reusable; only the data changes.

---

## 9. Schedules

| File | Line(s) | What |
|---|---|---|
| `components/sections/InformationsSchedule.tsx` | 3–56 | `months` array (April, May, June, July&August) |
| `components/sections/InformationsSchedule.tsx` | 58–103 | `monthsBottom` array (September, October, November, Dec–Feb) |
| `components/sections/InformationsSchedule.tsx` | ~268 | Public holidays note (identical to regular days) |

**When cloning:** rewrite both month arrays per the new location's hours. `plainText` JSX with embedded `<span>`s = requires manual Claude edit, not regex.

---

## 10. FAQs

| File | Line(s) | What |
|---|---|---|
| `components/sections/FAQsSection.tsx` | 6–95 | 14-question FAQ array for `/faqs` page |
| `components/sections/FAQ.tsx` | 13–49 | 7-question `defaultFaqs` for reusable FAQ component |
| `app/routes/page.tsx` | 15–55 | `routeFaqs` array (8 routes-specific questions) |

**When cloning:** ALL FAQ text needs new answers per the new location. Some answers contain JSX links — remember the `plainAnswer` field for FAQPage JSON-LD schema.

---

## 11. Careers

Both components are now **async server components** using `getTranslations()` — no hardcoded French strings remain except one email CTA.

| File | What |
|---|---|
| `messages/fr.json` | `sections.careersHero.*` — job titles, descriptions, requirements, seasonal badge (18 keys) |
| `messages/fr.json` | `sections.careersInfo.*` — 4 info panels (headings + paragraphs) + apply CTA (12 keys) |
| `components/sections/CareersHero.tsx` | hardcoded email CTA `petittrain-lebayon@orange.fr` still present (apply-by-email link) |
| `components/sections/CareersInfo.tsx` | hardcoded email CTA `petittrain-lebayon@orange.fr` still present |

**When cloning:** check if new location has careers page (optional per site). If yes: update the 30 i18n keys in `messages/fr.json` under `sections.careersHero` and `sections.careersInfo`, run `npm run translate`, and replace both hardcoded email addresses.

---

## 12. Privatisation

`PrivatisationHero.tsx` is a `'use client'` component now fully i18n'd via `useTranslations('sections.privatisationForm')`.

| File | What |
|---|---|
| `messages/fr.json` | `sections.privatisationForm.*` — all 35 keys: form section headings, 12 field labels/placeholders, submit/loading buttons, success heading+body, image overlay text+alt |
| `app/actions/privatisation.ts` | Server action (Make webhook POST) — no strings, just the webhook call |
| Vercel env var | `MAKE_PRIVATISATION_WEBHOOK_URL` |

**When cloning:** decide per-site if privatisation page is enabled. If yes: update the 35 i18n keys in `messages/fr.json` under `sections.privatisationForm`, run `npm run translate`, and set the `MAKE_PRIVATISATION_WEBHOOK_URL` env var in Vercel.

---

## 13. SEO

| File | Line(s) | What |
|---|---|---|
| `app/sitemap.ts` | 12–23 | `routes` array (10 paths, priority + changeFrequency) |
| `app/layout.tsx` | 44–77 | Metadata (metadataBase via lib/site.ts env var — **keep**, this is generic) |
| `lib/site.ts` | entire | `SITE_URL` env var + `absoluteUrl` helper — **keep** (generic) |
| `app/robots.ts` | — | `/robots.txt` generator — **keep** (generic) |
| `docs/seo/migration-redirect-map.xlsx` | — | Per-location 301 map for migrating off petittrain-morbihan.com |

**When cloning:** update sitemap routes if URL structure differs. Fill in the correct sheet of the migration-redirect-map XLSX for the new location.

**Title pattern** (established 2026-04-28): all 48 page titles follow `[keyword] — Petit Train de Carnac, Morbihan`. Homepage follows `[Brand], Morbihan — [descriptor]`. "Morbihan" always sits directly after "Carnac". This pattern lives in `messages/{locale}.json` under `metadata.<page>.title` — edit fr.json then run `npm run translate`.

---

## 14. Photos — see `docs/image-manifest.md`

The image manifest is the authoritative list of every image file → where it's used. When cloning, generate a new image-manifest.md for the new location. Every filename in `public/figma-assets/` either (a) gets replaced with the new photo at the same filename (no code changes needed), or (b) gets a new filename and requires updating references in the tsx files.

**Recommended approach:** keep same filenames, swap files. Zero code changes for photos.

---

## 15. i18n — translation catalogs

| File | What |
|---|---|
| `i18n/routing.ts` | Locales array, defaultLocale, localePrefix, localeLabels (flag emoji + native name per locale) |
| `i18n/request.ts` | Per-request loader with deep-merge French fallback |
| `i18n/navigation.ts` | createNavigation(routing) → Link, useRouter, usePathname, redirect, getPathname |
| `proxy.ts` (project root) | next-intl middleware (Next 16: NOT `middleware.ts`) |
| `messages/fr.json` | **Canonical source of truth.** Every page/section's strings, organized by namespace: `nav.*`, `navbar.*`, `footer.*`, `breadcrumb.*`, `shared.*`, `hero.*`, `metadata.<page>.*`, `pages.<page>.*`, `sections.<component>.*`. B2 additions (2026-04-28): `sections.careersHero.*` (18 keys), `sections.careersInfo.*` (12 keys), `sections.privatisationForm.*` (35 keys) |
| `messages/{en,es,de,it,nl}.json` | Derived translations. Sync via `npm run translate` |
| `messages/.translation-meta.json` | Auto-managed. Tracks SHA256 hashes of fr.json values; lets the sync script know what changed since last run |
| `scripts/translate-i18n.ts` | AI sync script (Anthropic SDK). Run when fr.json changes. Needs `ANTHROPIC_API_KEY`. |
| `app/sitemap.ts` | Emits 1 entry per route × locale with `alternates.languages` hreflang map |
| `components/layout/LanguageDropdown.tsx` | Custom motion-driven dropdown in announcement banner |
| `tests/i18n-coverage.spec.ts` | Playwright spec: FR stop-word leakage detection + literal HTML tag detection across all 6 locales × 8 pages |

**When cloning:**
1. Decide locales (edit `i18n/routing.ts:locales` + `localeLabels`).
2. Edit `messages/fr.json` for new content (keep namespaced keys identical).
3. `npm run translate` to sync the rest.
4. Validate: `for f in messages/*.json; do node -e "JSON.parse(require('fs').readFileSync('$f','utf-8'))" && echo OK; done`.
5. Run `npx playwright test tests/i18n-coverage.spec.ts` — auto-detects French copy leaking into other locales (>5 FR stop-word hits per page = fail) and raw HTML tags rendered as literal text (any `<br/>` in body text = fail).

---

## What's safe to leave alone (generic infrastructure)

Don't touch these when cloning:

- `components/providers/AnimationInit.tsx` (animation system contract — see ARCHITECTURE.md)
- `components/providers/LenisProvider.tsx` + `PageTransitionProvider.tsx`
- `components/ui/RegiondoWidget.tsx` (only the fallback phone/email — rest is generic)
- `components/ui/ScrollReveal.tsx`, `TransitionLink.tsx`, `TransitionOverlay.tsx`, `HeroVideoPanel.tsx`
- `components/seo/BreadcrumbSchema.tsx`
- `lib/site.ts`, `lib/utils.ts`
- `app/sitemap.ts`, `app/robots.ts` (structure stays; only `routes` content changes per site)
- `app/globals.css`
- `next.config.ts`, `tsconfig.json`, `package.json` dependencies (only `name` field changes)
- `playwright.config.ts`
- `.claude/settings.json`
- `docs/lessons.md` (generic lessons — keep)
- `tests/qa.spec.ts` (update the expectations to match new site, keep the structure)

---

## One-command audit for the new site

Before committing a cloned-and-swapped site, run this:

```bash
# Any remaining Carnac-specific hardcoding (code + JSON catalogs)?
grep -rni "carnac\|menec\|lebayon\|54206d\|4d1c64\|5712cb43\|f7f7f0" \
  --include="*.tsx" --include="*.ts" --include="*.css" --include="*.json" \
  app/ components/ lib/ styles/ messages/ docs/

# Should return only new-site values. Any "carnac"/"menec"/"lebayon"/"f7f7f0" hit = something missed.

# i18n catalog sanity:
for f in messages/*.json; do node -e "JSON.parse(require('fs').readFileSync('$f','utf-8'))" 2>&1 && echo "$f OK" || echo "$f FAIL"; done
```
