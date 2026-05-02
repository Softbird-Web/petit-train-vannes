import Image from "next/image";
import { getTranslations } from "next-intl/server";
import TransitionLink from "@/components/ui/TransitionLink";
import HeroVideoPanel from "@/components/ui/HeroVideoPanel";
import type { ReactNode } from "react";

interface HeroProps {
  label?: string;
  heading?: ReactNode;
  description?: ReactNode;
  tagline?: ReactNode | null;
  buttons?: ReactNode;
  googleBadgeText?: string;
  rightImageSrc?: string;
  rightImageAlt?: string;
  rightVideoSrc?: string;
  openingImageSrc?: string;
  rightCard?: ReactNode;
  showBottomBanner?: boolean;
  backgroundVariant?: "cream" | "gradient-to-white";
}

export default async function Hero({
  label,
  heading,
  description,
  tagline,
  buttons,
  googleBadgeText,
  rightImageSrc = "/figma-assets/hero-image.jpg",
  rightImageAlt,
  rightVideoSrc,
  openingImageSrc,
  rightCard,
  showBottomBanner = true,
  backgroundVariant = "cream",
}: HeroProps) {
  const t = await getTranslations("hero");

  // Resolve defaults from translations when not overridden by the page.
  const resolvedLabel = label ?? t("label");
  const resolvedHeading: ReactNode =
    heading ?? (
      <>
        {t("headingPrefix")}{" "}
        <em className="italic text-[#54206d] not-[font-style:normal]">
          {t("headingHighlight")}
        </em>{" "}
        {t("headingSuffix")}
      </>
    );
  const resolvedDescription: ReactNode =
    description ??
    t.rich("description", {
      strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
    });
  const resolvedTagline: ReactNode = tagline === undefined ? t("tagline") : tagline;
  const resolvedGoogleBadge = googleBadgeText ?? t("googleBadge");
  const resolvedRightImageAlt = rightImageAlt ?? t("rightImageAlt");

  const resolvedButtons: ReactNode =
    buttons ?? (
      <>
        <TransitionLink
          href="/book"
          aria-label={t("buttonBook")}
          className="btn-animate-chars btn-primary bg-[#54206d] h-[45px] px-[22px] rounded-[4px] text-white text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] ring-1 ring-inset ring-[rgba(10,13,18,0.18)]"
        >
          <div className="btn-animate-chars__bg" />
          <span data-button-animate-chars="" className="btn-animate-chars__text">
            {t("buttonBook")}
          </span>
        </TransitionLink>
        <TransitionLink
          href="/prices"
          aria-label={t("buttonPrices")}
          className="btn-animate-chars btn-secondary bg-[#f5ebdd] border border-[rgba(0,0,0,0.2)] h-[45px] px-[22px] rounded-[4px] text-[#414651] text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap"
        >
          <div className="btn-animate-chars__bg" />
          <span data-button-animate-chars="" className="btn-animate-chars__text">
            {t("buttonPrices")}
          </span>
        </TransitionLink>
      </>
    );

  const resolvedRightCard: ReactNode =
    rightCard ?? (
      <div className="absolute bottom-[514px] lg:bottom-[30px] left-1/2 -translate-x-1/2 lg:left-auto lg:right-6 lg:translate-x-0 bg-[rgba(84,32,109,0.65)] border border-[rgba(255,255,255,0.2)] rounded-xl p-6 w-[499px] max-w-[calc(100%-32px)] flex flex-col gap-4 z-20">
        <div className="flex items-start justify-between gap-4">
          <p className="font-['Manrope',sans-serif] font-semibold text-[20px] leading-[1.2] text-white tracking-[-0.8px] max-w-[312px]">
            {t("rightCardHeading")}
          </p>
          <div className="relative h-[43px] w-[83px] shrink-0 overflow-hidden rounded">
            <Image
              src="/figma-assets/languages-flags.png"
              alt={t("rightCardFlagsAlt")}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <p className="font-['Manrope',sans-serif] font-normal text-[14px] leading-[1.4] text-white tracking-[-0.56px] max-w-[312px]">
          {t("rightCardBody")}
        </p>
      </div>
    );

  const sectionBg =
    backgroundVariant === "gradient-to-white"
      ? "bg-gradient-to-b from-[#f5ebdd] to-white to-[60%]"
      : "bg-[#f5ebdd]";
  const leftPanelBg =
    backgroundVariant === "gradient-to-white" ? "" : "bg-[#f5ebdd]";
  const bannerBg =
    backgroundVariant === "gradient-to-white" ? "bg-white" : "bg-[#f5ebdd]";

  return (
    <section data-anim-section="hero" className={`${sectionBg} overflow-hidden`}>
      {/* Main hero section: left text + right image */}
      <div className="flex flex-col lg:flex-row lg:items-stretch min-h-[721px] relative">
        {/* Left panel */}
        <div className={`flex-1 flex items-center justify-end py-12 lg:py-24 ${leftPanelBg} relative z-10`}>
          <div className="w-full max-w-[640px] px-5 xl:px-0">
            <div className="pr-8 flex flex-col gap-10">
              {/* Heading block */}
              <div className="flex flex-col gap-6">
                {/* Section label */}
                <div data-anim-item className="flex items-center gap-2">
                  <div className="relative shrink-0 w-[19px] h-[19px]">
                    <Image
                      src="/figma-assets/icon-train.svg"
                      alt=""
                      fill
                      className="object-contain"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#54206d] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
                    {resolvedLabel}
                  </p>
                </div>

                {/* Main heading */}
                <h1 data-anim-item className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] leading-[1.2] tracking-[-1.8px] sm:tracking-[-2.4px] md:tracking-[-3.2px] lg:tracking-[-4.2px] text-[#181d27] not-italic w-full break-words">
                  {resolvedHeading}
                </h1>

                {/* Description */}
                <p data-anim-item className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.2] tracking-[-0.48px]">
                  {resolvedDescription}
                </p>

                {/* Tagline */}
                {resolvedTagline && (
                  <p data-anim-item className="font-['Manrope',sans-serif] font-semibold text-[#535862] text-base leading-[1.2] tracking-[-0.48px]">
                    {resolvedTagline}
                  </p>
                )}
              </div>

              {/* CTA buttons */}
              <div data-anim-item className="flex items-center gap-3">{resolvedButtons}</div>

              {/* Divider */}
              <hr className="border-t border-[rgba(0,0,0,0.12)] w-[554px] max-w-full" />

              {/* Google rating block */}
              <div data-anim-item className="flex flex-col gap-4">
                <div className="bg-white flex items-center gap-[10px] px-2 py-1 rounded-lg w-fit">
                  <div className="relative size-6 shrink-0">
                    <Image
                      src="/figma-assets/google-icon.svg"
                      alt="Google"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <div className="flex items-center gap-1">
                      <span className="font-['Manrope',sans-serif] font-bold text-[14px] leading-normal text-black tracking-[-0.42px]">
                        4,7
                      </span>
                      <div className="relative h-3 w-[76px] shrink-0">
                        <Image
                          src="/figma-assets/stars.svg"
                          alt="4,7 sur 5 étoiles"
                          fill
                          className="object-contain object-left"
                        />
                      </div>
                    </div>
                    <p className="font-['Manrope',sans-serif] font-normal text-[11px] leading-normal text-black tracking-[-0.33px] opacity-60">
                      6 000+ avis
                    </p>
                  </div>
                </div>

                <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.2] tracking-[-0.48px] max-w-[499px]">
                  {resolvedGoogleBadge}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel: image + diagonal split overlay */}
        <div className="flex-1 relative min-h-[320px] lg:min-h-0 overflow-hidden rounded-2xl lg:rounded-none mx-4 lg:mx-0 mb-4 lg:mb-0">
          {/* Hero media: video (with optional opening image) or static image */}
          {/* Desktop-only diagonal clip — "/" cut on the left edge so the cream section bleeds into the image */}
          <div className="absolute inset-0 lg:[clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]">
            {rightVideoSrc ? (
              <HeroVideoPanel
                videoSrc={rightVideoSrc}
                openingImageSrc={openingImageSrc}
                imageSrc={rightImageSrc}
                imageAlt={resolvedRightImageAlt}
              />
            ) : (
              <Image
                src={rightImageSrc}
                alt={resolvedRightImageAlt}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* Overlay card */}
          {resolvedRightCard}
        </div>
      </div>

      {/* HeroBanner: Online Booking section */}
      {showBottomBanner && (
        <div className={`${bannerBg} border-t border-[rgba(0,0,0,0.15)] pt-[34px] pb-16`}>
          <div className="max-w-[1280px] mx-auto px-5 xl:px-0 flex flex-col gap-10">
            {/* Section label */}
            <div className="flex items-center gap-2">
              <div className="relative shrink-0 w-[19px] h-[19px]">
                <Image
                  src="/figma-assets/icon-train.svg"
                  alt=""
                  fill
                  className="object-contain"
                  aria-hidden="true"
                />
              </div>
              <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#54206d] text-base leading-6 tracking-[-0.48px]">
                {t("noteImportanteLabel")}
              </p>
            </div>

            {/* Content row */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-8">
              {/* Heading */}
              <div className="lg:w-[559px] shrink-0">
                <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[32px] sm:text-[40px] md:text-[48px] leading-[1.2] tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-3.36px] text-[#181d27] not-italic break-words">
                  {t("noteImportanteHeading")}
                </h2>
              </div>
              {/* Supporting text */}
              <div className="flex-1">
                <p className="font-['Manrope',sans-serif] font-normal text-[20px] leading-[30px] text-[#535862]">
                  {t.rich("noteImportanteBody", {
                    strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
                  })}
                  <br />
                  <br />
                  {t("noteImportanteBodyExtra")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
