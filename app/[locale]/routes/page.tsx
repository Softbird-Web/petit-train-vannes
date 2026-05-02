import { getTranslations, setRequestLocale } from 'next-intl/server'
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
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/routes' },
  }
}

// Route-specific FAQ data — kept French for now (Phase 3 translation backlog).
const routeFaqs = [
  {
    question: 'Quel est le parcours du Petit Train de Carnac ?',
    answer:
      "Le parcours du Petit Train de Carnac est une visite guidée qui débute et se termine au parking du Ménec. Pendant le trajet, le train passe près des menhirs de Carnac, de Carnac-Plage et du port de La Trinité-sur-Mer, offrant un aperçu complet de la région.",
  },
  {
    question: 'Quelle est la durée du parcours du Petit Train de Carnac ?',
    answer:
      "Le parcours complet dure environ 55 minutes. Cette durée permet aux visiteurs de découvrir les principaux sites de Carnac à un rythme tranquille, accompagnés d'un commentaire audio tout au long du trajet.",
  },
  {
    question: 'Où commence et se termine le parcours ?',
    answer:
      "Le parcours commence et se termine au parking du Ménec à Carnac, situé en face de la Maison des Mégalithes. C'est le principal point de départ et d'arrivée pour les visiteurs individuels.",
  },
  {
    question: 'Le Petit Train fait-il des arrêts pendant le parcours ?',
    answer:
      'Le Petit Train dessert plusieurs sites le long du parcours, notamment Carnac-Plage et le port de La Trinité-sur-Mer. Ces étapes font partie de la visite. Les visiteurs individuels embarquent et débarquent au point de départ du Ménec.',
  },
  {
    question: 'Verra-t-on les menhirs de Carnac pendant la visite ?',
    answer:
      "Oui. Le parcours passe près des plus célèbres alignements de menhirs de Carnac, notamment ceux du Ménec, de Kermario et de Kerlescan. Le commentaire audio explique l'histoire et la signification de ces monuments préhistoriques tout au long du trajet.",
  },
  {
    question: 'Le parcours inclut-il le tumulus Saint-Michel et les dolmens ?',
    answer:
      'Oui. Le parcours met en valeur le tumulus Saint-Michel et les dolmens environnants. Ces sites sont présentés via le commentaire audio dans le cadre de la visite guidée.',
  },
  {
    question: 'Que verra-t-on à Carnac-Plage pendant le parcours ?',
    answer:
      "Pendant le parcours, le Petit Train traverse Carnac-Plage, permettant aux visiteurs de profiter de la vue sur les plages de sable blanc et l'ambiance balnéaire. Cette partie de la visite offre un contraste saisissant entre patrimoine préhistorique et paysages côtiers.",
  },
  {
    question: "Le parcours va-t-il jusqu'à La Trinité-sur-Mer ?",
    answer:
      "Oui. Le parcours inclut le port de La Trinité-sur-Mer, destination réputée pour la voile. Les visiteurs peuvent observer la marina, les bateaux et la zone portuaire, accompagnés d'un commentaire sur la ville et son histoire maritime.",
  },
]

export default async function RoutesPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale })

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
              <em className="font-['Bricolage_Grotesque',sans-serif] italic text-[#54206d] not-italic">
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
          imageSrc="/figma-assets/RoutesHero.jpg"
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
              <em className="text-[#4d1c64]">{t('pages.routes.faqHeadingHighlight')}</em>
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
