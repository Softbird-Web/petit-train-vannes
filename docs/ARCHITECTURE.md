# Architecture — why things are built this way

**Who this is for:** a future Claude session (or teammate) who's tempted to change something load-bearing. Every decision here was deliberate. If you're about to change one, read the rationale first.

---

## Stack

### Next.js 16 (App Router) + TypeScript

**Why:** static + dynamic in one framework, built-in file-based conventions for SEO primitives (`app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`), first-class Vercel deploy, mature App Router (2+ years GA), and we use server actions for the privatisation form.

**Not Astro:** we have enough interactivity (GSAP scroll reveals, page transitions, smooth scroll, Regiondo widget, forms with server actions) that Astro's "islands" model would mean hydrating most of the site anyway. Next is simpler at this scope.

**Not Pages Router:** `metadataBase` + the `app/sitemap.ts` / `app/robots.ts` file conventions are App Router–only. Migrating later = weeks of work.

**Version pinned:** Next 16.2.3. Turbopack is the default bundler. Don't downgrade; don't switch to webpack.

### Tailwind CSS v4

**Why arbitrary values (`text-[#54206d]`) over `theme.extend` tokens:** this is a 1-instance design (one brand, one designer, no reusable component library spanning multiple sites yet). Arbitrary values = faster iteration, direct Figma → code translation.

**Why `font-normal` on every heading:** browser default is `font-weight: 700` for `<h1>`–`<h6>`, and Tailwind v4's preflight does NOT reset it. Bricolage Grotesque looks wrong at 700 (too thick). Every heading MUST explicitly set `font-normal` (or the intended weight).

**Font swap (April 2026):** Libre Baskerville (heading) + Roboto/Inter/Nunito/Raleway (body) → Bricolage Grotesque (heading) + Manrope (body). Both via `next/font/google`. The swap was a global find/replace on `font-['<old>',<fallback>]` classNames + `next/font/google` imports in `app/[locale]/layout.tsx`.

**Not shadcn:** shadcn solves "design system with 50 components." We have 20-odd one-off sections, each tailored from Figma. Shadcn would add friction without benefit. Same logic for the i18n language dropdown — custom `LanguageDropdown.tsx` (motion-driven, ~80 lines) matches the brand palette without dragging in a theming layer.

**When extracting `lib/brand.ts` in Phase 2 of NEW-SITE-PLAYBOOK:** replace hardcoded hex in components with `style={{ color: brand.colors.primary }}` or a `cn()` helper that reads CSS vars. Don't introduce shadcn just for that.

### GSAP + Lenis for animation

**Why GSAP:** scroll-reveal + timeline choreography + ScrollTrigger are GSAP's strengths. The free CDN version (3.15+) includes Draggable + InertiaPlugin which we use on the Reviews slider. No licensing issue.

**Why Lenis:** smooth-scroll that respects `prefers-reduced-motion`. Pairs with GSAP via the `lenis-scroll` custom event dispatched in `LenisProvider`.

**The animation contract** (the part that MUST stay stable across sites):

```
<section data-anim-section>           ← triggers scroll reveal
  <div data-anim-item>label</div>     ← these stagger in DOM order
  <h2 data-anim-item>heading</h2>
  <p data-anim-item>body</p>
</section>
```

- `data-anim-section="hero"` = animate IMMEDIATELY on load (no scroll trigger). Non-hero = scroll-triggered at `top 80%`, once.
- `data-anim-item` children stagger 0.12s apart in DOM order. Same blur + yPercent 60 → 0 transition everywhere.
- If section has zero `data-anim-item` children, it fades as one block. This is the fallback for sliders, accordions, marquees.
- Navbar: `data-anim-navbar` on the header — animates once on first page load, persists across client-side route transitions.

**Do not break this contract.** If you want different animation behavior on a specific section, wrap the section in a different pattern; don't special-case the engine. The engine is in `components/providers/AnimationInit.tsx` (~130 lines). Every line is deliberate.

**Page transition compatibility:** on route change, `PageTransitionProvider` dispatches `page-transition-start` which re-runs `initScrollReveal({ isFirstLoad: false })` — navbar doesn't re-animate, new page's hero plays immediate.

### Osmo character-stagger buttons

