import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildPageMetadata } from '@/lib/page-metadata'
import FAQsHero from '@/components/sections/FAQsHero'
import FAQsSection from '@/components/sections/FAQsSection'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.faqs' })
  return buildPageMetadata(locale, t('title'), t('description'), '/faqs')
}

export default async function FAQsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: t('breadcrumb.home'), path: '/' },
          { name: t('breadcrumb.faqs'), path: '/faqs' },
        ]}
      />
      <main>
        <FAQsHero />
        <FAQsSection />
      </main>
    </>
  )
}
