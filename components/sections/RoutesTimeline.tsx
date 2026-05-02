"use client";

import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";


type Stop = {
  number: string;
  nameKey: string;
  bulletKeys: string[];
  noteKey?: string;
  image: string;
  imageAltKey: string;
  flip: boolean;
};

const stops: Stop[] = [
  {
    number: "01",
    nameKey: "stop1Name",
    bulletKeys: ["stop1Bullet1", "stop1Bullet2", "stop1Bullet3", "stop1Bullet4"],
    noteKey: "stop1Note",
    image: "/figma-assets/stop-1.jpg",
    imageAltKey: "stop1ImageAlt",
    flip: false,
  },
  {
    number: "02",
    nameKey: "stop2Name",
    bulletKeys: ["stop2Bullet1", "stop2Bullet2"],
    noteKey: "stop2Note",
    image: "/figma-assets/stop-2.jpg",
    imageAltKey: "stop2ImageAlt",
    flip: true,
  },
  {
    number: "03",
    nameKey: "stop3Name",
    bulletKeys: ["stop3Bullet1", "stop3Bullet2"],
    image: "/figma-assets/stop-3.jpg",
    imageAltKey: "stop3ImageAlt",
    flip: false,
  },
];

function StopNumber({ n, active }: { n: string; active: boolean }) {
  return (
    <div
      className={`relative w-[67px] h-[57px] ${active ? "opacity-100" : "opacity-40"}`}
    >
      <div className="absolute inset-0 bg-[#54206d] rounded-[4px]" />
      <p className="absolute font-['Bricolage_Grotesque',sans-serif] italic text-[#f5ebdd] text-[40px] leading-[1.2] tracking-[-2.8px] left-3 top-1">
        {n}
      </p>
    </div>
  );
}

export default function RoutesTimeline() {
  const t = useTranslations("sections.routesTimeline");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const line = section.querySelector(".timeline-line") as HTMLElement | null;
    if (!line) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          line.classList.add("timeline-line--visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section data-anim-section className="bg-[#f5ebdd] py-16 xl:py-28">
      <div className="max-w-[1280px] mx-auto px-5 xl:px-0 w-full flex flex-col gap-20 items-center">
        {/* Header */}
        <div data-anim-item className="flex flex-col gap-6 items-center text-center max-w-[768px]">
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
            <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#54206d] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
              {t("label")}
            </p>
          </div>
          <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[32px] sm:text-[40px] md:text-[48px] text-[#181d27] text-center leading-[1.2] tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-3.36px] max-w-[518px] [text-wrap:balance] break-words">
            {t("headingPrefix")}{" "}
            <em className="text-[#4d1c64]">{t("headingHighlight")}</em>
          </h2>
          <p className="font-['Manrope',sans-serif] text-[#535862] text-[16px] text-center leading-[1.2] tracking-[-0.48px] max-w-[570px]">
            {t("intro")}
          </p>
          <p className="font-['Manrope',sans-serif] font-bold text-[#535862] text-[16px] text-center leading-[1.2] tracking-[-0.48px] max-w-[570px]">
            {t("introBold")}
          </p>
        </div>

        {/* Timeline stops */}
        <div data-anim-item className="relative w-full flex flex-col items-center" ref={sectionRef}>
          <div className="timeline-line" aria-hidden="true" />

          {stops.map((stop, i) => {
            const ImageBlock = (
              <div className="hidden lg:block flex-1 py-8">
                <div className="relative h-[440px] rounded-lg overflow-hidden">
                  <Image
                    src={stop.image}
                    alt={t(stop.imageAltKey)}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            );
            const ContentBlock = (
              <div className="flex-1 flex flex-col gap-8 pt-4 pl-10 lg:pl-0">
                <div className="flex flex-col gap-6">
                  <StopNumber n={stop.number} active={i === 0} />
                  <p className="font-['Bricolage_Grotesque',sans-serif] text-[32px] text-[#0d0a06] leading-[1.3] tracking-[-2.24px]">
                    {t(stop.nameKey)}
                  </p>
                </div>
                <ul className="flex flex-col gap-3">
                  {stop.bulletKeys.map((bk) => (
                    <li
                      key={bk}
                      className="font-['Manrope',sans-serif] text-[#535862] text-[18px] leading-[1.5] tracking-[-0.54px] list-disc ml-7"
                    >
                      {t(bk)}
                    </li>
                  ))}
                  {stop.noteKey && (
                    <p className="font-['Manrope',sans-serif] font-semibold italic text-[#535862] text-[18px] leading-[1.5] tracking-[-0.54px]">
                      {t(stop.noteKey)}
                    </p>
                  )}
                </ul>
                <div className="flex items-center gap-3 flex-wrap">
                  <TransitionLink
                    href="/book"
                    className="btn-animate-chars btn-primary inline-flex items-center gap-2 h-[45px] px-[22px] bg-[#54206d] rounded-[4px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] ring-1 ring-inset ring-[rgba(10,13,18,0.18)] text-white text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap"
                  >
                    <div className="btn-animate-chars__bg" />
                    <div className="relative shrink-0 w-5 h-5">
                      <Image
                        src="/figma-assets/icon-ticket-white.svg"
                        alt=""
                        fill
                        className="object-contain"
                        aria-hidden="true"
                      />
                    </div>
                    <span data-button-animate-chars="" className="btn-animate-chars__text">{t("btnBook")}</span>
                  </TransitionLink>
                  <TransitionLink
                    href="/prices"
                    className="btn-animate-chars btn-secondary inline-flex items-center justify-center h-[45px] px-[22px] bg-[#f5ebdd] border border-[rgba(0,0,0,0.2)] rounded-[4px] text-[#414651] text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap"
                  >
                    <div className="btn-animate-chars__bg" />
                    <span data-button-animate-chars="" className="btn-animate-chars__text">{t("btnPrices")}</span>
                  </TransitionLink>
                </div>
              </div>
            );

            return (
              <div key={stop.number} className="w-full flex flex-col items-center">
                  {/* Mobile: content only, left-aligned to clear timeline line */}
                  <div className="w-full flex flex-col lg:flex-row gap-12 items-start lg:items-center">
                    {stop.flip ? ContentBlock : ImageBlock}

                    {/* Timeline connector dot — desktop only */}
                    <div className="hidden lg:flex flex-col items-center justify-center self-stretch w-8 relative z-10">
                      <div className="w-3 h-3 rounded-full bg-[#54206d] border-2 border-white ring-1 ring-[#54206d]" />
                    </div>

                    {stop.flip ? ImageBlock : ContentBlock}
                  </div>
                </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
