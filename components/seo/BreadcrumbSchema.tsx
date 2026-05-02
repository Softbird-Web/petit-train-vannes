import { absoluteUrl } from '@/lib/site'

type Crumb = { name: string; path: string }

/**
 * Emits a BreadcrumbList JSON-LD schema for subpages.
 * Google uses this to render breadcrumb snippets in SERPs and to understand site hierarchy.
 *
 * Usage (in any subpage):
 *   <BreadcrumbSchema items={[
 *     { name: 'Accueil', path: '/' },
 *     { name: 'Tarifs & Billets', path: '/prices' },
 *   ]} />
 */
export default function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
