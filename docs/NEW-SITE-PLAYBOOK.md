# NEW SITE PLAYBOOK — Spawning a Petit Train microsite from this template

**Target: 1–2 working days per new site.** Carnac took ~20 hours because we discovered everything as we went. Sites 2–4 reuse the system.

This repo is the **canonical template** for all Petit Train microsites (Carnac ✅, Vannes, Quiberon, Morbihan-general). Same code skeleton, same patterns — only colors, photos, copy, and business data differ.

---

## Companion docs (read before starting)

1. **`docs/SITE-ONBOARDING-QUESTIONNAIRE.md`** — fill this out BEFORE starting Claude. All data in one place.
2. **`docs/SITE-ONBOARDING-QUESTIONNAIRE-CARNAC.md`** — worked example of what a filled questionnaire looks like.
3. **`docs/CUSTOMIZATION-MAP.md`** — every Carnac-specific line that needs to change in a new site, with file:line references.
4. **`docs/ARCHITECTURE.md`** — the WHY of every technical decision. Read if you're tempted to change something load-bearing.
5. **`docs/lessons.md`** — hard-won rules. Auto-loaded by the SessionStart hook (see `.claude/settings.json`).
6. **`docs/seo/migration-redirect-map.xlsx`** — 301 map for the old `petittrain-morbihan.com` → 3 new microsites.

---

## Phase 0: Before touching any code (30 min)

**Goal:** have ALL the data the new site needs in one place before Claude starts.

1. Copy `docs/SITE-ONBOARDING-QUESTIONNAIRE.md` → `docs/SITE-ONBOARDING-QUESTIONNAIRE-<LOCATION>.md`
2. Fill it out completely. Every blank = friction later.
3. Collect photos into a local folder: `~/Desktop/<Location>-photos/`:
   - Hero video MP4 (< 10MB, under 30s, starts on the main attraction)
   - Opening static image (shown briefly before the video plays)
   - Section photos per `docs/image-manifest.md` (1 per section, 1920px+)
   - 9–12 gallery photos (Gallery masonry section — varied aspect ratios help the cascade)
4. Confirm Regiondo widget ID from the client's dashboard.
5. Decide final production domain (can be set as Vercel env var later).
6. **Decide locales** — French-only, or add EN/ES/DE/IT/NL? If multi-locale, the cloned repo already has the i18n scaffold (next-intl 4 + proxy.ts + `messages/{locale}.json`). You'll just edit the catalogs in Phase 3.

**Output of Phase 0:** a filled questionnaire + a photo folder. Hand both to Claude to start Phase 1.

---

## Phase 1: Repo setup (15 min)

1. **Clone Carnac as the starting point** (easiest until we have a true template repo):
   ```bash
   cd ~/Desktop/
   git clone https://github.com/Softbird-Web/petit-train-carnac petit-train-<location>
   cd petit-train-<location>
   rm -rf .git
   git init && git add . && git commit -m "initial: clone from Carnac template"
   ```
   > ⚠️ **Always push after every commit.** `git commit` alone does NOT trigger Vercel. Run `git push origin main` after every commit — Vercel deploys are triggered by GitHub push events, not local commits. A commit sitting locally will not appear on the live domain. Verify with `git status` showing "nothing to commit, up to date" at the end of each session.
2. **Create a fresh GitHub repo** in `Softbird-Web` org:
   ```bash
   gh repo create Softbird-Web/petit-train-<location> --private --source=. --push
   ```
3. **Create a Vercel project** linked to that repo (Vercel dashboard → Add New → from Git repo).
4. **Set `NEXT_PUBLIC_SITE_URL` env var** in Vercel to the target production URL (or leave unset for now to use the Vercel preview URL).
5. Rename `package.json` `"name"` field to `"petit-train-<location>"`.

---

## Phase 2: Brand extraction — ONLY on site #2 (first Vannes session) (1–2 hours)

**This phase runs ONCE, on the first new site.** It extracts all Carnac-hardcoded values into a single `lib/brand.ts` config file. Sites 3–4 skip this and just edit that one file.

### Refactor

