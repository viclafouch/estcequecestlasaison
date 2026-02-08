import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { FAQ_ITEMS } from '@/constants/faq'
import { seo } from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

const FAQ_RICH_ANSWERS: Partial<Record<string, React.ReactNode>> = {
  presentation: (
    <>
      <strong>estcequecestlasaison.fr</strong> est un outil{' '}
      <strong>gratuit</strong> que j'ai créé pour vous aider à connaître la{' '}
      <strong>saisonnalité</strong> des fruits et légumes en{' '}
      <strong>France métropolitaine</strong>. Consultez le calendrier interactif
      mois par mois pour savoir quels produits sont de saison et faire de
      meilleurs choix alimentaires.
    </>
  ),
  sources: (
    <>
      Les données sont issues de <strong>sources officielles</strong> et
      reconnues&nbsp;: l'
      <a
        href="https://www.aprifel.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link"
      >
        APRIFEL
      </a>{' '}
      (Agence pour la recherche et l'information en fruits et légumes),{' '}
      <a
        href="https://www.lesfruitsetlegumesfrais.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link"
      >
        Interfel
      </a>{' '}
      (Interprofession des fruits et légumes frais), le{' '}
      <a
        href="https://agriculture.gouv.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link"
      >
        Ministère de l'Agriculture
      </a>{' '}
      et l'
      <a
        href="https://ciqual.anses.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link"
      >
        Anses via la table Ciqual
      </a>{' '}
      pour les données nutritionnelles.
    </>
  ),
  fiabilite: (
    <>
      Oui, les données sont <strong>croisées</strong> à partir de plusieurs{' '}
      <strong>sources officielles françaises</strong> pour garantir leur
      exactitude. Si vous constatez une erreur, n'hésitez pas à me le signaler
      via{' '}
      <a
        href="https://www.linkedin.com/in/victordelafouchardiere"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link"
      >
        LinkedIn
      </a>{' '}
      ou{' '}
      <a
        href="https://github.com/viclafouch/estcequecestlasaison"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link"
      >
        GitHub
      </a>
      .
    </>
  ),
  indicateurs: (
    <>
      <strong>Pleine saison</strong>&nbsp;: le produit est au{' '}
      <strong>pic de disponibilité</strong>, avec le meilleur goût et le
      meilleur prix. <strong>Début ou fin de saison</strong>&nbsp;: le produit
      est disponible mais pas à son pic, la qualité et le prix peuvent varier.{' '}
      <strong>Hors saison</strong>&nbsp;: le produit n'est pas disponible
      localement en France.
    </>
  ),
  pourquoi: (
    <>
      Manger de saison présente de <strong>nombreux avantages</strong>&nbsp;: un{' '}
      <strong>meilleur goût</strong> car les produits sont récoltés à maturité,
      une <strong>valeur nutritionnelle supérieure</strong>, des{' '}
      <strong>prix plus avantageux</strong> grâce à l'abondance de l'offre, et
      un <strong>impact environnemental réduit</strong> avec moins de transport
      et de stockage.
    </>
  ),
  createur: (
    <>
      <strong>estcequecestlasaison.fr</strong> est un projet créé par{' '}
      <strong>Victor de la Fouchardière</strong>, développeur web passionné par
      l'alimentation de saison. Retrouvez-moi sur{' '}
      <a
        href="https://www.linkedin.com/in/victordelafouchardiere"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link"
      >
        LinkedIn
      </a>
      .
    </>
  ),
  'open-source': (
    <>
      Oui, le <strong>code source</strong> du site est entièrement disponible
      sur{' '}
      <a
        href="https://github.com/viclafouch/estcequecestlasaison"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link"
      >
        GitHub
      </a>
      . Vous pouvez consulter, utiliser et contribuer au projet librement.
    </>
  ),
  contribuer: (
    <>
      Vous pouvez contribuer au projet via{' '}
      <a
        href="https://github.com/viclafouch/estcequecestlasaison"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link"
      >
        GitHub
      </a>{' '}
      en ouvrant des <strong>issues</strong> pour signaler des erreurs ou en
      proposant des <strong>améliorations</strong> via des{' '}
      <strong>pull requests</strong>. Toute contribution est la bienvenue&nbsp;!
    </>
  ),
  contact: (
    <>
      Vous pouvez me contacter via{' '}
      <a
        href="https://www.linkedin.com/in/victordelafouchardiere"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link"
      >
        LinkedIn
      </a>
      . Pour les questions techniques ou les suggestions, préférez{' '}
      <a
        href="https://github.com/viclafouch/estcequecestlasaison"
        target="_blank"
        rel="noopener noreferrer"
        className="text-link"
      >
        GitHub
      </a>
      .
    </>
  ),
  'application-mobile': (
    <>
      Oui, une <strong>application mobile</strong> pour{' '}
      <strong>iOS et Android</strong> est en cours de développement. Elle sera{' '}
      <strong>100&nbsp;% gratuite</strong>, sans publicité, et fonctionnera
      entièrement <strong>hors-ligne</strong> pour consulter la saisonnalité des
      fruits et légumes où que vous soyez.
    </>
  )
}

type FaqAccordionItemParams = {
  id: string
  question: string
  children: React.ReactNode
  isExpanded: boolean
  onToggle: () => void
}

const FaqAccordionItem = ({
  id,
  question,
  children,
  isExpanded,
  onToggle
}: FaqAccordionItemParams) => {
  return (
    <div
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
      className="border-b border-gray-200"
    >
      <h2>
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={`faq-panel-${id}`}
          id={`faq-heading-${id}`}
          data-expanded={isExpanded || undefined}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
          onClick={onToggle}
        >
          <span
            itemProp="name"
            className="text-base font-semibold text-gray-900"
          >
            {question}
          </span>
          <ChevronDown
            className="faq-chevron size-5 shrink-0 text-gray-500 transition-transform duration-200 data-expanded:rotate-180"
            data-expanded={isExpanded || undefined}
            aria-hidden="true"
          />
        </button>
      </h2>
      <div
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={`faq-heading-${id}`}
        data-expanded={isExpanded || undefined}
        className="faq-panel grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 data-expanded:grid-rows-[1fr]"
      >
        <div className="overflow-hidden">
          <p
            itemProp="text"
            className="pb-5 text-sm leading-relaxed text-gray-700"
          >
            {children}
          </p>
        </div>
      </div>
    </div>
  )
}

const FaqPage = () => {
  const [expandedId, setExpandedId] = React.useState<string | null>(null)

  const handleToggle = (id: string) => {
    setExpandedId((prev) => {
      return prev === id ? null : id
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <main
        id="main-content"
        itemScope
        itemType="https://schema.org/FAQPage"
        className="mx-auto max-w-3xl px-6 pt-12 pb-24 md:pt-16 md:pb-20"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Questions fréquentes
          </h1>
          <p className="text-base text-gray-600">
            Retrouvez les réponses à vos questions sur le site, les données et
            le projet.
          </p>
        </div>
        <div className="mt-8 divide-y divide-gray-200 border-t border-gray-200">
          {FAQ_ITEMS.map((item) => {
            return (
              <FaqAccordionItem
                key={item.id}
                id={item.id}
                question={item.question}
                isExpanded={expandedId === item.id}
                onToggle={() => {
                  handleToggle(item.id)
                }}
              >
                {FAQ_RICH_ANSWERS[item.id] ?? item.answer}
              </FaqAccordionItem>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/faq')({
  head: () => {
    return seo({
      title: 'Questions fréquentes',
      description:
        'Retrouvez les réponses à vos questions sur estcequecestlasaison.fr\u00a0: sources des données, saisonnalité, contact et plus encore.',
      keywords:
        'faq, questions fréquentes, saisonnalité, fruits et légumes de saison, sources données',
      pathname: '/faq'
    })
  },
  component: FaqPage
})
