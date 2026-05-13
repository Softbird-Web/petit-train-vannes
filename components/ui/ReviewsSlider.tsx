'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(Draggable, InertiaPlugin)

// Real Google reviews captured from the Vannes business profile. Reviews #6 and #7
// were originally French and are shown here in the Google-translated English form;
// surrounding UI labels (Google-review subtitle, aria-labels) translate per the active locale.
const reviews = [
  {
    id: "lener",
    name: "Lener",
    text: "charming little tour for a fair price. i would recommend walking around town a bit and reading about the town's history and then getting this train for the cherry on top!",
    image: "/figma-assets/review-1.jpg",
  },
  {
    id: "fatima",
    name: "fatima werner",
    text: "Lovely to have a guided tour of vannes. Would definitely recommend. A fun thing to do with the kids.",
    image: "/figma-assets/review-2.jpg",
  },
  {
    id: "simon",
    name: "Simon LE LARGE",
    text: "Very nice experience to (re)discover the beautiful Vannes. A train trip in history and culture that be missed if you visit Vannes.",
    image: "/figma-assets/review-3.jpg",
  },
  {
    id: "laura",
    name: "Laura Fitch",
    text: "Such a cute experience! Have been on the train every year I have been to France since I was a little girl 🥰",
    image: "/figma-assets/review-4.jpg",
  },
  {
    id: "nadine",
    name: "Nadine POTIER",
    text: "A great little walk right in the heart of Vannes' tourist center. The commentary is excellent, and the children's route along Canal 21 makes it interesting for little ones.",
    image: "/figma-assets/review-5.jpg",
  },
  {
    id: "gorce",
    name: "Gorce Romain",
    text: "A good option for a quick visit to Vannes and its city center. The driver was excellent, as some streets are very narrow. It's very helpful for finding the monuments you want to see.",
    image: "/figma-assets/review-6.jpg",
  },
  {
    id: "marjory",
    name: "marjory coll",
    text: "A lovely little train that goes everywhere, even through the narrow streets of old Vannes! A must-do when you're in Vannes 😄 The driver is friendly. Headphones are available to listen to the guided tour in many different languages. Departure from the Port and then just let yourself be guided!",
    image: "/figma-assets/review-7.jpg",
  },
]

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#F5A623" aria-hidden="true">
          <path d="M7 0l1.796 5.528H14l-4.702 3.416 1.796 5.528L7 11.056l-4.095 3.416 1.796-5.528L0 5.528h5.204z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ name, subtitle, text, image }: { name: string; subtitle: string; text: string; image: string }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row md:h-[420px] w-full shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)]">
      {/* Text content */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-6 md:gap-0 min-w-0">
        <p lang="en" className="font-['Manrope',sans-serif] text-[#1c1b29] text-[17px] md:text-[20px] leading-[1.5] tracking-[-0.4px]">
          {text}
        </p>
        <div className="flex flex-col gap-1">
          <p className="font-['Bricolage_Grotesque',sans-serif] text-[#1c1b29] text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.8px] font-bold">
            {name}
          </p>
          <div className="flex items-center gap-2">
            <StarRating />
            <span className="font-['Manrope',sans-serif] text-[#535862] text-[13px]">{subtitle}</span>
          </div>
        </div>
      </div>
      {/* Image — below text on mobile, right side on desktop */}
      <div className="relative h-[220px] md:h-auto md:w-[46%] shrink-0 overflow-hidden md:[clip-path:polygon(18%_0%,100%_0%,100%_100%,0%_100%)]">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
    </div>
  )
}

