import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// Next.js auto-generates /robots.txt from this export at build time.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
