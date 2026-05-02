"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const CarnacMap = dynamic(() => import("@/components/ui/CarnacMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-[#e9eaeb] animate-pulse" />
  ),
});

const itemKeys = ["item1", "item2", "item3", "item4", "item5"] as const;
const itemConfig: Record<(typeof itemKeys)[number], { icon: string; mapsUrl: string | null }> = {
  item1: {
    icon: "/figma-assets/icon-map-pin.svg",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Parking+du+M%C3%A9nec+Carnac+France",
  },
  item2: {
    icon: "/figma-assets/icon-map-pin.svg",
    mapsUrl: "https://maps.app.goo.gl/JzqVZr1pE5XGM28S9",
  },
  item3: {
    icon: "/figma-assets/icon-map-pin.svg",
    mapsUrl: "https://maps.app.goo.gl/YCq38Se1CXBLyBLZ9",
  },
  item4: { icon: "/figma-assets/icon-car.svg", mapsUrl: null },
  item5: { icon: "/figma-assets/icon-train-sm.svg", mapsUrl: null },
};

export default function OurLocation() {
  const t = useTranslations("sections.ourLocation");

  return (
    <section data-anim-section className="bg-[#f5ebdd] py-16 xl:py-28 isolate">
      <div className="max-w-[1280px] mx-auto px-5 xl:px-0 w-full flex flex-col-reverse lg:flex-row items-start lg:items-center gap-12 lg:gap-20">
        {/* Map */}
        <div data-anim-item className="w-full h-[400px] lg:flex-1 lg:self-stretch lg:h-auto lg:min-h-[560px] rounded-2xl overflow-hidden shadow-md">
          <CarnacMap />
        </div>

        {/* Content */}
        <div data-anim-item className="flex-1 flex flex-col gap-6 max-w-[623px]">
          <div className="flex items-center gap-2">
            <div className="relative shrink-0 w-[19px] h-[19px]">
              <Image src="/figma-assets/icon-train.svg" alt="" fill className="object-contain" aria-hidden="true" />
            </div>
            <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#54206d] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
              {t("label")}
            </p>
          </div>

          <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[32px] sm:text-[40px] md:text-[48px] text-[#181d27] leading-[1.2] tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-3.36px] max-w-[472px] break-words">
            {t("heading")}
          </h2>

          <p className="font-['Manrope',sans-serif] text-[#535862] text-[16px] leading-[1.2] tracking-[-0.48px] max-w-[570px]">
            {t("description")}
          </p>

          {/* Feature items */}
          <div className="flex flex-col gap-8">
            {itemKeys.map((key) => {
              const cfg = itemConfig[key];
              return (
                <div key={key} className="flex items-start gap-4">
                  <div className="relative shrink-0 w-12 h-12 rounded-[10px] border border-[#e9eaeb] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] overflow-hidden bg-white">
                    <div className="absolute inset-[11px]">
                      <Image src={cfg.icon} alt="" fill className="object-contain" aria-hidden="true" />
                    </div>
                    <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
                  </div>

                  <div className="flex flex-col gap-2 pt-2.5 flex-1">
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-[24px] text-[#181d27] leading-[1.2] tracking-[-1.68px]">
                      {t(`${key}Title`)}
                    </p>
                    <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-6">
                      {t(`${key}Description`)}
                    </p>
                    {cfg.mapsUrl && (
                      <a
                        href={cfg.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#54206d] text-sm font-['Manrope',sans-serif] font-medium underline underline-offset-2 hover:opacity-70 transition-opacity w-fit"
                      >
                        <div className="relative shrink-0 w-4 h-4">
                          <Image src="/figma-assets/icon-map-pin.svg" alt="" fill className="object-contain" aria-hidden="true" />
                        </div>
                        {t("seeRoute")}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrival recommendation */}
          <div className="flex flex-col gap-2 pl-16">
            <p className="font-['Manrope',sans-serif] font-semibold text-[#54206d] text-[20px] leading-[1.2] tracking-[-0.6px]">
              {t("arrivalTipTitle")}
            </p>
            <p className="font-['Manrope',sans-serif] text-[#535862] text-[16px] leading-[1.2] tracking-[-0.48px] max-w-[435px]">
              {t("arrivalTipDescription")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