`.btn-animate-chars` pattern in `globals.css`. JavaScript splits button text into spans on mount, then CSS handles the rest via `transform` + `transition-delay`. Low cost, high polish. Do not replace with Framer Motion — the CSS version is 10× smaller.

---

## SEO foundation

### `lib/site.ts`

Single source of truth for the site URL. Reads `NEXT_PUBLIC_SITE_URL` env var with Vercel preview URL fallback. Consumed by:
- `app/layout.tsx` (`metadataBase`, JSON-LD `url` and `image` fields)
- `app/sitemap.ts` (all sitemap URLs)
- `app/robots.ts` (sitemap reference + host)
- `components/seo/BreadcrumbSchema.tsx` (via `absoluteUrl()`)

**Why env-driven:** when the custom domain goes live, set one env var in Vercel → sitemap, canonicals, JSON-LD, social preview URLs all update automatically. Zero code changes.

### Per-page canonical

Every `app/*/page.tsx` exports `alternates: { canonical: '/path' }`. Next.js resolves this against `metadataBase` → outputs `<link rel="canonical" href="https://<domain>/path">`. This prevents duplicate-content penalties if the site is accessible via multiple URLs.

### Structured data (JSON-LD)

- **Root layout:** `TouristAttraction` + `LocalBusiness` schema (business info, aggregate rating, geo, hours). Shared across all pages.
- **`/faqs` + components using FAQ.tsx:** `FAQPage` schema — one JSON-LD per page, one `Question` entry per visible FAQ. Critical for AEO (Google AI, ChatGPT, Perplexity pull answers from this).
- **Subpages:** `BreadcrumbList` via `<BreadcrumbSchema>` component. Simple 2-item breadcrumbs (Accueil → [Page Name]). Enables breadcrumb SERP snippet.

**Why absolute URLs in JSON-LD:** crawlers don't resolve relative paths inside script tags. Every `@id`, `url`, `image` field = absolute via `absoluteUrl()` or `SITE_URL`.

**Why not `WebSite` + `Organization` schema:** they don't add ranking value for a local attraction. `TouristAttraction` + `LocalBusiness` is the right pair.

### Sitemap priority strategy

`app/sitemap.ts` weights homepage at 1.0, main conversion pages (`/book`, `/prices`, `/routes`) at 0.9, content pages at 0.7–0.8, legal at 0.2. `changeFrequency` is set to `monthly` for content that updates (hours, prices, FAQ) and `yearly` for static content (legal, privacy).

---

## Booking integration (Regiondo)

### Why Regiondo

Client's existing booking provider. We don't want to reinvent booking; they have calendar + payments + ticketing wired up already. The widget renders an iframe/shadow-DOM inside a `<product-details-widget>` custom element.

### Pattern in use (`components/ui/RegiondoWidget.tsx`)

1. **Script load:** `next/script strategy="afterInteractive"` — runs after hydration, dedupes across client-side nav.
2. **TypeScript custom element declaration:** React 19 moved the `JSX` namespace **inside the 'react' module**. Global `JSX` declaration silently doesn't work. Must use `declare module 'react' { namespace JSX { interface IntrinsicElements { ... } } }`.
3. **Fallback:** `<Script onError>` sets a React state flag → swaps the widget area for a phone/email fallback. Essential because `widgets.regiondo.net` is on some ad-blocker lists.
4. **`min-height` on container:** avoids CLS (layout shift) when the widget finishes loading.

**Do not inline the script in `layout.tsx` head** — that loads Regiondo JS on every page. Keep it scoped to `/book` via the BookingSection component.

**Widget ID is the only per-site variable** — passed as a prop, so RegiondoWidget is reusable across Vannes/Quiberon/Morbihan without modification.

---

## i18n with next-intl 4 — architecture

**Locales:** `fr` (default, no URL prefix), `en`, `es`, `de`, `it`, `nl`, `cs` (prefixed at `/{locale}/...`). Configured via `localePrefix: 'as-needed'` in `i18n/routing.ts`.

**Why next-intl over alternatives:**
- First-class App Router + Server Components support (next-i18next is Pages Router only)
- Type-safe with TypeScript inference from JSON catalogs
- Built-in middleware for locale negotiation
- Active maintenance (4.x line), no abandonment risk
- Locale-aware navigation wrappers (`createNavigation(routing)`) plug into `next/link` semantics

