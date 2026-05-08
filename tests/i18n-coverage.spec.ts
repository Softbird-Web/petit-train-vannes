/**
 * i18n coverage spec — catches two categories of regression:
 *   1. Literal HTML escape sequences rendered as text (e.g. "&lt;br/&gt;", "&lt;strong&gt;")
 *   2. French content leaking into non-French locales (stop-word frequency check)
 *
 * Run: npx playwright test tests/i18n-coverage.spec.ts
 */

import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'

const LOCALES = ['fr', 'en', 'es', 'de', 'it', 'nl', 'cs'] as const
const PAGES = ['/', '/prices', '/routes', '/informations', '/faqs', '/book', '/privatisation', '/careers'] as const

// French stop words that should not appear in non-FR locales.
// Uses Unicode-aware word boundaries (covers é, ä, ü, etc.) so words like
// "estándar" and "quién" don't false-match "est" / "qui" via JS \b.
const FR_STOP_WORDS_BASE = [
  'votre','notre','nos','vos','les','des','avec','pour','dans','sans','sur','par','chez',
  'que','qui','est','sont','cette','ces','leurs','leur','aussi','tout','tous','toute',
  'toutes','pendant','après','avant',
]
// Words that are also common standalone words in specific non-French locales.
const LOCALE_STOP_WORD_EXCLUSIONS: Partial<Record<string, string[]>> = {
  es: ['que', 'les'],  // common Spanish conjunction & indirect-object pronoun
  de: ['des'],         // German genitive article
}
// Extended-Latin character class — used for Unicode-aware "word" boundary
const LATIN = 'a-zA-ZÀ-ÖØ-öø-ÿ'
function getFrStopWordPattern(locale: string): RegExp {
  const exclusions = LOCALE_STOP_WORD_EXCLUSIONS[locale] ?? []
  const words = FR_STOP_WORDS_BASE.filter(w => !exclusions.includes(w))
  return new RegExp(`(?<![${LATIN}])(${words.join('|')})(?![${LATIN}])`, 'gi')
}

// Brand names and proper nouns that are legitimately French in every locale.
const FR_ALLOWLIST = [
  'le petit train',
  'petit train de vannes',
  'petit train de carnac',
  'petit train',
  'carnac',
  'menhirs',
  'ménec',
  'kermario',
  'kerlescan',
  'la trinité-sur-mer',
  'la trinité',
  'trinité',
  'bretagne',
  'morbihan',
  'quiberon',
  'vannes',
  // Vannes-specific proper nouns that stay French in all locales
  'place gambetta',
  'gambetta',
  'jardins de la garenne',
  'la garenne',
  'garenne',
  'porte prison',
  'la toussaint',
  'toussaint',
  'cathédrale saint-pierre',
  'saint-pierre',
  'place henri iv',
  'henri iv',
  // Carnac sister-site proper nouns
  'maison des mégalithes',
  'cours des quais',
  'port en drô',
  'alignements du ménec',
  'alignements de kermario',
  'saint-cornély',
  'guide audio',
  // months kept FR on schedule page by design
  'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre', 'janvier', 'février', 'mars',
]

// Literal HTML tag substrings that must never appear in rendered page text.
const FORBIDDEN_LITERAL_TAGS = ['<br/>', '<br />', '<strong>', '</strong>', '<em>', '</em>']

// Screenshot output dir
const SCREENSHOT_DIR = path.join(__dirname, '..', 'test-results', 'i18n-screenshots')

function urlForLocale(locale: string, page: string): string {
  if (locale === 'fr') return page
  return `/${locale}${page}`
}

function stripAllowlist(text: string): string {
  let result = text.toLowerCase()
  for (const term of FR_ALLOWLIST) {
    result = result.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '')
  }
  return result
}

test.beforeAll(() => {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
})

for (const locale of LOCALES) {
  for (const page of PAGES) {
    const url = urlForLocale(locale, page)
    const label = `${locale}${page.replace(/\//g, '-') || '-home'}`

    test(`[${locale}] ${page} — no literal HTML tags`, async ({ page: pw }) => {
      await pw.goto(url, { waitUntil: 'domcontentloaded' })
      const bodyText = await pw.locator('body').innerText()

      for (const tag of FORBIDDEN_LITERAL_TAGS) {
        expect(
          bodyText,
          `Literal tag "${tag}" found on ${url}`
        ).not.toContain(tag)
      }

      await pw.screenshot({
        path: path.join(SCREENSHOT_DIR, `${label}.png`),
        fullPage: true,
      })
    })

    if (locale !== 'fr') {
      test(`[${locale}] ${page} — no French content leak`, async ({ page: pw }) => {
        await pw.goto(url, { waitUntil: 'domcontentloaded' })
        // Exclude elements with lang="fr" — authentic customer reviews are intentionally
        // kept in original French regardless of locale.
        const bodyText = await pw.evaluate(() => {
          let text = (document.body as HTMLElement).innerText
          document.body.querySelectorAll<HTMLElement>('[lang="fr"]').forEach(el => {
            const frText = el.innerText
            if (frText) text = text.split(frText).join('')
          })
          return text
        })
        const stripped = stripAllowlist(bodyText)
        const matches = stripped.match(getFrStopWordPattern(locale)) ?? []

        expect(
          matches.length,
          `Found ${matches.length} French stop-word matches on ${url}: [${[...new Set(matches)].slice(0, 10).join(', ')}]`
        ).toBeLessThanOrEqual(5)
      })
    }
  }
}
