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

const routeFaqs = [
  {
    question: 'Quel est le parcours du Petit Train de Vannes ?',
    answer:
      "Le Petit Train de Vannes part de la Place Gambetta et vous fait découvrir les remparts médiévaux, la vieille ville avec ses maisons à colombages, le port de Vannes et les jardins de la Garenne. Le circuit dure environ 40 minutes.",
  },
  {
    question: 'Quelle est la durée du circuit du Petit Train de Vannes ?',
    answer:
      "Le circuit dure environ 40 minutes. Ce parcours permet aux visiteurs de découvrir les principaux sites de Vannes à un rythme détendu, accompagnés d'un commentaire audio tout au long du trajet.",
  },
  {
    question: 'Où commence et se termine le parcours ?',
    answer:
      "Le parcours commence et se termine à la Place Gambetta, au cœur de Vannes, à deux pas des remparts médiévaux. C'est le seul point de départ et d'arrivée.",
  },
  {
    question: 'Le Petit Train fait-il des arrêts pendant le parcours ?',
    answer:
      "Le circuit est continu — il n'y a pas d'arrêts intermédiaires. Les visiteurs embarquent et débarquent uniquement à la Place Gambetta.",
  },
  {
    question: 'Verra-t-on les remparts médiévaux de Vannes pendant la visite ?',
    answer:
      "Oui. Le parcours longe les célèbres remparts médiévaux de Vannes, parmi les mieux conservés de Bretagne. Le commentaire audio explique l'histoire et l'architecture de ces fortifications tout au long du trajet.",
  },
  {
    question: 'Le parcours inclut-il la vieille ville et le port de Vannes ?',
    answer:
      "Oui. Le circuit traverse la vieille ville avec ses maisons à colombages du XVIIe siècle et longe le port de Vannes. Ces sites sont présentés via le commentaire audio dans le cadre de la visite guidée.",
  },
  {
    question: "Les jardins de la Garenne sont-ils inclus dans le parcours ?",
    answer:
      "Oui. Le circuit passe près des jardins de la Garenne, l'un des plus beaux jardins de Vannes, avec une vue remarquable sur les remparts et les lavoirs médiévaux.",
  },
  {
    question: "Le circuit est-il adapté aux personnes à mobilité réduite ?",
    answer:
      "Le Petit Train est accessible à tous. Il est particulièrement recommandé pour les personnes préférant éviter les longues marches tout en découvrant les sites historiques de Vannes.",
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
