import Image from "next/image";
import { useTranslations } from "next-intl";
import ViewPlanButton from "@/components/ui/ViewPlanButton";

type Band = "yellow" | "purple" | "green" | "orange" | "blue";

type Period = {
  label: string;
  band: Band;
  hours: string;
  frequency?: string;
  note?: string;
};

type Departure = {
  number: 1 | 2 | 3;
  name: string;
  location: string;
  periods: Period[];
};

const departures: Departure[] = [
  {
    number: 1,
    name: "Place Gambetta",
    location: "Au cœur de Vannes, à deux pas des remparts",
    periods: [
      {
        label: "01 avril – 12 juin · 26 août – 13 oct · 22 oct – 07 nov",
        band: "yellow",
        hours: "10H – 12H et 14H – 17H20",
        frequency: "Un départ toutes les 40 min",
      },
      {
        label: "13 juin – 15 juillet",
        band: "orange",
        hours: "10H – 12H40 et 14H – 18H",
        frequency: "Un départ toutes les 40 min",
      },
      {
        label: "16 juillet – 25 août",
        band: "purple",
        hours: "10H – 12H40 et 14H – 18H40",
        frequency: "Un départ toutes les 40 min",
      },
      {
        label: "13 octobre – 21 octobre",
        band: "green",
        hours: "Fermé",
        note: "Fermeture exceptionnelle",
      },
    ],
  },
];

const ACCENT: Record<Band, string> = {
  yellow: "border-l-[#fde68a]",
  orange: "border-l-[#fdba74]",
  purple: "border-l-[#c4b5fd]",
  green:  "border-l-[#6ee7b7]",
  blue:   "border-l-[#7dd3fc]",
};

const DOT: Record<Band, string> = {
  yellow: "bg-[#fde68a]",
  orange: "bg-[#fdba74]",
  purple: "bg-[#c4b5fd]",
  green:  "bg-[#6ee7b7]",
  blue:   "bg-[#7dd3fc]",
};

