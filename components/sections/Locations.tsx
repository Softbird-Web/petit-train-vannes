import Image from "next/image";
import { useTranslations } from "next-intl";

const locationKeys = ["vannes", "quiberon"] as const;
const locationData: Record<(typeof locationKeys)[number], { href: string; image: string; rounded: string }> = {
  vannes: {
    href: "https://www.petittrain-morbihan.com/en/vannes/",
    image: "/figma-assets/vannes.jpg",
    rounded: "rounded-tl-[32px]",
  },
  quiberon: {
    href: "https://www.petittrain-morbihan.com/en/quiberon/",
    image: "/figma-assets/quiberon.jpg",
    rounded: "rounded-tr-[32px]",
  },
};

export default function Locations() {
  const t = useTranslations("sections.locations");

  return (
    <section data-anim-section className="bg-[#f5ebdd] py-16 xl:py-28 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 xl:px-0 w-full flex flex-col gap-16 items-center">
        {/* Header */}
        <div data-anim-item className="flex flex-col gap-6 items-center text-center max-w-[768px]">
          <div className="flex items-center gap-2">
            <div className="relative shrink-0 w-[19px] h-[19px]">
              <Image src="/figma-assets/icon-train.svg" alt="" fill className="object-contain" aria-hidden="true" />
            </div>
            <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#54206d] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
              {t("label")}
            </p>
          </div>
          <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[32px] sm:text-[40px] md:text-[48px] text-[#181d27] text-center leading-[1.2] tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-3.36px] max-w-[570px] [text-wrap:balance] break-words">
            {t("heading")}
          </h2>
          <p className="font-['Manrope',sans-serif] text-[#535862] text-[16px] text-center leading-[1.2] tracking-[-0.48px] max-w-[600px] w-full">
            {t("description")}
          </p>
        </div>

        {/* Location cards */}
        <div data-anim-item className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
          {locationKeys.map((key) => {
            const cfg = locationData[key];
            return (
              <a
                key={key}
                href={cfg.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(`${key}.cta`)}
                className={`group relative h-[550px] overflow-hidden ${cfg.rounded} block cursor-pointer`}
              >
                <div className="absolute inset-0">
                  <Image
                    src={cfg.image}
                    alt={t(`${key}.imageAlt`)}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05] will-change-transform"
                  />
                </div>

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-[rgba(77,28,100,0.52)] from-[34%] to-[rgba(77,28,100,0.8)]"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[rgba(84,32,109,0.78)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] flex items-center justify-center"
                >
                  <div className="flex flex-col items-center gap-3 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 ease-[cubic-bezier(0.625,0.05,0,1)]">
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-white text-[40px] leading-[1.2] tracking-[-2px]">
                      {t("discover")}
                    </p>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                      <path d="M16 6v20M6 16l10 10 10-10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-0 left-6 right-6 pb-6 flex flex-col gap-2 text-white transition-opacity duration-300 ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:opacity-0">
                  <div className="flex items-center gap-2.5">
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-[32px] leading-[1.5] tracking-[-2.24px]">
                      {t(`${key}.title`)}
                    </p>
                    <div className="relative shrink-0 w-6 h-6">
                      <Image src="/figma-assets/icon-link.svg" alt="" fill className="object-contain" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="font-['Manrope',sans-serif] font-light italic text-[14px] leading-[1.3] tracking-[-0.42px] w-[271px]">
                    {t(`${key}.tagline`)}
                  </p>
                  <p className="font-['Manrope',sans-serif] text-[14px] leading-[1.3] tracking-[-0.42px]">
                    {t(`${key}.description`)}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
