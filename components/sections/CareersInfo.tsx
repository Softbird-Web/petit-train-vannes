import Image from 'next/image'
import TransitionLink from '@/components/ui/TransitionLink'
import { getTranslations } from 'next-intl/server'

type Panel = {
  headingKey: string
  paragraphKeys: readonly string[]
  cta?: boolean
}

const panels: Panel[] = [
  { headingKey: 'panel1Heading', paragraphKeys: ['panel1P1', 'panel1P2'] },
  { headingKey: 'panel2Heading', paragraphKeys: ['panel2P1', 'panel2P2'] },
  { headingKey: 'panel3Heading', paragraphKeys: ['panel3P1'] },
  { headingKey: 'panel4Heading', paragraphKeys: ['panel4P1'], cta: true },
]

export default async function CareersInfo() {
  const t = await getTranslations('sections.careersInfo')

  return (
    <section data-anim-section className="bg-[#f5ebdd] py-16 xl:py-[112px] px-5 xl:px-[64px]">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-[80px] items-start">
        {/* Left: image */}
        <div data-anim-item className="hidden lg:block shrink-0 w-[calc(50%-40px)]">
          <div className="relative w-full h-[829px] rounded-[16px] overflow-hidden">
            <Image
              src="/figma-assets/CareersLooking.png"
              alt={t('imageAlt')}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 600px"
            />
          </div>
        </div>

        {/* Right: content panels */}
        <div data-anim-item className="flex-1 min-w-0 flex flex-col gap-0">
          {panels.map((panel) => (
            <div
              key={panel.headingKey}
              className="border-b border-[rgba(0,0,0,0.2)] pb-8 mb-8 last:border-b-0 last:mb-0 flex flex-col gap-6"
            >
              <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[32px] text-[#181d27] leading-[1.2] tracking-[-2.24px]">
                {t(panel.headingKey)}
              </h2>
              <div className="flex flex-col gap-3">
                {panel.paragraphKeys.map((key) => (
                  <p
                    key={key}
                    className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.2] tracking-[-0.48px] max-w-[551px]"
                  >
                    {t(key)}
                  </p>
                ))}
              </div>
              {panel.cta && (
                <div>
                  <TransitionLink
                    href="mailto:petittrain-lebayon@orange.fr"
                    className="btn-animate-chars btn-primary inline-flex items-center gap-2 h-[45px] px-[22px] bg-[#54206d] rounded-[4px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] ring-1 ring-inset ring-[rgba(10,13,18,0.18)] text-white text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap"
                  >
                    <div className="btn-animate-chars__bg" />
                    <div className="relative shrink-0 w-5 h-5">
                      <Image
                        src="/figma-assets/icon-email.svg"
                        alt=""
                        fill
                        className="object-contain"
                        aria-hidden="true"
                      />
                    </div>
                    <span data-button-animate-chars="" className="btn-animate-chars__text">{t('ctaButton')}</span>
                  </TransitionLink>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