**Why `localePrefix: 'as-needed'` over `'always'`:**
- French is the canonical content + the home market — clean URLs (`/prices`, `/routes`) signal "primary content"
- Other locales prefixed (`/en/prices`) — clear SEO signal of translation, no ambiguity for `hreflang`
- Tradeoff: `'always'` would be slightly more uniform but would 301-redirect French users from `/` to `/fr/` on every visit, hurting LCP

**The fallback chain** (the unlock for partial translation):
1. Browser → `proxy.ts` middleware resolves locale from URL → reads `requestLocale`
2. `i18n/request.ts` validates against `routing.locales`; if invalid, returns `defaultLocale`
3. Loads BOTH `messages/fr.json` (canonical) AND `messages/{locale}.json` (target)
4. Deep-merges them — target keys win, French fills missing keys
5. Returns merged messages to React

This means missing/empty target translations fall back to French automatically. Phase 1 (Navbar/Footer/Hero translated) shipped without breaking the rest of the site — untranslated section content rendered French in non-FR locales until Phase 2 caught up.

**File-system architecture:**
```
i18n/
  routing.ts        ← defineRouting({ locales, defaultLocale, localePrefix }) + localeLabels
  request.ts        ← getRequestConfig with deepMerge(fallback, target)
  navigation.ts     ← createNavigation(routing) → Link, useRouter, usePathname, redirect, getPathname
proxy.ts            ← createMiddleware(routing) — Next 16 renamed middleware.ts → proxy.ts
app/
  [locale]/
    layout.tsx      ← async; setRequestLocale(locale); NextIntlClientProvider wraps children
    page.tsx        ← async; setRequestLocale; generateMetadata via getTranslations({locale, namespace})
    .../page.tsx    ← same pattern per page
  sitemap.ts        ← stays at app/ root; emits route × locale matrix with hreflang alternates
  globals.css       ← stays at app/ root
messages/
  fr.json           ← canonical source of truth
  en/es/de/it/nl/cs.json
  .translation-meta.json   ← auto-managed by scripts/translate-i18n.ts
```

**Server vs client component split with i18n:**
- **Server components** (most pages, layouts, Hero): `await getTranslations({locale, namespace})` for the `t()` function. Must call `setRequestLocale(locale)` first to enable static rendering.
- **Client components** (Navbar, Footer, BookingSection, Gallery, FAQ, LanguageDropdown): `useTranslations(namespace)` — no `setRequestLocale` needed; reads from the `NextIntlClientProvider` context.
- **Rich text** (HTML in translations like `<strong>` or `<br/>`): `t.rich('key', { strong: (chunks) => <strong>{chunks}</strong> })`. The tag names in the JSON value map to renderer functions.

**Locale-aware navigation:**
- `TransitionLink` and `PageTransitionProvider` import from `@/i18n/navigation`, NOT `next/link` / `next/navigation`. The next-intl wrappers auto-prepend `/{locale}` to internal hrefs based on the current route. Don't accidentally swap them back.

**Translation sync (`npm run translate`):**
- `scripts/translate-i18n.ts` uses `@anthropic-ai/sdk`
- Hashes every value in `messages/fr.json`; compares against `messages/.translation-meta.json` from last run
- Sends one batch prompt per target locale containing only the changed keys
- Tourism-context system prompt preserves proper nouns (Carnac, Vannes, etc.) and HTML-like tags (`<strong>`, `<br/>`)
- Manual edits to non-FR catalogs are preserved — the script only touches keys whose source hash changed

**Legal pages stay French in all locales** (`mentions-legales`, `politique-de-confidentialite`). Translating legal text is a liability — don't unless the client provides legally reviewed translations.

---

## SSR / hydration — locked rules

From hard-earned experience (see `docs/lessons.md` for the incident):

**NEVER do any of these in a `"use client"` component's render body OR at module scope:**
- `new Date()` / `Date.now()` — server time ≠ client time → hydration mismatch
- `Math.random()` — different between server and client
- `toLocaleString()` / locale-aware date/number formatting without explicit `locale` AND `timezone`
- `if (typeof window !== 'undefined')` branches that change JSX — keep JSX identical on first render; toggle state in `useEffect`