1. Create `lib/brand.ts`:
   ```ts
   export const brand = {
     identity: { name: '...', legalName: '...', slug: '...' },
     business: { phone: '...', email: '...', address: {...}, geo: {...} },
     colors: { primary: '#...', deep: '#...', bg: '#...', text: '#...' },
     booking: { regiondoWidgetId: '...', fallbackPhone: '...' },
     content: { heroHeading: '...', heroTagline: '...', heroDescription: '...' },
     aggregate: { rating: 4.7, reviewCount: 6000 },
     social: { facebook: '...', instagram: '...' },
     departurePoints: [/* array */],
     schedule: {/* by month → by point */},
     faqs: [/* array */],
     jobs: [/* array */],
   }
   ```
2. Replace hardcoded Carnac values throughout the codebase with reads from `brand.*`. Use `docs/CUSTOMIZATION-MAP.md` as the checklist — that's exactly the list of places that need swapping.
3. Run `npx tsc --noEmit` + `npx next build` after each category (identity → business → content → colors → ...) to catch regressions fast.

### Verification
- Every value that was Carnac-specific now comes from `brand`
- `grep -rn "Carnac\|54206d\|4d1c64" lib/ components/ app/` — no hardcoded hits (except for the brand.ts file itself)
- `npx playwright test` passes

**Output:** a codebase where swapping site identity = editing `lib/brand.ts` only.

---

## Phase 3: Content swap (Vannes, Quiberon, Morbihan — 2–4 hours per site)

With `lib/brand.ts` existing:

1. **Edit `lib/brand.ts`** with the filled questionnaire values.
2. **Photo pipeline** — for each photo in the inventory:
   ```bash
   sips -Z 1920 <src> --setProperty formatOptions 50 --out public/figma-assets/<target>
   ```
   Update `docs/image-manifest.md` in the new repo with the new image list.
3. **Copy changes** — for any copy that isn't in `brand.ts` (e.g., FAQ answers, route descriptions, section labels), find-and-replace through Claude.
4. **i18n catalog swap (if multi-locale)** — see Phase 3b below.
5. **SEO metadata** — update `alternates.canonical` paths if URL structure changes; update sitemap priority if routes change.
6. **Video + opening image** in `app/[locale]/page.tsx` — update `rightVideoSrc` and `openingImageSrc` props on `<Hero />`.

---

## Phase 3b: i18n catalog swap (only if site is multi-locale — ~1 hour)

The cloned repo ships with a working i18n stack: `next-intl` 4, `proxy.ts` middleware, `i18n/{routing,request,navigation}.ts`, locale-aware `Navbar`, `LanguageDropdown`, `TransitionLink`, sitemap with hreflang. You don't need to rebuild any of that.

What you DO need to do for the new site:

1. **Edit `messages/fr.json`** — replace every Carnac-specific value with the new location's content. Key paths stay identical; only French values change.
2. **Sync the other 5 locales**:
   ```bash
   ANTHROPIC_API_KEY=sk-ant-... npm run translate
   ```
   The script (`scripts/translate-i18n.ts`) hashes every French value, detects what changed since the last run (via `messages/.translation-meta.json`), and only re-translates new/changed keys per target locale. Cost: pennies per run.
3. **Decide which locales the new site needs.** If only some, edit `i18n/routing.ts`:
   ```ts
   locales: ['fr', 'en', 'de'],  // drop the unused ones
   ```
   Update `localeLabels` in the same file to match.
4. **Validate** all locale JSONs parse:
   ```bash
   for f in messages/*.json; do node -e "JSON.parse(require('fs').readFileSync('$f','utf-8'))" && echo "$f OK"; done
   ```
5. **Don't translate** the legal pages (`mentions-legales`, `politique-de-confidentialite`) unless the client provides legally reviewed translations. They're FR-only by design — fine because they fall under `app/[locale]/` and just render French content under any locale.

**Watch out for:**
- `proxy.ts` at project root must exist (Next 16 — NOT `middleware.ts`)
- After moving any pages around: `rm -rf .next` before `tsc/dev`
- Hand-authored translations: validate JSON parses; German `„..."` and French `«...»` use Unicode quotes (the closing curly quote is U+201C, not ASCII `"`)
- `setRequestLocale(locale)` must be called at the top of every page under `[locale]` — otherwise static rendering breaks

---

## Phase 4: QA (1–2 hours)

