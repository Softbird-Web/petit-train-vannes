import { getTranslations, setRequestLocale } from "next-intl/server";
import InformationsHero from "@/components/sections/InformationsHero";
import InformationsSchedule from "@/components/sections/InformationsSchedule";
import Prices from "@/components/sections/Prices";
import InformationsIntro from "@/components/sections/InformationsIntro";
import Reviews from "@/components/sections/Reviews";
import InformationsCTA from "@/components/sections/InformationsCTA";
import Locations from "@/components/sections/Locations";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.informations" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/informations" },
  };
}

export default async function InformationsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: t("breadcrumb.home"), path: "/" },
          { name: t("breadcrumb.informations"), path: "/informations" },
        ]}
      />
      <main>
        <InformationsHero
          label={t("pages.informations.heroLabel")}
          heading={
            <>
              {t("pages.informations.heroHeadingPrefix")}{" "}
              <em className="italic text-[#54206d] not-italic font-['Bricolage_Grotesque',sans-serif] italic">
                {t("pages.informations.heroHeadingHighlight")}
              </em>
            </>
          }
          description={t("pages.informations.heroDescription")}
          imageSrc="/figma-assets/PracticalInformationHero.jpg"
          imageAlt={t("pages.informations.heroImageAlt")}
        />
        <InformationsSchedule />
        <Prices />
        <InformationsIntro />
        <Reviews />
        <InformationsCTA />
        <Locations />
      </main>
    </>
  );
}
