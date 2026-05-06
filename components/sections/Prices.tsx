import Image from "next/image";
import { useTranslations } from "next-intl";
import { brand } from "@/lib/brand";

const individualPrices = [brand.prices.individual.adult, brand.prices.individual.child];
const earlyBirdPrices = [brand.prices.earlyBird.adult, brand.prices.earlyBird.child];

export default function Prices() {
  const t = useTranslations("sections.prices");

  const rowLabels = [t("rowAdults"), t("rowChildren")] as const;

  return (
    <section data-anim-section className="relative bg-[#f5ebdd] py-20 overflow-hidden">
      {/* Decorative hexagonal pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
      >
        <Image
          src="/figma-assets/hexagonal-pattern.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-5 xl:px-0 w-full flex flex-col gap-20 items-center">
        {/* Header */}
        <div data-anim-item className="relative flex flex-col gap-6 items-center text-center max-w-[623px]">
          <div className="flex items-center gap-2">
            <div className="relative shrink-0 w-[19px] h-[19px]">
              <Image src="/figma-assets/icon-train.svg" alt="" fill className="object-contain" aria-hidden="true" />
            </div>
            <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#1c1b29] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
              {t("label")}
            </p>
          </div>
          <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[32px] sm:text-[40px] md:text-[48px] text-[#1c1b29] leading-[1.2] tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-3.36px] max-w-[581px] w-full [text-wrap:balance] break-words">
            {t("heading")}
          </h2>
          <p className="font-['Manrope',sans-serif] text-[#1c1b29] text-[16px] leading-[1.2] tracking-[-0.48px] max-w-[551px] w-full">
            {t("description")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div data-anim-item className="relative flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Individual Tickets */}
          <div className="bg-[#ffffff] flex flex-col w-full max-w-[371px] min-h-[317px] p-6 relative rounded-[16px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="relative shrink-0 w-6 h-6">
                <Image src="/figma-assets/PurpleCashIcon.svg" alt="" fill className="object-contain" aria-hidden="true" />
              </div>
              <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#1c1b29] text-[24px] leading-normal tracking-[-0.72px] whitespace-nowrap">
                {t("individual.title")}
              </p>
            </div>
            <div className="border-b border-[rgba(0,0,0,0.15)] mb-2" />
            <div className="flex flex-col mt-2">
              {rowLabels.map((label, i) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-[rgba(0,0,0,0.15)]">
                  <p className="font-['Manrope',sans-serif] text-[#232323] text-[16px]">{label}</p>
                  <p className="font-['Manrope',sans-serif] font-extrabold text-[#1c1b29] text-[18px] text-right">
                    {individualPrices[i]}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2.5 mt-auto pt-4">
              <div className="relative shrink-0 w-6 h-6">
                <Image src="/figma-assets/icon-info.svg" alt="" fill className="object-contain" aria-hidden="true" />
              </div>
              <p className="font-['Manrope',sans-serif] text-[11px] text-[rgba(35,35,35,0.7)] leading-[1.4] tracking-[-0.5px]">
                {t.rich("individual.note", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
            </div>
          </div>

          {/* Bons Plans — Early-morning departures */}
          <div className="bg-[#ffffff] border-2 border-[#1c1b29] flex flex-col w-full max-w-[371px] min-h-[317px] p-6 rounded-[16px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="relative shrink-0 w-6 h-6">
                <Image src="/figma-assets/PurpleCashIcon.svg" alt="" fill className="object-contain" aria-hidden="true" />
              </div>
              <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#1c1b29] text-[24px] leading-normal tracking-[-0.72px]">
                {t("earlyBird.title")}
              </p>
            </div>
            <span className="inline-flex items-center self-start mb-3 px-2.5 py-1 rounded-full bg-[#1c1b29] font-['Manrope',sans-serif] text-white text-[11px] font-medium tracking-[0.5px] uppercase">
              {t("earlyBird.badge")}
            </span>
            <div className="border-b border-[rgba(0,0,0,0.15)] mb-2" />
            <div className="flex flex-col mt-2">
              {rowLabels.map((label, i) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-[rgba(0,0,0,0.15)]">
                  <p className="font-['Manrope',sans-serif] text-[#232323] text-[16px]">{label}</p>
                  <p className="font-['Manrope',sans-serif] font-extrabold text-[#1c1b29] text-[18px] text-right">
                    {earlyBirdPrices[i]}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2.5 mt-auto pt-4">
              <div className="relative shrink-0 w-6 h-6">
                <Image src="/figma-assets/icon-info.svg" alt="" fill className="object-contain" aria-hidden="true" />
              </div>
              <p className="font-['Manrope',sans-serif] text-[11px] text-[rgba(35,35,35,0.7)] leading-[1.4] tracking-[-0.5px]">
                {t.rich("earlyBird.note", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
            </div>
          </div>

          {/* Group Booking */}
          <div className="bg-[#f7a427] border border-[rgba(28,27,41,0.15)] flex flex-col w-full max-w-[371px] min-h-[317px] p-6 relative rounded-[16px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="relative shrink-0 w-6 h-6">
                <Image src="/figma-assets/icon-group.svg" alt="" fill className="object-contain" aria-hidden="true" style={{ filter: "brightness(0)" }} />
              </div>
              <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#1c1b29] text-[24px] leading-normal tracking-[-0.72px] whitespace-nowrap">
                {t("group.title")}
              </p>
            </div>
            <div className="border-b border-[rgba(28,27,41,0.15)] mb-2" />
            <div className="flex flex-col gap-4 mt-4">
              <p className="font-['Manrope',sans-serif] text-[#1c1b29] text-[16px] leading-[1.4]">
                {t("group.text")}
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:petittrain-lebayon@orange.fr"
                  className="flex items-center gap-2 text-[#1c1b29] hover:opacity-70 transition-opacity"
                >
                  <div className="relative shrink-0 w-5 h-5">
                    <Image src="/figma-assets/icon-email.svg" alt="" fill className="object-contain" aria-hidden="true" style={{ filter: "brightness(0)" }} />
                  </div>
                  <span className="font-['Manrope',sans-serif] text-[15px] underline underline-offset-2">
                    petittrain-lebayon@orange.fr
                  </span>
                </a>
                <a
                  href="tel:+33297240629"
                  className="flex items-center gap-2 text-[#1c1b29] hover:opacity-70 transition-opacity"
                >
                  <div className="relative shrink-0 w-5 h-5">
                    <Image src="/figma-assets/icon-phone.svg" alt="" fill className="object-contain" aria-hidden="true" style={{ filter: "brightness(0)" }} />
                  </div>
                  <span className="font-['Manrope',sans-serif] text-[15px]">02 97 24 06 29</span>
                </a>
              </div>
            </div>
            <div className="flex items-start gap-2.5 mt-auto pt-4">
              <div className="relative shrink-0 w-6 h-6">
                <Image src="/figma-assets/icon-info.svg" alt="" fill className="object-contain" aria-hidden="true" />
              </div>
              <p className="font-['Manrope',sans-serif] text-[11px] text-[rgba(28,27,41,0.7)] leading-[1.4] tracking-[-0.5px]">
                {t.rich("group.note", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
