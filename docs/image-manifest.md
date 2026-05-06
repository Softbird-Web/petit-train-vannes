# Image Manifest — Petit Train de Vannes

**Purpose:** Single source of truth for every image used on this site. Every image sourced from `~/Desktop/vannes-images/` only — never from another Petit Train project.

**Compression rule:** `sips -Z 1920 --setProperty format jpeg --setProperty formatOptions 52 <source> --out public/figma-assets/<dest>`
Target: < 1MB per asset. Quality 40 for hero backgrounds, 52 for section images.

---

## Assets in `public/figma-assets/`

| Destination file | Source | Shows | Used in section(s) |
|---|---|---|---|
| `hero-image.jpg` | `~/Desktop/vannes-images/` | Petit Train de Vannes passing the remparts | Homepage hero fallback |
| `hero.mp4` | client-provided | Looping video of train in Vannes | Homepage hero (autoplay) |
| `FAQsHero.jpg` | `~/Desktop/vannes-images/` | Train near Vannes historic walls | /faqs hero right panel |
| `CareersHero.jpg` | `~/Desktop/vannes-images/` | Train driver or train exterior Vannes | /careers hero right image |
| `CareersHeroBg.png` | client-provided | Decorative background pattern | /careers hero section background (opacity 30%) |
| `CareersLooking.png` | client-provided | Vannes scene | CareersInfo section left image |
| `PrivatisationHero.jpg` | `~/Desktop/vannes-images/` | Group/privatisation Vannes scene | /privatisation hero left panel |
| `RoutesHero.jpg` | client-provided | Route map illustration for Vannes circuit | /routes hero |
| `PricesHero.jpg` | `~/Desktop/vannes-images/` | Ticket booth or train scene Vannes | /prices hero |
| `PracticalInformationHero.jpg` | `~/Desktop/vannes-images/` | Train in Vannes surroundings | /informations hero |
| `BeforeYouBook.jpg` | `~/Desktop/vannes-images/` | Vannes scene for booking page | /book "Avant de réserver" |
| `BeforeYouBook.png` | client-provided | Alternate Vannes scene | /book page (alternate) |
| `FooterBackground.jpg` | `~/Desktop/vannes-images/` | Aerial or panoramic Vannes | Footer CTA background |
| `stop-1.jpg` | `~/Desktop/vannes-images/` | Place Gambetta / remparts area | RoutesTimeline — stop 01 |
| `stop-2.jpg` | `~/Desktop/vannes-images/` | Vannes port / waterfront | RoutesTimeline — stop 02 |
| `stop-3.jpg` | `~/Desktop/vannes-images/` | Vannes historic centre / cathedral area | RoutesTimeline — stop 03 |
| `testimonial-img-1.jpg` | `~/Desktop/vannes-images/` | Vannes scene | Reviews slider card 1 |
| `testimonial-img-2.jpg` | `~/Desktop/vannes-images/` | Vannes scene | Reviews slider card 2 |
| `testimonial-img-3.jpg` | `~/Desktop/vannes-images/` | Vannes scene | Reviews slider card 3 |
| `features-photo.jpg` | `~/Desktop/vannes-images/` | Train or remparts aerial | Features section |
| `prices-bg.jpg` | `~/Desktop/vannes-images/` | Panoramic Vannes view | Prices section background |
| `group-booking-bg.jpg` | `~/Desktop/vannes-images/` | Group of visitors / departure | GroupBookingCTA background |
| `PracticalInfo1.jpg` | `~/Desktop/vannes-images/` | Duration / train on route | PracticalInfo — Durée card hover |
| `PracticalInfo2.jpg` | `~/Desktop/vannes-images/` | Departure point Place Gambetta | PracticalInfo — Départ card hover |
| `PracticalInfo3.jpg` | `~/Desktop/vannes-images/` | Schedule / timetable scene | PracticalInfo — Horaires card hover |
| `PracticalInfo4.jpg` | `~/Desktop/vannes-images/` | Accessibility scene | PracticalInfo — Accessibilité card hover |
| `PracticalInfo5.jpg` | `~/Desktop/vannes-images/` | Payment / ticket scene | PracticalInfo — Paiement card hover (col-span-2) |
| `practical-1.jpg` | `~/Desktop/vannes-images/` | Operating period scene | InformationsSchedule top card 1 |
| `practical-2.jpg` | `~/Desktop/vannes-images/` | Weather / outdoor scene | InformationsSchedule top card 2 |
| `informations-hero-train.jpg` | `~/Desktop/vannes-images/` | Train at Vannes departure | InformationsHero |
| `our-location.jpg` | `~/Desktop/vannes-images/` | Place Gambetta from above | OurLocation section |
| `gallery-1.jpg` – `gallery-10.jpg` | `~/Desktop/vannes-images/` | Vannes train & city scenes | Gallery masonry (homepage + /routes) |
| `vannes-g11.jpg` | `~/Desktop/vannes-images/Vannes-3.jpg` | Vannes scene | Gallery masonry |
| `vannes-g12.jpg` | `~/Desktop/vannes-images/Vannes-5.jpg` | Vannes scene | Gallery masonry |
| `vannes-g13.jpg` | `~/Desktop/vannes-images/Vannes-7.jpg` | Vannes scene | Gallery masonry |
| `vannes-g14.jpg` | `~/Desktop/vannes-images/Vannes-9.jpg` | Vannes scene | Gallery masonry |
| `vannes-g15.jpg` | `~/Desktop/vannes-images/Vannes-11.jpg` | Vannes scene | Gallery masonry |
| `vannes-g16.jpg` | `~/Desktop/vannes-images/Vannes-13.jpg` | Vannes scene | Gallery masonry |
| `vannes.jpg` | client-provided | Vannes historic centre aerial | Locations — Vannes card (self-link) |
| `carnac.jpg` | Carnac project | Carnac menhirs | Locations — Carnac card (sister site link) |
| `quiberon.jpg` | client-provided | Quiberon coastal view | Locations — Quiberon card (sister site link) |
| `vannes-routes.jpg` | `~/Desktop/vannes-images/` | Vannes route overview | Routes page |
| `review-gallery-1.jpg` | `~/Desktop/vannes-images/` | Vannes scene | Reviews section |
| `review-gallery-2.jpg` | `~/Desktop/vannes-images/` | Vannes scene | Reviews section |
| `OpenGraph.png` | ⚠️ SHARED WITH CARNAC | Currently shows Carnac — needs replacing | og:image in layout.tsx |

