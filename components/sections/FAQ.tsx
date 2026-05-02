"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import TransitionLink from "@/components/ui/TransitionLink";

interface FaqData {
  question: string;
  answer: string;
}

interface FaqItemProps {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}

function FaqItem({ question, answer, open, onToggle }: FaqItemProps) {
  return (
    <div className="w-full py-6">
      <button
        type="button"
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className="w-full flex items-start justify-between gap-6 text-left cursor-pointer"
        aria-expanded={open ? "true" : "false"}
      >
        <h3 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[20px] text-[#181d27] leading-[1.2] tracking-[-1.4px] m-0">
          {question}
        </h3>
        <span
          className="shrink-0 text-[#54206d] text-[24px] leading-none mt-0.5 transition-transform duration-300 select-none"
          aria-hidden="true"
        >
          {open ? "×" : "+"}
        </span>
      </button>

      <div className={`faq-answer-wrap ${open ? "open" : ""} mt-2`}>
        <div className="faq-answer-inner">
          <p className="font-['Manrope',sans-serif] text-[#535862] text-[16px] leading-6 tracking-[-0.48px] pt-2">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

interface FAQProps {
  faqs?: FaqData[];
  label?: string;
  heading?: ReactNode;
  description?: string;
}

export default function FAQ({ faqs, label, heading, description }: FAQProps) {
  const t = useTranslations("sections.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const resolvedFaqs: FaqData[] =
    faqs ??
    (["q1", "q2", "q3", "q4", "q5", "q6", "q7"] as const).map((k) => ({
      question: t(`default.${k}`),
      answer: t(`default.a${k.slice(1)}`),
    }));
  const resolvedLabel = label ?? t("defaultLabel");
  const resolvedHeading: ReactNode = heading ?? t("defaultHeading");
  const resolvedDescription = description ?? t("defaultDescription");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: resolvedFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section data-anim-section className="bg-[#f5ebdd] py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-[1280px] mx-auto px-5 xl:px-0 w-full grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-16 items-start">
        {/* Left: heading */}
        <div data-anim-item className="flex flex-col gap-6 lg:sticky lg:top-28">
          <div className="flex items-center gap-2">
            <div className="relative shrink-0 w-[19px] h-[19px]">
              <Image src="/figma-assets/icon-train.svg" alt="" fill className="object-contain" aria-hidden="true" />
            </div>
            <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#54206d] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
              {resolvedLabel}
            </p>
          </div>
          <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[32px] sm:text-[40px] md:text-[48px] text-[#181d27] leading-[1.2] tracking-[-1.5px] sm:tracking-[-2.5px] md:tracking-[-3.36px] [text-wrap:balance] break-words">
            {resolvedHeading}
          </h2>
          <p className="font-['Manrope',sans-serif] text-[#535862] text-[16px] leading-[1.2] tracking-[-0.48px]">
            {resolvedDescription}
          </p>
          <TransitionLink
            href="/book"
            className="btn-animate-chars btn-primary inline-flex items-center gap-2 h-[45px] px-[22px] bg-[#54206d] rounded-[4px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] ring-1 ring-inset ring-[rgba(10,13,18,0.18)] text-white text-base font-medium font-['Manrope',sans-serif] tracking-[-0.64px] whitespace-nowrap w-fit"
          >
            <div className="btn-animate-chars__bg" />
            <span data-button-animate-chars="" className="btn-animate-chars__text">
              {t("button")}
            </span>
          </TransitionLink>
        </div>

        {/* Right: FAQ items */}
        <div data-anim-item className="flex flex-col divide-y divide-[rgba(0,0,0,0.1)]">
          {resolvedFaqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
