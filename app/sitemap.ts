import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { routing } from '@/i18n/routing'
import { getPathname } from '@/i18n/navigation'

// Next.js auto-generates /sitemap.xml from this export at build time.
// Each route is emitted once per locale with hreflang alternates pointing to
// the same path under every supported locale.

type RouteConfig = {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes: RouteConfig[] = [
    { path: '/', priority: 1.0, changeFrequency: 'monthly' },
    { path: '/routes', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/prices', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/informations', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/book', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/faqs', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/privatisation', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/careers', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/mentions-legales', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/politique-de-confidentialite', priority: 0.2, changeFrequency: 'yearly' },
  ]

  const buildUrl = (path: RouteConfig['path'], locale: (typeof routing.locales)[number]) =>
    `${SITE_URL}${getPathname({ locale, href: path })}`

  return routes.flatMap((r) =>
    routing.locales.map((locale) => ({
      url: buildUrl(r.path, locale),
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: locale === routing.defaultLocale ? r.priority : Math.max(0.1, r.priority - 0.1),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, buildUrl(r.path, l)])
        ),
      },
    })),
  )
}
