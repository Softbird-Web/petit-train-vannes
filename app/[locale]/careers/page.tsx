import { getTranslations, setRequestLocale } from 'next-intl/server'
import CareersHero from '@/components/sections/CareersHero'
import CareersInfo from '@/components/sections/CareersInfo'
import Locations from '@/components/sections/Locations'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.careers' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/careers' },
  }
}

export default async function CareersPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: t('breadcrumb.home'), path: '/' },
          { name: t('breadcrumb.careers'), path: '/careers' },
        ]}
      />
      <main>
        <CareersHero />
        <CareersInfo />
        <Locations />
      </main>
    </>
  )
}
