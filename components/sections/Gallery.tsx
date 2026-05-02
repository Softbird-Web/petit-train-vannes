'use client'

import Image from 'next/image'
import { useEffect, useRef, useSyncExternalStore } from 'react'
import { useTranslations } from 'next-intl'

type Photo = { src: string; width: number; height: number }

// Display aspect ratios mix portrait / square / landscape / panorama so the
// masonry actually looks varied even though all source images are 3:2.
// object-fit: cover on the img crops to these aspects at render time.
const GALLERY_PHOTOS: Photo[] = [
  { src: '/figma-assets/gallery-12.jpg', width: 16, height: 9 },  // panorama — drone, train + menhirs (brand hero)
  { src: '/figma-assets/gallery-1.jpg', width: 3, height: 4 },    // portrait
  { src: '/figma-assets/gallery-13.jpg', width: 1, height: 1 },   // square — dramatic fallen-menhir close-up
  { src: '/figma-assets/gallery-2.jpg', width: 3, height: 2 },    // landscape
  { src: '/figma-assets/gallery-14.jpg', width: 3, height: 2 },   // landscape — train alongside menhir alignment
  { src: '/figma-assets/gallery-3.jpg', width: 1, height: 1 },    // square
  { src: '/figma-assets/gallery-15.jpg', width: 3, height: 4 },   // portrait — aerial alignment cropped vertical
  { src: '/figma-assets/gallery-4.jpg', width: 4, height: 3 },    // landscape wide
  { src: '/figma-assets/gallery-5.jpg', width: 4, height: 5 },    // portrait
  { src: '/figma-assets/gallery-16.jpg', width: 4, height: 3 },   // landscape — evening menhir vista
  { src: '/figma-assets/gallery-6.jpg', width: 3, height: 2 },    // landscape
  { src: '/figma-assets/gallery-7.jpg', width: 3, height: 4 },    // portrait
  { src: '/figma-assets/gallery-17.jpg', width: 3, height: 2 },   // landscape — train + dolmen ground level
  { src: '/figma-assets/gallery-8.jpg', width: 1, height: 1 },    // square
  { src: '/figma-assets/gallery-9.jpg', width: 3, height: 2 },    // landscape
  { src: '/figma-assets/gallery-10.jpg', width: 4, height: 5 },   // portrait
  { src: '/figma-assets/gallery-11.jpg', width: 16, height: 9 },  // panorama
  { src: '/figma-assets/gallery-18.jpg', width: 3, height: 2 },   // landscape — aerial train + menhir field (drone)
  { src: '/figma-assets/gallery-19.jpg', width: 3, height: 4 },   // portrait — menhirs in a row, cloudy mood
  { src: '/figma-assets/gallery-20.jpg', width: 16, height: 9 },  // panorama — train alongside menhir alignment
  { src: '/figma-assets/gallery-21.jpg', width: 4, height: 3 },   // landscape wide — train at dolmens
  { src: '/figma-assets/gallery-22.jpg', width: 1, height: 1 },   // square — ground-level menhir close-up
]

const MOBILE_QUERY = '(max-width: 767px)'

function subscribeMobile(callback: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

function getMobileSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches
}

function getMobileServerSnapshot() {
  return false // desktop-first render
}

function distribute(photos: Photo[], numColumns: number): Photo[][] {
  const cols = Array.from({ length: numColumns }, () => ({
    items: [] as Photo[],
    relHeight: 0,
  }))
  for (const p of photos) {
    const normalized = p.height / p.width
    const target = cols.reduce((a, b) => (a.relHeight <= b.relHeight ? a : b))
    target.items.push(p)
    target.relHeight += normalized
  }
  return cols.map((c) => c.items)
}

