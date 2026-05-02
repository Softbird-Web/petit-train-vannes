import Image from "next/image";
import type { ReactNode } from "react";

interface InformationsHeroProps {
  label: string;
  heading: ReactNode;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export default function InformationsHero({
  label,
  heading,
  description,
  imageSrc,
  imageAlt,
}: InformationsHeroProps) {
  return (
    <section data-anim-section="hero" className="bg-[#f5ebdd] pt-20 pb-0 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 xl:px-0">
        {/* Heading area */}
        <div className="flex flex-col items-center gap-6 max-w-[768px] mx-auto text-center mb-20">
          {/* Section label */}
          <div data-anim-item className="flex items-center gap-2">
            <div className="relative shrink-0 w-[19px] h-[19px]">
              <Image
                src="/figma-assets/icon-train.svg"
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </div>
            <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#54206d] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
              {label}
            </p>
          </div>

          {/* Heading */}
          <h1 data-anim-item className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[clamp(36px,5vw,60px)] leading-[1.2] tracking-[-4.2px] text-[#181d27] break-words">
            {heading}
          </h1>

          {/* Supporting text */}
          <p data-anim-item className="font-['Manrope',sans-serif] text-base leading-[1.2] tracking-[-0.48px] text-[#535862] max-w-[551px]">
            {description}
          </p>
        </div>
      </div>

      {/* Full-width banner image */}
      <div data-anim-item className="relative w-full max-w-[1280px] mx-auto h-[320px] md:h-[420px] lg:h-[512px] overflow-hidden rounded-tl-2xl rounded-tr-2xl md:rounded-tl-[48px] md:rounded-tr-[48px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