## Icons & UI assets (shared / city-agnostic)

| File | Type | Used in |
|---|---|---|
| `logo.svg` | SVG | Navbar logo (filter:brightness(0) applied) |
| `icon-train.svg` | SVG | Section labels site-wide |
| `Icon01.svg` – `Icon05.svg` | SVG | PracticalInfo card badges |
| `CalendarIconBig.svg` | SVG | InformationsSchedule operating period card |
| `WeatherIconBig.svg` | SVG | InformationsSchedule weather card |
| `PurpleCashIcon.svg` | SVG | ⚠️ Check fill — may still contain Carnac purple `#4d1c64` |
| `hexagonal-pattern.svg` | SVG | Prices section decorative bg (opacity 15%) |
| `stars.svg` | SVG | Google rating stars |
| `google-icon.svg` | SVG | Google badge |
| `timetables-clock.svg` | SVG | InformationsSchedule period rows |
| `train-illustration.png` | PNG | Watermark bg in InformationsPrices, InformationsSchedule CTA |
| `languages-flags.png` | PNG | Hero right card flags |
| `FlyerIndividual.pdf` | PDF | /prices + /routes download button |
| `GroupFlyer.pdf` | PDF | /prices + /routes group flyer download |

## ⚠️ Pending

- `OpenGraph.png` — replace with a Vannes-specific 1200×630 image, then update `app/[locale]/layout.tsx` `og.images` path
- `PurpleCashIcon.svg` — audit fill value: `grep "4d1c64\|54206d" public/figma-assets/PurpleCashIcon.svg`

## Image source rule

Every image MUST come from `~/Desktop/vannes-images/`. NEVER pull from another Petit Train project's `public/figma-assets/` or any other Desktop folder. Mixing sources causes wrong-city photos to appear on the live site.
