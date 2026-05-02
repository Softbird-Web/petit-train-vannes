import Image from "next/image";
import { useTranslations } from "next-intl";

const featureKeys = ["f1", "f2", "f3", "f4"] as const;
const featureIcons: Record<(typeof featureKeys)[number], string> = {
  f1: "/figma-assets/icon-train-seat.svg",
  f2: "/figma-assets/icon-audio-guide.svg",
  f3: "/figma-assets/icon-landmark.svg",
  f4: "/figma-assets/icon-family.svg",
};

export default function Features() {
  const t = useTranslations("sections.features");

  return (
    <section data-anim-section className="bg-[#f5ebdd] flex flex-col gap-16 py-24 overflow-hidden">
      {/* Header row */}
      <div className="w-full max-w-[1280px] px-5 xl:px-0 mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Left: label + heading */}
          <div data-anim-item className="flex flex-col gap-3 max-w-[615px]">
            <div className="flex items-center gap-2">
              <div className="relative shrink-0 w-[19px] h-[19px]">
                <Image src="/figma-assets/icon-train.svg" alt="" fill className="object-contain" aria-hidden="true" />
              </div>
              <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#111] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
                {t("label")}
              </p>
            </div>
            <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[32px] sm:text-[40px] md:text-[48px] text-[#181d27] leading-[1.2] tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-3.36px] max-w-[575px] [text-wrap:balance] break-words">
              {t("heading")}
            </h2>
          </div>

          {/* Right: body text */}
          <div data-anim-item className="flex flex-col gap-5 max-w-[603px] font-['Manrope',sans-serif] text-[18px] text-[#535862] leading-[1.2] tracking-[-0.54px]">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
          </div>
        </div>
      </div>

      {/* Features 2×2 grid + photo */}
      <div className="w-full max-w-[1280px] mx-auto px-5 xl:px-0 flex flex-col lg:flex-row items-stretch gap-12">
        {/* Left: 2×2 feature grid */}
        <div data-anim-item className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {featureKeys.map((key) => (
              <div key={key} className="flex flex-col gap-5 items-start h-full">
                {/* Icon box */}
                <div className="relative shrink-0 w-16 h-16 rounded-[10px] border border-[#e9eaeb] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] overflow-hidden">
                  <div aria-hidden="true" className="absolute inset-0 bg-[#4d1c64] pointer-events-none rounded-[10px]" />
                  <div className="absolute inset-[15px]">
                    <Image src={featureIcons[key]} alt="" fill className="object-contain" aria-hidden="true" />
                  </div>
                  <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <p className="font-['Manrope',sans-serif] font-semibold text-[20px] text-[#181d27] leading-[1.5] tracking-[-0.8px]">
                    {t(`${key}Title`)}
                  </p>
                  <p className="font-['Manrope',sans-serif] text-base text-[#535862] leading-6">
                    {t(`${key}Desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: photo */}
        <div data-anim-item className="hidden lg:block flex-1 relative min-h-[560px] rounded-2xl overflow-hidden">
          <Image src="/figma-assets/features-photo.jpg" alt={t("imageAlt")} fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
