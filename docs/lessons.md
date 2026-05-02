# Lessons Learned

Append 1–3 entries per session. Session-start: read this file. Session-end: add to it before commit.

---

## next-intl 4 — `t.rich` does NOT parse self-closing void tags (2026-04-28 evening)

- **The trap**: writing `<br/>` inside an i18n value AND providing `br: () => <br />` in the `t.rich(...)` handlers map looks correct, but next-intl 4's parser only handles **paired** XML-style tags (`<strong>...</strong>`). Self-closing `<br/>` falls through and renders as literal text "&lt;br/&gt;" in the DOM. The `br:` handler is dead code — it's never invoked. Symptom: visible `<br/>` characters mid-sentence in the rendered page. Caught only by visual QA, never by tsc or JSON validation.
- **Fix**: split the message into two keys around the line break, render with a plain `<br />` JSX element between two `t(...)` / `t.rich(...)` calls. Or, in older guidance, use `<br></br>` paired tags — but splitting is cleaner.
- **Generalisation**: for ANY void HTML element (`<br/>`, `<hr/>`, `<img/>`) in i18n values, this same trap applies. Audit by grepping `messages/*.json` for `/>` and confirming each instance is rendered safely (or move to JSX).

## Multi-locale i18n leakage — hardcoded FR strings in non-translated components (2026-04-28 evening)

- **The audit reflex**: when the user reports "looks unprofessional in EN/DE/etc", the question to ask is "which components don't import `useTranslations` / `getTranslations`?" Not "are the messages files complete?" — components that ignore the active locale entirely are invisible to messages-file checks but render hardcoded strings every time.
- **Found 7 such components in this project** (RoutesTimeline, FAQsSection, ReviewsSlider, InformationsSchedule, RoutesHero defaults, CareersHero+Info, PrivatisationHero) — totalling ~150 hardcoded FR strings on the homepage and major subpages. The `i18n/request.ts` deep-merge fallback catches MISSING keys, but it can't catch a component that never calls `t(...)` in the first place.
- **Detection grep** (run before a multi-locale launch):
  ```bash
  for f in components/sections/*.tsx components/ui/*.tsx; do
    if ! grep -q "useTranslations\|getTranslations" "$f"; then
      grep -l "[àâéèêëîïôöûüçÀÂÉÈÊÎÏÔÛÇ]" "$f" 2>/dev/null
    fi
  done
  ```
  Lists every component that has French diacritics but doesn't import next-intl. Each is a leak source.
- **For real-customer testimonials**: don't translate them — translation destroys voice and authenticity. Wrap with `<span lang="fr">` / `<p lang="fr">` so screen readers and search engines know it's original-language content. Translate only the surrounding UI labels (subtitle, aria-labels, region label).

## SEO post-rebrand: audit OG + subpage metadata, not just the homepage (2026-04-28 session)

- **Rebrand the homepage `<title>` and you've changed ~5% of the SEO surface.** The other 95% lives in: (a) `metadata.title.template` in the root layout, (b) subpage metadata across N locales, (c) `openGraph` + `twitter` blocks (these don't pull from i18n and don't change per locale unless explicitly localized), (d) the JSON-LD `@type: TouristAttraction` block. Always audit every page × every locale via `curl <url> | grep -E '<title>|og:title|description'` before declaring an SEO swap done.
- **Next.js title template behaviour with localized titles.** When a page returns `title: <string>` from `generateMetadata`, the layout's `template: "%s — Brand"` is applied → suffix appears on subpages. BUT when the homepage uses `getTranslations()` to set its title, the template is NOT applied (the homepage's title has special treatment as the layout default). This means a freshly-rebranded homepage title can render clean while subpages still get the OLD template suffix. To skip the template explicitly anywhere, return `title: { absolute: "..." }`. To skip it implicitly (homepage), do nothing — Next handles it.
- **OG/Twitter cards are the silent SEO disaster.** They never appear in the page UI and never get caught by visual QA. Stale OG copy means LinkedIn/WhatsApp/Slack previews show pre-rebrand wording months after launch. Rule: any time you change a page title or description, check `<meta property="og:*">` on the same page. If `openGraph` is hardcoded in `layout.tsx` (not pulled from i18n), updating the i18n value alone is a no-op.
- **Lift the SEO keyword into the first ~80 chars of every description.** Search engines truncate around 150–160 and weight position-0 most. "Découvrez Carnac, ses célèbres mégalithes..." ranks worse than "Visite des mégalithes de Carnac..." for the keyword "mégalithes". Same shape applies to every locale equivalent.

