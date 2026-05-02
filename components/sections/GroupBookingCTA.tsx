import Image from "next/image";
import { useTranslations } from "next-intl";
import TransitionLink from "@/components/ui/TransitionLink";

export default function GroupBookingCTA() {
  const t = useTranslations("sections.groupBookingCta");

  return (
    <section data-anim-section className="relative overflow-hidden">
      {/* Background image with dark overlay */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <Image src="/figma-assets/group-booking-bg.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 xl:px-0 py-16 xl:py-[112px]">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-20">
          {/* Left column: label + heading */}
          <div className="flex-1 flex flex-col gap-3">
            <div data-anim-item className="flex items-center gap-2">
              <div className="relative shrink-0 w-[19px] h-[19px]">
                <Image src="/figma-assets/icon-train-white.svg" alt="" fill className="object-contain" aria-hidden="true" />
              </div>
              <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#f5ebdd] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
                {t("label")}
              </p>
            </div>

            <h2 data-anim="hero-title" className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[32px] sm:text-[40px] md:text-[48px] leading-[1.2] tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-3.36px] text-[#f5ebdd] not-italic break-words">
              {t("heading")}
            </h2>
          </div>

          {/* Right column: body text + CTA */}
          <div className="flex-1 flex flex-col gap-8">
            <p data-anim="hero-paragraph" className="font-['Manrope',sans-serif] font-normal text-[18px] leading-[1.2] tracking-[-0.54px] text-[#e5e5e5]">
              {t("description")}
            </p>

            <div data-anim="hero-button">
              <TransitionLink
                href="/privatisation"
                aria-label={t("button")}
                className="btn-animate-chars btn-primary h-[45px] px-[22px] bg-[#f5ebdd] rounded-[4px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] ring-1 ring-inset ring-[rgba(10,13,18,0.18)] text-[#414651] text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap"
              >
                <div className="btn-animate-chars__bg" />
                <span data-button-animate-chars="" className="btn-animate-chars__text">
                  {t("button")}
                </span>
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
