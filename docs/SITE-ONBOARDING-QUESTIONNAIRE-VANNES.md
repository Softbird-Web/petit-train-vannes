# Site Onboarding Questionnaire — Le Petit Train de Vannes

**Filled by:** Softbird (internal)
**Date:** 2026-05-02
**Status:** In progress — TODOs marked inline

---

## 1. Identity

- **Location name (French):** Le Petit Train de Vannes
- **Legal business name:** Petits Trains Touristiques Le Bayon Vannes
- **Site slug:** `le-petit-train-de-vannes`
- **Production domain:** `lepetittraindevannes.fr`
- **Primary SEO keyword (FR):** `petit train vannes`
- **Secondary keywords (FR):**
  1. `petit train vannes remparts`
  2. `visite vannes petit train`
  3. `train touristique vannes`
  4. `activité touristique vannes`
  5. `visite guidée vannes remparts`
- **Primary keyword (EN):** `Vannes tourist train Brittany`
- **Locales required:** `fr`, `en`, `es`, `de`, `it`, `nl`, `cs` (Czech added vs Carnac's 6)
  - Note: Czech (`cs`) is a new locale — add to `i18n/routing.ts` with flag 🇨🇿 and label "Čeština"
  - Locales to do **last** (scaffold now, fill translations after content is stable)

---

## 2. Business data

- **Street address:** Place Gambetta
- **Postal code + city:** 56000 Vannes
- **Region:** Morbihan
- **Country code:** FR
- **Main phone:** `+33 2 97 24 06 29`
- **Primary email:** `petittrain-lebayon@orange.fr`
- **Lat/lng of departure point:** `47.65390326265044, -2.759141221973509`
- **Season:** April 1 → November 7 (All Saints' Day + surrounding days)
- **Opening hours:**
  - Apr 1–Jun 12: 10:00–12:00 and 14:00–17:20, every 40 min
  - Jun 13–Jul 15: 10:00–12:40 and 14:00–18:00, every 40 min
  - Jul 16–Aug 25: 10:00–12:40 and 14:00–18:40, every 40 min
  - Aug 26–Oct 13: 10:00–12:00 and 14:00–17:20, every 40 min
  - Oct 13–Oct 21: **Closed**
  - Oct 22–Nov 7: 10:00–12:00 and 14:00–17:20, every 40 min
  - December onward: Closed
- **Open on public holidays:** Yes — same hours as regular days

---

## 3. Brand

- **Primary color** (buttons, accents, italic headings): `#f7a427` (amber/yellow)
- **Deep/dark variant** (hover states, dark bg sections): `#1c1b29`
- **Light background** (equivalent of Carnac cream): `#ffffff` (white)
- **Heading text color:** `#1c1b29`
- **Body text muted:** `#535862` (same as Carnac — confirm or override)
- **Announcement banner bg:** `#1c1b29` (dark, equivalent of Carnac's `#33114d`)
- **Section alternate palette:** `#f7a427` bg + `#1c1b29` text (equivalent of Carnac's purple sections)
- **Heading font:** Bricolage Grotesque (same as Carnac — keep)
- **Body font:** Manrope (same as Carnac — keep)
- **Logo SVG:** Same Morbihan logo as Carnac — reuse `/figma-assets/logo.svg`
- **Favicon:** TODO — confirm if same as Carnac or Vannes-specific

---

## 4. Booking (Regiondo)

- **Regiondo widget ID:** `5712cb43-2e72-445b-956b-947f1f624735` ⚠️ PLACEHOLDER — using Carnac ID until Vannes widget is set up on Regiondo
- **Fallback phone:** `+33 2 97 24 06 29`
- **Fallback email:** `petittrain-lebayon@orange.fr`
- **Tour duration:** 40 minutes
- **Minimum group size:** 20 people

---

## 5. Hero + homepage content

### Labels & headings
- **Hero label** (small tag above H1): `Le Petit Train de Morbihan · Vannes`
- **Hero H1:**
  - Prefix: `Découvrez`
  - Highlight (italic, amber): `Vannes`
  - Suffix: `à bord du Petit Train`
- **Hero tagline:** `Idéal pour les familles, les couples, les seniors et les visiteurs de tous âges.`
- **Hero description:**
  > Le Petit Train de Vannes vous emmène à la découverte des remparts médiévaux, de la vieille ville et du port dans un circuit guidé de **40 minutes.** Une façon simple, confortable et accessible de découvrir l'une des plus belles cités médiévales de Bretagne, sans effort et avec un commentaire audio clair tout au long du parcours.

### Right card (audio guide languages)
- **Heading:** `Visite guidée avec commentaire audio en 16 langues`
- **Body:** `Français, anglais, allemand, espagnol, italien, portugais, néerlandais, russe, chinois, japonais, suédois, danois, polonais, arabe, croate et slovène.`

### Booking note (bottom of hero)
- **Label:** `Note Importante`
- **Heading:** `Réservation en Ligne`
- **Body:** `La réservation est possible mais non obligatoire. Vous pouvez vous présenter directement au point de départ Place Gambetta et acheter vos billets auprès du conducteur. En haute saison, nous vous conseillons de réserver à l'avance.`
- **Body extra:** `Toutes les places ne sont pas disponibles à la vente en ligne.`

### Google rating
- **Rating value:** `4.7`
- **Review count:** `1 385+ avis`
- **Google reviews URL:** `https://www.google.com/search?q=PETITS+TRAINS+TOURISTIQUES+LE+BAYON+VANNES+Reviews`
- **Google badge text:** `Le Petit Train de Vannes est noté 4,7 sur Google, avec plus de 1 300 avis, ce qui en fait l'une des attractions touristiques les plus appréciées de Vannes.`

### Social
- **Facebook URL:** Same as Carnac — `https://www.facebook.com/lespetitstrainsdumorbihan`
- **Instagram URL:** Same as Carnac — confirm handle

---

## 6. Routes / departure points

Only **1 departure point** for Vannes (vs 3 for Carnac).

### Stop 1 — Place Gambetta
- **Number + name:** 1 — Place Gambetta
- **Address:** Place Gambetta, 56000 Vannes
- **Lat/lng:** `47.65390326265044, -2.759141221973509`
- **Google Maps URL:** TODO — confirm directions link
- **"Point de départ obligatoire" flag:** Yes (only departure)
- **"Achetez sur place" flag:** Yes (tickets at the driver or on-site)
- **Description bullets:**
  - Au cœur de la ville, à deux pas des remparts médiévaux
  - Accès facile depuis le centre-ville et les parkings proches
  - Conducteur sur place pour la vente de billets
- **Photo filename:** `stop-gambetta.jpg` (TODO — provide photo)

---

## 7. Schedules

Single departure point (Place Gambetta). All departures from there.

| Period | Dates | Hours | Frequency |
|--------|-------|-------|-----------|
| Printemps | 01/04 – 12/06 | 10h–12h et 14h–17h20 | Toutes les 40 min |
| Début été | 13/06 – 15/07 | 10h–12h40 et 14h–18h | Toutes les 40 min |
| Haute saison | 16/07 – 25/08 | 10h–12h40 et 14h–18h40 | Toutes les 40 min |
| Fin été | 26/08 – 13/10 | 10h–12h et 14h–17h20 | Toutes les 40 min |
| Fermeture | 13/10 – 21/10 | Fermé | — |
| Automne | 22/10 – 07/11 | 10h–12h et 14h–17h20 | Toutes les 40 min |
| Hiver | Décembre et + | Fermé | — |

- **Public holiday hours:** Identical to regular days (open on all public holidays in season)
- **Winter/off-season note:** Fermé de décembre à mars inclus.

---

## 8. FAQs (French — 14 questions)

### Q1 — Qu'est-ce que le Petit Train de Vannes ?
Le Petit Train de Vannes est une visite guidée touristique à bord d'un petit train qui vous emmène à la découverte des plus beaux sites de la ville : les remparts médiévaux, la vieille ville, le port et les jardins de la Garenne. La visite dure environ 40 minutes et est accompagnée d'un commentaire audio disponible en 16 langues.

### Q2 — Quelle est la durée du circuit ?
Le circuit dure environ **40 minutes**. Le petit train part de la Place Gambetta et revient au même point de départ, vous faisant découvrir les principaux sites de Vannes le long du parcours.

### Q3 — D'où part le Petit Train de Vannes ?
Le Petit Train part de la **Place Gambetta**, au cœur de la ville, à deux pas des remparts médiévaux. C'est le seul point de départ et d'arrivée du circuit.

### Q4 — Pendant quelle période le Petit Train de Vannes fonctionne-t-il ?
Le Petit Train fonctionne **d'avril à la Toussaint**, tous les jours y compris les dimanches et les jours fériés. Il est fermé en décembre, janvier, février et mars. Consultez les horaires détaillés sur la page Informations Pratiques.

### Q5 — Le Petit Train propose-t-il un commentaire audio ?
Oui. La visite est entièrement commentée par un système audio disponible en **16 langues** : français, anglais, allemand, espagnol, italien, portugais, néerlandais, russe, chinois, japonais, suédois, danois, polonais, arabe, croate et slovène. Un commentaire adapté aux enfants est également disponible.

### Q6 — Les enfants peuvent-ils monter dans le Petit Train ?
Oui, le Petit Train de Vannes est idéal pour les enfants. La visite est accessible dès le plus jeune âge. Un commentaire audio spécialement adapté aux enfants est disponible à bord. Des tarifs réduits s'appliquent pour les enfants.

### Q7 — Quels sont les tarifs du Petit Train de Vannes ?
Les tarifs sont disponibles sur la page [Tarifs & Billets]. TODO — fill once pricing confirmed.

### Q8 — Faut-il réserver à l'avance ?
La réservation est **possible mais non obligatoire**. Vous pouvez acheter vos billets directement auprès du conducteur au départ Place Gambetta. En haute saison (juillet–août), nous vous recommandons de réserver à l'avance pour garantir votre place.
- **plainAnswer:** La réservation est possible mais non obligatoire. Vous pouvez acheter vos billets directement auprès du conducteur au départ Place Gambetta. En haute saison, nous vous recommandons de réserver à l'avance.

### Q9 — Y a-t-il des tarifs de groupe ?
Oui. Des tarifs de groupe sont disponibles à partir de **20 personnes**. La réservation à l'avance est recommandée pour les groupes. Contactez-nous par téléphone ou e-mail pour organiser votre visite de groupe.

### Q10 — Peut-on privatiser le Petit Train de Vannes ?
TODO — confirm if privatisation is offered for Vannes.

### Q11 — Le Petit Train est-il accessible aux personnes à mobilité réduite ?
TODO — confirm accessibility level for Vannes train.

### Q12 — Le Petit Train fonctionne-t-il par mauvais temps ?
Le Petit Train circule par tous les temps. En cas de fortes intempéries exceptionnelles, le service peut être interrompu pour la sécurité des passagers. Nous vous conseillons de prévoir une tenue adaptée par temps frais ou venteux.

### Q13 — Que voit-on pendant le circuit de 40 minutes ?
Le circuit vous fait découvrir les **remparts médiévaux** de Vannes, la **vieille ville** avec ses maisons à colombages, le **port de Vannes**, les **jardins de la Garenne** et les plus beaux panoramas de la cité médiévale. Le commentaire audio vous explique l'histoire et l'architecture de chaque site tout au long du parcours.

### Q14 — Le commentaire audio est-il disponible en tchèque ?
Oui. Le commentaire audio est disponible en **16 langues** dont le français, l'anglais, l'allemand, l'espagnol, l'italien, le néerlandais et de nombreuses autres langues. TODO — confirm Czech specifically included.

---

## 9. Careers

- **Enable careers page?** Yes — same structure as Carnac
- Job titles, descriptions, requirements: same as Carnac (same operator, same seasonal roles)
- Copy to adapt: replace "Carnac" → "Vannes" in job descriptions and apply-by-email address

---

## 10. Privatisation

- **Enable privatisation page?** Yes — same form structure as Carnac
- **Form submission handler:** TODO — provide Make webhook URL for Vannes (separate from Carnac's webhook, or same?)

---

## 11. Pricing

- **Individual adult price:** `8,50 €` (same as Carnac)
- **Individual child price (4–12 yrs):** `5,00 €` (same as Carnac)
- **Child under 4:** Free (same as Carnac)
- **"Bon Plan" early-morning rate:** TODO — confirm if offered for Vannes
- **Group tarifs shown publicly?** No — "Nous contacter" (same as Carnac)

---

## 12. Photo inventory

### Video
- **Hero video MP4:** TODO — provide < 10MB, under 30s, showing Vannes train or ramparts
- **Opening image** (displayed before video loads): TODO

### Section-level photos
- **Hero fallback image:** TODO
- **Features section photo:** TODO
- **Practical info cards (up to 4 photos):** TODO
- **Stop 1 photo (Place Gambetta / ramparts):** TODO
- **Prices section background:** TODO
- **Book page "Before you book" photo:** TODO
- **Informations page hero:** TODO
- **FAQs page hero:** TODO
- **Careers page hero:** TODO (if careers enabled)
- **Privatisation page hero:** TODO (if privatisation enabled)
- **OpenGraph image (1200 × 630):** TODO — social preview image

### Gallery (hover-trail / masonry)
- 5–8 photos of Vannes ramparts, vieille ville, port, train in action
- TODO — provide photo set

---

## 13. SEO migration (from petittrain-morbihan.com)

- **Old FR slug:** `https://www.petittrain-morbihan.com/vannes/` (confirm exact URL)
- **Old EN slug:** `https://www.petittrain-morbihan.com/en/vannes/`
- **Other language variants:** TODO
- **Old indexed PDFs:** TODO
- **Existing third-party backlinks:** TODO
- **GSC property:** TODO — does operator have GSC set up for morbihan domain?

---

## 14. Legal

- **Hosting:** Vercel
- **Company SIRET:** TODO — same as Carnac (same operator Lebayon) — confirm
- **Legal representative:** TODO — same as Carnac — confirm
- **Data protection contact:** `petittrain-lebayon@orange.fr` (confirm)

---

## Copy — French strings (fr.json equivalents)

### nav (unchanged from Carnac — navigation labels are generic)
Same keys as Carnac.

### navbar banner
```
bannerPrefix: "Ce site fait partie des Petits Trains du Morbihan. Découvrez nos autres circuits à"
bannerLinkCarnac: "Carnac"
bannerAnd: "et"
bannerLinkQuiberon: "Quiberon."
```

### footer
```
ctaHeading: "Prêt à découvrir Vannes de façon simple et agréable ?"
ctaBody: "Embarquez à bord du Petit Train de Vannes pour une visite guidée alliant histoire, architecture médiévale et confort. Découvrez les remparts, la vieille ville et le port de Vannes, sans fatigue et avec un commentaire audio clair tout au long du parcours."
tagline: "Le Petit Train de Vannes propose une visite guidée à travers l'une des plus belles cités médiévales de Bretagne. Confortablement installés à bord, les visiteurs découvrent les remparts, la vieille ville et le port de Vannes de manière détendue et accessible."
```

### shared
```
googleReviewsCount: "1 385+ avis"
googleRatingDescription: "Le Petit Train de Vannes est noté 4,7 sur Google, avec plus de 1 300 avis, ce qui en fait l'une des attractions touristiques les plus appréciées de Vannes."
googleRatingDescriptionAlt: "Le Petit Train de Vannes est noté plus de 4,7 sur Google, avec plus de 1 300 avis, ce qui en fait l'une des attractions touristiques les plus appréciées de Vannes."
```

### metadata (per page)
```json
"home": {
  "title": "Petit Train Vannes Remparts — Le Petit Train de Vannes, Morbihan",
  "description": "Visite guidée des remparts de Vannes à bord du Petit Train — circuit de 40 minutes, commentaire audio en 16 langues, vieille ville et port de Vannes."
},
"prices": {
  "title": "Tarifs & Billets — Petit Train de Vannes, Morbihan",
  "description": "Tarifs du circuit des remparts en Petit Train de Vannes : adulte, enfant, tarifs groupes et réservation en ligne. TODO€ adulte, TODO€ enfant."
},
"routes": {
  "title": "Parcours & Itinéraire — Petit Train de Vannes, Morbihan",
  "description": "Découvrez le parcours du Petit Train de Vannes : remparts médiévaux, vieille ville, port et jardins de la Garenne. Circuit guidé de 40 minutes avec commentaire audio en 16 langues."
},
"book": {
  "title": "Réservez votre visite — Petit Train de Vannes, Morbihan",
  "description": "Réservez votre tour des remparts de Vannes en Petit Train. Circuit de 40 minutes, commentaire audio multilingue, départ Place Gambetta."
},
"informations": {
  "title": "Informations Pratiques — Petit Train de Vannes, Morbihan",
  "description": "Informations pratiques pour préparer votre visite en Petit Train de Vannes : horaires, point de départ Place Gambetta, durée, accès."
},
"faqs": {
  "title": "FAQ — Petit Train de Vannes, Morbihan",
  "description": "Questions fréquentes sur le circuit des remparts de Vannes en Petit Train : durée, tarifs, parcours, accessibilité, réservations."
},
"careers": {
  "title": "Carrières — Petit Train de Vannes, Morbihan",
  "description": "Rejoignez l'équipe du Petit Train de Vannes. Postes saisonniers disponibles en saison."
},
"privatisation": {
  "title": "Privatisation & Groupes — Petit Train de Vannes, Morbihan",
  "description": "Privatisez le Petit Train de Vannes pour vos événements professionnels, séminaires, mariages ou groupes scolaires."
}
```

---

## Remaining TODOs (blocking before content swap)

| # | Item | Who | Priority |
|---|---|---|---|
| 1 | Google reviews URL (full GBP share link) | Client | High |
| 2 | All photos + hero video | Client | High |
| 3 | Regiondo widget ID for Vannes | Client / Regiondo | High |
| 4 | Privatisation Make webhook URL | Client | Medium |
| 5 | "Bon Plan" rate — confirm yes/no for Vannes | Client | Medium |
| 6 | SIRET + legal rep (confirm same as Carnac) | Client | Low |
| 7 | Favicon (same as Carnac or Vannes-specific?) | Client | Low |
| 8 | Czech audio guide — confirm included in 16 langs | Client | Low |
| 9 | Confirm accessibility level | Client | Low |
