'use client'

import Image from 'next/image'
import { usePageTransition } from '@/components/providers/PageTransitionProvider'

export default function TransitionOverlay() {
  const { overlayRef, panelRef, panelTopRef, panelBottomRef, logoRef } = usePageTransition()

  return (
    <div
      ref={overlayRef}
      data-transition-wrap
      aria-hidden="true"
    >
      <div ref={panelRef} data-transition-panel className="transition__panel">
        <div ref={panelTopRef} data-transition-panel-top className="transition__panel-top">
          <div className="transition__panel-circle" />
        </div>
        <div ref={panelBottomRef} data-transition-panel-bottom className="transition__panel-bottom">
          <div className="transition__panel-circle" />
        </div>

        {/* Centered logo — fades in while panel covers the screen */}
        <div ref={logoRef} data-transition-logo className="transition__logo">
          <Image
            src="/figma-assets/logo.svg"
            alt="Petit Train de Carnac"
            width={132}
            height={53}
            priority
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </div>
    </div>
  )
}