## QA round post-launch (2026-04-28 session) — flyer-driven audit beats client-supplied list

- **Always re-audit the live site against the printed source-of-truth** when the client requests "fix X". Maryannick listed 5 changes; auditing the 2026 flyer surfaced 7 more — including a typo bug that had been live since launch ("Arrêt de bus Courqué" → should be "Cours des Quais"). Clients flag the things THEY notice; the printed flyer is the actual contract with end-users. Discrepancies hide in the gap.
- **Schedule data shape collapse.** The original `InformationsSchedule.tsx` shape `{ name, hours, note: <single JSX line> }` looked clean but encouraged copy-paste that diverged from the flyer in 3 axes simultaneously: frequency (every 30 min vs. every 20 min), close time (18h vs. 17h30), and per-departure detail (each row had identical Carnac Plage / Trinité times when the flyer differs by season). Lesson: when the source-of-truth is a 3×4 grid (3 departure points × 4 seasonal bands), the data shape must be that grid — don't flatten it into a per-month list.
- **Saturday rule + Cours des Quais typo + November closure** all hid behind "the times are wrong." Three separate bugs masquerading as one. When the symptom is "info is wrong", expand the audit before patching.
- **Features.tsx renders f*Desc as plain `t()`, not `t.rich`.** `<strong>...</strong>` tags inside the i18n value would render as escaped HTML text, not bold. If you want emphasis in feature descriptions, switch to `t.rich({ strong: (chunks) => <strong>{chunks}</strong> })` first OR rely on natural-language emphasis (lead with the surprising number/phrase). Same gotcha applies to bullets in `BeforeYouBook.tsx`.
- **Pricing card "BON PLAN" badge: corner-positioning trap on a section with same-color background.** Card has `bg-[#f5ebdd]` (cream) but lives inside `<section className="bg-[#4d1c64]">` (purple). Badge was `absolute top-0 right-0 bg-[#4d1c64]` — purple-on-purple at the card edge → the corner sticker visually merged into the section bg. Fix: pull the badge into the card's flex flow as an inline-pill below the heading. Self-aligned `inline-flex` + `rounded-full` + `self-start` reads as "label" not "corner sticker." Apply the same move to any sibling card on the same purple section.

---

## i18n with next-intl 4 (2026-04-25 session)

- **Next 16 renames `middleware.ts` → `proxy.ts`.** Same `createMiddleware(routing)` export, same matcher config, but the file at the project root must be `proxy.ts`. If you write `middleware.ts` it's ignored silently and your locale routing breaks. Easy 30-min waste.
- **`localePrefix: 'as-needed'`** is the right call when one locale dominates (default at `/`, others at `/{locale}/...`). Combined with `defaultLocale: 'fr'`, French pages stay at the bare path; English/Spanish/German/Italian/Dutch get prefixes. SEO-friendly.
- **Deep-merge fallback in `i18n/request.ts`** is the unlock for partial translation. When a key is missing in `messages/it.json`, fall back to `messages/fr.json`. Lets you ship Phase 1 (Navbar/Footer/Hero translated) without exploding the rest of the site — untranslated sections render French in non-FR locales, never an `IntlError`.
- **Every page under `[locale]` must be async**, await `params`, call `setRequestLocale(locale)` BEFORE rendering, and export `generateMetadata` via `getTranslations({locale, namespace: 'metadata.<page>'})`. Skip `setRequestLocale` and you lose static rendering — pages render dynamically every request, performance tanks.
- **Hero (and any section using `getTranslations()`) is an async server component.** Pages that render it must be async too. JSX renders async server components fine, but the typing requires the page wrapper to be async to await `params`.
- **`NextIntlClientProvider` wraps inside `<body>`** in `app/[locale]/layout.tsx` — not above. Outside `<body>` it errors. Inside, every client component below it can call `useTranslations()`.
- **TransitionLink + PageTransitionProvider must use `@/i18n/navigation`**, not `next/link` / `next/navigation`. The next-intl wrappers auto-prepend `/{locale}` to non-default-locale hrefs. Forget this and clicking a navlink on `/en/prices` takes you to French `/prices`.
- **Stale `.next` after moving pages to `[locale]`** → tsc throws "Cannot find module '../../../app/foo/page.js'". `rm -rf .next` clears it.
- **JSON quote escaping for translation files.** German `„...""` and French `«...»` use Unicode quotes. The closing German curly quote is U+201C, not ASCII `"`. If you accidentally use ASCII `"` to close, JSON.parse fails on the unescaped quote. Validate every locale file: `node -e "JSON.parse(require('fs').readFileSync('messages/de.json','utf-8'))"`.
- **Translation sync script** (`scripts/translate-i18n.ts`) hashes every French source value and only re-translates keys that changed since the last run (tracked in `messages/.translation-meta.json`). So manual fixes to non-FR catalogs aren't blown away. Needs `ANTHROPIC_API_KEY` env var.
- **Custom dropdown beats shadcn for brand-controlled UIs.** `motion`'s `AnimatePresence` + cubic-bezier `[0.22, 1, 0.36, 1]` (= GSAP's `power4.out`) gives a 30-line dropdown that matches the existing site UI. shadcn would have meant theming overrides + an unused dependency. Stick with custom for components that need to feel native to the brand.
- **Sitemap with hreflang** is one `.flatMap()` over routes × locales using `getPathname({locale, href})` — produces `<xhtml:link rel="alternate" hreflang="..."/>` automatically. Critical for multi-locale SEO.
- **Legal pages are FR-only** (mentions-legales, politique-de-confidentialite). Translating legal text is a liability — keep them French in all locales unless the client provides legally reviewed translations.

