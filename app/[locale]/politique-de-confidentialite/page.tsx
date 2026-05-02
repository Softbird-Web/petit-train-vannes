export const metadata = {
  title: 'Politique de Confidentialité',
  description:
    'Politique de confidentialité du Petit Train de Carnac. Informations sur la collecte et le traitement des données personnelles, cookies et droits des utilisateurs.',
  alternates: { canonical: '/politique-de-confidentialite' },
}

export default function PolitiqueDeConfidentialitePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#54206d] py-16 xl:py-24 px-5 xl:px-[64px]">
        <div className="max-w-[1312px] mx-auto">
          <h1 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[40px] sm:text-[52px] xl:text-[64px] text-[#f5ebdd] leading-[1.2] tracking-[-3.36px]">
            Politique de Confidentialité
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#f5ebdd] py-16 xl:py-24 px-5 xl:px-[64px]">
        <div className="max-w-[800px] mx-auto flex flex-col gap-10">

          {/* Intro */}
          <div className="flex flex-col gap-4">
            <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[24px] text-[#181d27] tracking-[-1px] leading-[1.3]">
              Données personnelles
            </h2>
            <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.7] tracking-[-0.3px]">
              Nous nous engageons à ce que la collecte et le traitement de vos données, effectués à
              partir du site{' '}
              <span className="text-[#181d27] font-medium">petit-train-carnac.vercel.app</span>,
              soient conformes au règlement général sur la protection des données (RGPD) et à la loi
              Informatique et Libertés.
            </p>
            <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.7] tracking-[-0.3px]">
              La présente Politique vous informe sur la façon dont Le Petit Train de Carnac, ses
              sous-traitants et ses éventuels partenaires traitent vos données personnelles.
            </p>
            <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.7] tracking-[-0.3px]">
              Cette Politique est notamment applicable aux clients et utilisateurs des offres et
              services Le Petit Train de Carnac. Elle est susceptible d&apos;être complétée par des
              informations spécifiques portées à la connaissance de l&apos;utilisateur,
              s&apos;agissant d&apos;une offre ou d&apos;un service particulier.
            </p>
          </div>

          <div className="border-t border-[rgba(77,28,100,0.12)]" />

          {/* Cookies section */}
          <div className="flex flex-col gap-4">
            <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[24px] text-[#181d27] tracking-[-1px] leading-[1.3]">
              Cookies
            </h2>
            <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.7] tracking-[-0.3px]">
              Un cookie est un petit fichier informatique, un traceur, déposé et lu par exemple lors
              de la consultation d&apos;un site internet. L&apos;utilisation de ces outils est
              soumise à votre consentement dès lors qu&apos;ils ne sont pas strictement nécessaires
              au fonctionnement du site concerné.
            </p>
            <h3 className="font-['Manrope',sans-serif] font-semibold text-[#181d27] text-base tracking-[-0.3px]">
              Quels cookies utilisons-nous ?
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full font-['Manrope',sans-serif] text-sm text-[#535862] border-collapse">
                <thead>
                  <tr className="border-b border-[rgba(77,28,100,0.12)]">
                    <th className="text-left py-2 pr-4 text-[#181d27] font-semibold whitespace-nowrap">Nom</th>
                    <th className="text-left py-2 pr-4 text-[#181d27] font-semibold whitespace-nowrap">Type</th>
                    <th className="text-left py-2 pr-4 text-[#181d27] font-semibold whitespace-nowrap">Durée</th>
                    <th className="text-left py-2 text-[#181d27] font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'tarteaucitron', type: 'Statistiques', duration: '1 an', desc: 'Stocke l\'autorisation d\'utilisation de chacun des services tiers.' },
                    { name: '_gat_gtag', type: 'Statistiques', duration: '1 minute', desc: 'Utilisé par Google Analytics pour mesurer l\'audience.' },
                    { name: '_gid', type: 'Statistiques', duration: '1 jour', desc: 'Utilisé par Google Analytics pour mesurer l\'audience.' },
                    { name: '_ga', type: 'Statistiques', duration: '2 ans', desc: 'Utilisé par Google Analytics pour mesurer l\'audience.' },
                  ].map((cookie) => (
                    <tr key={cookie.name} className="border-b border-[rgba(77,28,100,0.08)]">
                      <td className="py-2.5 pr-4 font-mono text-xs text-[#54206d] whitespace-nowrap">{cookie.name}</td>
                      <td className="py-2.5 pr-4 whitespace-nowrap">{cookie.type}</td>
                      <td className="py-2.5 pr-4 whitespace-nowrap">{cookie.duration}</td>
                      <td className="py-2.5 leading-[1.5]">{cookie.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-[rgba(77,28,100,0.12)]" />

          {/* Rights section */}
          <PrivacySection title="Formulaire et Téléservice">
            Chaque formulaire limite la collecte des données personnelles au strict nécessaire
            (minimisation des données) et indique notamment : les objectifs du recueil de ces
            données ; si ces données sont obligatoires ou facultatives ; qui pourra en prendre
            connaissance ; vos droits en matière de protection des données personnelles.
          </PrivacySection>

          <PrivacySection title="Quels sont vos droits">
            Chaque individu dispose d&apos;un droit d&apos;accès, de rectification et de suppression
            des données qui le concerne. Il peut demander la portabilité de ces dernières. Il a
            également le droit de s&apos;opposer aux traitements réalisés ou d&apos;en demander la
            limitation. Il peut émettre des directives sur la conservation, la suppression ou la
            communication de ses données personnelles après son décès. Règle spécifique au
            démarchage téléphonique : tout consommateur peut s&apos;inscrire sur la liste Bloctel sur{' '}
            <a
              href="https://www.bloctel.gouv.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#54206d] underline"
            >
              www.bloctel.gouv.fr
            </a>
          </PrivacySection>

          <PrivacySection title="Comment exercer vos droits">
            Pour toute information ou exercice de vos droits, vous pouvez contacter le Délégué à la
            Protection des Données de Le Petit Train de Carnac par courrier signé accompagné
            d&apos;une copie d&apos;un titre d&apos;identité. Si vous n&apos;obtenez pas de retour
            adéquat, vous pouvez introduire une réclamation auprès de la CNIL (
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#54206d] underline"
            >
              www.cnil.fr
            </a>
            ).
          </PrivacySection>

          <div className="flex flex-col gap-3">
            <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[20px] text-[#181d27] tracking-[-0.8px] leading-[1.3]">
              Finalités de traitement
            </h2>
            <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.7] tracking-[-0.3px]">
              Le Petit Train de Carnac ne traite les données personnelles que pour des finalités
              déterminées, explicites et légitimes :
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1 font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.7] tracking-[-0.3px]">
              <li>Traitement des données du formulaire de contact</li>
              <li>Connaissance client et statistiques d&apos;audience du site</li>
              <li>Envoi de messages par email (si consentement donné)</li>
            </ul>
            <div className="border-t border-[rgba(77,28,100,0.12)] mt-1" />
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[20px] text-[#181d27] tracking-[-0.8px] leading-[1.3]">
              Quelles données sont traitées
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-1 font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.7] tracking-[-0.3px]">
              <li>Données d&apos;identité : Prénom, nom</li>
              <li>Données de contact : Email, adresse postale, numéro de téléphone</li>
              <li>Données de localisation</li>
            </ul>
            <div className="border-t border-[rgba(77,28,100,0.12)] mt-1" />
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[20px] text-[#181d27] tracking-[-0.8px] leading-[1.3]">
              Sous-traitants
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full font-['Manrope',sans-serif] text-sm text-[#535862] border-collapse">
                <thead>
                  <tr className="border-b border-[rgba(77,28,100,0.12)]">
                    <th className="text-left py-2 pr-4 text-[#181d27] font-semibold">Nom</th>
                    <th className="text-left py-2 pr-4 text-[#181d27] font-semibold">Usage</th>
                    <th className="text-left py-2 text-[#181d27] font-semibold">Hors UE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[rgba(77,28,100,0.08)]">
                    <td className="py-2.5 pr-4 font-medium text-[#181d27]">OVH</td>
                    <td className="py-2.5 pr-4">Hébergement du site</td>
                    <td className="py-2.5">Non</td>
                  </tr>
                  <tr className="border-b border-[rgba(77,28,100,0.08)]">
                    <td className="py-2.5 pr-4 font-medium text-[#181d27]">Google Analytics</td>
                    <td className="py-2.5 pr-4">Outils statistiques</td>
                    <td className="py-2.5">Non</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="border-t border-[rgba(77,28,100,0.12)] mt-1" />
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[20px] text-[#181d27] tracking-[-0.8px] leading-[1.3]">
              Durée de conservation
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-1 font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.7] tracking-[-0.3px]">
              <li>Données du formulaire de contact : 3 ans</li>
              <li>Saisine du responsable de traitement : 3 ans</li>
            </ul>
          </div>

        </div>
      </section>
    </main>
  )
}

function PrivacySection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[20px] text-[#181d27] tracking-[-0.8px] leading-[1.3]">
        {title}
      </h2>
      <p className="font-['Manrope',sans-serif] text-[#535862] text-base leading-[1.7] tracking-[-0.3px]">
        {children}
      </p>
      <div className="border-t border-[rgba(77,28,100,0.12)]" />
    </div>
  )
}