1. **Local browser check** at 3 breakpoints: 390 × 844 (mobile), 768 × 1024 (tablet), 1280 × 800 (desktop)
2. **TypeScript + build**: `npx tsc --noEmit && npx next build` → 0 errors, all pages prerender
3. **Playwright smoke tests** — update `tests/` for the new site's values, run `npx playwright test`. Also run `npx playwright test tests/i18n-coverage.spec.ts` — this spec detects FR stop-word leakage into non-FR locales and literal HTML tag rendering bugs (e.g. `<br/>` appearing as text).
4. **Visual regression** — screenshot every page at 3 breakpoints, review side-by-side with Carnac for structural consistency
5. **Hydration check** — open `/book` and every form-containing page in dev mode, look for React hydration warnings in the console
6. **Cookie consent** — verify the banner appears and the privacy policy links to the right page
7. **Cross-browser** — Chromium + WebKit via Playwright config

---

## Phase 5: SEO migration (1 hour)

1. Update `app/sitemap.ts` if the route list differs from Carnac
2. Add the site to Google Search Console (new property) and submit `/sitemap.xml`
3. Fill in the 3rd sheet of `docs/seo/migration-redirect-map.xlsx` for this specific location (Vannes or Quiberon)
4. Coordinate with the old site host (petittrain-morbihan.com) to implement the 301 redirects FROM the old location-specific URLs TO the new microsite
5. Submit a **Change of address** request in GSC for the old `petittrain-morbihan.com/en/<location>/` property
6. Outreach to backlinks: TripAdvisor, OT <location>, Morbihan Tourism, Brittany Tourism, Google Business Profile (see backlinks sheet in the XLSX)

---

## Phase 6: Launch checklist

- [ ] Custom domain pointed to Vercel (DNS: A/CNAME records)
- [ ] Vercel custom domain verified, SSL cert issued
- [ ] `NEXT_PUBLIC_SITE_URL` env var updated to production domain
- [ ] Regiondo widget ID confirmed correct (load `/book`, book a fake test, verify it hits the right product)
- [ ] Cookie-consent classified Regiondo cookies if GDPR zone
- [ ] Google Business Profile website field updated (1-click, biggest ranking signal)
- [ ] 301 redirects live at petittrain-morbihan.com
- [ ] GSC Change of Address submitted
- [ ] Backlink outreach emails sent (first batch: TripAdvisor + OT + tourism boards)
- [ ] Playwright tests pass
- [ ] TypeScript 0 errors, build clean
- [ ] Commit pushed, Vercel deployed
- [ ] Client review + sign-off

---

## Timeline (realistic)

| Phase | Carnac (baseline) | Site #2 (Vannes) | Sites #3–4 |
|---|---|---|---|
| 0 — Prep + questionnaire | N/A (emergent) | 1 hour | 30 min |
| 1 — Repo setup | 2 hours | 15 min | 15 min |
| 2 — Brand extraction | N/A | 1–2 hours | 0 (already done) |
| 3 — Content swap | 15 hours | 4 hours | 2 hours |
| 3b — i18n catalog swap (if multi-locale) | 8 hours (Phase 1+2) | 1 hour | 30 min |
| 4 — QA | 3 hours | 2 hours | 1 hour |
| 5 — SEO migration | 2 hours (new foundation) | 1 hour | 1 hour |
| 6 — Launch | done | 1 hour | 30 min |
| **Total** | **~30 hours** | **~10–11 hours** | **~5–6 hours** |

---

## Things to decide BEFORE starting a new site

1. **Custom domain**: ready and pointing to Vercel, or still TBD?
2. **Target launch date**: firm or flexible?
3. **Content language(s)**: French-only (Carnac), or add EN/DE/ES/IT/NL?  Carnac dropped them; the other sites may or may not need multi-lang.
4. **Old URL structure**: what FR keyword-rich slug does the old `petittrain-morbihan.com` use for this location? (see `docs/seo/migration-redirect-map.xlsx`)
5. **Regiondo widget**: different widget ID per location? Confirmed with client?

---

## If something looks off when following this playbook

- **Check `docs/lessons.md`** first — it's auto-loaded and covers SSR/hydration, Tailwind v4, git hygiene, Vercel deploy gotchas, tool selection, etc.
- **Check `docs/ARCHITECTURE.md`** for the WHY behind any decision that seems wrong — it probably isn't wrong, it was considered.
- **Don't refactor load-bearing systems** (animation contract, SSR rules, SEO foundation, Regiondo integration) without reading ARCHITECTURE.md first. These decisions took hours to land; re-discovering them on site #2 is a regression.