## Gallery — Osmo lightbox + JS masonry (2026-04-24 session)

- **CSS `columns: N` ≠ true masonry** when images have similar aspect ratios. Same-aspect images flow into rows, looking like a flat grid. For visible stagger you need shortest-column-packing JS: assign each photo to the column with the smallest accumulated normalized height. ~10-line algorithm in `Gallery.tsx`'s `distribute()`.
- **Osmo Flip + `overflow-hidden`**: do NOT put it on `[data-lightbox="trigger"]`, `[data-lightbox="trigger-parent"]`, or `[data-lightbox="item"]`. Flip animates by absolute-positioning the img out of its parent — overflow-hidden clips it weirdly during flight. If you need clipping (e.g. for parallax), use an inner wrapper that's NOT in the trigger chain.
- **Parallax on Gallery imgs** is dangerous with Flip — the scrub tween fights the FLIP animation. Tried `gsap.set(img, {yPercent:0})` before Flip.getState; reverted because the resize-handling in Lenis + the y-translate clip made the cards visually janky. Skip Gallery parallax unless you have time to wire `lenis.stop()/start()` callbacks tightly.
- **Responsive col-count via `useSyncExternalStore` + `matchMedia`** — SSR-safe, no hydration flash. `subscribe`, `getSnapshot`, `getServerSnapshot=()=>false` (default desktop on server), then `numColumns = isMobile ? 2 : 3`. Lightbox `useEffect` deps include `numColumns` so triggers re-bind on resize.
- **Index alignment between triggers and lightbox items**: render lightbox items as `columns.flat().map(...)`. Triggers in DOM order = column-first traversal; items must match.

## Figma → Code design system (2026-04-24)

- **PracticalInfo card hover-reveal**: native state is solid purple (image hidden); on hover, image fades in behind the existing gradient overlay so text stays legible. Pattern: `group` + `opacity-0 group-hover:opacity-100 transition-opacity duration-500`.
- **Icon badges**: don't double-wrap. If the SVG already has its own white fill + rounded rect, render it directly at fixed size with `rounded-[8px] shadow-[0_4px_12px_rgba(77,28,100,0.2)]`. No padded outer wrapper needed.
- **Pricing cards with corner badge**: `rounded-[16px] overflow-hidden` on the card. Without overflow-hidden, the absolutely-positioned "BON PLAN" badge's square top-right corner pokes past the rounded card edge.
- **Hero gradient `to-[60%]`**: `bg-gradient-to-b from-[#f5ebdd] to-white to-[60%]` makes white dominate the bottom 40% of the section. Pair with `bg-white` Note Importante banner for seamless white-to-white transition into the BookingSection below.

## Foundations (fix once, globally)

- **Browser `<h1>–<h6>` default to `font-weight: 700`.** Tailwind's preflight doesn't reset it. Always add `font-normal` (or whatever weight Figma shows) explicitly on every heading. Do this in a foundations pass before building pages, or expect a 24-file patch later.
- **No heading defaults in Tailwind v4.** `@import "tailwindcss"` does not ship `h1 { font-size: ... }` base styles. Either define a heading scale in `globals.css` or rely on per-use classNames — but commit to one pattern and document it in CLAUDE.md.
- **Animation systems must be scaffolded before pages.** Scroll-reveal attributes (`data-anim-section`, `data-anim="hero-title"`) need to be wired into every section at build time. Adding them after all pages exist = retrofitting every file.

## Figma

