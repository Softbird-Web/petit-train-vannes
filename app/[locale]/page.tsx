import { setRequestLocale, getTranslations } from 'next-intl/server'
import Hero from '@/components/sections/Hero'
import BookingSection from '@/components/sections/BookingSection'
import Gallery from '@/components/sections/Gallery'
import GroupBookingCTA from '@/components/sections/GroupBookingCTA'
import Features from '@/components/sections/Features'
import PracticalInfo from '@/components/sections/PracticalInfo'
import Prices from '@/components/sections/Prices'
import Reviews from '@/components/sections/Reviews'
import FAQ from '@/components/sections/FAQ'
import OurLocation from '@/components/sections/OurLocation'
import RoutesTimeline from '@/components/sections/RoutesTimeline'
import Locations from '@/components/sections/Locations'

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.home' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main>
      <Hero rightVideoSrc="/figma-assets/carnac-hero.mp4" backgroundVariant="gradient-to-white" />
      <BookingSection />
      <Gallery />
      <Features />
      <PracticalInfo />
      <Prices />
      <OurLocation />
      <RoutesTimeline />
      <Reviews />
      <GroupBookingCTA />
      <Locations />
      <FAQ />
    </main>
  )
}
