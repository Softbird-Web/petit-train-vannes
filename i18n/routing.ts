import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fr', 'en', 'es', 'de', 'it', 'nl', 'cs'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
})

export type Locale = (typeof routing.locales)[number]

export const localeLabels: Record<Locale, { native: string; flag: string }> = {
  fr: { native: 'Français', flag: '🇫🇷' },
  en: { native: 'English', flag: '🇬🇧' },
  es: { native: 'Español', flag: '🇪🇸' },
  de: { native: 'Deutsch', flag: '🇩🇪' },
  it: { native: 'Italiano', flag: '🇮🇹' },
  nl: { native: 'Nederlands', flag: '🇳🇱' },
  cs: { native: 'Čeština', flag: '🇨🇿' },
}
