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
            Mentions l&eacute;gales
          </h1>
          <p className="text-base text-gray-600">
            Informations l&eacute;gales relatives au site
            estcequecestlasaison.fr, conform&eacute;ment &agrave; la loi LCEN.
          </p>
        </div>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          &Eacute;diteur du site
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>
            Nom : <strong>Victor de la Fouchardi&egrave;re</strong>
          </li>
          <li>Statut : Micro-entreprise</li>
          <li>
            SIRET : <strong>831 370 515 00023</strong>
          </li>
          <li>
            Num&eacute;ro de TVA intracommunautaire : Non applicable &mdash;
            franchise en base de TVA
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
          <strong>Victor de la Fouchardi&egrave;re</strong>, en qualit&eacute;
          d&rsquo;&eacute;diteur du site.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          H&eacute;bergeur
        </h2>
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
          Propri&eacute;t&eacute; intellectuelle
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          L&rsquo;ensemble du contenu de ce site (textes, donn&eacute;es,
          graphismes, mise en page) est prot&eacute;g&eacute; par le droit
          d&rsquo;auteur. Toute reproduction ou repr&eacute;sentation, totale ou
          partielle, sans autorisation pr&eacute;alable est interdite.
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
          Cr&eacute;dits et sources des donn&eacute;es
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Les donn&eacute;es de saisonnalit&eacute; pr&eacute;sent&eacute;es sur
          ce site proviennent de sources officielles et reconnues&nbsp;:
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
            &mdash; Agence pour la recherche et l&rsquo;information en fruits et
            l&eacute;gumes
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
            &mdash; Interprofession des fruits et l&eacute;gumes frais
          </li>
          <li>
            <a
              href="https://agriculture.gouv.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Minist&egrave;re de l&rsquo;Agriculture
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
            &mdash; Donn&eacute;es nutritionnelles
          </li>
        </ul>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/mentions-legales')({
  head: () => {
    return seo({
      title: 'Mentions l\u00e9gales',
      description:
        'Mentions l\u00e9gales du site estcequecestlasaison.fr\u00a0: \u00e9diteur, h\u00e9bergeur, propri\u00e9t\u00e9 intellectuelle et cr\u00e9dits.',
      keywords: 'mentions l\u00e9gales, \u00e9diteur, h\u00e9bergeur',
      pathname: '/mentions-legales'
    })
  },
  component: MentionsLegalesPage
})
