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
    name: "Parking du Ménec",
    location: "Maison des Mégalithes",
    periods: [
      {
        label: "Avril · Mai · Juin · Septembre · 1er – 8 octobre",
        band: "yellow",
        hours: "10H – 17H30",
        frequency: "Un départ toutes les 20 min",
      },
      {
        label: "Juillet & Août",
        band: "purple",
        hours: "9H30 – 18H30",
        frequency: "Un départ toutes les 20 min",
      },
      {
        label: "17 – 31 octobre",
        band: "green",
        hours: "10H – 17H",
        frequency: "Un départ toutes les 30 min",
      },
    ],
  },
  {
    number: 2,
    name: "Carnac Plage — Port-En-Drô",
    location: "À 50 m de la Base nautique",
    periods: [
      {
        label: "Avril · Mai · Juin · Septembre · 1er – 8 octobre",
        band: "orange",
        hours: "10H15 – 17H15",
        frequency: "Un départ toutes les 30 min",
        note: "Samedi inclus",
      },
      {
        label: "Juillet & Août",
        band: "blue",
        hours: "10H · 11H · 12H · 14H · 15H · 16H · 17H · 18H",
        note: "Sauf le samedi (le samedi : horaires « orange »)",
      },
    ],
  },
  {
    number: 3,
    name: "La Trinité-sur-Mer",
    location: "Arrêt de bus Cours des Quais, côté mer — avant le rond-point Alain Barrière",
    periods: [
      {
        label: "Avril · Mai · Juin · Septembre · 1er – 8 octobre",
        band: "orange",
        hours: "10H30 – 17H",
        frequency: "Un départ toutes les 30 min",
        note: "Samedi inclus",
      },
      {
        label: "Juillet & Août",
        band: "blue",
        hours: "10H15 · 11H15 · 14H15 · 15H15 · 16H15 · 17H15",
        note: "Sauf le samedi (le samedi : horaires « orange »)",
      },
    ],
  },
];

const BAND_STYLES: Record<Band, { bg: string; text: string; pill: string }> = {
  yellow: {
    bg: "bg-[#fde68a]",
    text: "text-[#4d1c64]",
    pill: "bg-[#fde68a] text-[#4d1c64]",
  },
  purple: {
    bg: "bg-[#c4b5fd]",
    text: "text-[#4d1c64]",
    pill: "bg-[#c4b5fd] text-[#4d1c64]",
  },
  green: {
    bg: "bg-[#a7f3d0]",
    text: "text-[#065f46]",
    pill: "bg-[#a7f3d0] text-[#065f46]",
  },
  orange: {
    bg: "bg-[#fdba74]",
    text: "text-[#4d1c64]",
    pill: "bg-[#fdba74] text-[#4d1c64]",
  },
  blue: {
    bg: "bg-[#7dd3fc]",
    text: "text-[#0c4a6e]",
    pill: "bg-[#7dd3fc] text-[#0c4a6e]",
  },
};

