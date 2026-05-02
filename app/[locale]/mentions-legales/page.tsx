export const metadata = {
  title: 'Mentions Légales',
  description:
    'Mentions légales du site Petit Train de Carnac. Informations sur l\'hébergeur, l\'éditeur, la propriété intellectuelle et le droit applicable.',
  alternates: { canonical: '/mentions-legales' },
}

export default function MentionsLegalesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#54206d] py-16 xl:py-24 px-5 xl:px-[64px]">
        <div className="max-w-[1312px] mx-auto">
          <h1 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[40px] sm:text-[52px] xl:text-[64px] text-[#f5ebdd] leading-[1.2] tracking-[-3.36px]">
            Mentions Légales
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#f5ebdd] py-16 xl:py-24 px-5 xl:px-[64px]">
        <div className="max-w-[800px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.7] tracking-[-0.3px]">
              Nous vous remercions de votre visite sur notre site. Veuillez lire attentivement ces
              Conditions générales d&apos;utilisation, car en accédant à ce site, vous acceptez, sans
              limitation ni réserve, les dispositions légales en vigueur et les conditions
              ci-après détaillées.
            </p>
            <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.7] tracking-[-0.3px]">
              <strong className="text-[#181d27]">Directeur de la publication :</strong> Nom
            </p>
            <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.7] tracking-[-0.3px]">
              Ce site est hébergé par OVH :{' '}
              <a
                href="https://www.ovh.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#54206d] underline"
              >
                www.ovh.com
              </a>
            </p>
            <div className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.7] tracking-[-0.3px]">
              <p>Le site a été créé par :</p>
              <p>
                <strong className="text-[#181d27]">Heureuses – Agence web</strong>
              </p>
              <p>4 allée Joseph Loth</p>
              <p>56000 VANNES</p>
              <p>
                <a
                  href="https://www.heureuses.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#54206d] underline"
                >
                  www.heureuses.fr
                </a>
              </p>
              <p>02 57 62 05 60</p>
              <p>N°SIRET 82281789600019</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[rgba(77,28,100,0.12)]" />

          <LegalSection number="1" title="INFORMATIONS FIGURANT SUR LE SITE">
            Le propriétaire du site fournit des informations à des fins purement informatives. Il
            s&apos;efforce de contrôler leur exactitude et de les maintenir à jour. Mais aucune
            garantie n&apos;est apportée concernant l&apos;exactitude, la précision, la mise à jour
            ou l&apos;exhaustivité de ces informations. Par conséquent et à l&apos;exception
            d&apos;une faute lourde et intentionnelle, le propriétaire du site décline toute
            responsabilité pour tout dommage résultant notamment d&apos;une imprécision ou
            inexactitude des informations disponibles sur ce site, ou pour toute atteinte résultant
            d&apos;une intrusion frauduleuse d&apos;un tiers sur ce site, ou encore pour tout
            dommage ou virus qui pourrait endommager ou rendre inutilisable votre équipement
            informatique suite à la visite de ce site. Le propriétaire du site ne pourra être tenu
            responsable en cas d&apos;indisponibilité du site pour quelque cause que ce soit.
          </LegalSection>

          <LegalSection number="2" title="LIENS VERS D'AUTRES SITES">
            Afin de faciliter l&apos;accès à d&apos;autres sites, le propriétaire du site a inséré
            un certain nombre de liens vers des sites tiers. Cependant, il n&apos;est pas
            responsable de l&apos;indisponibilité des sites tiers, de leur contenu, publicité ou
            autres éléments disponibles sur ces sites. La responsabilité du propriétaire de ce site
            ne saurait donc être engagée au titre d&apos;un site tiers auquel vous auriez pu avoir
            accès. Des sites externes peuvent contenir des liens hypertextes pointant vers ce site.
            Un tel lien ne pourra être installé sans un accord préalable et écrit du propriétaire de
            ce site.
          </LegalSection>

          <LegalSection number="3" title="COOKIES">
            Ce site utilise des cookies qui sont des fichiers stockés sur votre ordinateur
            permettant une facilité d&apos;accès aux services proposés. En aucun cas, les cookies de
            ce site ne pourront servir à collecter des données personnelles sans votre accord
            exprès. Pour connaitre la nature des cookies installés sur ce site, merci de consulter
            la « Politique sur les cookies ». Vous y trouverez les informations nécessaires pour
            vous opposer à l&apos;enregistrement de ces cookies en configurant votre navigateur.
            Pour plus d&apos;informations sur les cookies, merci de consulter le site{' '}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#54206d] underline"
            >
              www.cnil.fr
            </a>
          </LegalSection>

          <LegalSection number="4" title="PROPRIÉTÉ INTELLECTUELLE">
            L&apos;accès à ce site vous confère un droit d&apos;usage privé et non exclusif de ce
            site. L&apos;ensemble des éléments édités sur ce site, incluant notamment les textes,
            logos, … constituent des œuvres de l&apos;esprit au sens du Code de la Propriété
            Intellectuelle. Par conséquent, toute utilisation sous forme de représentation,
            modification, reproduction, … intégrale ou partielle, qui pourrait être faite sans le
            consentement de leurs auteurs ou de leurs ayants-droit, est illicite. Ce site respecte
            les droits d&apos;auteur. Tous les droits des auteurs des œuvres protégées reproduites
            et communiquées sur ce site, sont réservés.
          </LegalSection>

          <LegalSection number="5" title="DROIT APPLICABLE">
            Le droit français est applicable sur ce site.
          </LegalSection>
        </div>
      </section>
    </main>
  )
}

function LegalSection({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[20px] text-[#181d27] tracking-[-0.8px] leading-[1.3]">
        {number} – {title}
      </h2>
      <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.7] tracking-[-0.3px]">
        {children}
      </p>
      <div className="border-t border-[rgba(77,28,100,0.12)]" />
    </div>
  )
}
