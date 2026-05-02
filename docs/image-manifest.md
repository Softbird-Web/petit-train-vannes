# Image Manifest

**Purpose:** Single source of truth for every image used on the site. Build this on Day 1 from the client's asset folder. Every section that needs an image pulls from this file — never invent filenames.

**Usage:**
1. Receive client's image folder (e.g., `~/Desktop/Carnac-All-Images/`).
2. Scan it: `ls <folder> | sort`. Spot-check a sample with the Read tool.
3. Fill in the table below — one row per image worth using.
4. Compress: `sips -Z 1920 --setProperty formatOptions 50 <source> --out public/figma-assets/<dest>`.
5. When building a section: look up the destination filename here before writing the `<Image src="">`.

---

## This project (petit-train-carnac)

| Destination file | Source (Carnac-All-Images/) | Shows | Used in section(s) |
|---|---|---|---|
| `hero-image.jpg` | `FOTO5 CAR 16.jpg` | Train passing dolmen + menhir field, blue sky | Homepage hero fallback |
| `hero.mp4` | (custom) | Looping video of train in landscape | Homepage hero |
| `stop-1.jpg` | `carnac060.jpg` | Ménec menhir field, summer grass | Routes timeline — Parking du Ménec |
| `stop-2.jpg` | `carnac050.jpg` | Carnac beach, sandy + clear sky | Routes timeline — Carnac Plage |
| `stop-3.jpg` | `carnac143.jpg` | La Trinité port, racing yachts, clouds | Routes timeline — La Trinité-sur-Mer |
| `testimonial-img-1.jpg` | `carnac080.jpg` | Dramatic menhir close-up | Reviews slider card 1 |
| `testimonial-img-2.jpg` | `carnac153.jpg` | Menhir avenue, ground-level | Reviews slider card 2 |
| `testimonial-img-3.jpg` | `carnac155.jpg` | Menhir rows, golden hour vertical | Reviews slider card 3 |
| `features-photo.jpg` | `carnac050.jpg` (aerial variant) | Aerial train + menhir field | Features section (all pages) |
| `prices-bg.jpg` | `carnac100.jpg` | Aerial panoramic, full alignment | Prices section background |
| `group-booking-bg.jpg` | `carnac020.jpg` | Aerial — 2 full trains at departure | Group Booking CTA background |
| `BeforeYouBook.jpg` | `carnac095.jpg` | Wide panoramic menhir field | /book page — "Avant de réserver" |
| `PracticalInformationHero.jpg` | `carnac119.jpg` | Train in spring, menhirs + gorse | /informations hero |
| `FAQsHero.jpg` | `carnac150.jpg` | Passenger POV — train + menhirs | /faqs hero |
| `CareersHero.jpg` | `FOTO7 CAR 16.jpg` | Train driver, close front-on | /careers hero |
| `vannes.jpg` | (custom) | Vannes historic center | Locations — Vannes card |
| `quiberon.jpg` | (custom) | Quiberon coastal views | Locations — Quiberon card |
| `RoutesHero.jpg` | (custom map) | Route map illustration | /routes hero |
| `PrivatisationHero.jpg` | (custom) | Group privatisation context | /privatisation hero |
| `PracticalInfo1.jpg` – `PracticalInfo5.jpg` | (client-confirmed) | Various practical info photos | PracticalInfo cards |
| `Icon01.svg` – `Icon05.svg` | (client-provided, QA 2026-04-24) | Line icons for the 5 PracticalInfo cards (Durée, Départ, Horaires, Accessibilité, Paiement) | PracticalInfo cards — icon badges |
| `hexagonal-pattern.svg` | (client-provided, QA 2026-04-24) | Tiled hexagon pattern | Prices section decorative background (opacity 15%) |
| `PricesHero.jpg` | (client-provided, QA 2026-04-24) | Ticket booth + train with flags | /prices hero image (replaces ImagePricesHero.jpg) |
| `GroupFlyer.pdf` | (client-provided, QA 2026-04-24) | Group booking flyer PDF | /prices + /routes "Flyer de groupe" download button |
| `gallery-1.jpg` – `gallery-11.jpg` | `~/Desktop/carnac-gallery/carnac-*.jpg` + `img1.jpg` (client-provided, QA 2026-04-24) | Photo gallery — Carnac scenes, train, coast, menhirs | Gallery masonry section (homepage + /routes) — placeholder set until client curates final selection |
| `gallery-12.jpg` | `~/Desktop/carnac-all-images/carnac-main.jpg` (Maryannick QA 2026-04-28) | Drone-style brand hero — train + Ménec menhir field (panorama) | Gallery masonry — featured tile from 2026 flyer |
| `gallery-13.jpg` | `~/Desktop/carnac-all-images/carnac-85.jpg` | Dramatic fallen-menhir close-up (square crop) | Gallery masonry |
| `gallery-14.jpg` | `~/Desktop/carnac-all-images/carnac-65.jpg` | Train alongside Ménec alignment (landscape) | Gallery masonry |
| `gallery-15.jpg` | `~/Desktop/carnac-all-images/carnac-45.jpg` | Aerial Ménec alignment, cropped vertical (portrait) | Gallery masonry |
| `gallery-16.jpg` | `~/Desktop/carnac-all-images/carnac-105.jpg` | Evening menhir vista, soft light (landscape wide) | Gallery masonry |
| `gallery-17.jpg` | `~/Desktop/carnac-all-images/carnac-25.jpg` | Train + dolmen ground level (landscape) | Gallery masonry |
| `gallery-18.jpg` | `~/Desktop/carnac-all-images/carnac-115.jpg` (Apr 28 evening round) | Aerial drone — train + Ménec menhir field, summer | Gallery masonry |
| `gallery-19.jpg` | `~/Desktop/carnac-all-images/carnac-30.jpg` | 4 menhirs in a row, ground level cloudy mood (portrait crop) | Gallery masonry |
| `gallery-20.jpg` | `~/Desktop/carnac-all-images/carnac-55.jpg` | Train alongside menhir alignment, panoramic | Gallery masonry |
| `gallery-21.jpg` | `~/Desktop/carnac-all-images/carnac-75.jpg` | Train passing dolmens at Carnac (landscape) | Gallery masonry |
| `gallery-22.jpg` | `~/Desktop/carnac-all-images/carnac-95.jpg` | Ground-level menhir close-up, dappled light (square crop) | Gallery masonry |

## Gotchas for this client's folder

- Filenames use `carnac150.jpg` (no dash), not `carnac-150.jpg` — always `ls` the folder before scripting.
- Some legacy files use spaces and mixed case: `FOTO5 CAR 16.jpg`, `FOTO7 CAR 16.jpg` — quote them in bash.
- Source images are 4–6MB JPEGs (~3000–4500px wide). Compress to 1920px max width at quality 50 for all non-hero images; quality 40 for hero backgrounds.

---

## Template for next project

```markdown
| Destination file | Source | Shows | Used in section(s) |
|---|---|---|---|
| `hero.jpg` | `client-folder/original.jpg` | [what it depicts] | [section names] |
```

**Process for Day 1:**
1. Ask client for the full image folder.
2. `ls <folder>` — note naming convention, count, any obvious groupings.
3. Sample ~20 images via Read tool to identify the 5–10 best heroes, 5–10 best section backgrounds, and 5–10 generic fillers.
4. Fill the manifest. Flag images that are wrong/unusable so you can ask the client for better ones before pages are built.
