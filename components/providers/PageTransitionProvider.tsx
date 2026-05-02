'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from 'react'
import { useRouter, usePathname } from '@/i18n/navigation'

interface PageTransitionContextValue {
  triggerTransition: (href: string) => void
  overlayRef: React.RefObject<HTMLDivElement | null>
  panelRef: React.RefObject<HTMLDivElement | null>
  panelTopRef: React.RefObject<HTMLDivElement | null>
  panelBottomRef: React.RefObject<HTMLDivElement | null>
  logoRef: React.RefObject<HTMLDivElement | null>
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext)
  if (!ctx) throw new Error('usePageTransition must be used inside PageTransitionProvider')
  return ctx
}


export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const panelTopRef = useRef<HTMLDivElement>(null)
  const panelBottomRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  const stateRef = useRef<'idle' | 'leaving' | 'entering'>('idle')
  const isFirstLoadRef = useRef(true)

  // Import lenis context lazily (avoids circular dep issues)
  const lenisRef = useRef<{ stop: () => void; start: () => void } | null>(null)

  useEffect(() => {
    // Dynamically import to avoid circular dep — LenisProvider is a sibling in the tree
    // We reach lenis via a global ref set by LenisProvider
    // Instead, we use the DOM event approach: dispatch custom events for lenis control
  }, [])

  // Register GSAP plugins once on client
  useEffect(() => {
    if (typeof window === 'undefined') return

    import('gsap').then(({ gsap }) => {
      import('gsap/CustomEase').then(({ CustomEase }) => {
        gsap.registerPlugin(CustomEase)
        CustomEase.create('osmo', '0.625, 0.05, 0, 1')
        gsap.defaults({ ease: 'osmo' })
      })
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        // Lenis scroll → ScrollTrigger update: wired in LenisProvider via custom event
        window.addEventListener('lenis-scroll', () => ScrollTrigger.update())
      })
    })
  }, [])

  const triggerTransition = (href: string) => {
    if (stateRef.current !== 'idle') return
    stateRef.current = 'leaving'

    // Pause smooth scroll during transition
    window.dispatchEvent(new CustomEvent('page-transition-stop'))

    // Kill scroll triggers
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    })

    import('gsap').then(({ gsap }) => {
      const overlay = overlayRef.current
      const panel = panelRef.current
      const panelTop = panelTopRef.current
      const panelBottom = panelBottomRef.current
      const logo = logoRef.current
      const content = document.querySelector<HTMLElement>('[data-transition-content]')

      if (!overlay || !panel || !panelTop || !panelBottom) {
        // Fallback: just navigate
        stateRef.current = 'idle'
        router.push(href)
        return
      }

      // Make overlay visible and interactive
      overlay.classList.add('is-active')

      const tl = gsap.timeline()

      // Panel wipes up from bottom (starts at top:100% = off screen below)
      tl.set(panel, { y: '100%' }, 0)
      tl.set(panelTop, { scaleY: 0, height: '15vw' }, 0)
      tl.set(panelBottom, { scaleY: 1, height: '20vw' }, 0)

      if (logo) {
        tl.set(logo, { opacity: 0, y: 24 }, 0)
      }

      // Animate panel up to cover screen
      tl.to(panel, { y: '0%', duration: 0.9 }, 0)
      tl.to(panelTop, { scaleY: 1, duration: 0.9 }, 0)
      tl.to(panelBottom, { scaleY: 0, duration: 0.9 }, 0)

      // Parallax current page out
      if (content) {
        tl.to(content, { y: '-10dvh', duration: 0.9 }, 0)
      }

      // Logo fades in
      if (logo) {
        tl.to(logo, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.35)
      }

      // Navigate at 950ms (page loads in background during transition)
      setTimeout(() => {
        router.push(href)
      }, 950)
    })
  }

  // Watch pathname changes → fire enter animation
  useEffect(() => {
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false
      return
    }

    if (stateRef.current !== 'leaving') return
    stateRef.current = 'entering'

    import('gsap').then(({ gsap }) => {
      const overlay = overlayRef.current
      const panel = panelRef.current
      const panelTop = panelTopRef.current
      const panelBottom = panelBottomRef.current
      const logo = logoRef.current
      const content = document.querySelector<HTMLElement>('[data-transition-content]')

      if (!overlay || !panel) {
        stateRef.current = 'idle'
        window.dispatchEvent(new CustomEvent('page-transition-start'))
        return
      }

      // Scroll to top before new page enters
      window.scrollTo(0, 0)

      const tl = gsap.timeline({
        onComplete: () => {
          stateRef.current = 'idle'
          overlay.classList.remove('is-active')

          // Reset content position
          if (content) {
            gsap.set(content, { y: 0, clearProps: 'y' })
          }

          // Resume smooth scroll
          window.dispatchEvent(new CustomEvent('page-transition-start'))

        },
      })

      // New page slides up from below
      if (content) {
        gsap.set(content, { y: '20dvh' })
        tl.to(content, { y: 0, duration: 0.9 }, 1.35)
      }

      // Panel continues upward off screen
      tl.to(panel, { y: '-100%', duration: 0.9 }, 1.35)

      // Logo fades out
      if (logo) {
        tl.to(logo, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, 1.35)
      }

      // Clean up overlay — reset panel off-screen and clear curved-edge inline styles
      tl.set(panel, { y: '100%' }, '>')
      tl.set(panelTop, { clearProps: 'all' }, '>')
      tl.set(panelBottom, { clearProps: 'all' }, '>')
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <PageTransitionContext.Provider
      value={{ triggerTransition, overlayRef, panelRef, panelTopRef, panelBottomRef, logoRef }}
    >
      {children}
    </PageTransitionContext.Provider>
  )
}
