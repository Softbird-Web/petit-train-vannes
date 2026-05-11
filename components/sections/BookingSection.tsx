import Image from 'next/image'
import { useTranslations } from 'next-intl'
import RegiondoWidget from '@/components/ui/RegiondoWidget'
import { brand } from '@/lib/brand'

export default function BookingSection() {
  const t = useTranslations('sections.bookingSection')

  return (
    <section
      data-anim-section="hero"
      className="bg-white pt-12 xl:pt-20 pb-16 xl:pb-24 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-5 xl:px-0">
        {/* Header */}
        <div className="flex flex-col gap-6 items-center text-center max-w-[768px] mx-auto mb-10 xl:mb-14">
          <div data-anim-item className="flex items-center gap-2">
            <div className="relative shrink-0 w-[19px] h-[19px]">
              <Image
                src="/figma-assets/icon-train.svg"
                alt=""
                fill
                sizes="64px"
              className="object-contain"
                aria-hidden="true"
              />
            </div>
            <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#1c1b29] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
              {t('label')}
            </p>
          </div>

          <h1
            data-anim-item
            className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[36px] sm:text-[44px] md:text-[52px] xl:text-[60px] leading-[1.2] tracking-[-1.8px] sm:tracking-[-2.4px] md:tracking-[-3.2px] xl:tracking-[-4.2px] text-[#1c1b29] not-italic [text-wrap:balance] break-words"
          >
            {t('headingPrefix')}{' '}
            <em className="italic text-[#f7a427] not-[font-style:normal]">{t('headingHighlight')}</em>{' '}
            {t('headingSuffix')}
          </h1>

          <p
            data-anim-item
            className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.4] tracking-[-0.48px] max-w-[620px]"
          >
            {t.rich('description', {
              strong: (chunks) => <strong className="text-[#1c1b29]">{chunks}</strong>,
            })}
          </p>
        </div>

        {/* Widget card */}
        <div data-anim-item className="w-full">
          <RegiondoWidget widgetId={brand.regiondoWidgetId} />
        </div>
      </div>
    </section>
  )
}
