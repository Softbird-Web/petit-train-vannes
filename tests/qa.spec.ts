import { test, expect } from '@playwright/test'

// ── Homepage ───────────────────────────────────────────────────────────────
test('homepage: site title includes Morbihan', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Morbihan/)
})

test('homepage: hero video element is present', async ({ page }) => {
  await page.goto('/')
  const video = page.locator('video[src*="hero"]')
  await expect(video).toBeVisible()
})

test('homepage: amber brand color is present', async ({ page }) => {
  await page.goto('/')
  const html = await page.content()
  expect(html).toContain('#f7a427')
})

test('homepage: Bons Plans card present between pricing sections', async ({ page }) => {
  await page.goto('/')
  const html = await page.content()
  expect(html).toContain('Bon Plan')
  expect(html).toContain('Premiers départs du matin')
})

test('homepage: group card shows contact info, not prices', async ({ page }) => {
  await page.goto('/')
  const html = await page.content()
  expect(html.toLowerCase()).toContain('contactez-nous')
})

test('homepage: testimonial shows 8,50€', async ({ page }) => {
  await page.goto('/')
  const content = await page.content()
  expect(content).not.toContain('8 euros')
  expect(content).toContain('8,50')
})

test('homepage: departure point Place Gambetta visible with maps link', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Place Gambetta').first()).toBeVisible()
  const mapsLinks = page.locator('a[href*="google.com/maps"]')
  await expect(mapsLinks.first()).toBeVisible()
})

test('homepage: audio commentary mentions 16 languages', async ({ page }) => {
  await page.goto('/')
  const html = await page.content()
  expect(html).toContain('16 langues')
})

// ── Informations page ──────────────────────────────────────────────────────
test('informations: title includes Morbihan', async ({ page }) => {
  await page.goto('/informations')
  await expect(page).toHaveTitle(/Morbihan/)
})

test('informations: schedule shows Place Gambetta departure point', async ({ page }) => {
  await page.goto('/informations')
  await expect(page.getByText('Place Gambetta').first()).toBeVisible()
})

test('informations: holiday text says same as regular days', async ({ page }) => {
  await page.goto('/informations')
  const html = await page.content()
  expect(html).toMatch(/même horaires que les jours ordinaires|jours fériés en saison/)
})

test('informations: Bons Plans pricing card present', async ({ page }) => {
  await page.goto('/informations')
  const html = await page.content()
  expect(html).toContain('Bon Plan')
  expect(html).toContain('Premiers départs du matin')
})

// ── Prices page ────────────────────────────────────────────────────────────
test('prices: testimonial shows 8,50 euros', async ({ page }) => {
  await page.goto('/prices')
  const content = await page.content()
  expect(content).toContain('8,50')
  expect(content).not.toContain('8 euros')
})

test('prices: 3 pricing cards visible', async ({ page }) => {
  await page.goto('/prices')
  const html = await page.content()
  expect(html).toContain('Billets Individuels')
  expect(html).toContain('Bon Plan')
  expect(html).toContain('Réservation de Groupe')
})

test('prices: group card has contact info', async ({ page }) => {
  await page.goto('/prices')
  const html = await page.content()
  expect(html.toLowerCase()).toContain('contactez-nous')
})

// ── FAQs page ──────────────────────────────────────────────────────────────
test('faqs: audio commentary FAQ mentions 16 languages and included in price', async ({ page }) => {
  await page.goto('/faqs')
  const content = await page.content()
  expect(content).toContain('16')
  expect(content).toContain('inclus')
})

test('faqs: weather protection info present', async ({ page }) => {
  await page.goto('/faqs')
  const html = await page.content()
  expect(html).toMatch(/par tous les temps|fortes intempéries/)
})

// ── Careers page ───────────────────────────────────────────────────────────
test('careers: exactly 3 roles, no Coordinateur', async ({ page }) => {
  await page.goto('/careers')
  const html = await page.content()
  expect(html).not.toContain('Coordinateur')
  expect(html).toContain('Conducteur de Petit Train')
  expect(html).toContain('Agent de Quai')
  expect(html).toContain('Agent de Billetterie')
})

test('careers: Agent de Quai description is correct', async ({ page }) => {
  await page.goto('/careers')
  const html = await page.content()
  expect(html).toContain('Agent de Quai')
  expect(html).toContain("Accompagner les passagers lors de l'embarquement")
})

test('careers: Conducteur has Permis D requirement', async ({ page }) => {
  await page.goto('/careers')
  const html = await page.content()
  expect(html).toContain('Permis D')
})
