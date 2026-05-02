import Image from "next/image";
import { useTranslations } from "next-intl";
import TransitionLink from "@/components/ui/TransitionLink";

const cardKeys = ["duration", "departure", "schedule", "accessibility"] as const;
const cardConfig: Record<(typeof cardKeys)[number], { photo: string; icon: string; href?: string }> = {
  duration: { photo: "/figma-assets/PracticalInfo1.jpg", icon: "/figma-assets/Icon01.svg" },
  departure: { photo: "/figma-assets/PricesHero.jpg", icon: "/figma-assets/Icon02.svg" },
  schedule: { photo: "/figma-assets/PracticalInfo3.jpg", icon: "/figma-assets/Icon03.svg", href: "/informations#horaires" },
  accessibility: { photo: "/figma-assets/PracticalInfo4.jpg", icon: "/figma-assets/Icon04.svg" },
};

export default function PracticalInfo() {
  const t = useTranslations("sections.practicalInfo");

  return (
    <section data-anim-section className="bg-[#f5ebdd] py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 xl:px-0 w-full flex flex-col gap-12 items-start">
        {/* Header */}
        <div data-anim-item className="flex flex-col gap-3 max-w-[615px]">
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
            <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#111] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
              {t("label")}
            </p>
          </div>
          <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[32px] sm:text-[40px] md:text-[48px] text-[#181d27] leading-[1.2] tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-3.36px] max-w-[575px] w-full break-words">
            {t("heading")}
          </h2>
          <p className="font-['Manrope',sans-serif] text-[18px] text-[#535862] leading-[1.2] tracking-[-0.54px]">
            {t("description")}
          </p>
        </div>

        {/* Cards grid */}
        <div data-anim-item className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Row 1: 4 photo cards */}
          {cardKeys.map((key) => {
            const { photo, icon, href } = cardConfig[key];
            const cardClassName = "group relative h-[423px] rounded-xl overflow-hidden bg-[#4d1c64]";
            const cardContent = (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <Image src={photo} alt="" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[rgba(77,28,100,0.52)] from-[34%] to-[rgba(77,28,100,0.8)]" />
                </div>
                <Image
                  src={icon}
                  alt=""
                  width={48}
                  height={48}
                  className="absolute top-6 left-6 w-12 h-12 rounded-[8px] shadow-[0_4px_12px_rgba(77,28,100,0.2)] z-10"
                  aria-hidden="true"
                />
                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 text-white z-10">
                  <p className="font-['Bricolage_Grotesque',sans-serif] text-[24px] leading-[1.5] tracking-[-1.68px]">
                    {t(`${key}.title`)}
                  </p>
                  <p className="font-['Manrope',sans-serif] text-[14px] leading-[1.3] tracking-[-0.42px] text-white/75">
                    {t.rich(`${key}.description`, {
                      strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                  </p>
                </div>
              </>
            );
            if (href) {
              return (
                <TransitionLink key={key} href={href} className={`${cardClassName} block`}>
                  {cardContent}
                </TransitionLink>
              );
            }
            return (
              <div key={key} className={cardClassName}>
                {cardContent}
              </div>
            );
          })}

          {/* Row 2 col 1-2: wide photo card (Paiement) */}
          <div className="group col-span-2 relative h-[423px] rounded-xl overflow-hidden bg-[#4d1c64]">
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
              <Image src="/figma-assets/PracticalInfo5.jpg" alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(77,28,100,0.52)] from-[34%] to-[rgba(77,28,100,0.8)]" />
            </div>
            <Image
              src="/figma-assets/Icon05.svg"
              alt=""
              width={48}
              height={48}
              className="absolute top-6 left-6 w-12 h-12 rounded-[8px] shadow-[0_4px_12px_rgba(77,28,100,0.2)] z-10"
              aria-hidden="true"
            />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 text-white z-10">
              <p className="font-['Bricolage_Grotesque',sans-serif] text-[24px] leading-[1.5] tracking-[-1.68px]">
                {t("payment.title")}
              </p>
              <p className="font-['Manrope',sans-serif] text-[14px] leading-[1.3] tracking-[-0.42px] text-white/75">
                {t.rich("payment.description", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
            </div>
          </div>

          {/* Row 2 col 3-4: purple CTA card */}
          <div className="col-span-2 relative h-[423px] rounded-xl overflow-hidden bg-[#4d1c64]">
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-40"
            >
              <Image src="/figma-assets/train-illustration.png" alt="" fill className="object-cover" />
            </div>
            <div className="absolute top-8 left-8 right-8 flex flex-col gap-2 text-white">
              <p className="font-['Bricolage_Grotesque',sans-serif] text-[32px] leading-[1.5] tracking-[-2.24px]">
                {t("cta.heading")}
              </p>
              <p className="font-['Manrope',sans-serif] text-[16px] leading-[1.3] tracking-[-0.48px] max-w-[357px]">
                {t("cta.description")}
              </p>
            </div>
            <div className="absolute bottom-6 right-6">
              <TransitionLink
                href="/informations"
                className="btn-animate-chars btn-primary inline-flex items-center justify-center h-[45px] px-[22px] bg-[#f5ebdd] rounded-[4px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] ring-1 ring-inset ring-[rgba(10,13,18,0.18)] text-[#4d1c64] text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap"
              >
                <div className="btn-animate-chars__bg" />
                <span data-button-animate-chars="" className="btn-animate-chars__text">
                  {t("cta.button")}
                </span>
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
