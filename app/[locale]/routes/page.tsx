import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildPageMetadata } from '@/lib/page-metadata'
import RoutesHero from '@/components/sections/RoutesHero'
import Gallery from '@/components/sections/Gallery'
import RoutesTimeline from '@/components/sections/RoutesTimeline'
import FAQ from '@/components/sections/FAQ'
import Locations from '@/components/sections/Locations'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.routes' })
  return buildPageMetadata(locale, t('title'), t('description'), '/routes')
}

export default async function RoutesPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })

  const routeFaqs = [
    { question: t('pages.routes.faqQ1'), answer: t('pages.routes.faqA1') },
    { question: t('pages.routes.faqQ2'), answer: t('pages.routes.faqA2') },
    { question: t('pages.routes.faqQ3'), answer: t('pages.routes.faqA3') },
    { question: t('pages.routes.faqQ4'), answer: t('pages.routes.faqA4') },
    { question: t('pages.routes.faqQ5'), answer: t('pages.routes.faqA5') },
    { question: t('pages.routes.faqQ6'), answer: t('pages.routes.faqA6') },
    { question: t('pages.routes.faqQ7'), answer: t('pages.routes.faqA7') },
    { question: t('pages.routes.faqQ8'), answer: t('pages.routes.faqA8') },
  ]

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: t('breadcrumb.home'), path: '/' },
          { name: t('breadcrumb.routes'), path: '/routes' },
        ]}
      />
      <main>
        <RoutesHero
          headingLevel="h1"
          label={t('pages.routes.heroLabel')}
          heading={
            <>
              {t('pages.routes.heroHeadingPrefix')}{' '}
              <em className="font-['Bricolage_Grotesque',sans-serif] italic text-[#f7a427] not-italic">
                {t('pages.routes.heroHeadingHighlight')}
              </em>
            </>
          }
          description={
            <>
              <p>{t('pages.routes.heroDescriptionP1')}</p>
              <p>{t('pages.routes.heroDescriptionP2')}</p>
            </>
          }
          imageSrc="/figma-assets/vannes-routes.jpg"
          imageAlt={t('pages.routes.heroImageAlt')}
          lightbox
        />

        <Gallery />
        <RoutesTimeline />

        <FAQ
          label={t('pages.routes.faqLabel')}
          heading={
            <>
              {t('pages.routes.faqHeadingPrefix')}{' '}
              <em className="text-[#1c1b29]">{t('pages.routes.faqHeadingHighlight')}</em>
            </>
          }
          description={t('pages.routes.faqDescription')}
          faqs={routeFaqs}
        />

        <Locations />
      </main>
    </>
  )
}
