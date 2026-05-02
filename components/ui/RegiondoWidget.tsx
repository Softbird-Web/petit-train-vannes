'use client'

import Script from 'next/script'
import { useState } from 'react'

// Regiondo exposes the booking UI as a custom HTML element.
// TypeScript doesn't know about unknown JSX elements by default — declare it.
// React 19 moved the JSX namespace inside React — the global JSX namespace no longer works.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'product-details-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { 'widget-id': string },
        HTMLElement
      >
    }
  }
}

const REGIONDO_SCRIPT_SRC = 'https://widgets.regiondo.net/product/v1/product-widget.min.js'

export default function RegiondoWidget({ widgetId }: { widgetId: string }) {
  const [scriptFailed, setScriptFailed] = useState(false)

  if (scriptFailed) {
    return (
      <div className="flex flex-col gap-3 p-8 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg text-center">
        <p className="font-['Bricolage_Grotesque',sans-serif] text-[20px] text-[#181d27] leading-[1.2] tracking-[-1px]">
          Réservation en ligne temporairement indisponible
        </p>
        <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.4] tracking-[-0.48px]">
          Contactez-nous directement pour réserver :
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-1">
          <a
            href="tel:+33297240629"
            className="font-['Manrope',sans-serif] font-medium text-[#54206d] text-base underline underline-offset-2"
          >
            +33 2 97 24 06 29
          </a>
          <span className="hidden sm:inline text-[#535862]">·</span>
          <a
            href="mailto:petittrain-lebayon@orange.fr"
            className="font-['Manrope',sans-serif] font-medium text-[#54206d] text-base underline underline-offset-2"
          >
            petittrain-lebayon@orange.fr
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <Script
        src={REGIONDO_SCRIPT_SRC}
        strategy="afterInteractive"
        onError={() => setScriptFailed(true)}
      />
      <div
        className="w-full min-h-[520px] bg-white rounded-lg overflow-hidden border border-[rgba(0,0,0,0.08)]"
        data-regiondo-container
      >
        <product-details-widget widget-id={widgetId} />
      </div>
    </>
  )
}
