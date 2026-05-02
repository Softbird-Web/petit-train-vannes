import { getTranslations, setRequestLocale } from 'next-intl/server'
import BookingSection from '@/components/sections/BookingSection'
import BeforeYouBook from '@/components/sections/BeforeYouBook'
import Features from '@/components/sections/Features'
import PracticalInfo from '@/components/sections/PracticalInfo'
import GroupBookingCTA from '@/components/sections/GroupBookingCTA'
import Locations from '@/components/sections/Locations'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.book' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/book' },
  }
}

export default async function BookPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: t('breadcrumb.home'), path: '/' },
          { name: t('breadcrumb.book'), path: '/book' },
        ]}
      />
      <main>
        <BookingSection />
        <BeforeYouBook />
        <Features />
        <PracticalInfo />
        <GroupBookingCTA />
        <Locations />
      </main>
    </>
  )
}