- Decorative vector elements (stars, icons pasted as SVG) can cause 100k+ token bloat — remove or simplify before running MCP.
- Always select sections individually, not the whole page.
- Collapsed containers need explicit dimensions when all children are absolute.
- File key for this project: `wTd0GeN1Y2HWGw3nkii3t8`.

## GSAP

- **Draggable + InertiaPlugin are free in GSAP 3.15.** Import from `gsap/Draggable` and `gsap/InertiaPlugin`, call `gsap.registerPlugin(Draggable, InertiaPlugin)` at module level in a `"use client"` component.
- **GSAP Draggable in React:** use `useEffect` + `useRef` (not `DOMContentLoaded`); store instance on a ref and kill it in cleanup; debounce resize and only re-init when `window.innerWidth` actually changes.
- **`snap: { x: snapPoints }` only** — TS types reject `{ x, duration }`; `duration` isn't valid on `SnapValue | SnapObject`.
- **`expo.out` ease + `duration: 0.75`** feels premium on slide transitions. Pair with a 0.1s blur-in / 0.2s blur-out for a polish effect.

## Next.js / Build

- **Lenis is ESM-only** — on Next 16 + Turbopack, use dynamic import or the build fails on Vercel.
- **Vercel builds can fail on missing devDeps** — if `tailwindcss` or `postcss` are in devDependencies, Vercel may skip them. Either move critical build tools to `dependencies` or set `NPM_CONFIG_PRODUCTION=false`.
- **Next 16 + Turbopack + Node 24** is the new default. Pin runtime in `vercel.ts` (not `vercel.json`) going forward.
- **`next/font/google` in `app/layout.tsx`** via CSS variables on `<html>` is the right pattern for 4+ font families.

## Next.js SSR / Hydration — NEVER render time-varying values at first paint

**The rule:** any value that differs between server and client render will break hydration. Never compute these at module scope or in the render body of a client component:

| ❌ Never (hydration mismatch) | ✅ Correct |
|---|---|
| `const today = new Date().toISOString().split('T')[0]` at module top | `useState('')` + `useEffect(() => setX(...), [])` — populates post-hydration |
| `min={new Date().toISOString().split('T')[0]}` inline on an input | Pass `minDate` prop computed via `useEffect` |
| `Math.random()` for keys or default IDs | Use `useId()` or stable indices |
| `const now = Date.now()` | Read from state set in `useEffect` |
| `if (typeof window !== 'undefined')` branches that change JSX | Keep JSX identical on first render; toggle state in `useEffect` |
| Locale-specific date/number formatting | Use `Intl.DateTimeFormat` with explicit locale AND timezone, or defer to `useEffect` |

**Concrete fix pattern (date input `min`):**

```tsx
// ❌ BAD — evaluated during render on both server and client, different result
<input type="date" min={new Date().toISOString().split('T')[0]} />

// ✅ GOOD — empty on first paint, filled in after hydration
export default function Form() {
  const [minDate, setMinDate] = useState('')
  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0])
  }, [])
  return <input type="date" min={minDate} />
}
```

**Why this costs hours when it bites:**
- The error message ("tree hydrated but some attributes...") doesn't point to the offending line — you have to grep for it.
- Symptom can look like "dev server isn't updating" or "state is weird" before you realize it's hydration.
- In production it silently degrades interactivity on the affected component.

**Pre-commit check to prevent reintroduction:**
```bash
# Any of these in a "use client" component's render path = likely hydration bug
grep -rn "new Date\(\)\|Date.now\(\)\|Math.random\(\)" components/ \
  --include="*.tsx" | grep -v "useEffect\|// " | grep -v "\.ts:"
```
Zero matches outside `useEffect`/server actions = safe.

**Safe places for `new Date()` / `Date.now()`:**
- Server actions (`app/actions/*.ts`) — always server-only
- `getServerSideProps` / route handlers
- Inside `useEffect` / event handlers — client-only after mount

## Next.js Dev Cache — images don't update when you replace files

**Symptom:** you replace `/public/figma-assets/foo.jpg` with a new file of the same name, but the dev server keeps showing the old image.

**Cause:** Next's image optimizer caches optimized variants in `.next/cache/images/`. Same filename = cache hit.

**Fix:**
```bash
rm -rf .next && npm run dev
# Then hard-refresh the browser (Cmd+Shift+R) — normal refresh won't bypass browser cache either
```

## Vercel deploy = `git push`, not `git commit` (2026-04-28 session)

