import { SiteHeader } from '@/components/site-header'
import { seo } from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

const MentionsLegalesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <main
        id="main-content"
        className="mx-auto max-w-3xl px-6 pt-12 pb-24 md:pt-16 md:pb-20"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Mentions légales
          </h1>
          <p className="text-base text-gray-600">
            Informations légales relatives au site estcequecestlasaison.fr,
            conformément à la loi LCEN.
          </p>
        </div>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Éditeur du site
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>
            Nom : <strong>Victor de la Fouchardière</strong>
          </li>
          <li>Statut : Micro-entreprise</li>
          <li>
            SIRET : <strong>831 370 515 00023</strong>
          </li>
          <li>
            Numéro de TVA intracommunautaire : Non applicable — franchise en
            base de TVA
          </li>
          <li>
            Adresse : <strong>54 rue de Lancry, 75010 Paris</strong>
          </li>
          <li>
            Email :{' '}
            <a
              href="mailto:contact@estcequecestlasaison.fr"
              className="text-link"
            >
              contact@estcequecestlasaison.fr
            </a>
          </li>
        </ul>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Directeur de la publication
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          <strong>Victor de la Fouchardière</strong>, en qualité d'éditeur du
          site.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Hébergeur</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>Raison sociale : Railway Corporation</li>
          <li>Adresse : San Francisco, CA, USA</li>
          <li>
            Site web :{' '}
            <a
              href="https://railway.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              railway.app
            </a>
          </li>
        </ul>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Propriété intellectuelle
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          L'ensemble du contenu de ce site (textes, données, graphismes, mise en
          page) est protégé par le droit d'auteur. Toute reproduction ou
          représentation, totale ou partielle, sans autorisation préalable est
          interdite.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Le code source du site est disponible en open source sur{' '}
          <a
            href="https://github.com/viclafouch/estcequecestlasaison"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            GitHub
          </a>
          .
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Crédits et sources des données
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Les données de saisonnalité présentées sur ce site proviennent de
          sources officielles et reconnues&nbsp;:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>
            <a
              href="https://www.aprifel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              APRIFEL
            </a>{' '}
            — Agence pour la recherche et l'information en fruits et légumes
          </li>
          <li>
            <a
              href="https://www.lesfruitsetlegumesfrais.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Interfel
            </a>{' '}
            — Interprofession des fruits et légumes frais
          </li>
          <li>
            <a
              href="https://agriculture.gouv.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Ministère de l'Agriculture
            </a>
          </li>
          <li>
            <a
              href="https://ciqual.anses.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Anses / Table Ciqual
            </a>{' '}
            — Données nutritionnelles
          </li>
        </ul>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/mentions-legales')({
  head: () => {
    return seo({
      title: 'Mentions légales',
      description:
        'Mentions légales du site estcequecestlasaison.fr\u00a0: éditeur, hébergeur, propriété intellectuelle et crédits.',
      keywords: 'mentions légales, éditeur, hébergeur',
      pathname: '/mentions-legales'
    })
  },
  component: MentionsLegalesPage
})
