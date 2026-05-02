"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import TransitionLink from "@/components/ui/TransitionLink";
import LanguageDropdown from "@/components/layout/LanguageDropdown";

export default function Navbar() {
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.routes"), href: "/routes" },
    { label: t("nav.informations"), href: "/informations" },
    { label: t("nav.prices"), href: "/prices" },
    { label: t("nav.privatisation"), href: "/privatisation" },
    { label: t("nav.faqs"), href: "/faqs" },
    { label: t("nav.careers"), href: "/careers" },
  ];

  return (
    <header data-anim-navbar className="fixed top-0 left-0 right-0 z-50">
      {/* Top announcement banner */}
      <div className="bg-[#33114d] border-b border-[rgba(213,215,218,0.4)]">
        <div className="max-w-[1280px] mx-auto px-5 xl:px-0 py-[6px] flex items-center justify-between gap-4">
          <p className="text-[#f5ebdd] text-[12px] md:text-base leading-5 md:leading-6 tracking-[-0.48px] text-left md:text-center font-['Manrope',sans-serif] flex-1">
            {t("navbar.bannerPrefix")}{" "}
            <a href="https://www.petittrain-morbihan.com/en/vannes/" className="underline text-[#f5ebdd]" target="_blank" rel="noopener noreferrer">
              {t("navbar.bannerLinkVannes")}
            </a>{" "}
            {t("navbar.bannerAnd")}{" "}
            <a href="https://www.petittrain-morbihan.com/en/quiberon/" className="underline text-[#f5ebdd]" target="_blank" rel="noopener noreferrer">
              {t("navbar.bannerLinkQuiberon")}
            </a>
          </p>
          <div className="shrink-0">
            <LanguageDropdown variant="banner" />
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`relative bg-[#54206d] h-20 flex items-center ${
          scrolled ? "navbar-scrolled" : ""
        }`}
      >
        <div className="w-full max-w-[1280px] mx-auto px-5 xl:px-0 flex items-center justify-between">
          {/* Logo + Desktop nav links */}
          <div className="flex items-center gap-8">
            <TransitionLink href="/" className="relative h-11 w-[110px] shrink-0 block">
              <Image
                src="/figma-assets/logo.svg"
                alt="Les Petits Trains du Morbihan"
                fill
                className="object-contain"
              />
            </TransitionLink>
            <div className="hidden lg:flex items-center gap-5">
              {navLinks.map((link) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className="nav-link text-[#f5ebdd] text-base leading-6 tracking-[-0.48px] font-['Manrope',sans-serif] whitespace-nowrap"
                >
                  {link.label}
                </TransitionLink>
              ))}
            </div>
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <TransitionLink
              href="/prices"
              aria-label={t("nav.viewPrices")}
              className="btn-animate-chars btn-secondary bg-[#54206d] border border-[rgba(255,255,255,0.15)] h-[45px] px-[22px] rounded-[4px] text-white text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap"
            >
              <div className="btn-animate-chars__bg" />
              <span data-button-animate-chars="" className="btn-animate-chars__text">{t("nav.viewPrices")}</span>
            </TransitionLink>
            <TransitionLink
              href="/book"
              aria-label={t("nav.book")}
              className="btn-animate-chars btn-primary bg-[#f5ebdd] border border-[rgba(0,0,0,0.2)] h-[45px] px-[22px] rounded-[4px] text-[#414651] text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap"
            >
              <div className="btn-animate-chars__bg" />
              <span data-button-animate-chars="" className="btn-animate-chars__text">{t("nav.book")}</span>
            </TransitionLink>
          </div>

          {/* Hamburger button — mobile only */}
          <button
            type="button"
            className="lg:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10 -mr-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t("navbar.closeMenu") : t("navbar.openMenu")}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-white origin-center transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white origin-center transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu drawer — absolute relative to nav (h-20), so top-full = bottom of nav */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-[#54206d] border-t border-[rgba(255,255,255,0.1)] overflow-hidden transition-all duration-300 z-50 ${
            mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-5 py-5 flex flex-col gap-4">
            {navLinks.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className="text-[#f5ebdd] text-base leading-6 tracking-[-0.48px] font-['Manrope',sans-serif]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </TransitionLink>
            ))}
            <div className="flex flex-col gap-3 pt-2 border-t border-[rgba(255,255,255,0.15)]">
              <TransitionLink
                href="/prices"
                aria-label={t("nav.viewPrices")}
                className="btn-animate-chars btn-secondary bg-[#54206d] border border-[rgba(255,255,255,0.15)] h-[45px] px-[22px] rounded-[4px] text-white text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap justify-center"
                onClick={() => setMobileOpen(false)}
              >
                <div className="btn-animate-chars__bg" />
                <span data-button-animate-chars="" className="btn-animate-chars__text">{t("nav.viewPrices")}</span>
              </TransitionLink>
              <TransitionLink
                href="/book"
                aria-label={t("nav.book")}
                className="btn-animate-chars btn-primary bg-[#f5ebdd] border border-[rgba(0,0,0,0.2)] h-[45px] px-[22px] rounded-[4px] text-[#414651] text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap justify-center"
                onClick={() => setMobileOpen(false)}
              >
                <div className="btn-animate-chars__bg" />
                <span data-button-animate-chars="" className="btn-animate-chars__text">{t("nav.book")}</span>
              </TransitionLink>
              <div className="pt-2 flex justify-start">
                <LanguageDropdown variant="mobile" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