export default function Gallery() {
  const t = useTranslations('sections.gallery')
  const containerRef = useRef<HTMLDivElement>(null)
  const cleanupRef = useRef<(() => void) | null>(null)
  const isMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServerSnapshot)
  const numColumns = isMobile ? 2 : 3
  const columns = isMobile
    ? GALLERY_PHOTOS.reduce<Photo[][]>((cols, p, i) => { cols[i % 2].push(p); return cols }, [[], []])
    : distribute(GALLERY_PHOTOS, numColumns)
  const flatPhotos = columns.flat()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false

    // Dynamic import keeps GSAP out of the server bundle and avoids SSR issues.
    Promise.all([import('gsap'), import('gsap/Flip')]).then(([{ gsap }, { Flip }]) => {
      if (disposed) return

      gsap.registerPlugin(Flip)

      gsap.defaults({
        ease: 'power4.inOut',
        duration: 0.8,
      })

      const elements = {
        wrapper: container.querySelector<HTMLElement>('[data-lightbox="wrapper"]'),
        triggers: container.querySelectorAll<HTMLButtonElement>('[data-lightbox="trigger"]'),
        triggerParents: container.querySelectorAll<HTMLElement>('[data-lightbox="trigger-parent"]'),
        items: container.querySelectorAll<HTMLElement>('[data-lightbox="item"]'),
        nav: container.querySelectorAll<HTMLElement>('[data-lightbox="nav"]'),
        counter: {
          current: container.querySelector<HTMLElement>('[data-lightbox="counter-current"]'),
          total: container.querySelector<HTMLElement>('[data-lightbox="counter-total"]'),
        },
        buttons: {
          prev: container.querySelector<HTMLButtonElement>('[data-lightbox="prev"]'),
          next: container.querySelector<HTMLButtonElement>('[data-lightbox="next"]'),
          close: container.querySelector<HTMLButtonElement>('[data-lightbox="close"]'),
        },
      }

      const mainTimeline = gsap.timeline()

      if (elements.counter.total) {
        elements.counter.total.textContent = String(elements.triggers.length)
      }

      function closeLightbox() {
        mainTimeline.clear()
        gsap.killTweensOf([
          elements.wrapper,
          elements.nav,
          elements.triggerParents,
          elements.items,
          container!.querySelector('[data-lightbox="original"]'),
        ])

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          onComplete: () => {
            elements.wrapper?.classList.remove('is-active')

            elements.items.forEach((item) => {
              item.classList.remove('is-active')
              const lightboxImage = item.querySelector('img')
              if (lightboxImage) {
                lightboxImage.style.display = ''
              }
            })

            const originalImg = container!.querySelector<HTMLElement>('[data-lightbox="original"]')
            if (originalImg) {
              gsap.set(originalImg, { clearProps: 'all' })
            }

            const originalParent = container!.querySelector<HTMLElement>('[data-lightbox="original-parent"]')
            if (originalParent) {
              originalParent.parentElement?.style.removeProperty('height')
            }
          },
        })

        const originalItem = container!.querySelector<HTMLElement>('[data-lightbox="original"]')
        const originalParent = container!.querySelector<HTMLElement>('[data-lightbox="original-parent"]')

        if (originalItem && originalParent) {
          gsap.set(originalItem, { clearProps: 'all' })
          originalParent.appendChild(originalItem)
          originalParent.removeAttribute('data-lightbox')
          originalItem.removeAttribute('data-lightbox')
        }

        const activeLightboxSlide = container!.querySelector<HTMLElement>('[data-lightbox="item"].is-active')

        tl.to(elements.triggerParents, {
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.03,
          overwrite: true,
        })
          .to(
            elements.nav,
            {
              autoAlpha: 0,
              y: '1rem',
              duration: 0.4,
              stagger: 0,
            },
            '<'
          )
          .to(
            elements.wrapper,
            {
              backgroundColor: 'rgba(0,0,0,0)',
              duration: 0.4,
            },
            '<'
          )
          .to(
            activeLightboxSlide,
            {
              autoAlpha: 0,
              duration: 0.4,
            },
            '<'
          )
          .set([elements.items, activeLightboxSlide, elements.triggerParents], { clearProps: 'all' })

        mainTimeline.add(tl)
      }

      function handleOutsideClick(event: MouseEvent) {
        if (event.detail === 0) return

        const clickedElement = event.target as HTMLElement
        const isOutside = !clickedElement.closest(
          '[data-lightbox="item"].is-active img, [data-lightbox="nav"], [data-lightbox="close"], [data-lightbox="trigger"]'
        )

        if (isOutside) {
          closeLightbox()
        }
      }

      function updateActiveItem(index: number) {
        elements.items.forEach((item) => item.classList.remove('is-active'))
        elements.items[index]?.classList.add('is-active')

        if (elements.counter.current) {
          elements.counter.current.textContent = String(index + 1)
        }
      }

      const triggerHandlers: Array<[HTMLButtonElement, () => void]> = []

      elements.triggers.forEach((trigger, index) => {
        const handler = () => {
          mainTimeline.clear()
          gsap.killTweensOf([elements.wrapper, elements.nav, elements.triggerParents])

          const img = trigger.querySelector('img')
          if (!img) return
          const state = Flip.getState(img)

          const triggerRect = trigger.getBoundingClientRect()
          if (trigger.parentElement) {
            trigger.parentElement.style.height = `${triggerRect.height}px`
          }

          trigger.setAttribute('data-lightbox', 'original-parent')
          img.setAttribute('data-lightbox', 'original')

          updateActiveItem(index)

          container!.addEventListener('click', handleOutsideClick)

          const tl = gsap.timeline()
          elements.wrapper?.classList.add('is-active')
          const targetItem = elements.items[index]

          const lightboxImage = targetItem?.querySelector('img')
          if (lightboxImage) {
            lightboxImage.style.display = 'none'
          }

          elements.triggerParents.forEach((otherTrigger) => {
            if (otherTrigger !== trigger) {
              gsap.to(otherTrigger, {
                autoAlpha: 0,
                duration: 0.4,
                stagger: 0.02,
                overwrite: true,
              })
            }
          })

          if (targetItem && !targetItem.contains(img)) {
            targetItem.appendChild(img)
            tl.add(
              Flip.from(state, {
                targets: img,
                absolute: true,
                duration: 0.6,
                ease: 'power2.inOut',
              }),
              0
            )
          }

          tl.to(
            elements.wrapper,
            {
              backgroundColor: 'rgba(0,0,0,0.75)',
              duration: 0.6,
            },
            0
          ).fromTo(
            elements.nav,
            {
              autoAlpha: 0,
              y: '1rem',
            },
            {
              autoAlpha: 1,
              y: '0rem',
              duration: 0.6,
              stagger: { each: 0.05, from: 'center' },
            },
            0.2
          )

          mainTimeline.add(tl)
        }
        trigger.addEventListener('click', handler)
        triggerHandlers.push([trigger, handler])
      })

      const nextHandler = () => {
        const currentIndex = Array.from(elements.items).findIndex((item) => item.classList.contains('is-active'))
        const nextIndex = (currentIndex + 1) % elements.items.length
        updateActiveItem(nextIndex)
      }
      const prevHandler = () => {
        const currentIndex = Array.from(elements.items).findIndex((item) => item.classList.contains('is-active'))
        const prevIndex = (currentIndex - 1 + elements.items.length) % elements.items.length
        updateActiveItem(prevIndex)
      }
      const closeHandler = () => closeLightbox()

      elements.buttons.next?.addEventListener('click', nextHandler)
      elements.buttons.prev?.addEventListener('click', prevHandler)
      elements.buttons.close?.addEventListener('click', closeHandler)

      const keyHandler = (event: KeyboardEvent) => {
        if (!elements.wrapper?.classList.contains('is-active')) return
        switch (event.key) {
          case 'Escape':
            closeLightbox()
            break
          case 'ArrowRight':
            elements.buttons.next?.click()
            break
          case 'ArrowLeft':
            elements.buttons.prev?.click()
            break
        }
      }
      document.addEventListener('keydown', keyHandler)

      cleanupRef.current = () => {
        triggerHandlers.forEach(([el, fn]) => el.removeEventListener('click', fn))
        elements.buttons.next?.removeEventListener('click', nextHandler)
        elements.buttons.prev?.removeEventListener('click', prevHandler)
        elements.buttons.close?.removeEventListener('click', closeHandler)
        container!.removeEventListener('click', handleOutsideClick)
        document.removeEventListener('keydown', keyHandler)
        mainTimeline.kill()
      }
    })

    return () => {
      disposed = true
      cleanupRef.current?.()
    }
  }, [numColumns])

  return (
    <section data-anim-section className="bg-[#4d1c64] py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 xl:px-0 w-full flex flex-col gap-12">
        {/* Header */}
        <div data-anim-item className="flex flex-col gap-3 max-w-[615px]">
          <div className="flex items-center gap-2">
            <div className="relative shrink-0 w-[19px] h-[19px]">
              <Image
                src="/figma-assets/icon-train.svg"
                alt=""
                fill
                className="object-contain invert"
                aria-hidden="true"
              />
            </div>
            <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#f5ebdd] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
              {t('label')}
            </p>
          </div>
          <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[32px] sm:text-[40px] md:text-[48px] text-[#f5ebdd] leading-[1.2] tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-3.36px] max-w-[575px] w-full break-words">
            {t('heading')}
          </h2>
          <p className="font-['Manrope',sans-serif] text-[18px] text-white/75 leading-[1.2] tracking-[-0.54px]">
            {t('description')}
          </p>
        </div>

        {/* Osmo lightbox gallery with JS shortest-column masonry */}
        <div ref={containerRef} data-gallery="" className="gallery-group">
          <div role="list" className="gallery-masonry">
            {columns.map((col, ci) => (
              <div key={ci} role="listitem" className="gallery-col">
                {col.map((photo, i) => (
                  <div
                    key={photo.src}
                    data-lightbox="trigger-parent"
                    className="gallery-grid__item"
                    style={{ aspectRatio: isMobile ? '4/3' : `${photo.width} / ${photo.height}` }}
                  >
                    <button data-lightbox="trigger" className="gallery-item__button" aria-label={t('expandImage', { n: ci * 10 + i + 1 })}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.src}
                        loading="lazy"
                        alt=""
                        className="gallery-item__img"
                      />
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div aria-modal="true" data-lightbox="wrapper" role="dialog" className="lightbox-wrap">
            <div className="lightbox-img__wrap">
              <div className="lightbox-img__list">
                {flatPhotos.map((photo) => (
                  <div key={photo.src} data-lightbox="item" className="lightbox-img__item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.src} loading="lazy" alt="" className="lightbox-img" />
                  </div>
                ))}
              </div>
            </div>
            <div className="lightbox-nav">
              <div data-lightbox="nav" className="lightbox-nav__col start">
                <p className="lightbox-nav__text">
                  <span data-lightbox="counter-current">{flatPhotos.length}</span> /{' '}
                  <span data-lightbox="counter-total">{flatPhotos.length}</span>
                </p>
              </div>
              <div data-lightbox="nav" className="lightbox-nav__col center">
                <button data-lightbox="prev" className="lightbox-nav__button" aria-label={t('prevImage')}>
                  <div className="lightbox-nav__dot"></div>
                  <span className="lightbox-nav__text">prev</span>
                </button>
                <button data-lightbox="next" className="lightbox-nav__button" aria-label={t('nextImage')}>
                  <span className="lightbox-nav__text">next</span>
                  <div className="lightbox-nav__dot"></div>
                </button>
              </div>
              <div data-lightbox="nav" className="lightbox-nav__col end">
                <button data-lightbox="close" className="lightbox-nav__button" aria-label={t('close')}>
                  <span className="lightbox-nav__text">close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