export default function InformationsSchedule() {
  const t = useTranslations("sections.informationsScheduleLabels");

  return (
    <section id="horaires" data-anim-section className="bg-[#f5ebdd] py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 xl:px-0 flex flex-col gap-8">

        {/* Info cards — Operating period + Weather */}
        <div data-anim-item className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative rounded-tl-[32px] rounded-bl-[32px] overflow-hidden min-h-[156px]">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
              <Image src="/figma-assets/practical-1.jpg" alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-[rgba(28,27,41,0.9)]" />
            </div>
            <div className="relative z-10 flex items-start gap-4 p-6">
              <div className="shrink-0 w-[65px] h-[65px] rounded-[10px] bg-[#f7a427] border border-[rgba(28,27,41,0.15)] flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
                <div className="relative w-[41px] h-[41px]">
                  <Image src="/figma-assets/CalendarIconBig.svg" alt="" fill className="object-contain" aria-hidden="true" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[28px] md:text-[32px] leading-[1.25] text-white tracking-[-2.24px]">
                  {t("operatingPeriodTitle")}
                </h3>
                <p className="font-['Manrope',sans-serif] text-[14px] leading-[1.3] tracking-[-0.42px] text-white max-w-[400px]">
                  {t("operatingPeriodBody")}
                </p>
              </div>
            </div>
          </div>

          <div className="relative rounded-tr-[32px] rounded-br-[32px] overflow-hidden min-h-[156px]">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
              <Image src="/figma-assets/practical-2.jpg" alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-[rgba(28,27,41,0.9)]" />
            </div>
            <div className="relative z-10 flex items-start gap-4 p-6">
              <div className="shrink-0 w-[65px] h-[65px] rounded-[10px] bg-[#f7a427] border border-[rgba(28,27,41,0.15)] flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
                <div className="relative w-[40px] h-[40px]">
                  <Image src="/figma-assets/WeatherIconBig.svg" alt="" fill className="object-contain" aria-hidden="true" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[28px] md:text-[32px] leading-[1.25] text-white tracking-[-2.24px]">
                  {t("weatherTitle")}
                </h3>
                <p className="font-['Manrope',sans-serif] text-[14px] leading-[1.3] tracking-[-0.42px] text-white max-w-[400px]">
                  {t("weatherBody")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timetable */}
        <div data-anim-item className="rounded-[32px] overflow-hidden bg-[#1c1b29]">
          <div className="px-6 md:px-10 py-12 flex flex-col gap-10">

            <div className="flex items-center gap-4 pb-6 border-b border-[rgba(255,255,255,0.2)]">
              <div className="hidden sm:flex flex-1 h-px bg-[rgba(255,255,255,0.35)]" />
              <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] italic text-white text-[28px] tracking-[-1.5px] text-center w-full sm:w-auto">
                {t("timetableHeading")}
              </h2>
              <div className="hidden sm:flex flex-1 h-px bg-[rgba(255,255,255,0.35)]" />
            </div>

            <div className="grid grid-cols-1 gap-6">
              {departures.map((dep) => (
                <div key={dep.number} className="flex flex-col gap-5">
                  {/* Departure header */}
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-9 h-9 rounded-full bg-[#f7a427] text-[#1c1b29] font-['Bricolage_Grotesque',sans-serif] text-[20px] flex items-center justify-center">
                      {dep.number}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-['Bricolage_Grotesque',sans-serif] italic text-white text-[22px] leading-[1.2] tracking-[-1.2px]">
                        {t("departurePrefix")} {dep.name}
                      </p>
                      <p className="font-['Manrope',sans-serif] text-[13px] leading-[1.4] text-white/60 tracking-[-0.32px]">
                        {dep.location}
                      </p>
                    </div>
                  </div>

                  {/* Periods — 2×2 grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {dep.periods.map((p) => (
                      <div
                        key={p.label}
                        className={`rounded-[16px] border border-white/10 border-l-4 bg-white/[0.06] px-5 py-4 flex flex-col gap-3 ${ACCENT[p.band]}`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${DOT[p.band]}`} />
                          <p className="font-['Manrope',sans-serif] text-[11px] uppercase tracking-[0.7px] text-white/45 leading-tight">
                            {p.label}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="relative shrink-0 w-4 h-4 opacity-50">
                            <Image
                              src="/figma-assets/timetables-clock.svg"
                              alt=""
                              fill
                              className="object-contain invert"
                              aria-hidden="true"
                            />
                          </div>
                          <p className={`font-['Bricolage_Grotesque',sans-serif] text-[20px] leading-tight tracking-[-1px] ${p.hours === "Fermé" ? "italic text-white/50" : "text-white"}`}>
                            {p.hours}
                          </p>
                        </div>
                        {p.frequency && (
                          <p className="font-['Manrope',sans-serif] text-[12px] leading-[1.4] tracking-[-0.3px] text-white/45">
                            {p.frequency}
                          </p>
                        )}
                        {p.note && (
                          <p className="font-['Manrope',sans-serif] italic text-[11px] leading-[1.4] text-white/35">
                            {p.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer notes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="rounded-[16px] bg-white/10 border border-white/15 px-5 py-4">
                <p className="font-['Manrope',sans-serif] text-[13px] leading-[1.5] text-white tracking-[-0.32px]">
                  {t.rich("saturdayRule", { strong: (chunks) => <strong>{chunks}</strong> })}
                </p>
              </div>
              <ViewPlanButton
                buttonLabel={t("viewPlanButton")}
                imageAlt={t("viewPlanImageAlt")}
                closeLabel={t("lightboxClose")}
              />
              <div className="rounded-[16px] bg-white/10 border border-white/15 px-5 py-4">
                <p className="font-['Manrope',sans-serif] text-[13px] leading-[1.5] text-white tracking-[-0.32px]">
                  {t.rich("onlineBookingNote", { strong: (chunks) => <strong>{chunks}</strong> })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Closures */}
        <div data-anim-item className="rounded-[32px] border border-[rgba(0,0,0,0.1)] bg-[#ffffff] px-5 py-8 sm:px-10 sm:py-12 flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-4 w-full">
            <div className="hidden sm:flex flex-1 h-px bg-[rgba(0,0,0,0.12)]" />
            <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] italic text-[#1c1b29] text-[28px] tracking-[-1.5px] text-center w-full sm:w-auto">
              {t("closuresHeading")}
            </h2>
            <div className="hidden sm:flex flex-1 h-px bg-[rgba(0,0,0,0.12)]" />
          </div>
          <p className="font-['Manrope',sans-serif] text-[#1c1b29] text-base leading-[1.5] max-w-[560px]">
            {t.rich("closuresBody", { strong: (chunks) => <strong>{chunks}</strong> })}
          </p>
        </div>

      </div>
    </section>
  );
}
