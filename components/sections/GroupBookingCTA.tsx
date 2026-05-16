import Image from "next/image";
import { useTranslations } from "next-intl";
import { brand } from "@/lib/brand";

export default function GroupBookingCTA() {
  const t = useTranslations("sections.groupBookingCta");

  return (
    <section data-anim-section className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <video
          src="/figma-assets/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 xl:px-0 py-16 xl:py-[112px]">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-20">
          <div className="flex-1 flex flex-col gap-3">
            <div data-anim-item className="flex items-center gap-2">
              <div className="relative shrink-0 w-[19px] h-[19px]">
                <Image src="/figma-assets/icon-train-white.svg" alt="" fill sizes="64px"
              className="object-contain" aria-hidden="true" />
              </div>
              <p className="font-['Bricolage_Grotesque',sans-serif] italic text-white text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
                {t("label")}
              </p>
            </div>

            <h2 data-anim="hero-title" className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[32px] sm:text-[40px] md:text-[48px] leading-[1.2] tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-3.36px] text-white not-italic break-words">
              {t("heading")}
            </h2>
          </div>

          <div className="flex-1 flex flex-col gap-8">
            <p data-anim="hero-paragraph" className="font-['Manrope',sans-serif] font-normal text-[18px] leading-[1.2] tracking-[-0.54px] text-white/80">
              {t("description")}
            </p>

            <div data-anim="hero-button">
              <a
                href={`mailto:${brand.contact.email}?subject=${encodeURIComponent("Demande de réservation de groupe")}`}
                aria-label={t("button")}
                className="btn-animate-chars btn-primary h-[45px] px-[22px] bg-[#f7a427] rounded-[4px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] ring-1 ring-inset ring-[rgba(10,13,18,0.18)] text-[#1c1b29] text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap"
              >
                <div className="btn-animate-chars__bg" />
                <span data-button-animate-chars="" className="btn-animate-chars__text">
                  {t("button")}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
