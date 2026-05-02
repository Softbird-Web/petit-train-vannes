'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

interface ViewPlanButtonProps {
  buttonLabel: string
  imageAlt: string
  closeLabel: string
}

export default function ViewPlanButton({ buttonLabel, imageAlt, closeLabel }: ViewPlanButtonProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  return (
    <>
      <div className="rounded-[16px] bg-white/10 border border-white/15 px-5 py-4 flex items-center justify-center">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 h-[45px] px-[22px] bg-white/20 hover:bg-white/30 transition-colors rounded-[4px] border border-white/30 text-white text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2h5v1.5H3.5v9h9V10H14v4H2V2Z" fill="currentColor"/>
            <path d="M9 2h5v5h-1.5V4.06L7.03 9.53 5.97 8.47 11.44 3H9V2Z" fill="currentColor"/>
          </svg>
          {buttonLabel}
        </button>
      </div>

      {open && createPortal(
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={imageAlt}
        >
          <div
            className="relative w-full max-w-[1200px] max-h-[90vh] aspect-[3/2]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/figma-assets/RoutesHero.jpg"
              alt={imageAlt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white text-[32px] leading-none hover:text-white/70 transition-colors"
            onClick={() => setOpen(false)}
            aria-label={closeLabel}
          >
            ×
          </button>
        </div>,
        document.body
      )}
    </>
  )
}
