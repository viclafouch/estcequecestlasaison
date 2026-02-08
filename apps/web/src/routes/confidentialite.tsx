import { SiteHeader } from '@/components/site-header'
import { seo } from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

const ConfidentialitePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <main
        id="main-content"
        className="mx-auto max-w-3xl px-6 pt-12 pb-24 md:pt-16 md:pb-20"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Politique de confidentialité
          </h1>
          <p className="text-base text-gray-600">
            Dernière mise à jour : février 2026
          </p>
        </div>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Responsable du traitement
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>
            Nom : <strong>Victor de la Fouchardière</strong>
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
          Données collectées
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Le site <strong>estcequecestlasaison.fr</strong> ne collecte
          actuellement <strong>aucune donnée personnelle</strong>. Aucun
          formulaire d'inscription, aucun compte utilisateur, aucun tracking
          analytique n'est mis en place.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Cookies</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Ce site n'utilise actuellement <strong>aucun cookie</strong>, ni
          cookie de suivi, ni cookie publicitaire, ni cookie analytique. Cette
          politique sera mise à jour si des cookies sont introduits à l'avenir
          (par exemple lors de l'intégration de Google AdSense).
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Base légale du traitement
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          En l'absence de collecte de données personnelles, aucune base légale
          spécifique n'est requise. Si des données venaient à être collectées à
          l'avenir (cookies publicitaires, analytics), la base légale serait le{' '}
          <strong>consentement</strong> de l'utilisateur, recueilli via un
          bandeau de consentement conforme au RGPD.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Droits des utilisateurs
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez des droits suivants&nbsp;:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>
            <strong>Droit d'accès</strong> : obtenir la confirmation que vos
            données sont ou ne sont pas traitées
          </li>
          <li>
            <strong>Droit de rectification</strong> : demander la correction de
            données inexactes
          </li>
          <li>
            <strong>Droit à l'effacement</strong> : demander la suppression de
            vos données
          </li>
          <li>
            <strong>Droit à la portabilité</strong> : recevoir vos données dans
            un format structuré et lisible
          </li>
          <li>
            <strong>Droit d'opposition</strong> : vous opposer au traitement de
            vos données
          </li>
          <li>
            <strong>Droit à la limitation</strong> : demander la limitation du
            traitement
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Pour exercer ces droits, contactez-nous à l'adresse :{' '}
          <a
            href="mailto:contact@estcequecestlasaison.fr"
            className="text-link"
          >
            contact@estcequecestlasaison.fr
          </a>
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Transferts hors Union européenne
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Le site est hébergé par{' '}
          <a
            href="https://railway.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Railway
          </a>{' '}
          (San Francisco, États-Unis). Bien qu'aucune donnée personnelle ne soit
          actuellement collectée, les requêtes HTTP transitent par les serveurs
          de l'hébergeur. Railway s'engage à respecter des garanties adéquates
          en matière de protection des données.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Application mobile
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          L'application mobile estcequecestlasaison fonctionne{' '}
          <strong>100&nbsp;% hors-ligne</strong>. Elle ne collecte{' '}
          <strong>aucune donnée personnelle</strong>, n'utilise aucun cookie et
          ne communique avec aucun serveur. Toutes les données sont incluses
          dans l'application et stockées localement sur votre appareil.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Crash reports (futur)
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Une intégration de{' '}
          <a
            href="https://sentry.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Sentry
          </a>{' '}
          est prévue pour le suivi des erreurs techniques. Les données
          collectées seront strictement anonymisées (traces d'erreur, type
          d'appareil, version de l'application) et ne permettront pas
          d'identifier un utilisateur. Cette section sera mise à jour lors de
          l'activation de Sentry.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Contact CNIL
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Si vous estimez que le traitement de vos données ne respecte pas la
          réglementation, vous pouvez adresser une réclamation à la{' '}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            CNIL
          </a>{' '}
          (Commission Nationale de l'Informatique et des Libertés), 3 Place de
          Fontenoy, TSA 80715, 75334 Paris Cedex 07.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Modifications de cette politique
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Cette politique de confidentialité peut être mise à jour à tout
          moment. La date de dernière mise à jour est indiquée en haut de cette
          page. Nous vous invitons à la consulter régulièrement.
        </p>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/confidentialite')({
  head: () => {
    return seo({
      title: 'Politique de confidentialité',
      description:
        'Politique de confidentialité RGPD du site estcequecestlasaison.fr\u00a0: données collectées, cookies, droits des utilisateurs et contact.',
      keywords: 'politique confidentialité, rgpd, données personnelles',
      pathname: '/confidentialite'
    })
  },
  component: ConfidentialitePage
})
