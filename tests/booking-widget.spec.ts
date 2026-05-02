import { test, expect } from '@playwright/test'

const REGIONDO_WIDGET_ID = '5712cb43-2e72-445b-956b-947f1f624735'
const REGIONDO_SCRIPT_URL = 'widgets.regiondo.net/product/v1/product-widget.min.js'

test.describe('/book — Regiondo widget integration', () => {
  test('page metadata and branded header intact', async ({ page }) => {
    await page.goto('/book')
    await expect(page).toHaveTitle(/Réservez votre visite.*Petit Train de Carnac/)
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', /\/book$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Réservez votre visite en')
    await expect(page.getByText('Réservation', { exact: true }).first()).toBeVisible()
  })

  test('Regiondo custom element is in the DOM', async ({ page }) => {
    await page.goto('/book')
    const widget = page.locator(`product-details-widget[widget-id="${REGIONDO_WIDGET_ID}"]`)
    await expect(widget).toHaveCount(1)
  })

  test('Regiondo script is loaded by Next.js', async ({ page }) => {
    await page.goto('/book')
    // next/script strategy="afterInteractive" runs after hydration
    await page.waitForLoadState('networkidle')
    const script = page.locator(`script[src*="${REGIONDO_SCRIPT_URL}"]`)
    await expect(script).toHaveCount(1)
  })

  test('visual screenshots at 3 breakpoints', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/book')
    await page.waitForLoadState('networkidle')
    await page.screenshot({ path: 'test-results/book-desktop.png', fullPage: true })

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/book')
    await page.waitForLoadState('networkidle')
    await page.screenshot({ path: 'test-results/book-tablet.png', fullPage: true })

    // Mobile
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/book')
    await page.waitForLoadState('networkidle')
    await page.screenshot({ path: 'test-results/book-mobile.png', fullPage: true })
  })

  test('no regression on homepage animations', async ({ page }) => {
    // Verify we didn't accidentally break the GSAP system
    await page.goto('/')
    const hero = page.locator('[data-anim-section="hero"]').first()
    await expect(hero).toBeVisible()
    await expect(page.locator('[data-anim-navbar]')).toBeVisible()
  })
})
