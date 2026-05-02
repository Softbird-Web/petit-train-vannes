'use client'

import { useState, type ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import TransitionLink from '@/components/ui/TransitionLink'

type FaqEntry = {
  questionKey: string
  answerKey?: string
  richAnswer?: { preKey: string; href: string; linkKey: string; postKey: string }
}

const faqs: FaqEntry[] = [
  { questionKey: 'q1', answerKey: 'a1' },
  { questionKey: 'q2', answerKey: 'a2' },
  { questionKey: 'q3', answerKey: 'a3' },
  { questionKey: 'q4', answerKey: 'a4' },
  { questionKey: 'q5', answerKey: 'a5' },
  { questionKey: 'q6', answerKey: 'a6' },
  { questionKey: 'q7', answerKey: 'a7' },
  { questionKey: 'q8', answerKey: 'a8' },
  { questionKey: 'q9', richAnswer: { preKey: 'q9Pre', href: '/prices', linkKey: 'q9LinkText', postKey: 'q9Post' } },
  { questionKey: 'q10', answerKey: 'a10' },
  { questionKey: 'q11', answerKey: 'a11' },
  { questionKey: 'q12', answerKey: 'a12' },
  { questionKey: 'q13', answerKey: 'a13' },
  { questionKey: 'q14', richAnswer: { preKey: 'q14Pre', href: '/privatisation', linkKey: 'q14LinkText', postKey: 'q14Post' } },
]

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string
  answer: ReactNode
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="py-6 border-b border-[rgba(0,0,0,0.08)] last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <h3 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[20px] text-[#181d27] leading-[1.2] tracking-[-1.4px] m-0">
          {question}
        </h3>
        <span
          className="shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center rounded-full border border-[rgba(0,0,0,0.15)] text-[#54206d] transition-all duration-300"
          aria-hidden="true"
        >
          {open ? (
            <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
              <path d="M1 1H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </span>
      </button>

      <div className={`faq-answer-wrap ${open ? 'open' : ''} mt-1`}>
        <div className="faq-answer-inner">
          <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-6 tracking-[-0.48px] pt-3 pr-8">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQsSection() {
  const t = useTranslations('sections.faqsSection')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const renderAnswer = (faq: FaqEntry): ReactNode => {
    if (faq.answerKey) return t(faq.answerKey)
    if (faq.richAnswer) {
      return (
        <>
          {t(faq.richAnswer.preKey)}
          <TransitionLink href={faq.richAnswer.href} className="underline hover:text-[#54206d] transition-colors">
            {t(faq.richAnswer.linkKey)}
          </TransitionLink>
          {t(faq.richAnswer.postKey)}
        </>
      )
    }
    return null
  }

  const plainAnswer = (faq: FaqEntry): string => {
    if (faq.answerKey) return t(faq.answerKey)
    if (faq.richAnswer) {
      return `${t(faq.richAnswer.preKey)}${t(faq.richAnswer.linkKey)}${t(faq.richAnswer.postKey)}`
    }
    return ''
  }

  // FAQPage schema — fed to Google, ChatGPT, Perplexity, etc. for answer extraction
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: t(faq.questionKey),
      acceptedAnswer: {
        '@type': 'Answer',
        text: plainAnswer(faq),
      },
    })),
  }

  return (
    <section data-anim-section className="bg-[#f5ebdd] py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-[1280px] mx-auto px-5 xl:px-[32px]">
        {faqs.map((faq, index) => (
          <FaqItem
            key={faq.questionKey}
            question={t(faq.questionKey)}
            answer={renderAnswer(faq)}
            open={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  )
}
