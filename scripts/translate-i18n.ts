/**
 * Translate-i18n sync script.
 *
 * Diffs messages/fr.json against the 5 target locale files and asks the
 * Anthropic API to translate any new or changed keys. Tracks last-known
 * source values in messages/.translation-meta.json so unchanged keys are
 * never re-translated (and your manual tweaks aren't overwritten).
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... npx tsx scripts/translate-i18n.ts
 *
 * Optional env:
 *   I18N_LOCALES=en,es        only update specific locales
 *   I18N_FORCE=1              re-translate everything regardless of meta
 */

import Anthropic from '@anthropic-ai/sdk'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(__dirname, '..')
const MESSAGES_DIR = join(ROOT, 'messages')
const META_PATH = join(MESSAGES_DIR, '.translation-meta.json')
const SOURCE_LOCALE = 'fr'
const ALL_TARGETS = ['en', 'es', 'de', 'it', 'nl', 'cs'] as const

type Locale = (typeof ALL_TARGETS)[number]
type FlatMap = Record<string, string>

const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  es: 'Spanish (Spain)',
  de: 'German',
  it: 'Italian',
  nl: 'Dutch',
  cs: 'Czech',
}

function flatten(obj: unknown, prefix = '', out: FlatMap = {}): FlatMap {
  if (typeof obj !== 'object' || obj === null) return out
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k
    if (typeof v === 'string') {
      out[path] = v
    } else if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      flatten(v, path, out)
    }
  }
  return out
}

function unflatten(flat: FlatMap): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [path, value] of Object.entries(flat)) {
    const segments = path.split('.')
    let cursor: Record<string, unknown> = out
    segments.forEach((seg, i) => {
      if (i === segments.length - 1) {
        cursor[seg] = value
      } else {
        if (typeof cursor[seg] !== 'object' || cursor[seg] === null) cursor[seg] = {}
        cursor = cursor[seg] as Record<string, unknown>
      }
    })
  }
  return out
}

function hash(s: string) {
  return createHash('sha256').update(s).digest('hex').slice(0, 16)
}

async function translateBatch(
  client: Anthropic,
  target: Locale,
  pairs: Array<[string, string]>,
): Promise<FlatMap> {
  if (pairs.length === 0) return {}

  const sourceJson = JSON.stringify(Object.fromEntries(pairs), null, 2)

  const systemPrompt = `You are a professional translator localizing a French tourism website (Petit Train de Carnac, a small tourist train in Brittany, France) into ${LOCALE_NAMES[target]}.

Rules:
- Translate every value. Keep keys exactly identical.
- Preserve all HTML-like tags exactly: <strong>, </strong>, <br/>, <em>, etc.
- Keep proper nouns as-is: "Carnac", "La Trinité-sur-Mer", "Vannes", "Quiberon", "Morbihan", "Bretagne", "Petit Train", "Le Petit Trains de Morbihan".
- Preserve numbers and prices in original format ("8,50€", "55 minutes").
- Use natural, friendly tourism copy — avoid literal/awkward translations.
- Return ONLY a valid JSON object (no markdown fences, no commentary). The shape is { "key.path": "translation", ... }.`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 8192,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Translate the values of the following JSON from French to ${LOCALE_NAMES[target]}. Return only the translated JSON.\n\n${sourceJson}`,
      },
    ],
  })

  const textBlock = message.content.find((b) => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') throw new Error('No text response')
  const raw = textBlock.text.trim().replace(/^```(?:json)?\n?|\n?```$/g, '')
  const parsed = JSON.parse(raw) as FlatMap
  return parsed
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY env var required.')
    process.exit(1)
  }

  const targets = (process.env.I18N_LOCALES?.split(',') as Locale[] | undefined) ?? ALL_TARGETS
  const force = process.env.I18N_FORCE === '1'

  const sourceFlat = flatten(
    JSON.parse(readFileSync(join(MESSAGES_DIR, `${SOURCE_LOCALE}.json`), 'utf-8')),
  )
  const meta: FlatMap = existsSync(META_PATH)
    ? JSON.parse(readFileSync(META_PATH, 'utf-8'))
    : {}

  const client = new Anthropic({ apiKey })

  for (const locale of targets) {
    const targetPath = join(MESSAGES_DIR, `${locale}.json`)
    const existing = existsSync(targetPath)
      ? flatten(JSON.parse(readFileSync(targetPath, 'utf-8')))
      : {}

    // Identify keys to (re)translate.
    const todo: Array<[string, string]> = []
    for (const [key, sourceValue] of Object.entries(sourceFlat)) {
      const sourceHash = hash(sourceValue)
      const sameAsLastSync = meta[key] === sourceHash
      const hasTranslation = existing[key] && existing[key].trim() !== ''
      if (force || !sameAsLastSync || !hasTranslation) {
        todo.push([key, sourceValue])
      }
    }

    if (todo.length === 0) {
      console.log(`✓ ${locale}: up to date`)
      continue
    }

    console.log(`→ ${locale}: translating ${todo.length} key${todo.length === 1 ? '' : 's'}…`)
    const translated = await translateBatch(client, locale, todo)

    const merged: FlatMap = { ...existing, ...translated }
    writeFileSync(targetPath, JSON.stringify(unflatten(merged), null, 2) + '\n', 'utf-8')
    console.log(`✓ ${locale}: wrote ${Object.keys(translated).length} translation(s) to ${targetPath}`)
  }

  // Persist source hashes so the next run knows what's changed.
  const newMeta: FlatMap = {}
  for (const [key, value] of Object.entries(sourceFlat)) {
    newMeta[key] = hash(value)
  }
  writeFileSync(META_PATH, JSON.stringify(newMeta, null, 2) + '\n', 'utf-8')
  console.log(`✓ updated ${META_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
