'use client'

import Image from "next/image";
import { useTranslations } from "next-intl";
import TransitionLink from "@/components/ui/TransitionLink";
import { brand } from "@/lib/brand";

const socialIcons = [
  { src: "/figma-assets/icon-facebook.svg", alt: "Facebook", href: brand.social.facebook },
];

export default function Footer() {
  const t = useTranslations();

  const quickLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.routes"), href: "/routes" },
    { label: t("nav.informations"), href: "/informations" },
    { label: t("nav.pricesShort"), href: "/prices" },
    { label: t("nav.faqs"), href: "/faqs" },
    { label: t("nav.careers"), href: "/careers" },
  ];

  const otherLinks = [
    { label: t("footer.mentionsLegales"), href: "/mentions-legales" },
    { label: t("footer.privacy"), href: "/politique-de-confidentialite" },
  ];

  return (
    <footer className="bg-[#f7a427] flex flex-col items-center gap-16 pb-12 overflow-hidden">
      {/* CTA Block — has background image, dark overlay, white text stays */}
      <div className="relative w-full overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <Image
            src="/figma-assets/FooterBackground.jpg"
            alt=""
            fill
            sizes="100vw"
              className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 xl:px-0 py-16">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex flex-col gap-8 max-w-[570px]">
              <p className="font-['Bricolage_Grotesque',sans-serif] text-[#ffffff] text-[28px] sm:text-[34px] md:text-[40px] leading-[1.2] tracking-[-1.3px] sm:tracking-[-2px] md:tracking-[-2.8px] break-words">
                {t("footer.ctaHeading")}
              </p>
              <div className="flex flex-col gap-8 items-start">
                <p className="font-['Manrope',sans-serif] font-light text-white text-[18px] leading-[1.5] tracking-[-0.54px] w-full">
                  {t("footer.ctaBody")}
                </p>
                <div className="flex gap-3 items-center flex-wrap">
                  <TransitionLink
                    href="/book"
                    aria-label={t("nav.book")}
                    className="btn-animate-chars btn-primary h-[45px] px-[22px] bg-[#f7a427] rounded-[4px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] ring-1 ring-inset ring-[rgba(10,13,18,0.18)] text-[#1c1b29] text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap"
                  >
                    <div className="btn-animate-chars__bg" />
                    <span data-button-animate-chars="" className="btn-animate-chars__text">{t("nav.book")}</span>
                  </TransitionLink>
                  <TransitionLink
                    href="/prices"
                    aria-label={t("nav.viewPrices")}
                    className="btn-animate-chars btn-secondary h-[45px] px-[22px] bg-transparent border border-[rgba(247,247,240,0.4)] rounded-[4px] text-[#ffffff] text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap"
                  >
                    <div className="btn-animate-chars__bg" />
                    <span data-button-animate-chars="" className="btn-animate-chars__text">{t("nav.viewPrices")}</span>
                  </TransitionLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Links Block — on yellow background */}
      <div className="w-full max-w-[1280px] mx-auto px-5 xl:px-0 pt-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-8 max-w-[320px]">
            <div className="relative w-[110px] h-11">
              <Image
                src="/figma-assets/logo.svg"
                alt="Petit Train de Vannes"
                fill
                sizes="64px"
              className="object-contain"
                style={{ filter: "brightness(0)" }}
              />
            </div>
            <p className="font-['Manrope',sans-serif] font-light text-[12px] leading-[1.4] tracking-[-0.24px] text-[rgba(28,27,41,0.6)]">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Footer link columns */}
          <div className="flex gap-12 flex-wrap">
            {/* Quick Links */}
            <div className="flex flex-col gap-1 w-[156px]">
              <p className="font-['Manrope',sans-serif] font-semibold text-[#1c1b29] text-base leading-6 mb-1">
                {t("footer.quickLinks")}
              </p>
              {quickLinks.map((link) => (
                <TransitionLink
                  key={link.href + link.label}
                  href={link.href}
                  className="footer-link font-['Manrope',sans-serif] font-light text-[#1c1b29] text-base leading-6"
                >
                  {link.label}
                </TransitionLink>
              ))}
            </div>

            {/* Contact Us */}
            <div className="flex flex-col gap-1 w-[222px]">
              <p className="font-['Manrope',sans-serif] font-semibold text-[#1c1b29] text-base leading-6 mb-1">
                {t("footer.contactUs")}
              </p>
              <a
                href={`mailto:${brand.contact.email}`}
                className="flex items-center gap-1.5 font-['Manrope',sans-serif] font-light text-[#1c1b29] text-base leading-6 hover:opacity-70 transition-opacity"
              >
                <div className="relative shrink-0 w-4 h-4">
                  <Image src="/figma-assets/icon-email.svg" alt="" fill sizes="64px"
              className="object-contain" aria-hidden="true" style={{ filter: "brightness(0)" }} />
                </div>
                {brand.contact.email}
              </a>
              <a
                href={`tel:${brand.contact.phone}`}
                className="flex items-center gap-1.5 font-['Manrope',sans-serif] font-light text-[#1c1b29] text-base leading-6 hover:opacity-70 transition-opacity underline"
              >
                <div className="relative shrink-0 w-4 h-4">
                  <Image src="/figma-assets/icon-phone.svg" alt="" fill sizes="64px"
              className="object-contain" aria-hidden="true" style={{ filter: "brightness(0)" }} />
                </div>
                {brand.contact.phoneDisplay}
              </a>
            </div>

            {/* Other */}
            <div className="flex flex-col gap-1 w-[156px]">
              <p className="font-['Manrope',sans-serif] font-semibold text-[#1c1b29] text-base leading-6 mb-1">
                {t("footer.other")}
              </p>
              {otherLinks.map((link) => (
                <TransitionLink
                  key={link.href + link.label}
                  href={link.href}
                  className="footer-link font-['Manrope',sans-serif] font-light text-[#1c1b29] text-base leading-6"
                >
                  {link.label}
                </TransitionLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full max-w-[1280px] mx-auto px-5 xl:px-0">
        <div className="border-t border-[rgba(28,27,41,0.2)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 flex-wrap">
          <p className="font-['Manrope',sans-serif] text-[#1c1b29] text-base leading-6 whitespace-nowrap">
            {t("footer.copyrightPrefix")}{" "}
            <a
              href="https://www.softbird.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-70 transition-opacity"
            >
              Softbird
            </a>
            . {t("footer.copyrightSuffix")}
          </p>
          <div className="flex gap-6 items-center">
            {socialIcons.map((icon) => (
              <a
                key={icon.alt}
                href={icon.href}
                aria-label={icon.alt}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon relative w-6 h-6 shrink-0"
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  fill
                  sizes="64px"
              className="object-contain"
                  style={{ filter: "brightness(0)" }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
