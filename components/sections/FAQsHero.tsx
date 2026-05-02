import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function FAQsHero() {
  const t = useTranslations('sections.faqsHero')
  const tShared = useTranslations('shared')

  return (
    <section data-anim-section="hero" className="bg-[#f5ebdd] w-full overflow-hidden">
      <div className="flex flex-col xl:flex-row min-h-[540px] xl:min-h-[721px]">
        {/* Left: text content */}
        <div className="flex-1 flex items-center justify-end py-16 xl:py-24 bg-[#f5ebdd] relative z-10">
          <div className="w-full max-w-[640px] px-5 xl:px-0">
            <div className="xl:pr-8 flex flex-col gap-10 max-w-[576px]">
              <div className="flex flex-col gap-6">
                <div data-anim-item className="flex items-center gap-2">
                  <div className="relative shrink-0 w-[19px] h-[19px]">
                    <Image src="/figma-assets/icon-train.svg" alt="" fill className="object-contain" aria-hidden="true" />
                  </div>
                  <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#54206d] text-base leading-6 tracking-[-0.48px]">
                    {t('label')}
                  </p>
                </div>

                <h1 data-anim-item className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[40px] sm:text-[48px] xl:text-[60px] text-[#181d27] leading-[1.2] tracking-[-2.5px] xl:tracking-[-4.2px] [text-wrap:balance]">
                  {t('heading')}
                </h1>

                <p data-anim-item className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.2] tracking-[-0.48px] max-w-[551px]">
                  {t('description')}
                </p>
              </div>

              <div className="border-t border-[rgba(0,0,0,0.1)] w-full" />

              <div data-anim-item className="flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 bg-white rounded-[8px] px-2 py-1.5 w-fit shadow-sm">
                  <div className="relative w-6 h-6 shrink-0">
                    <Image src="/figma-assets/google-icon.svg" alt="Google" fill className="object-contain" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1">
                      <span className="font-['Manrope',sans-serif] font-bold text-[14px] text-black tracking-[-0.42px]">4,7</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#FBBC04" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1L7.545 4.09L11 4.545L8.5 6.98L9.09 10.42L6 8.795L2.91 10.42L3.5 6.98L1 4.545L4.455 4.09L6 1Z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="font-['Manrope',sans-serif] text-[11px] text-black/60 tracking-[-0.33px]">
                      {tShared('googleReviewsCount')}
                    </p>
                  </div>
                </div>

                <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.2] tracking-[-0.48px] max-w-[499px]">
                  {tShared('googleRatingDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: photo with card overlay */}
        <div className="flex-1 relative min-h-[500px] xl:min-h-[721px]">
          <Image
            src="/figma-assets/FAQsHero.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(min-width: 1280px) 720px, 100vw"
            priority
          />

          <div className="absolute bottom-8 right-0 left-1/4 xl:left-[189px] mx-4 xl:mx-0 backdrop-blur-sm bg-[rgba(84,32,109,0.65)] border border-[rgba(255,255,255,0.2)] rounded-[12px] shadow-[0px_-10px_80px_0px_rgba(22,61,92,0.5)] p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <p className="font-['Manrope',sans-serif] font-semibold text-[18px] xl:text-[20px] text-white leading-[1.2] tracking-[-0.8px] max-w-[312px]">
                {t('cardHeading')}
              </p>
              <div className="relative shrink-0 w-[70px] h-[43px]">
                <Image src="/figma-assets/stars.svg" alt={tShared('fourSevenStarsAlt')} fill className="object-contain object-right-top" />
              </div>
            </div>
            <p className="font-['Manrope',sans-serif] text-[14px] text-white leading-[1.4] tracking-[-0.56px] max-w-[312px]">
              {t('languages')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
