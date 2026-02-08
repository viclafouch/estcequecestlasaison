import { SiteHeader } from '@/components/site-header'
import { seo } from '@/lib/seo'
import { createFileRoute, Link } from '@tanstack/react-router'

const CguPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <main
        id="main-content"
        className="mx-auto max-w-3xl px-6 pt-12 pb-24 md:pt-16 md:pb-20"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Conditions générales d'utilisation
          </h1>
          <p className="text-base text-gray-600">
            Dernière mise à jour : février 2026
          </p>
        </div>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Objet</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Les présentes conditions générales d'utilisation (CGU) régissent
          l'accès et l'utilisation du site{' '}
          <strong>estcequecestlasaison.fr</strong> et de l'application mobile
          associée. En accédant au service, vous acceptez sans réserve les
          présentes CGU.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Description du service
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          estcequecestlasaison.fr est un service gratuit permettant de connaître
          la saisonnalité des fruits et légumes en France métropolitaine. Le
          site propose un calendrier interactif, des fiches produits avec
          informations nutritionnelles et une recherche par nom de produit.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Accès et disponibilité
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Le service est accessible gratuitement à tout utilisateur disposant
          d'un accès à Internet. L'éditeur s'efforce de maintenir le site
          accessible en permanence, mais ne peut garantir une disponibilité
          continue. Le service peut être interrompu à tout moment pour des
          raisons de maintenance, de mise à jour ou pour toute autre raison,
          sans préavis ni indemnité.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Utilisation du service
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Le service est destiné à un usage personnel et non commercial.
          L'utilisateur s'engage à&nbsp;:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>Utiliser le service conformément à sa finalité</li>
          <li>Ne pas tenter de perturber le fonctionnement du site</li>
          <li>
            Ne pas extraire systématiquement les données du site (scraping) sans
            autorisation
          </li>
        </ul>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Propriété intellectuelle
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Les contenus du site (textes, données, graphismes, mise en page) sont
          protégés par le droit d'auteur. Toute reproduction sans autorisation
          préalable est interdite.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Le code source du projet est disponible en open source sur{' '}
          <a
            href="https://github.com/viclafouch/estcequecestlasaison"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            GitHub
          </a>{' '}
          sous les termes de la licence du dépôt.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Données personnelles
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Pour toute information relative à la collecte et au traitement des
          données personnelles, veuillez consulter notre{' '}
          <Link to="/confidentialite" className="text-link">
            politique de confidentialité
          </Link>
          .
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Responsabilité
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Les informations présentées sur le site sont fournies à titre
          indicatif et ne constituent en aucun cas un conseil médical,
          nutritionnel ou diététique. L'éditeur ne saurait être tenu responsable
          de l'utilisation faite de ces informations. Les données de
          saisonnalité sont fournies au mieux de nos connaissances et peuvent
          varier selon les régions et les conditions climatiques.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Liens externes
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Le site peut contenir des liens vers des sites tiers. L'éditeur
          n'exerce aucun contrôle sur ces sites et décline toute responsabilité
          quant à leur contenu ou leurs pratiques en matière de protection des
          données.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Application mobile
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          L'application mobile estcequecestlasaison est{' '}
          <strong>gratuite et sans publicité</strong>. Elle fonctionne
          entièrement <strong>hors-ligne</strong> et ne nécessite aucune
          connexion Internet après le téléchargement. Les présentes CGU
          s'appliquent également à l'utilisation de l'application mobile.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Loi applicable et juridiction
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Les présentes CGU sont régies par le droit français. En cas de litige,
          et après tentative de résolution amiable, les tribunaux français
          seront seuls compétents.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Modifications des CGU
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          L'éditeur se réserve le droit de modifier les présentes CGU à tout
          moment. Les modifications prennent effet dès leur publication sur le
          site. La date de dernière mise à jour est indiquée en haut de cette
          page.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Contact</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Pour toute question relative aux présentes CGU, vous pouvez nous
          contacter à l'adresse :{' '}
          <a
            href="mailto:contact@estcequecestlasaison.fr"
            className="text-link"
          >
            contact@estcequecestlasaison.fr
          </a>
        </p>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/cgu')({
  head: () => {
    return seo({
      title: "Conditions générales d'utilisation",
      description:
        "Conditions générales d'utilisation du site estcequecestlasaison.fr et de l'application mobile\u00a0: accès, responsabilité, propriété intellectuelle.",
      keywords: 'conditions générales, cgu, utilisation',
      pathname: '/cgu'
    })
  },
  component: CguPage
})
