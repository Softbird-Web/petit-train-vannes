# Site Onboarding Questionnaire

> **How to use this:** copy to `SITE-ONBOARDING-QUESTIONNAIRE-<LOCATION>.md`, fill EVERY blank before starting a new site. Every blank you skip = friction later. See `SITE-ONBOARDING-QUESTIONNAIRE-CARNAC.md` for a worked example.

**Filled by:** Softbird (internal) — NOT the client.
**Takes:** ~30 min with everything the client has provided.

---

## 1. Identity

- Location name (French): `______`
- Legal business name: `______`
- Site slug (URL): `______` (e.g., `petit-train-vannes`)
- Production domain (if ready): `______` (e.g., `petittrain-vannes.fr` — leave blank if TBD, will use Vercel URL until set)
- Primary SEO keyword (FR): `______` (e.g., "petit train vannes remparts")
- Secondary keywords (up to 5): `______`
- **Locales required**: `______` — pick from `fr` (always required, default), `en`, `es`, `de`, `it`, `nl`. The cloned repo ships with all 6 wired; trim what you don't need by editing `i18n/routing.ts:locales`. URL strategy is `as-needed` (French at `/`, others at `/{locale}/...`).

---

## 2. Business data

Goes into JSON-LD schema, Footer, and contact forms. Be exact.

- Street address: `______`
- Postal code + city: `______`
- Region: `______` (default: Morbihan)
- Country code: `______` (default: FR)
- Main phone (international format): `______` (e.g., `+33297240629`)
- Primary email: `______`
- Lat/lng of the departure point: `______, ______`
- Season start → end: `______` (e.g., "April 1 → November 8")
- Main opening hours: `______` (e.g., "10:00–18:00 daily in low season, 9:30–18:30 in July/August")
- Open on public holidays: `______` (yes/no + note)

---

## 3. Brand

- **Primary color** (buttons, accents, headings italic): `#______`
- **Deep/dark variant**: `#______` (for dark backgrounds / hover states)
- **Cream background**: `#______` (default Carnac: `#f5ebdd`)
- **Heading text color**: `#______` (default Carnac: `#181d27`)
- **Body text color**: `#______` (default Carnac: `#535862`)
- **Heading font**: `______` (default Carnac: Bricolage Grotesque, via `next/font/google`)
- **Body font**: `______` (default Carnac: Manrope, via `next/font/google`)
- **Logo SVG**: path to file: `______`
- **Favicon / webclip**: path to files: `______`

---

## 4. Booking (Regiondo)

- Regiondo widget ID: `______` (format: UUID like `5712cb43-2e72-445b-956b-947f1f624735`)
- Fallback phone (shown if widget fails to load): `______`
- Fallback email: `______`
- Minimum group size: `______` (e.g., 20)
- Tour duration: `______` (e.g., "55 minutes")

---

## 5. Hero + homepage content

- **Hero heading** (H1): `______`
- **Hero tagline** (small italic label above H1): `______`
- **Hero description** (2–3 sentences below H1): `______`
- **Bottom banner heading**: `______` (e.g., "Réservation en Ligne") — or leave blank to hide
- **Bottom banner body**: `______`
- **Google rating value**: `______` (e.g., 4.7)
- **Google review count**: `______` (e.g., 6000+)
- **Google reviews link**: `______` (full URL)
- **Facebook page URL**: `______`
- **Instagram page URL** (optional): `______`
- **Other social URLs**: `______`

---

## 6. Routes / departure points

Array of stops. For each:

### Stop 1
- Number + name: `______`
- Address: `______`
- Lat/lng: `______, ______`
- Google Maps URL (with directions): `______`
- **"Point de départ obligatoire" flag**: yes/no (whether booking is mandatory here)
- **"Achetez sur place" flag**: yes/no (whether on-site-only ticket purchase)
- Description bullets: `______`
- Photo filename: `______`

### Stop 2 — same fields

### Stop 3 — same fields

---

## 7. Schedules

Table: month → departure point → first departure → frequency → last departure.

```
| Month          | Point 1            | Point 2       | Point 3            |
|----------------|--------------------|---------------|--------------------|
| April          | 10:00 every 30min  | 10:00/h       | 10:15/h            |
| May            | ...                | ...           | ...                |
| ... (through November)                                                    |
```

- **Public holiday hours**: `______` (default: identical to regular days — see Carnac)
- **Winter / off-season note**: `______`

---

## 8. FAQs (12–20 questions)

For each, in French:
- Question:
- Answer:
- `plainAnswer` (if the answer has links/JSX — used for FAQPage JSON-LD schema):

Include questions covering: what is it, duration, departure point, season, languages, children, pricing, reservations, groups, privatisation, accessibility, weather.

---

## 9. Careers (optional)

- Enable careers page? `______` (yes/no)
- If yes, jobs list (each):
  - Title: `______`
  - Badge (e.g., "Poste saisonnier"): `______`
  - Description: `______`
  - Requirements: `______`
- Philosophy / "what we look for" panels: `______`

---

## 10. Privatisation (optional)

- Enable privatisation page? `______` (yes/no)
- Form fields needed: `______`
- Form submission handler: `______` (Make webhook URL via env var, email, etc.)

---

## 11. Pricing

- Individual adult price: `______€`
- Individual child price (4–12 yrs): `______€`
- Child under 4: `______` (default: free)
- Early-morning "Bon Plan" (if applicable): adult `______€` / child `______€`
- Group tarifs: shown publicly? `______` (default Carnac: NO — "Nous contacter")

---

## 12. Photo inventory

### Video
- Hero video MP4: `______` (< 10MB, under 30s, must open on the main attraction)
- Opening image (before video plays): `______`

### Section-level photos

(Reference `docs/image-manifest.md` from the Carnac project for the full list of placements. Common ones:)

- Hero fallback image (for browsers without video): `______`
- Features section photo: `______`
- Practical info cards (4 photos): `______`
- Routes timeline — stop 1 photo: `______`
- Routes timeline — stop 2 photo: `______`
- Routes timeline — stop 3 photo: `______`
- Prices section background: `______`
- Book page "Before you book" photo: `______`
- Informations page hero: `______`
- FAQs page hero: `______`
- Careers page hero: `______`
- Privatisation page hero: `______`
- OpenGraph image (1200 × 630, for social previews): `______`

### Gallery (Souvenirs hover-trail)

- 5–8 photos, each ~300–500px wide after compression: `______, ______, ______, ______, ______`

---

## 13. SEO migration (from old petittrain-morbihan.com)

- Old FR keyword-rich slug: `______` (e.g., `/vannes-remparts-petit-train/`)
- Old EN URL: `______` (e.g., `/en/vannes/`)
- Other language variants (DE, ES, IT, NL): `______`
- Old indexed PDFs related to this location: `______`
- Existing third-party backlinks to update: `______`
- GSC property name (if distinct from the root domain): `______`

---

## 14. Legal

- Hosting provider (Vercel + any others): `______`
- Company SIRET: `______`
- Legal representative: `______`
- Data protection contact: `______`

---

## Output of this questionnaire

Once filled, hand this file + the photo folder to a fresh Claude Code session. Claude will:

1. Read `docs/NEW-SITE-PLAYBOOK.md` (top of `CLAUDE.md`)
2. Read this filled questionnaire
3. Do the content swap (Phase 3 of the playbook)
4. Run QA (Phase 4)

Everything you leave blank will become a `TODO` marker in the code that Claude flags. Don't skip.
