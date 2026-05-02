'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { usePageTransition } from '@/components/providers/PageTransitionProvider'

interface TransitionLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function TransitionLink({ href, children, className, onClick }: TransitionLinkProps) {
  const { triggerTransition } = usePageTransition()
  const pathname = usePathname()

  const isExternal =
    href.startsWith('http') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#')

  const isSamePage = href === pathname || href === pathname + '/'

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick()
    if (isExternal || isSamePage) return
    e.preventDefault()
    triggerTransition(href)
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