- **The trap**: `git commit` succeeds and `git log` shows the commit, but the live site never updates. Root cause: commits were never pushed to GitHub. Vercel listens to GitHub push events, not local git state. Any number of local commits do nothing until `git push origin main`.
- **Detection**: `git status` shows "Your branch is ahead of 'origin/main' by N commits." If N > 0 after you expect the live site to reflect your changes, run `git push origin main`.
- **Rule**: push immediately after every commit when the intent is to deploy. Never end a working session without verifying `git status` shows "nothing to commit, up to date".

## Bulk i18n JSON updates — use Python, not manual Edit calls (2026-04-28 session)

- **The trap**: editing 6 locale files × N keys with the Edit tool requires reading the file first (to avoid the "file not read" error), then patching specific keys. For more than ~5 changes across multiple files this is error-prone (wrong offset, partial edits, silently skips if old_string doesn't match exactly).
- **Better approach for bulk updates** (e.g., SEO title sweep):
  ```python
  import json, pathlib

  def deep_merge(base, patch):
      for k, v in patch.items():
          if isinstance(v, dict) and k in base:
              deep_merge(base[k], v)
          else:
              base[k] = v

  updates = { 'fr': { 'metadata': { 'home': { 'title': '...' } } }, ... }
  for locale, patches in updates.items():
      p = pathlib.Path(f'messages/{locale}.json')
      d = json.loads(p.read_text())
      deep_merge(d, patches)
      p.write_text(json.dumps(d, ensure_ascii=False, indent=2))
  ```
  Then validate: `for f in messages/*.json; do node -e "JSON.parse(require('fs').readFileSync('$f','utf-8'))" && echo "$f ok"; done`
- **Rule**: any change touching >3 keys across >2 locale files → write a Python script first, run it, validate JSON, then commit the result. Don't hand-patch.

**When to suspect this:** you swapped an image, dev server reloaded, but the old image still shows. Not a code bug — cache issue.

## Images / Assets

- **`sips -Z 1920 --setProperty formatOptions 50`** gives ~300K JPEGs from 4–5MB originals, visually acceptable for web. Drop to `75` if you see artifacts; jump to `40` for hero backgrounds where size matters more than pixel-peeping.
- **Build the image manifest on Day 1.** Scanning 235 images and mapping them AFTER building 7 pages = full second pass across the site. See `docs/image-manifest.md`.
- **Filename conventions in Carnac-All-Images:** `carnac150.jpg` (no dash), not `carnac-150.jpg`. Always `ls` the source folder before writing sips commands.
- **Next.js `<Image>` requires a sized `relative` parent** when using `fill`. SVG icons: always `<Image fill className="object-contain">` inside a sized div. Never `<img>`.

## Bulk Edits

- **Python regex beats per-file `Edit` tool calls by ~10×** for classname-level changes across many files. Pattern from this session:
  ```python
  pattern = re.compile(r'(<h[12][^>]*className=")(?!.*font-normal)(font-\[\'Libre_Baskerville\',serif\])')
  # Add font-normal before the font family on every h1/h2 that doesn't have it
  ```
- **Grep before editing.** `Grep` with `output_mode: "content"` reveals the actual string in the file — multiple failed Edits usually mean the string you're matching is slightly different from what you remember.

## Iteration Control

- **Lock the acceptance spec BEFORE coding** for taste-driven sections (testimonials, hero, booking forms). This session: Reviews section was rewritten 7+ times because target wasn't locked. See `docs/acceptance-spec-template.md`.
- **Holistic bugs hide from per-section view.** The heading weight bug was invisible when looking at one page at a time; obvious when running `grep <h1 <h2` across the whole repo. Budget a holistic QA pass.
- **When the user re-enters plan mode mid-execution, they usually don't want you to skip execution** — they want to re-align on scope. Read the existing plan, evaluate against new request, decide continue vs. overwrite.

## Process

- **`lessons.md` only compounds if you write to it.** This file was empty for 10 days. Shipping the mechanism ≠ shipping the habit. Session-end checklist now includes "append to lessons.md before commit."
- **One page per session** (already in CLAUDE.md) works. Finish → commit → end session.
- **Don't batch QA into a "pass"** — 4 commits this session were labeled "QA pass" and each was a firefight. Screenshot per section at 360/768/1280 before moving on.

## Third-party widget embeds in Next.js 16 / React 19

**The rule:** any `<custom-element>` from a third-party script (Regiondo, Calendly, Intercom, etc.) needs 3 things in Next.js 16 + React 19:

1. **TypeScript declaration** — React 19 removed the global `JSX` namespace. `declare global { namespace JSX { ... } }` silently does nothing and you get a `TS2339` on the custom element. Use the React module-scoped namespace:
   ```ts
   declare module 'react' {
     namespace JSX {
       interface IntrinsicElements {
         'product-details-widget': React.DetailedHTMLProps<
           React.HTMLAttributes<HTMLElement> & { 'widget-id': string },
           HTMLElement
         >
       }
     }
   }
   ```
   **Why:** React 19's `@types/react` types put JSX inside `'react'` (scoped), not global. TS docs still show the old global pattern — don't trust them on this.

2. **Script loading via `next/script strategy="afterInteractive"`** — runs after hydration, doesn't block initial paint, auto-dedupes across client-side navigations. Never use `<script>` in the component return — it'd re-insert on every render.

3. **`onError` fallback state** — third-party widget domains get blocked by ad blockers (uBlock, Privacy Badger, corporate firewalls). Without a fallback, users see a blank space where they expected a booking UI. Pattern:
   ```tsx
   const [failed, setFailed] = useState(false)
   if (failed) return <ContactFallback />
   return (
     <>
       <Script src="..." strategy="afterInteractive" onError={() => setFailed(true)} />
       <custom-element />
     </>
   )
   ```

**Additional traps:**
- The third-party widget usually renders in iframe/shadow DOM with its own styles — you can't cascade your Tailwind classes into it. Budget zero styling work for the widget internals; style only the wrapper container.
- If widget is above the fold, set a `min-height` on the container so the page doesn't reflow when the widget finishes loading (avoids CLS).
- Cookie-consent classification: third-party booking/tracking widgets usually need to go in "Marketing" or "Analytics" category. Don't auto-load pre-consent in GDPR jurisdictions.
- `next build` still prerenders the page statically — the widget hydrates client-side. That's fine for SEO (the branded header text above it is indexed as usual).

## GSAP Scroll-Reveal — unified 2-attribute contract

**Why:** the original per-section-specific markup (`data-anim="hero-title"`, `data-anim="tagline"`, `data-anim="hero-paragraph"`, ...) only worked for Hero and required hard-coded script logic for each name. Adding a new section meant extending the engine. Didn't scale past 1 section.

**The new contract (in `components/providers/AnimationInit.tsx`):**
- `data-anim-section` on any `<section>` = reveal on scroll (trigger: `top 80%`, `once: true`)
- `data-anim-section="hero"` = play immediately on load/transition, no scroll-trigger
- `data-anim-item` on any descendant of a section = it gets staggered in DOM order (0.12s between siblings)
- **Zero items inside the section = fallback fades the `<section>` as one block** (use this for sliders, marquees, accordions, or anything where staggering children would fight the component)
- Navbar: `data-anim-navbar` on the layout header — animates once on first page load only (persists across page transitions)
- Legacy `data-anim="anything"` tags still picked up as items (backward compat; no rewrite needed)

**Authoring rule:** tag the natural blocks, not individual atoms. A section's label+heading+paragraph group is typically ONE `data-anim-item`, not three. Keep staggered items to 2–6 per section for best feel.

**Interaction with page transitions (`PageTransitionProvider`):** on `page-transition-start` event, `initScrollReveal` re-runs with `isFirstLoad: false` so navbar doesn't re-animate. New page's hero gets `immediate: true` and plays right after the overlay lifts.

**Trap to avoid:** don't tag form sections with many individual inputs as items. The stagger would feel twitchy. Tag the form wrapper as ONE item instead. (BookingHero, PrivatisationHero pattern.)

## Tool Selection (stop defaulting to Bash)

- **Grep** — content search inside files. Supports regex, globs, multiline. Use `output_mode: "content"` to see matches with line numbers.
- **Glob** — find files by path pattern (`**/*.tsx`). Faster than `find`.
- **Read** — known file path. Always prefer over `cat`.
- **Agent / Explore** — multi-round research across the codebase. Use when the answer needs 3+ searches.
- **Bash** — shell-only operations (`sips`, `git`, `npm`, `mv`). NOT for `grep`, `find`, `cat`, `head`, `tail`, `sed`, `awk`.
- **Rule of thumb:** if a dedicated tool exists, Bash is the wrong choice. Wasted tool calls = wasted tokens = slower sessions.

## Plan Mode Handling

- When the user re-enters plan mode and a plan file already exists, **read it first**. Evaluate: same task (continue/refine) or different task (overwrite).
- Don't assume the existing plan is relevant to the new message — users re-enter plan mode to re-align, not to resume.
- Must edit the plan file before calling `ExitPlanMode`. "Make no changes to the plan" is not an option.
- In plan mode, the ONLY writable file is the plan file. Everything else must be read-only.

## Git Commit Hygiene

- **Stage specific files** — `git add <files>`, never `git add -A` or `git add .` (can commit `.env`, large binaries, `.next/`, unrelated changes).
- **Multi-line commit messages** use HEREDOC:
  ```bash
  git commit -m "$(cat <<'EOF'
  feat: short summary

  - detail 1
  - detail 2

  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
  EOF
  )"
  ```
- **One commit per completed feature/fix** — avoids rollback tangles. Never amend pushed commits.
- **Never push or force-push without explicit user approval.** Same for destructive `git reset --hard`, `git clean -f`, `git branch -D`.
- **Check `git status` before committing** — if untracked files exist (`.claude/`, `test-results/`), decide to commit or ignore, don't blindly include.

## Vercel Deploy — Expanded Gotchas

- **Env vars:** set in Vercel project settings → Environment Variables, NOT committed to repo. Each env var needs Production/Preview/Development flags. Missing env in Production = silent 500s on server actions.
- **Preview URLs:** every git branch auto-deploys to `<project>-git-<branch>-<team>.vercel.app`. Share these for client review instead of deploying to main.
- **devDependencies on Vercel:** if `NODE_ENV=production` (default), `npm ci` skips devDeps. Critical build tools (`tailwindcss`, `postcss`, type packages) must be in `dependencies` OR set `NPM_CONFIG_PRODUCTION=false`.
- **Redeploy trigger:** changing env vars in Vercel settings does NOT redeploy. Push a commit or click "Redeploy" manually.
- **Edge vs Node runtime:** Edge has many incompatibilities (Node APIs, some npm packages). Default to Node runtime unless you specifically need Edge.

## Tailwind CSS v4 (different from v3 — rewrite habits)

- **Import syntax:** `@import "tailwindcss";` — no more `@tailwind base/components/utilities`.
- **No default heading styles.** `<h1>–<h6>` inherit browser defaults (bold 700). Always set `font-normal` explicitly.
- **`@theme` directive** replaces `tailwind.config.js` for tokens. CSS custom properties defined in `@theme {}` become utility classes automatically.
- **Arbitrary values** like `text-[#54206d]`, `w-[499px]`, `tracking-[-0.48px]` are fully supported — don't abuse them but don't avoid them.
- **`cn()` helper** (`lib/utils.ts`) = `twMerge(clsx(inputs))`. Use it whenever combining conditional classes. `tailwind-merge` resolves conflicts correctly (later wins).
- **No PurgeCSS config needed** — Tailwind v4 scans files automatically.

## `<input type="date">` / Form Input Gotchas

- **`min={someDate}`:** hydration bomb if `someDate` is computed at render. Always use `useEffect`-populated state. (See SSR/Hydration section above.)
- **Initial value:** MUST be `''` (empty string) for controlled inputs. `undefined` triggers React's "changing from uncontrolled to controlled" warning.
- **Format:** HTML date inputs expect `YYYY-MM-DD`. `new Date().toISOString().split('T')[0]` gives this, but runs in UTC — near midnight the user's local date may differ by a day. For date-only user input, this usually doesn't matter; for precise timing, use locale-aware formatting in `useEffect`.
- **`<form noValidate>`** to disable browser's built-in validation and rely on your own. Pairs well with `required` on inputs (still gets the :valid/:invalid CSS states).
- **Server actions vs onSubmit:** Server actions (`app/actions/*.ts`) are safe for time-varying values (they run server-side). Client-side `onSubmit` handlers can freely use `new Date()` — they run on user action, not at render.

## Debugging Hydration in < 30 Seconds

When you see "tree hydrated but some attributes didn't match":

1. **Grep the repo first:**
   ```bash
   grep -rn "new Date\|Date\.now\|Math\.random\|toLocaleString\|toLocaleDateString\|typeof window" components/ app/ \
     --include="*.tsx" | grep -v useEffect | grep -v "\.ts:"
   ```
2. **Check any `"use client"` components** with conditional rendering based on `window`, `localStorage`, or user-agent.
3. **Check date/number formatting** — `(123.45).toLocaleString()` differs by locale between server and client.
4. **Check third-party libraries** — some inject random IDs, attributes, or classes that differ between render passes (e.g., auto-generated `id`s).
5. **As last resort:** `suppressHydrationWarning` on the offending element — ONLY if the difference is intentional and small (e.g., a clock). Don't sprinkle it.

## Figma MCP — Token Budget & Selection

- **Always select ONE Figma section at a time**, not the full page. Full-page selections can balloon to 100k+ tokens from decorative vectors.
- **Pre-kill decorative vectors** (star ratings, icons pasted as raw SVG paths, repeated shapes) before capturing. Most pages have these.
- **Arm the capture hook first:**
  ```bash
  rm -rf /tmp/figma-to-react && mkdir -p /tmp/figma-to-react/captures && touch /tmp/figma-to-react/capture-active
  ```
- **Write `config.json`** with the Figma file key + node ID before calling `get_metadata` / `get_design_context`.
- **Sub-agent pattern:** Spawn a Task agent for the Figma call so the raw response doesn't pollute the main context. Parent agent only sees the final TSX.
- **Collapsed containers** — if all children are absolutely positioned, the container collapses to 0×0. Set explicit `w-[...] h-[...]` on the parent.

## Image Optimization — Beyond `sips`

- **`next/image` `quality` prop** defaults to 75. Drop to 60 for section backgrounds (saves ~20% with no visible loss). Raise to 90 for hero images that need sharpness.
- **`priority` prop** — only on the LCP image (usually homepage hero). Preloads at higher priority, no lazy-loading. Never use for below-fold images.
- **`placeholder="blur"`** — needs a `blurDataURL` (base64) or `import` of a static image. Costs bundle size; worth it only for high-contrast hero images where the flash of empty space is jarring.
- **`sizes` prop** is mandatory when using `fill` — tells the browser how wide the image will actually render so it picks the right size. Omit it and Next.js warns + serves oversized images.
- **Two-step optimization:** `sips` for file size, `next/image` for responsive serving. Don't rely on only one.

## "Works Locally, Fails on Vercel" Checklist

Run through these in order when a Vercel build fails but `npm run build` works locally:

1. **Env vars** — are all required vars set in Vercel project settings for Production/Preview?
2. **Runtime version** — Vercel default is Node 24. Does `package.json` `engines` pin something older? Does any package require a specific Node version?
3. **devDependencies** — any build tool (Tailwind, PostCSS, TypeScript, type packages) in `devDependencies` that Vercel's prod install skips? Move to `dependencies` or set `NPM_CONFIG_PRODUCTION=false`.
4. **ESM packages** — Lenis, some modern packages are ESM-only. Next 16 + Turbopack needs dynamic `import()` for these.
5. **Case sensitivity** — macOS filesystem is case-insensitive by default; Vercel's Linux is case-sensitive. `<Image src="/MyFile.jpg" />` works locally, 404s on Vercel if the file is `myfile.jpg`.
6. **Import paths** — same issue with component imports. `@/components/Header` vs `@/components/header`.
7. **File size limits** — individual files must be < 100MB, total deployment < 250MB unzipped.
8. **Build timeout** — Vercel free tier is 45min; Hobby 45min; Pro 45min. Usually only a problem with massive asset optimization.

## React/Next Performance Red Flags

- **`"use client"` creep:** a client component's children are all client. If your top-level page is `"use client"`, the whole tree is client → loses SSR benefits. Keep `"use client"` as deep as possible (leaf components with interactivity).
- **Missing `dynamic()`:** heavy libraries (GSAP, chart libs, map libs, rich text editors) should be dynamically imported with `dynamic(() => import(...), { ssr: false })` so they don't bloat initial JS.
- **Unbounded lists:** rendering 500+ items without virtualization = slow scroll. Use `react-window` or `@tanstack/react-virtual` for lists > ~100 items.
- **Images without `<Image>`:** raw `<img>` = no automatic optimization. Always `next/image` in a `.tsx` file.
- **No `loading` attribute on iframes / scripts:** third-party embeds (YouTube, maps) block LCP if not lazy-loaded.
- **Rerender on every keystroke:** a parent that holds the form state rerenders everything on each key. Use `useCallback` for handlers + move form fields into memoized subcomponents.
- **Check bundle size:** `npx next build` output shows per-route JS. Any route > 200KB first-load JS needs investigation.

## Session-End Checklist (Claude: self-enforce before commit)

Before running `git commit`, ask yourself:

- [ ] Appended 1–3 entries to `docs/lessons.md` for anything non-obvious learned
- [ ] Updated `docs/progress.md` with what shipped
- [ ] Updated `docs/image-manifest.md` if any image was added/changed
- [ ] `npx tsc --noEmit` → 0 errors
- [ ] `npx next build` → passes (if structural changes)
- [ ] Commit message uses HEREDOC for multi-line
- [ ] `git add <specific files>` not `-A`
- [ ] No `.env`, no build artifacts, no `test-results/` in the stage list

If any is No → do that first. Committing without these is how the knowledge loop breaks.
