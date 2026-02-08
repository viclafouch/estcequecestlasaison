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
            Politique de confidentialit&eacute;
          </h1>
          <p className="text-base text-gray-600">
            Derni&egrave;re mise &agrave; jour : f&eacute;vrier 2026
          </p>
        </div>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Responsable du traitement
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>
            Nom : <strong>Victor de la Fouchardi&egrave;re</strong>
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
          Donn&eacute;es collect&eacute;es
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Le site <strong>estcequecestlasaison.fr</strong> ne collecte
          actuellement <strong>aucune donn&eacute;e personnelle</strong>. Aucun
          formulaire d&rsquo;inscription, aucun compte utilisateur, aucun
          tracking analytique n&rsquo;est mis en place.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Cookies</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Ce site n&rsquo;utilise actuellement <strong>aucun cookie</strong>, ni
          cookie de suivi, ni cookie publicitaire, ni cookie analytique. Cette
          politique sera mise &agrave; jour si des cookies sont introduits
          &agrave; l&rsquo;avenir (par exemple lors de
          l&rsquo;int&eacute;gration de Google AdSense).
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Base l&eacute;gale du traitement
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          En l&rsquo;absence de collecte de donn&eacute;es personnelles, aucune
          base l&eacute;gale sp&eacute;cifique n&rsquo;est requise. Si des
          donn&eacute;es venaient &agrave; &ecirc;tre collect&eacute;es &agrave;
          l&rsquo;avenir (cookies publicitaires, analytics), la base
          l&eacute;gale serait le <strong>consentement</strong> de
          l&rsquo;utilisateur, recueilli via un bandeau de consentement conforme
          au RGPD.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Droits des utilisateurs
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Conform&eacute;ment au R&egrave;glement G&eacute;n&eacute;ral sur la
          Protection des Donn&eacute;es (RGPD), vous disposez des droits
          suivants&nbsp;:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>
            <strong>Droit d&rsquo;acc&egrave;s</strong> : obtenir la
            confirmation que vos donn&eacute;es sont ou ne sont pas
            trait&eacute;es
          </li>
          <li>
            <strong>Droit de rectification</strong> : demander la correction de
            donn&eacute;es inexactes
          </li>
          <li>
            <strong>Droit &agrave; l&rsquo;effacement</strong> : demander la
            suppression de vos donn&eacute;es
          </li>
          <li>
            <strong>Droit &agrave; la portabilit&eacute;</strong> : recevoir vos
            donn&eacute;es dans un format structur&eacute; et lisible
          </li>
          <li>
            <strong>Droit d&rsquo;opposition</strong> : vous opposer au
            traitement de vos donn&eacute;es
          </li>
          <li>
            <strong>Droit &agrave; la limitation</strong> : demander la
            limitation du traitement
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Pour exercer ces droits, contactez-nous &agrave; l&rsquo;adresse :{' '}
          <a
            href="mailto:contact@estcequecestlasaison.fr"
            className="text-link"
          >
            contact@estcequecestlasaison.fr
          </a>
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Transferts hors Union europ&eacute;enne
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Le site est h&eacute;berg&eacute; par{' '}
          <a
            href="https://railway.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Railway
          </a>{' '}
          (San Francisco, &Eacute;tats-Unis). Bien qu&rsquo;aucune donn&eacute;e
          personnelle ne soit actuellement collect&eacute;e, les requ&ecirc;tes
          HTTP transitent par les serveurs de l&rsquo;h&eacute;bergeur. Railway
          s&rsquo;engage &agrave; respecter des garanties ad&eacute;quates en
          mati&egrave;re de protection des donn&eacute;es.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Application mobile
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          L&rsquo;application mobile estcequecestlasaison fonctionne{' '}
          <strong>100&nbsp;% hors-ligne</strong>. Elle ne collecte{' '}
          <strong>aucune donn&eacute;e personnelle</strong>, n&rsquo;utilise
          aucun cookie et ne communique avec aucun serveur. Toutes les
          donn&eacute;es sont incluses dans l&rsquo;application et
          stock&eacute;es localement sur votre appareil.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Crash reports (futur)
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Une int&eacute;gration de{' '}
          <a
            href="https://sentry.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Sentry
          </a>{' '}
          est pr&eacute;vue pour le suivi des erreurs techniques. Les
          donn&eacute;es collect&eacute;es seront strictement anonymis&eacute;es
          (traces d&rsquo;erreur, type d&rsquo;appareil, version de
          l&rsquo;application) et ne permettront pas d&rsquo;identifier un
          utilisateur. Cette section sera mise &agrave; jour lors de
          l&rsquo;activation de Sentry.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Contact CNIL
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Si vous estimez que le traitement de vos donn&eacute;es ne respecte
          pas la r&eacute;glementation, vous pouvez adresser une
          r&eacute;clamation &agrave; la{' '}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            CNIL
          </a>{' '}
          (Commission Nationale de l&rsquo;Informatique et des Libert&eacute;s),
          3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">
          Modifications de cette politique
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Cette politique de confidentialit&eacute; peut &ecirc;tre mise
          &agrave; jour &agrave; tout moment. La date de derni&egrave;re mise
          &agrave; jour est indiqu&eacute;e en haut de cette page. Nous vous
          invitons &agrave; la consulter r&eacute;guli&egrave;rement.
        </p>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/confidentialite')({
  head: () => {
    return seo({
      title: 'Politique de confidentialit\u00e9',
      description:
        'Politique de confidentialit\u00e9 RGPD du site estcequecestlasaison.fr\u00a0: donn\u00e9es collect\u00e9es, cookies, droits des utilisateurs et contact.',
      keywords:
        'politique confidentialit\u00e9, rgpd, donn\u00e9es personnelles',
      pathname: '/confidentialite'
    })
  },
  component: ConfidentialitePage
})
