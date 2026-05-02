import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

type Messages = Record<string, unknown>

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

// Recursive merge — target keys win, fallback fills holes.
function deepMerge(fallback: Messages, target: Messages): Messages {
  const out: Messages = { ...fallback }
  for (const key of Object.keys(target)) {
    const t = target[key]
    const f = fallback[key]
    if (isObject(t) && isObject(f)) {
      out[key] = deepMerge(f, t)
    } else if (t !== undefined && t !== null && t !== '') {
      out[key] = t
    }
    // else: keep fallback
  }
  return out
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  const fallback = (await import(`@/messages/fr.json`)).default as Messages
  const target =
    locale === 'fr'
      ? fallback
      : ((await import(`@/messages/${locale}.json`)).default as Messages)

  return {
    locale,
    messages: locale === 'fr' ? fallback : deepMerge(fallback, target),
  }
})
