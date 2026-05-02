import { getTranslations, setRequestLocale } from 'next-intl/server'
import PrivatisationHero from '@/components/sections/PrivatisationHero'
import Locations from '@/components/sections/Locations'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.privatisation' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/privatisation' },
  }
}

export default async function PrivatisationPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: t('breadcrumb.home'), path: '/' },
          { name: t('breadcrumb.privatisation'), path: '/privatisation' },
        ]}
      />
      <main>
        <PrivatisationHero />
        <Locations />
      </main>
    </>
  )
}
