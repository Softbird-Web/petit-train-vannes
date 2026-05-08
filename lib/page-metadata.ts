import type { Locale } from '@/i18n/routing'
import { routing } from '@/i18n/routing'
import { getPathname } from '@/i18n/navigation'

/**
 * Builds complete per-page metadata: title, description, locale-aware canonical,
 * in-page hreflang alternates, OpenGraph, and Twitter card.
 *
 * Fixes three P1 SEO issues:
 * - OG/Twitter fall back to homepage values without this (social sharing bug)
 * - In-page hreflang is stronger than sitemap-only hreflang
 * - Canonical must be locale-aware (e.g. /en/prices not /prices for English)
 */
export function buildPageMetadata(
  locale: string,
  title: string,
  description: string,
  href: string
) {
  const loc = locale as Locale
  return {
    title,
    description,
    alternates: {
      canonical: getPathname({ locale: loc, href }),
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, getPathname({ locale: l, href })])
      ),
    },
    openGraph: {
      title,
      description,
      type: 'website' as const,
      images: [
        {
          url: '/figma-assets/OpenGraph.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
    },
  }
}
