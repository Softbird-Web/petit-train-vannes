'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { routing, localeLabels, type Locale } from '@/i18n/routing'

interface LanguageDropdownProps {
  variant?: 'banner' | 'mobile'
}

export default function LanguageDropdown({ variant = 'banner' }: LanguageDropdownProps) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [open])

  const switchTo = (next: Locale) => {
    if (next === locale) {
      setOpen(false)
      return
    }
    router.replace(pathname, { locale: next })
    setOpen(false)
  }

  const triggerClass =
    variant === 'banner'
      ? 'inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md text-[#f5ebdd] hover:bg-[rgba(245,235,221,0.12)] font-["Manrope",sans-serif] text-[12px] md:text-sm font-medium tracking-[-0.42px] transition-colors duration-200'
      : 'inline-flex items-center gap-1.5 px-3 h-9 rounded-md bg-[rgba(245,235,221,0.1)] hover:bg-[rgba(245,235,221,0.2)] text-[#f5ebdd] font-["Manrope",sans-serif] text-sm font-medium tracking-[-0.42px] transition-colors duration-200'

  const panelAlign    = variant === 'banner' ? 'right-0'       : 'left-0'
  const panelPosition = variant === 'mobile' ? 'bottom-full mb-2' : 'top-full mt-2'
  const panelOrigin   = variant === 'mobile' ? 'origin-bottom' : 'origin-top'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={triggerClass}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${localeLabels[locale].native} — change language`}
      >
        <span aria-hidden="true">{localeLabels[locale].flag}</span>
        <span>{locale.toUpperCase()}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-300 ease-out ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: variant === 'mobile' ? 8 : -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: variant === 'mobile' ? 6 : -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="listbox"
            className={`absolute ${panelAlign} ${panelPosition} min-w-[192px] py-1.5 rounded-lg bg-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] ring-1 ring-black/5 ${panelOrigin} z-50`}
          >
            {routing.locales.map((l) => {
              const active = l === locale
              return (
                <li key={l}>
                  <button
                    type="button"
                    onClick={() => switchTo(l)}
                    role="option"
                    aria-selected={active}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2 font-['Manrope',sans-serif] text-sm tracking-[-0.42px] text-[#181d27] hover:bg-[#f5ebdd] transition-colors duration-150 ${active ? 'font-semibold' : 'font-normal'}`}
                  >
                    <span aria-hidden="true" className="text-base leading-none">{localeLabels[l].flag}</span>
                    <span>{localeLabels[l].native}</span>
                    {active && <span className="ml-auto text-[#54206d]" aria-hidden="true">✓</span>}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