export default function InformationsSchedule() {
  const t = useTranslations("sections.informationsScheduleLabels");

  return (
    <section id="horaires" data-anim-section className="bg-[#f5ebdd] py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 xl:px-0 flex flex-col gap-8">

        {/* Info cards — Operating period + Weather */}
        <div data-anim-item className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Operating period card */}
          <div className="relative rounded-tl-[32px] rounded-bl-[32px] overflow-hidden min-h-[156px]">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
              <Image
                src="/figma-assets/practical-1.jpg"
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[rgba(77,28,100,0.9)]" />
            </div>
            <div className="relative z-10 flex items-start gap-4 p-6">
              <div className="shrink-0 w-[65px] h-[65px] rounded-[10px] bg-[#4d1c64] border border-[rgba(233,234,235,0.15)] flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
                <div className="relative w-[41px] h-[41px]">
                  <Image
                    src="/figma-assets/CalendarIconBig.svg"
                    alt=""
                    fill
                    className="object-contain"
                    aria-hidden="true"
                  />
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

          {/* Weather card */}
          <div className="relative rounded-tr-[32px] rounded-br-[32px] overflow-hidden min-h-[156px]">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
              <Image
                src="/figma-assets/practical-2.jpg"
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[rgba(77,28,100,0.9)]" />
            </div>
            <div className="relative z-10 flex items-start gap-4 p-6">
              <div className="shrink-0 w-[65px] h-[65px] rounded-[10px] bg-[#4d1c64] border border-[rgba(233,234,235,0.15)] flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
                <div className="relative w-[40px] h-[40px]">
                  <Image
                    src="/figma-assets/WeatherIconBig.svg"
                    alt=""
                    fill
                    className="object-contain"
                    aria-hidden="true"
                  />
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

        {/* Timetable — 3 departure panels on purple gradient */}
        <div data-anim-item className="rounded-[32px] overflow-hidden" style={{ background: "linear-gradient(112deg, #4d1c64 23%, #7b3a94 85%)" }}>
          <div className="px-6 md:px-10 py-12 flex flex-col gap-10">

            {/* Heading */}
            <div className="flex items-center gap-4 pb-6 border-b border-[rgba(255,255,255,0.2)]">
              <div className="hidden sm:flex flex-1 h-px bg-[rgba(255,255,255,0.35)]" />
              <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] italic text-white text-[28px] tracking-[-1.5px] text-center w-full sm:w-auto">
                {t("timetableHeading")}
              </h2>
              <div className="hidden sm:flex flex-1 h-px bg-[rgba(255,255,255,0.35)]" />
            </div>

            {/* 3 departure panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {departures.map((dep) => (
                <div key={dep.number} className="bg-white/8 rounded-[20px] p-6 flex flex-col gap-5 border border-white/15">
                  {/* Departure header */}
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-9 h-9 rounded-full bg-white text-[#4d1c64] font-['Bricolage_Grotesque',sans-serif] font-normal text-[20px] flex items-center justify-center">
                      {dep.number}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-['Bricolage_Grotesque',sans-serif] italic text-white text-[22px] leading-[1.2] tracking-[-1.2px]">
                        {t("departurePrefix")} {dep.name}
                      </p>
                      <p className="font-['Manrope',sans-serif] text-[13px] leading-[1.4] text-[rgba(255,255,255,0.7)] tracking-[-0.32px]">
                        {dep.location}
                      </p>
                    </div>
                  </div>

                  {/* Periods */}
                  <div className="flex flex-col gap-3">
                    {dep.periods.map((p) => {
                      const style = BAND_STYLES[p.band];
                      return (
                        <div
                          key={p.label}
                          className={`rounded-[12px] p-4 flex flex-col gap-2 ${style.bg} ${style.text}`}
                        >
                          <p className="font-['Manrope',sans-serif] font-semibold text-[12px] uppercase tracking-[0.5px] leading-tight">
                            {p.label}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="relative shrink-0 w-4 h-4">
                              <Image
                                src="/figma-assets/timetables-clock.svg"
                                alt=""
                                fill
                                className="object-contain"
                                aria-hidden="true"
                                style={{ filter: "brightness(0) saturate(100%) invert(11%) sepia(54%) saturate(2954%) hue-rotate(264deg) brightness(91%) contrast(95%)" }}
                              />
                            </div>
                            <p className="font-['Manrope',sans-serif] text-[15px] font-medium leading-tight">
                              {p.hours}
                            </p>
                          </div>
                          {p.frequency && (
                            <p className="font-['Manrope',sans-serif] text-[13px] leading-[1.4] tracking-[-0.32px]">
                              {p.frequency}
                            </p>
                          )}
                          {p.note && (
                            <p className="font-['Manrope',sans-serif] italic text-[12px] leading-[1.4] tracking-[-0.3px] opacity-80">
                              {p.note}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Saturday rule + view plan + booking note */}
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

        {/* Closures — standalone cream box */}
        <div data-anim-item className="rounded-[32px] border border-[rgba(0,0,0,0.1)] bg-[#f5ebdd] px-5 py-8 sm:px-10 sm:py-12 flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-4 w-full">
            <div className="hidden sm:flex flex-1 h-px bg-[rgba(0,0,0,0.12)]" />
            <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] italic text-[#4d1c64] text-[28px] tracking-[-1.5px] text-center w-full sm:w-auto">
              {t("closuresHeading")}
            </h2>
            <div className="hidden sm:flex flex-1 h-px bg-[rgba(0,0,0,0.12)]" />
          </div>
          <p className="font-['Manrope',sans-serif] text-[#181d27] text-base leading-[1.5] max-w-[560px]">
            {t.rich("closuresBody", { strong: (chunks) => <strong>{chunks}</strong> })}
          </p>
        </div>

      </div>
    </section>
  );
}