**Safe places for time-varying values:**
- Server actions (`app/actions/*.ts`)
- Route handlers
- Inside `useEffect` bodies
- Event handlers

**Concrete pattern for date-input `min` prop:**
```tsx
const [minDate, setMinDate] = useState('')
useEffect(() => {
  setMinDate(new Date().toISOString().split('T')[0])
}, [])
return <input type="date" min={minDate} />
```

**Before committing any `"use client"` change, grep:**
```bash
grep -rn "new Date\(\)\|Date\.now\(\)\|Math\.random\(\)" components/ app/ --include="*.tsx" | grep -v useEffect
```
Zero hits = safe.

---

## Deployment

### Vercel auto-deploy on push to main

Every `git push origin main` → Vercel builds + deploys. Preview URLs per branch. Production URL via the linked custom domain.

**The only env var that matters across sites:** `NEXT_PUBLIC_SITE_URL`. Set per-project in Vercel dashboard → Settings → Environment Variables. Must be `NEXT_PUBLIC_` prefixed so it's available client-side (used by some JSON-LD rendering).

**Other env vars (per site, as needed):**
- `MAKE_PRIVATISATION_WEBHOOK_URL` — if privatisation form is enabled
- `MAKE_WEBHOOK_URL` — legacy, not used anymore (Regiondo replaces it for booking)

### Next 16 + Node 24 + Turbopack

Vercel's default. Don't pin older versions. `vercel.ts` config file is preferred over `vercel.json` per Vercel platform guidance.

### Dependencies that MUST be in `dependencies` (not devDependencies)

- `tailwindcss` + `postcss` — or Vercel's production install skips them → build breaks
- `@types/*` packages — or TS fails on Vercel but passes locally

---

## Things NOT to change when cloning

If you're about to modify one of these, stop. They're load-bearing across multiple systems, and changing them regresses site #2 faster than anything else:

1. **Animation contract** — the two data attributes (`data-anim-section`, `data-anim-item`) are how every section opts in. Rewriting is a multi-day regression.
2. **SSR locked rules** — every hydration bug costs 1–2 hours to debug. See `docs/lessons.md` "Debugging hydration in < 30 seconds".
3. **`lib/site.ts` pattern** — all SEO primitives depend on it. Hardcoding the domain anywhere breaks the custom-domain swap.
4. **JSON-LD shape** — you can ADD fields, don't REMOVE. Schema.org evolves; we stay additive.
5. **Cookie consent setup** — banner config in `layout.tsx`, runtime at `cdn.jsdelivr.net/gh/eldardiz/cookie-consent-softbird`. Don't remove. GDPR compliance risk.
6. **Regiondo widget integration pattern** — TS declaration, `onError` fallback, `afterInteractive` script strategy. Changing any of the three breaks one of (TypeScript / ad-blocker users / client-side nav).
7. **The session-start hook** (`.claude/settings.json`) — auto-loads `docs/lessons.md`. Don't disable.

---

## Things that ARE meant to change per site (the customization surface)

See `docs/CUSTOMIZATION-MAP.md` for the full list.

Summary: identity, business contact, brand colors, hero copy, route stops, schedules, FAQs, photos, Regiondo widget ID, aggregate rating, social URLs, legal pages.

---

## Open architectural questions (deferred decisions)

1. **`lib/brand.ts` extraction.** Not done on Carnac (safer route). Will be done as Phase 2 of the Vannes site build.
2. **Monorepo vs. separate repos.** Currently separate per site. Switching to Turborepo would deduplicate shared components/patterns BUT adds Vercel + setup complexity. Solo dev + 4 sites: separate repos + template is simpler. Revisit if we hit 8+ sites.
3. **True GitHub template repo.** Currently clone-and-adapt. Could convert the Carnac repo to a GitHub template after `brand.ts` extraction lands. Saves one git reset step. Deferred to after Vannes.
4. **Hreflang for multilingual sites.** Carnac is French-only. If a future site wants EN + FR, add `alternates.languages` in metadata + `x-default` hreflang. Not currently wired.
5. **Private/sensitive env vars.** No secret env vars right now (Regiondo widget ID is public, all emails are public). If anything sensitive is added, document in `docs/ENV.md`.
