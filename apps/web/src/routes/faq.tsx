import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { FAQ_ITEMS } from '@/constants/faq'
import { seo } from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

const EXTERNAL_LINK_CLASS =
  'font-medium text-gray-900 underline underline-offset-2 hover:text-primary-600'

type ExternalLinkParams = {
  href: string
  children: React.ReactNode
}

const ExternalLink = ({ href, children }: ExternalLinkParams) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={EXTERNAL_LINK_CLASS}
    >
      {children}
    </a>
  )
}

const FAQ_RICH_ANSWERS: Partial<Record<string, React.ReactNode>> = {
  presentation: (
    <>
      <strong>estcequecestlasaison.fr</strong> est un outil{' '}
      <strong>gratuit</strong> que j&apos;ai cr&eacute;&eacute; pour vous aider
      &agrave; conna&icirc;tre la <strong>saisonnalit&eacute;</strong> des
      fruits et l&eacute;gumes en <strong>France m&eacute;tropolitaine</strong>.
      Consultez le calendrier interactif mois par mois pour savoir quels
      produits sont de saison et faire de meilleurs choix alimentaires.
    </>
  ),
  sources: (
    <>
      Les donn&eacute;es sont issues de <strong>sources officielles</strong> et
      reconnues&nbsp;: l&apos;
      <ExternalLink href="https://www.aprifel.com">APRIFEL</ExternalLink>{' '}
      (Agence pour la recherche et l&apos;information en fruits et
      l&eacute;gumes),{' '}
      <ExternalLink href="https://www.lesfruitsetlegumesfrais.com">
        Interfel
      </ExternalLink>{' '}
      (Interprofession des fruits et l&eacute;gumes frais), le{' '}
      <ExternalLink href="https://agriculture.gouv.fr">
        Minist&egrave;re de l&apos;Agriculture
      </ExternalLink>{' '}
      et l&apos;
      <ExternalLink href="https://ciqual.anses.fr">
        Anses via la table Ciqual
      </ExternalLink>{' '}
      pour les donn&eacute;es nutritionnelles.
    </>
  ),
  fiabilite: (
    <>
      Oui, les donn&eacute;es sont <strong>crois&eacute;es</strong> &agrave;
      partir de plusieurs <strong>sources officielles fran&ccedil;aises</strong>{' '}
      pour garantir leur exactitude. Si vous constatez une erreur,
      n&apos;h&eacute;sitez pas &agrave; me le signaler via{' '}
      <ExternalLink href="https://www.linkedin.com/in/victordelafouchardiere">
        LinkedIn
      </ExternalLink>{' '}
      ou{' '}
      <ExternalLink href="https://github.com/viclafouch/estcequecestlasaison">
        GitHub
      </ExternalLink>
      .
    </>
  ),
  indicateurs: (
    <>
      <strong>Pleine saison</strong>&nbsp;: le produit est au{' '}
      <strong>pic de disponibilit&eacute;</strong>, avec le meilleur go&ucirc;t
      et le meilleur prix. <strong>D&eacute;but ou fin de saison</strong>
      &nbsp;: le produit est disponible mais pas &agrave; son pic, la
      qualit&eacute; et le prix peuvent varier. <strong>Hors saison</strong>
      &nbsp;: le produit n&apos;est pas disponible localement en France.
    </>
  ),
  pourquoi: (
    <>
      Manger de saison pr&eacute;sente de <strong>nombreux avantages</strong>
      &nbsp;: un <strong>meilleur go&ucirc;t</strong> car les produits sont
      r&eacute;colt&eacute;s &agrave; maturit&eacute;, une{' '}
      <strong>valeur nutritionnelle sup&eacute;rieure</strong>, des{' '}
      <strong>prix plus avantageux</strong> gr&acirc;ce &agrave;
      l&apos;abondance de l&apos;offre, et un{' '}
      <strong>impact environnemental r&eacute;duit</strong> avec moins de
      transport et de stockage.
    </>
  ),
  createur: (
    <>
      <strong>estcequecestlasaison.fr</strong> est un projet cr&eacute;&eacute;
      par <strong>Victor de la Fouchardi&egrave;re</strong>, d&eacute;veloppeur
      web passionn&eacute; par l&apos;alimentation de saison. Retrouvez-moi sur{' '}
      <ExternalLink href="https://www.linkedin.com/in/victordelafouchardiere">
        LinkedIn
      </ExternalLink>
      .
    </>
  ),
  'open-source': (
    <>
      Oui, le <strong>code source</strong> du site est enti&egrave;rement
      disponible sur{' '}
      <ExternalLink href="https://github.com/viclafouch/estcequecestlasaison">
        GitHub
      </ExternalLink>
      . Vous pouvez consulter, utiliser et contribuer au projet librement.
    </>
  ),
  contribuer: (
    <>
      Vous pouvez contribuer au projet via{' '}
      <ExternalLink href="https://github.com/viclafouch/estcequecestlasaison">
        GitHub
      </ExternalLink>{' '}
      en ouvrant des <strong>issues</strong> pour signaler des erreurs ou en
      proposant des am&eacute;liorations via des <strong>pull requests</strong>.
      Toute contribution est la bienvenue&nbsp;!
    </>
  ),
  contact: (
    <>
      Vous pouvez me contacter via{' '}
      <ExternalLink href="https://www.linkedin.com/in/victordelafouchardiere">
        LinkedIn
      </ExternalLink>
      . Pour les questions techniques ou les suggestions, pr&eacute;f&eacute;rez{' '}
      <ExternalLink href="https://github.com/viclafouch/estcequecestlasaison">
        GitHub
      </ExternalLink>
      .
    </>
  ),
  'application-mobile': (
    <>
      Oui, une <strong>application mobile</strong> pour{' '}
      <strong>iOS et Android</strong> est en cours de d&eacute;veloppement. Elle
      sera <strong>100&nbsp;% gratuite</strong>, sans publicit&eacute;, et
      fonctionnera enti&egrave;rement <strong>hors-ligne</strong> pour consulter
      la saisonnalit&eacute; des fruits et l&eacute;gumes o&ugrave; que vous
      soyez.
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
            Questions fr&eacute;quentes
          </h1>
          <p className="text-base text-gray-600">
            Retrouvez les r&eacute;ponses &agrave; vos questions sur le site,
            les donn&eacute;es et le projet.
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
      title: 'Questions fr\u00e9quentes',
      description:
        'Retrouvez les r\u00e9ponses \u00e0 vos questions sur estcequecestlasaison.fr\u00a0: sources des donn\u00e9es, saisonnalit\u00e9, contact et plus encore.',
      keywords:
        'faq, questions fr\u00e9quentes, saisonnalit\u00e9, fruits et l\u00e9gumes de saison, sources donn\u00e9es',
      pathname: '/faq'
    })
  },
  component: FaqPage
})
