import Image from "next/image";
import { useTranslations } from "next-intl";
import TransitionLink from "@/components/ui/TransitionLink";

export default function InformationsPrices() {
  const t = useTranslations("sections.prices");

  return (
    <section data-anim-section className="bg-[#f5ebdd] relative overflow-hidden py-20">
      {/* Faint background watermark */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-20">
        <Image
          src="/figma-assets/train-illustration.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 xl:px-0 flex flex-col items-center gap-12">
        {/* Heading area */}
        <div data-anim-item className="flex flex-col items-center gap-6 text-center max-w-[623px]">
          {/* Section label */}
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
            <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#1c1b29] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
              Prices
            </p>
          </div>

          <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[clamp(36px,4vw,48px)] leading-[1.2] tracking-[-3.36px] text-[#1c1b29]">
            An affordable adventure for the whole family
          </h2>

          <p className="font-['Manrope',sans-serif] text-base leading-[1.2] tracking-[-0.48px] text-[#1c1b29]">
            From solo explorers to large tribes, find the perfect rate for your
            visit. Take advantage of our special pricing for children and
            families.
          </p>
        </div>

        {/* Pricing cards */}
        <div data-anim-item className="flex flex-col md:flex-row gap-8 items-stretch w-full">
          {/* Individual Tickets — cream card */}
          <div className="bg-[#ffffff] flex-1 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-4 border-b border-[rgba(0,0,0,0.15)]">
              <div className="relative shrink-0 w-6 h-6">
                <Image
                  src="/figma-assets/icon-ticket.svg"
                  alt=""
                  fill
                  className="object-contain"
                  aria-hidden="true"
                />
              </div>
              <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#1c1b29] text-[22px] tracking-[-0.72px]">
                Individual Tickets
              </p>
            </div>
            <div className="flex flex-col gap-0">
              <div className="flex items-center justify-between py-2 border-b border-[rgba(0,0,0,0.15)]">
                <span className="font-['Manrope',sans-serif] text-base text-[#232323]">Adults</span>
                <span className="font-['Manrope',sans-serif] font-extrabold text-[18px] text-[#1c1b29]">8,50€</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[rgba(0,0,0,0.15)]">
                <span className="font-['Manrope',sans-serif] text-base text-[#232323]">Children under 12</span>
                <span className="font-['Manrope',sans-serif] font-extrabold text-[18px] text-[#1c1b29]">5€</span>
              </div>
            </div>
            <div className="flex items-start gap-2 mt-auto pt-2">
              <div className="relative shrink-0 w-6 h-6 mt-0.5">
                <Image src="/figma-assets/icon-info.svg" alt="" fill className="object-contain" aria-hidden="true" />
              </div>
              <p className="font-['Manrope',sans-serif] text-[11px] leading-[1.4] tracking-[-0.5px] text-[rgba(35,35,35,0.7)]">
                <strong>For individuals:</strong> the meeting point is at the departure point; ticket office on-site.
              </p>
            </div>
          </div>

          {/* Bons Plans — Early morning departures */}
          <div className="bg-[#ffffff] border-2 border-[#1c1b29] flex-1 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-4 border-b border-[rgba(0,0,0,0.15)]">
              <div className="relative shrink-0 w-6 h-6">
                <Image src="/figma-assets/icon-ticket.svg" alt="" fill className="object-contain" aria-hidden="true" />
              </div>
              <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#1c1b29] text-[22px] tracking-[-0.72px]">
                Early Morning Departures
              </p>
            </div>
            <span className="inline-flex items-center self-start px-2.5 py-1 rounded-full bg-[#1c1b29] font-['Manrope',sans-serif] text-white text-[11px] font-medium tracking-[0.5px] uppercase">
              {t("earlyBird.badge")}
            </span>
            <div className="flex flex-col gap-0">
              <div className="flex items-center justify-between py-2 border-b border-[rgba(0,0,0,0.15)]">
                <span className="font-['Manrope',sans-serif] text-base text-[#232323]">Adults</span>
                <span className="font-['Manrope',sans-serif] font-extrabold text-[18px] text-[#1c1b29]">7,00€</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[rgba(0,0,0,0.15)]">
                <span className="font-['Manrope',sans-serif] text-base text-[#232323]">Children under 12</span>
                <span className="font-['Manrope',sans-serif] font-extrabold text-[18px] text-[#1c1b29]">3,50€</span>
              </div>
            </div>
            <div className="flex items-start gap-2 mt-auto pt-2">
              <div className="relative shrink-0 w-6 h-6 mt-0.5">
                <Image src="/figma-assets/icon-info.svg" alt="" fill className="object-contain" aria-hidden="true" />
              </div>
              <p className="font-['Manrope',sans-serif] text-[11px] leading-[1.4] tracking-[-0.5px] text-[rgba(35,35,35,0.7)]">
                <strong>Reduced rate</strong> applicable to the first departures of the morning only. Tickets available at the on-site ticket office.
              </p>
            </div>
          </div>

          {/* Group Booking — yellow card */}
          <div className="bg-[#f7a427] border border-[rgba(28,27,41,0.15)] flex-1 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-4 border-b border-[rgba(28,27,41,0.15)]">
              <div className="relative shrink-0 w-6 h-6">
                <Image src="/figma-assets/icon-group.svg" alt="" fill className="object-contain" aria-hidden="true" style={{ filter: "brightness(0)" }} />
              </div>
              <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#1c1b29] text-[22px] tracking-[-0.72px]">
                Group Booking
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-['Manrope',sans-serif] text-[#1c1b29] text-[16px] leading-[1.4]">
                For group rates, please contact us directly:
              </p>
              <div className="flex flex-col gap-2">
                <a href="mailto:petittrain-lebayon@orange.fr" className="flex items-center gap-2 text-[#1c1b29] hover:opacity-70 transition-opacity">
                  <div className="relative shrink-0 w-5 h-5">
                    <Image src="/figma-assets/icon-email.svg" alt="" fill className="object-contain" aria-hidden="true" style={{ filter: "brightness(0)" }} />
                  </div>
                  <span className="font-['Manrope',sans-serif] text-[15px] underline underline-offset-2">
                    petittrain-lebayon@orange.fr
                  </span>
                </a>
                <a href="tel:+33297240629" className="flex items-center gap-2 text-[#1c1b29] hover:opacity-70 transition-opacity">
                  <div className="relative shrink-0 w-5 h-5">
                    <Image src="/figma-assets/icon-phone.svg" alt="" fill className="object-contain" aria-hidden="true" style={{ filter: "brightness(0)" }} />
                  </div>
                  <span className="font-['Manrope',sans-serif] text-[15px]">02 97 24 06 29</span>
                </a>
              </div>
            </div>
            <div className="flex items-start gap-2 mt-auto pt-2">
              <div className="relative shrink-0 w-6 h-6 mt-0.5">
                <Image src="/figma-assets/icon-info.svg" alt="" fill className="object-contain" aria-hidden="true" style={{ filter: "brightness(0)" }} />
              </div>
              <p className="font-['Manrope',sans-serif] text-[11px] leading-[1.4] tracking-[-0.5px] text-[rgba(28,27,41,0.7)]">
                <strong>For groups:</strong> reduced rate for 20+ passengers embarking. Advance reservation recommended.
              </p>
            </div>
          </div>
        </div>

        {/* Book now CTA */}
        <TransitionLink
          href="/book"
          className="btn-animate-chars btn-primary inline-flex items-center gap-2 h-[45px] px-[22px] bg-[#ffffff] rounded-[4px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] ring-1 ring-inset ring-[rgba(10,13,18,0.18)] text-[#414651] text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap"
        >
          <div className="btn-animate-chars__bg" />
          <span data-button-animate-chars="" className="btn-animate-chars__text">Book now</span>
        </TransitionLink>
      </div>
    </section>
  );
}
