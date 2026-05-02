import Image from "next/image";
import { useTranslations } from "next-intl";
import ReviewsSlider from "@/components/ui/ReviewsSlider";

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#F5A623" aria-hidden="true">
          <path d="M7 0l1.796 5.528H14l-4.702 3.416 1.796 5.528L7 11.056l-4.095 3.416 1.796-5.528L0 5.528h5.204z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const t = useTranslations("sections.reviews");
  const tShared = useTranslations("shared");

  return (
    <section data-anim-section className="bg-[#4d1c64] flex flex-col gap-10 xl:gap-14 items-center justify-center py-20 overflow-hidden">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto px-5 xl:px-0 w-full flex justify-center">
        <div className="flex flex-col gap-6 items-center text-center max-w-[623px]">
          <div data-anim-item className="flex items-center gap-2">
            <div className="relative shrink-0 w-[19px] h-[19px]">
              <Image src="/figma-assets/icon-train.svg" alt="" fill className="object-contain" aria-hidden="true" />
            </div>
            <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#f5ebdd] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
              {t("label")}
            </p>
          </div>

          <h2 data-anim-item className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[#f5ebdd] text-[32px] sm:text-[40px] md:text-[48px] text-center leading-[1.2] tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-3.36px] max-w-[410px] w-full [text-wrap:balance] break-words">
            {t("heading")}
          </h2>

          <p data-anim-item className="font-['Manrope',sans-serif] text-[#f5ebdd] text-[16px] text-center leading-[1.2] tracking-[-0.48px] max-w-[570px] w-full">
            {t("description")}
          </p>

          {/* Google badge */}
          <div data-anim-item className="bg-white rounded-[8px] flex items-center gap-2.5 px-2 py-1 rotate-[0.54deg]">
            <div className="relative shrink-0 w-6 h-6">
              <Image src="/figma-assets/google-icon.svg" alt="Google" fill className="object-contain" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <span className="font-['Manrope',sans-serif] font-bold text-[14px] text-black tracking-[-0.42px]">
                  4,7
                </span>
                <StarRating />
              </div>
              <p className="font-['Manrope',sans-serif] text-[11px] text-black opacity-60 tracking-[-0.33px]">
                {tShared("googleReviewsCount")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* GSAP Draggable Slider */}
      <div data-anim-item className="w-full max-w-[1280px] mx-auto">
        <ReviewsSlider />
      </div>
    </section>
  );
}