export default function ReviewsSlider() {
  const t = useTranslations('sections.reviews')
  const rootRef = useRef<HTMLDivElement>(null)
  const draggableRef = useRef<Draggable | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    function init() {
      if (!root) return
      if (draggableRef.current) {
        draggableRef.current.kill()
        draggableRef.current = null
      }

      const collection = root.querySelector<HTMLElement>('[data-gsap-slider-collection]')
      const track = root.querySelector<HTMLElement>('[data-gsap-slider-list]')
      const items = Array.from(root.querySelectorAll<HTMLElement>('[data-gsap-slider-item]'))
      const controls = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-gsap-slider-control]'))

      if (!collection || !track || !items.length) return

      items.forEach((slide, i) => {
        slide.setAttribute('aria-label', t('slideAriaLabel', { n: i + 1, total: items.length }))
        slide.setAttribute('aria-hidden', 'true')
        slide.setAttribute('aria-selected', 'false')
        slide.setAttribute('tabindex', '-1')
      })
      controls.forEach(btn => {
        btn.disabled = true
        btn.setAttribute('aria-disabled', 'true')
      })

      const styles = getComputedStyle(root)
      const statusVar = styles.getPropertyValue('--slider-status').trim()
      let spvVar = parseFloat(styles.getPropertyValue('--slider-spv'))
      const rect = items[0].getBoundingClientRect()
      const marginRight = parseFloat(getComputedStyle(items[0]).marginRight)
      const slideW = rect.width + marginRight

      if (isNaN(spvVar)) spvVar = collection.clientWidth / slideW
      const spv = Math.max(1, Math.min(spvVar, items.length))
      const sliderEnabled = statusVar === 'on' && spv < items.length
      root.setAttribute('data-gsap-slider-status', sliderEnabled ? 'active' : 'not-active')

      if (!sliderEnabled) {
        track.removeAttribute('style')
        items.forEach(slide => {
          slide.removeAttribute('aria-hidden')
          slide.removeAttribute('aria-selected')
          slide.removeAttribute('tabindex')
          slide.removeAttribute('data-gsap-slider-item-status')
        })
        controls.forEach(btn => {
          btn.disabled = false
          btn.removeAttribute('aria-disabled')
          btn.removeAttribute('data-gsap-slider-control-status')
        })
        return
      }

      track.onmouseenter = () => track.setAttribute('data-gsap-slider-list-status', 'grab')
      track.onmouseleave = () => track.removeAttribute('data-gsap-slider-list-status')

      const vw = collection.clientWidth
      const tw = track.scrollWidth
      const maxScroll = Math.max(tw - vw, 0)
      const minX = -maxScroll
      const maxX = 0
      const maxIndex = maxScroll / slideW
      const full = Math.floor(maxIndex)
      const snapPoints: number[] = []
      for (let i = 0; i <= full; i++) snapPoints.push(-i * slideW)
      if (full < maxIndex) snapPoints.push(-maxIndex * slideW)

      let activeIndex = 0
      const setX = gsap.quickSetter(track, 'x', 'px')
      let collectionRect = collection.getBoundingClientRect()

      function updateStatus(x: number) {
        if (x > maxX || x < minX) return
        const calcX = Math.max(minX, Math.min(maxX, x))
        let closest = snapPoints[0]
        snapPoints.forEach(pt => {
          if (Math.abs(pt - calcX) < Math.abs(closest - calcX)) closest = pt
        })
        activeIndex = snapPoints.indexOf(closest)

        items.forEach((slide, i) => {
          const r = slide.getBoundingClientRect()
          const leftEdge = r.left - collectionRect.left
          const slideCenter = leftEdge + r.width / 2
          const inView = slideCenter > 0 && slideCenter < collectionRect.width
          const status = i === activeIndex ? 'active' : inView ? 'inview' : 'not-active'
          slide.setAttribute('data-gsap-slider-item-status', status)
          slide.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false')
          slide.setAttribute('aria-hidden', inView ? 'false' : 'true')
          slide.setAttribute('tabindex', i === activeIndex ? '0' : '-1')
        })

        controls.forEach(btn => {
          const dir = btn.getAttribute('data-gsap-slider-control')
          const can = dir === 'prev' ? activeIndex > 0 : activeIndex < snapPoints.length - 1
          btn.disabled = !can
          btn.setAttribute('aria-disabled', can ? 'false' : 'true')
          btn.setAttribute('data-gsap-slider-control-status', can ? 'active' : 'not-active')
        })
      }

      controls.forEach(btn => {
        const dir = btn.getAttribute('data-gsap-slider-control')
        btn.onclick = () => {
          if (btn.disabled) return
          const delta = dir === 'next' ? 1 : -1
          const target = activeIndex + delta
          gsap.to(track, {
            duration: 0.75,
            x: snapPoints[target],
            ease: 'expo.out',
            overwrite: true,
            onUpdate: () => updateStatus(gsap.getProperty(track, 'x') as number),
            onComplete: () => updateStatus(snapPoints[target]),
          })
        }
      })

      draggableRef.current = Draggable.create(track, {
        type: 'x',
        inertia: true,
        bounds: { minX, maxX },
        throwResistance: 2500,
        dragResistance: 0.05,
        maxDuration: 0.9,
        minDuration: 0.4,
        edgeResistance: 0.85,
        snap: { x: snapPoints },
        onPress() { track.setAttribute('data-gsap-slider-list-status', 'grabbing'); collectionRect = collection!.getBoundingClientRect() },
        onDrag() { setX(this.x); updateStatus(this.x) },
        onThrowUpdate() { setX(this.x); updateStatus(this.x) },
        onThrowComplete() { setX(this.endX); updateStatus(this.endX); track.setAttribute('data-gsap-slider-list-status', 'grab') },
        onRelease() { setX(this.x); updateStatus(this.x); track.setAttribute('data-gsap-slider-list-status', 'grab') },
      })[0]

      setX(0)
      updateStatus(0)
    }

    init()
    // t is stable per render; safe to omit from deps to avoid re-init on locale change

    let lastW = window.innerWidth
    let resizeTimer: ReturnType<typeof setTimeout>
    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        if (window.innerWidth !== lastW) {
          lastW = window.innerWidth
          init()
        }
      }, 200)
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (draggableRef.current) draggableRef.current.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={rootRef}
      data-gsap-slider-init=""
      role="region"
      aria-roledescription="carousel"
      aria-label={t('regionAriaLabel')}
      className="gsap-reviews-slider w-full flex flex-col gap-6"
    >
      <div data-gsap-slider-collection="" className="gsap-reviews-slider__collection w-full">
        <div data-gsap-slider-list="" className="gsap-reviews-slider__list">
          {reviews.map((review) => (
            <div key={review.id} data-gsap-slider-item="" className="gsap-reviews-slider__item">
              <ReviewCard
                name={review.name}
                subtitle={t('googleReview')}
                text={review.text}
                image={review.image}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrow controls — right-aligned, desktop only */}
      <div data-gsap-slider-controls="" className="hidden md:flex justify-end gap-2 px-[5%]">
        <button
          data-gsap-slider-control="prev"
          aria-label={t('prevAriaLabel')}
          className="w-[52px] h-[52px] flex items-center justify-center border border-[rgba(28,27,41,0.3)] text-[#1c1b29] transition-opacity hover:opacity-70 disabled:opacity-30"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          data-gsap-slider-control="next"
          aria-label={t('nextAriaLabel')}
          className="w-[52px] h-[52px] flex items-center justify-center border border-[rgba(28,27,41,0.3)] text-[#1c1b29] transition-opacity hover:opacity-70 disabled:opacity-30"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
