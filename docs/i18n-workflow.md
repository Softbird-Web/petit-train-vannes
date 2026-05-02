# i18n workflow — how localization stays in sync

## TL;DR

`messages/fr.json` is the source of truth. When you edit it, run:

```bash
ANTHROPIC_API_KEY=sk-ant-... npm run translate
```

The script translates only the keys that changed since the last run, in all 6 target locales (en, es, de, it, nl, cs). Anything missing falls back to French at runtime so the site never breaks.

---

## File layout

```
i18n/
  routing.ts        ← supported locales list, defaultLocale, localePrefix
  request.ts        ← per-request loader (with French fallback merge)
  navigation.ts     ← typed locale-aware Link / useRouter / usePathname

messages/
  fr.json           ← SOURCE OF TRUTH — edit this only
  en.json           ← derived translations
  es.json
  de.json
  it.json
  nl.json
  cs.json
  .translation-meta.json   ← auto-managed; tracks source key hashes

proxy.ts            ← next-intl middleware (Next 16 calls it proxy.ts)
scripts/translate-i18n.ts  ← AI sync script
```

## URL strategy

`localePrefix: 'as-needed'` — French is the default, no prefix:

| Locale | URL example |
|--------|-------------|
| `fr` (default) | `/`, `/prices`, `/routes` |
| `en` | `/en`, `/en/prices` |
| `es` | `/es/prices` |
| `de` | `/de/prices` |
| `it` | `/it/prices` |
| `nl` | `/nl/prices` |
| `cs` | `/cs/prices` |

The language dropdown (top-right of the announcement banner) calls `router.replace(pathname, { locale })` to swap locales while staying on the same logical page.

## Editing copy

1. Open `messages/fr.json`.
2. Change a value or add a new key.
3. In a Server Component: `const t = await getTranslations('namespace'); t('key')`. In a Client Component: `const t = useTranslations('namespace'); t('key')`. For HTML formatting in a translation, use `t.rich('key', { strong: (chunks) => <strong>{chunks}</strong> })`.

## Running the sync script

```bash
# default — translates everything that changed in fr.json
npm run translate

# limit to specific locales
I18N_LOCALES=en,de npm run translate

# force re-translation of every key (rarely needed)
I18N_FORCE=1 npm run translate
```

The script uses `claude-sonnet-4-6` and translates in batches per locale. Approximate cost: pennies for the full Phase 1 catalog.

## Fallback behavior

`i18n/request.ts` deep-merges every locale's messages on top of the French source. If a key is missing or empty in `en.json`, the French value is used. So:

- An untranslated section of the site renders in French under `/en` until a translator catches up.
- A typo in a key name surfaces as the French value (visible regression) instead of an `IntlError`.

## Rich text & interpolation

```jsonc
{
  "hero": {
    "description": "A guided tour <strong>50 minutes</strong> long.",
    "noteImportanteBody": "Book up to <strong>2 hours</strong> ahead.<br/>Not all seats sold online."
  }
}
```

```tsx
t.rich('hero.description', {
  strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
})

t.rich('hero.noteImportanteBody', {
  strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
  br: () => <br />,
})
```

Tag names are arbitrary — the second arg of `t.rich()` declares which renderer maps to which tag.

## Phase 2 backlog

- Extract remaining ~104 strings from section components (PracticalInfo, Prices, BeforeYouBook, Features, GroupBookingCTA, Locations, Reviews, BookingSection, all `*Hero` variants except the homepage Hero, InformationsSchedule, RoutesTimeline, CareersInfo, FAQ data arrays).
- Localize the root JSON-LD schema description in `app/[locale]/layout.tsx`.
- Add per-page metadata via `generateMetadata` + `getTranslations` for `/prices`, `/routes`, etc.
- Add `setRequestLocale(locale)` at the top of every page (only the homepage has it as of Phase 1).
- One human-review pass per non-French locale before launch.
