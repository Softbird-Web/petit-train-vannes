/**
 * Canonical site URL — single source of truth.
 *
 * Reads from NEXT_PUBLIC_SITE_URL if set (recommended for production),
 * otherwise falls back to the Vercel preview URL.
 *
 * When the custom domain goes live:
 * 1. Add NEXT_PUBLIC_SITE_URL=https://yourdomain.fr to Vercel project env vars
 * 2. No code changes needed — sitemap, canonicals, JSON-LD all update automatically
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://petit-train-carnac.vercel.app'

/**
 * Absolute URL helper — prepend SITE_URL to a path.
 * Use for JSON-LD where relative paths don't resolve.
 */
export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${clean}`
}
