'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Animation contract
 *
 *   <section data-anim-section>              // reveal on scroll (or immediate if it's the hero)
 *     <div data-anim-item>...</div>          // staggers with its siblings in DOM order
 *     <div data-anim-item>...</div>
 *   </section>
 *
 * If no items exist inside a section, the section itself fades as one block.
 * Hero section (marked data-anim-section="hero") plays immediately instead of on scroll.
 * Navbar (marked data-anim-navbar) animates once on first page load only.
 * Legacy `data-anim="..."` tags are still collected and treated as items.
 */

const REVEAL_HIDDEN = {
  opacity: 0,
  yPercent: 60,
  filter: 'blur(20px)',
  willChange: 'transform, filter, opacity',
}
const REVEAL_SHOWN = {
  opacity: 1,
  yPercent: 0,
  filter: 'blur(0px)',
}
const DEFAULTS = { duration: 1, ease: 'power3.out' }
const ITEM_STAGGER = 0.12

function initButtonCharacterStagger() {
  const offsetIncrement = 0.01
  const buttons = document.querySelectorAll('[data-button-animate-chars]')
  buttons.forEach((button) => {
    const text = button.textContent
    button.innerHTML = ''
    ;[...(text ?? '')].forEach((char, index) => {
      const span = document.createElement('span')
      span.textContent = char
      span.style.transitionDelay = `${index * offsetIncrement}s`
      if (char === ' ') span.style.whiteSpace = 'pre'
      button.appendChild(span)
    })
  })
}

function clearWillChange(els: Element[]) {
  els.forEach((el) => {
    ;(el as HTMLElement).style.willChange = 'auto'
  })
}

function collectItems(section: Element): HTMLElement[] {
  // Take any tagged item in DOM order. Explicit authoring > heuristic detection.
  const nodes = section.querySelectorAll<HTMLElement>('[data-anim-item], [data-anim]')
  return Array.from(nodes)
}

function revealSection(section: Element, { immediate }: { immediate: boolean }) {
  const items = collectItems(section)
  const scrollTrigger = immediate
    ? undefined
    : {
        trigger: section,
        start: 'top 80%',
        once: true,
        toggleActions: 'play none none none',
        invalidateOnRefresh: true,
      }

  // Fallback: no tagged items → animate the section itself as one block
  if (items.length === 0) {
    gsap.set(section, REVEAL_HIDDEN)
    const tl = gsap.timeline({ defaults: DEFAULTS, scrollTrigger })
    tl.to(section, {
      ...REVEAL_SHOWN,
      onComplete: () => clearWillChange([section]),
    })
    if (immediate) requestAnimationFrame(() => tl.play(0))
    return
  }

  gsap.set(items, REVEAL_HIDDEN)
  const tl = gsap.timeline({ defaults: DEFAULTS, scrollTrigger })
  tl.to(items, {
    ...REVEAL_SHOWN,
    stagger: ITEM_STAGGER,
    onComplete: () => clearWillChange(items),
  })
  if (immediate) requestAnimationFrame(() => tl.play(0))
}

function revealNavbar() {
  const navbar = document.querySelector<HTMLElement>('[data-anim-navbar]')
  if (!navbar) return
  gsap.set(navbar, {
    opacity: 0,
    yPercent: -60,
    filter: 'blur(20px)',
    willChange: 'transform, filter, opacity',
  })
  gsap.to(navbar, {
    ...REVEAL_SHOWN,
    ...DEFAULTS,
    onComplete: () => clearWillChange([navbar]),
  })
}

function initScrollReveal({ isFirstLoad }: { isFirstLoad: boolean }) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  // Navbar persists across page transitions — only animate it on initial mount
  if (isFirstLoad) revealNavbar()

  document.querySelectorAll('[data-anim-section]').forEach((section) => {
    const isHero = section.matches("[data-anim-section='hero']")
    revealSection(section, { immediate: isHero })
  })
}

export default function AnimationInit() {
  useEffect(() => {
    let firstInit = true

    function init() {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      initButtonCharacterStagger()
      initScrollReveal({ isFirstLoad: firstInit })
      firstInit = false
    }

    init()

    const onTransition = () => init()
    window.addEventListener('page-transition-start', onTransition)
    return () => window.removeEventListener('page-transition-start', onTransition)
  }, [])

  return null
}
