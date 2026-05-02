# Acceptance Spec Template

**Purpose:** Lock the target for taste-driven or ambiguous sections BEFORE writing code. Fill this out in 2 minutes. Saves 1–3 hours of iteration.

**When to use:**
- Any section where Figma is ambiguous or has multiple possible interpretations
- Anything that involves animation, hover state, or interaction design
- Any component the user historically iterates on (in this project: Reviews, Hero, booking forms, CTAs)

**When to skip:** Static sections with pixel-perfect Figma (tables, footers, plain text blocks). If the Figma is the spec, no template needed.

---

## Template

```markdown
# Section: [Name]

## Target
Reference screenshot: [paste image or link Figma node]
Related Figma node: [node ID]

## Must-have (reject if missing)
1. [Specific, testable attribute — e.g., "1 card per view on mobile, 3 on desktop"]
2. [e.g., "Text on left, image on right at ≥768px"]
3. [e.g., "Clickable arrow controls, no dots"]

## Nice-to-have (keep if cheap)
- [e.g., "Subtle blur during slide transition"]
- [e.g., "Inertia on drag release"]

## Explicit rejects (known not-wanted)
- [e.g., "No purple clip-path diagonal"]
- [e.g., "No auto-play"]

## Breakpoints
- Mobile (360–767px): [any mobile-specific requirements]
- Tablet (768–1279px): [any tablet-specific requirements]
- Desktop (1280px+): [any desktop-specific requirements]

## Data
- Number of items: [e.g., 9 testimonials]
- Source: [hardcoded array, CMS, Figma content]
- Images: [reference `docs/image-manifest.md` entries]
```

---

## Filled example: Reviews section (in hindsight)

```markdown
# Section: Reviews slider

## Target
Reference: [user's screenshot of clean testimonial card — text left, image right with diagonal clip]
Figma node: (none — user-sourced reference)

## Must-have (reject if missing)
1. GSAP Draggable slider (no infinite scroll, no auto-play)
2. 1 card per view on mobile and desktop (1280px container)
3. Card layout: text on left, image on right with diagonal `clip-path` at md+
4. Mobile stacking: image below text, full-width, fixed 220px height
5. Arrow controls (square, icon-only, border, right-aligned), NO dot indicators

## Nice-to-have
- Short blur (0.1s in / 0.2s out) during slide transition
- `expo.out` ease, 0.75s duration
- Inertia on drag release

## Explicit rejects
- No purple background on cards (container is purple, cards are white)
- No "View all" button below the slider
- No auto-advance

## Breakpoints
- Mobile: cards stack (text top, image bottom), slider full-width inside 1280px container
- Desktop: text-left/image-right side-by-side at 420px height

## Data
- 9 testimonials (hardcoded array in ReviewsSlider.tsx)
- Images: `testimonial-img-1/2/3.jpg`, `stop-1/2/3.jpg`, `PracticalInfo1/3/5.jpg` (see manifest)
```

**If this spec had existed on day 1, the Reviews section would've been built once, not 7+ times.**

---

## How to use this with the user

When starting a taste-driven section, paste the template in chat:

> Before I start on [section name], let's lock the spec. Can you fill this in (2 mins)? It'll save us from iterating.
> [paste template above]

Then:
1. Wait for answers.
2. Copy the filled spec into a comment at the top of the component file (`// @spec: [paste]`).
3. Build against it.
4. At the end: user reviews against the spec, not against vibes.
