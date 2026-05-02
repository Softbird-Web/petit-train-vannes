import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Prices from "@/components/sections/Prices";
import InformationsSchedule from "@/components/sections/InformationsSchedule";
import Reviews from "@/components/sections/Reviews";
import Locations from "@/components/sections/Locations";
import FAQ from "@/components/sections/FAQ";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.prices" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/prices" },
  };
}

export default async function PricesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const pricesRightCard = (
    <div className="absolute bottom-[514px] lg:bottom-[30px] left-1/2 -translate-x-1/2 lg:left-[189px] lg:translate-x-0 bg-[rgba(84,32,109,0.65)] border border-[rgba(255,255,255,0.2)] rounded-xl p-6 w-[499px] max-w-[calc(100%-32px)] flex flex-col gap-4 z-20">
      <div className="flex items-start justify-between gap-4">
        <p className="font-['Manrope',sans-serif] font-semibold text-[20px] leading-[1.2] text-white tracking-[-0.8px] max-w-[312px]">
          {t("pages.prices.reviewQuote")}
        </p>
        <div className="relative h-[43px] w-[76px] shrink-0">
          <Image
            src="/figma-assets/stars.svg"
            alt={t("shared.starsAlt")}
            fill
            className="object-contain object-left"
          />
        </div>
      </div>
      <p className="font-['Manrope',sans-serif] font-normal text-[14px] leading-[1.4] text-white tracking-[-0.56px]">
        {t("pages.prices.reviewAuthor")}
      </p>
    </div>
  );

  const pricingFaqs = (["q1", "q2", "q3", "q4", "q5", "q6", "q7"] as const).map((k) => ({
    question: t(`pages.prices.faq.${k}`),
    answer: t(`pages.prices.faq.a${k.slice(1)}`),
  }));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: t("breadcrumb.home"), path: "/" },
          { name: t("breadcrumb.prices"), path: "/prices" },
        ]}
      />
      <main>
        <Hero
          label={t("pages.prices.heroLabel")}
          heading={
            <>
              {t("pages.prices.heroHeadingPrefix")}{" "}
              <em className="italic text-[#4d1c64]">{t("pages.prices.heroHeadingHighlight")}</em>
            </>
          }
          description={t("pages.prices.heroDescription")}
          tagline={null}
          buttons={
            <>
              <a
                href="/figma-assets/FlyerIndividual.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animate-chars btn-primary gap-2 bg-[#54206d] h-[45px] px-[22px] rounded-[4px] text-white text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap inline-flex items-center shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] ring-1 ring-inset ring-[rgba(10,13,18,0.18)]"
              >
                <div className="btn-animate-chars__bg" />
                <div className="relative w-4 h-4 shrink-0">
                  <Image src="/figma-assets/DownloadWhite.svg" alt="" fill className="object-contain" aria-hidden="true" />
                </div>
                <span data-button-animate-chars="" className="btn-animate-chars__text">
                  {t("pages.prices.btnFlyerIndividual")}
                </span>
              </a>
              <a
                href="/figma-assets/GroupFlyer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animate-chars btn-secondary gap-2 bg-[#f5ebdd] border border-[rgba(0,0,0,0.2)] h-[45px] px-[22px] rounded-[4px] text-[#414651] text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap inline-flex items-center"
              >
                <div className="btn-animate-chars__bg" />
                <div className="relative w-4 h-4 shrink-0">
                  <Image src="/figma-assets/DownloadBlack.svg" alt="" fill className="object-contain" aria-hidden="true" />
                </div>
                <span data-button-animate-chars="" className="btn-animate-chars__text">
                  {t("pages.prices.btnFlyerGroup")}
                </span>
              </a>
            </>
          }
          googleBadgeText={t("shared.googleRatingDescription")}
          rightImageSrc="/figma-assets/PricesHero.jpg"
          rightImageAlt={t("hero.rightImageAlt")}
          rightCard={pricesRightCard}
          showBottomBanner={false}
        />
        <div id="prices">
          <Prices />
        </div>
        <InformationsSchedule />
        <Reviews />
        <Locations />
        <FAQ
          faqs={pricingFaqs}
          label={t("pages.prices.faqLabel")}
          heading={
            <>
              {t("pages.prices.faqHeadingPrefix")}{" "}
              <em className="text-[#4d1c64]">{t("pages.prices.faqHeadingHighlight")}</em>
            </>
          }
          description={t("pages.prices.faqDescription")}
        />
      </main>
    </>
  );
}
