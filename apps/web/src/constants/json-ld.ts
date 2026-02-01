import { clientEnv } from '@/constants/env'
import { SITE_NAME } from '@/constants/site'

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${clientEnv.VITE_SITE_URL}/#website`,
  name: SITE_NAME,
  url: clientEnv.VITE_SITE_URL,
  description:
    'Découvrez quels fruits et légumes sont de saison en France, mois par mois.',
  inLanguage: 'fr-FR',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${clientEnv.VITE_SITE_URL}/?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
}

export const WEBSITE_JSON_LD = JSON.stringify(WEBSITE_SCHEMA)
