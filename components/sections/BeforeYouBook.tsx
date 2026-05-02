import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function BeforeYouBook() {
  const t = useTranslations('sections.beforeYouBook')
  const bullets = [
    t('bullet1'),
    t('bullet2'),
    t('bullet3'),
    t('bullet4'),
    t('bullet5'),
    t('bullet6'),
    t('bullet7'),
  ]

  return (
    <section data-anim-section className="bg-[#f5ebdd] py-16 xl:py-[112px] px-5 xl:px-[64px]">
      <div className="max-w-[1280px] mx-auto flex flex-col xl:flex-row gap-[64px] items-center">
        {/* Content */}
        <div data-anim-item className="flex-1 min-w-0 flex flex-col gap-6">
          <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[48px] xl:text-[60px] text-[#181d27] leading-[1.2] tracking-[-3.36px]">
            {t('heading')}
          </h2>

          <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.2] tracking-[-0.48px] max-w-[551px]">
            {t('description')}
          </p>

          <ul className="flex flex-col gap-3 max-w-[551px]">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.2] tracking-[-0.48px]"
              >
                <span className="mt-[6px] shrink-0 w-1.5 h-1.5 rounded-full bg-[#54206d]" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div data-anim-item className="xl:order-first shrink-0 w-full xl:w-[608px]">
          <div className="relative w-full h-[260px] sm:h-[360px] xl:h-[487px] rounded-[8px] overflow-hidden">
            <Image
              src="/figma-assets/BeforeYouBook.jpg"
              alt={t('imageAlt')}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 608px, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
