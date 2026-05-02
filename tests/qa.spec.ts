import { test, expect } from '@playwright/test'

// ── Homepage ───────────────────────────────────────────────────────────────
test('homepage: site title includes Morbihan', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Morbihan/)
})

test('homepage: hero video element is present', async ({ page }) => {
  await page.goto('/')
  const video = page.locator('video[src*="carnac-hero"]')
  await expect(video).toBeVisible()
})

test('homepage: purple color is vibrant (not grey)', async ({ page }) => {
  await page.goto('/')
  const html = await page.content()
  expect(html).not.toContain('#5a4a6e')
  expect(html).not.toContain('#58496c')
})

test('homepage: Bons Plans card present between pricing sections', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Bon Plan').first()).toBeVisible()
  await expect(page.getByText('Premiers départs du matin').first()).toBeVisible()
  await expect(page.getByText('7,00€').first()).toBeVisible()
})

test('homepage: group card shows contact info, not prices', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText(/contactez-nous/i).first()).toBeVisible()
})

test('homepage: testimonial shows 8,50€', async ({ page }) => {
  await page.goto('/')
  const content = await page.content()
  expect(content).not.toContain('8 euros')
  expect(content).toContain('8,50')
})

test('homepage: 3 departure points visible with maps links', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Parking du Ménec').first()).toBeVisible()
  await expect(page.getByText(/Carnac Plage/i).first()).toBeVisible()
  await expect(page.getByText('La Trinité-sur-Mer').first()).toBeVisible()
  const mapsLinks = page.locator('a[href*="google.com/maps"]')
  await expect(mapsLinks.first()).toBeVisible()
})

test('homepage: audio commentary mentions 16 languages', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText(/16 langues/).first()).toBeVisible()
})

// ── Informations page ──────────────────────────────────────────────────────
test('informations: title includes Morbihan', async ({ page }) => {
  await page.goto('/informations')
  await expect(page).toHaveTitle(/Morbihan/)
})

test('informations: schedule shows all 3 departure points for Avril', async ({ page }) => {
  await page.goto('/informations')
  await expect(page.getByText('Parking du Ménec').first()).toBeVisible()
  await expect(page.getByText('Carnac plage').first()).toBeVisible()
  await expect(page.getByText('La Trinité-sur-Mer').first()).toBeVisible()
})

test('informations: holiday text says same as regular days', async ({ page }) => {
  await page.goto('/informations')
  await expect(page.getByText(/identiques aux horaires habituels/)).toBeVisible()
})

test('informations: Bons Plans pricing card present', async ({ page }) => {
  await page.goto('/informations')
  await expect(page.getByText('Bon Plan').first()).toBeVisible()
  await expect(page.getByText('Premiers départs du matin').first()).toBeVisible()
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
  await expect(page.getByText('Billets Individuels')).toBeVisible()
  await expect(page.getByText('Bon Plan').first()).toBeVisible()
  await expect(page.getByText('Réservation de Groupe')).toBeVisible()
})

test('prices: group card has contact info', async ({ page }) => {
  await page.goto('/prices')
  await expect(page.getByText(/contactez-nous/i).first()).toBeVisible()
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
  await expect(page.getByText(/vitré sur trois côtés/)).toBeVisible()
})

// ── Careers page ───────────────────────────────────────────────────────────
test('careers: exactly 3 roles, no Coordinateur', async ({ page }) => {
  await page.goto('/careers')
  const content = await page.content()
  expect(content).not.toContain('Coordinateur')
  await expect(page.getByText('Conducteur de Petit Train')).toBeVisible()
  await expect(page.getByText('Agent de Quai')).toBeVisible()
  await expect(page.getByText('Agent de Billetterie')).toBeVisible()
})

test('careers: Agent de Quai description is correct', async ({ page }) => {
  await page.goto('/careers')
  // Find the Agent de Quai role section and verify its description
  const agentDeQuaiSection = page.locator('text=Agent de Quai').first()
  await expect(agentDeQuaiSection).toBeVisible()
  // The Agent de Quai description should mention embarquement
  const content = await page.content()
  expect(content).toContain("Accompagner les passagers lors de l'embarquement")
})

test('careers: Conducteur has Permis D requirement', async ({ page }) => {
  await page.goto('/careers')
  await expect(page.getByText(/Permis D/)).toBeVisible()
})
