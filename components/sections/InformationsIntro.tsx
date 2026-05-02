import Image from "next/image";
import { useTranslations } from "next-intl";

export default function InformationsIntro() {
  const t = useTranslations("sections.informationsIntro");

  return (
    <section data-anim-section className="bg-[#f5ebdd] py-16">
      <div className="max-w-[1280px] mx-auto px-5 xl:px-0 border-t border-[rgba(0,0,0,0.15)] pt-8 flex flex-col gap-10">
        <div data-anim-item className="flex items-center gap-2">
          <div className="relative shrink-0 w-[19px] h-[19px]">
            <Image src="/figma-assets/icon-train.svg" alt="" fill className="object-contain" aria-hidden="true" />
          </div>
          <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#54206d] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
            {t("label")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div data-anim-item className="lg:w-[559px] shrink-0">
            <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[clamp(36px,4vw,48px)] leading-[1.2] tracking-[-3.36px] text-[#181d27]">
              {t("heading")}
            </h2>
          </div>
          <div data-anim-item className="flex-1">
            <p className="font-['Manrope',sans-serif] text-[18px] md:text-[20px] leading-[1.5] text-[#535862]">
              {t.rich("description", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
