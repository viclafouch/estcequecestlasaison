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
            Conditions g&eacute;n&eacute;rales d&rsquo;utilisation
          </h1>
          <p className="text-base text-gray-600">
            Derni&egrave;re mise &agrave; jour : f&eacute;vrier 2026
          </p>
        </div>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Objet</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Les pr&eacute;sentes conditions g&eacute;n&eacute;rales
          d&rsquo;utilisation (CGU) r&eacute;gissent l&rsquo;acc&egrave;s et
          l&rsquo;utilisation du site <strong>estcequecestlasaison.fr</strong>{' '}
          et de l&rsquo;application mobile associ&eacute;e. En acc&eacute;dant
          au service, vous acceptez sans r&eacute;serve les pr&eacute;sentes
          CGU.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Description du service
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          estcequecestlasaison.fr est un service gratuit permettant de
          conna&icirc;tre la saisonnalit&eacute; des fruits et l&eacute;gumes en
          France m&eacute;tropolitaine. Le site propose un calendrier
          interactif, des fiches produits avec informations nutritionnelles et
          une recherche par nom de produit.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Acc&egrave;s et disponibilit&eacute;
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Le service est accessible gratuitement &agrave; tout utilisateur
          disposant d&rsquo;un acc&egrave;s &agrave; Internet.
          L&rsquo;&eacute;diteur s&rsquo;efforce de maintenir le site accessible
          en permanence, mais ne peut garantir une disponibilit&eacute;
          continue. Le service peut &ecirc;tre interrompu &agrave; tout moment
          pour des raisons de maintenance, de mise &agrave; jour ou pour toute
          autre raison, sans pr&eacute;avis ni indemnit&eacute;.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Utilisation du service
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Le service est destin&eacute; &agrave; un usage personnel et non
          commercial. L&rsquo;utilisateur s&rsquo;engage &agrave;&nbsp;:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>
            Utiliser le service conform&eacute;ment &agrave; sa finalit&eacute;
          </li>
          <li>Ne pas tenter de perturber le fonctionnement du site</li>
          <li>
            Ne pas extraire syst&eacute;matiquement les donn&eacute;es du site
            (scraping) sans autorisation
          </li>
        </ul>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Propri&eacute;t&eacute; intellectuelle
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Les contenus du site (textes, donn&eacute;es, graphismes, mise en
          page) sont prot&eacute;g&eacute;s par le droit d&rsquo;auteur. Toute
          reproduction sans autorisation pr&eacute;alable est interdite.
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
          sous les termes de la licence du d&eacute;p&ocirc;t.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Donn&eacute;es personnelles
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Pour toute information relative &agrave; la collecte et au traitement
          des donn&eacute;es personnelles, veuillez consulter notre{' '}
          <Link to="/confidentialite" className="text-link">
            politique de confidentialit&eacute;
          </Link>
          .
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Responsabilit&eacute;
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Les informations pr&eacute;sent&eacute;es sur le site sont fournies
          &agrave; titre indicatif et ne constituent en aucun cas un conseil
          m&eacute;dical, nutritionnel ou di&eacute;t&eacute;tique.
          L&rsquo;&eacute;diteur ne saurait &ecirc;tre tenu responsable de
          l&rsquo;utilisation faite de ces informations. Les donn&eacute;es de
          saisonnalit&eacute; sont fournies au mieux de nos connaissances et
          peuvent varier selon les r&eacute;gions et les conditions climatiques.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Liens externes
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Le site peut contenir des liens vers des sites tiers.
          L&rsquo;&eacute;diteur n&rsquo;exerce aucun contr&ocirc;le sur ces
          sites et d&eacute;cline toute responsabilit&eacute; quant &agrave;
          leur contenu ou leurs pratiques en mati&egrave;re de protection des
          donn&eacute;es.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Application mobile
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          L&rsquo;application mobile estcequecestlasaison est{' '}
          <strong>gratuite et sans publicit&eacute;</strong>. Elle fonctionne
          enti&egrave;rement <strong>hors-ligne</strong> et ne n&eacute;cessite
          aucune connexion Internet apr&egrave;s le
          t&eacute;l&eacute;chargement. Les pr&eacute;sentes CGU
          s&rsquo;appliquent &eacute;galement &agrave; l&rsquo;utilisation de
          l&rsquo;application mobile.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Loi applicable et juridiction
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Les pr&eacute;sentes CGU sont r&eacute;gies par le droit
          fran&ccedil;ais. En cas de litige, et apr&egrave;s tentative de
          r&eacute;solution amiable, les tribunaux fran&ccedil;ais seront seuls
          comp&eacute;tents.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Modifications des CGU
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          L&rsquo;&eacute;diteur se r&eacute;serve le droit de modifier les
          pr&eacute;sentes CGU &agrave; tout moment. Les modifications prennent
          effet d&egrave;s leur publication sur le site. La date de
          derni&egrave;re mise &agrave; jour est indiqu&eacute;e en haut de
          cette page.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Contact</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Pour toute question relative aux pr&eacute;sentes CGU, vous pouvez
          nous contacter &agrave; l&rsquo;adresse :{' '}
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
      title: "Conditions g\u00e9n\u00e9rales d'utilisation",
      description:
        "Conditions g\u00e9n\u00e9rales d'utilisation du site estcequecestlasaison.fr et de l'application mobile\u00a0: acc\u00e8s, responsabilit\u00e9, propri\u00e9t\u00e9 intellectuelle.",
      keywords: 'conditions g\u00e9n\u00e9rales, cgu, utilisation',
      pathname: '/cgu'
    })
  },
  component: CguPage
})
