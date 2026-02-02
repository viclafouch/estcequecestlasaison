import type { FAQPage, WithContext } from 'schema-dts'
import { clientEnv } from '@/constants/env'
import { SITE_NAME } from '@/constants/site'
import type { Month, Produce } from '@estcequecestlasaison/shared'
import {
  getSeasonRangeLabel,
  matchIsInSeasonAllYear
} from '@estcequecestlasaison/shared'

const OG_IMAGE_WIDTH = 1200
const OG_IMAGE_HEIGHT = 630
const DEFAULT_OG_IMAGE = '/images/og-image.webp'

type SeoParams = {
  title: string
  description?: string
  image?: string
  imageAlt?: string
  keywords?: string
  pathname?: string
}

function buildUrl(pathname: string) {
  try {
    return new URL(pathname, clientEnv.VITE_SITE_URL).href
  } catch {
    return clientEnv.VITE_SITE_URL
  }
}

function buildOgImageUrl(image: string | undefined) {
  const imagePath = image ?? DEFAULT_OG_IMAGE

  if (imagePath.startsWith('http')) {
    return imagePath
  }

  return new URL(imagePath, clientEnv.VITE_SITE_URL).href
}

export function seo({
  title,
  description,
  keywords,
  image,
  imageAlt,
  pathname = '/'
}: SeoParams) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = buildUrl(pathname)
  const ogImage = buildOgImageUrl(image)
  const ogImageAlt = imageAlt ?? `${title} - ${SITE_NAME}`

  const baseMeta = [
    { title: fullTitle },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: fullTitle },
    { property: 'og:url', content: url },
    { property: 'og:locale', content: 'fr_FR' },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: String(OG_IMAGE_WIDTH) },
    { property: 'og:image:height', content: String(OG_IMAGE_HEIGHT) },
    { property: 'og:image:alt', content: ogImageAlt },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:image', content: ogImage },
    { name: 'twitter:image:alt', content: ogImageAlt }
  ]

  const descriptionMeta = description
    ? [
        { name: 'description', content: description },
        { property: 'og:description', content: description },
        { name: 'twitter:description', content: description }
      ]
    : []

  const keywordsMeta = keywords ? [{ name: 'keywords', content: keywords }] : []

  const meta = [...baseMeta, ...descriptionMeta, ...keywordsMeta]
  const links = [{ rel: 'canonical', href: url }]

  return { meta, links }
}

function getSeasonStatusLabel(produce: Produce, month: Month) {
  if (matchIsInSeasonAllYear(produce)) {
    return "Disponible toute l'ann\u00E9e"
  }

  const intensity = produce.seasons[month]

  if (intensity === 'peak') {
    return 'En pleine saison'
  }

  if (intensity === 'partial') {
    return 'D\u00E9but ou fin de saison'
  }

  return 'Hors saison'
}

type ProduceSeoParams = {
  produce: Produce
  month: Month
}

export function produceSeo({ produce, month }: ProduceSeoParams) {
  const statusLabel = getSeasonStatusLabel(produce, month)

  return seo({
    title: `${produce.name} : est-ce que c'est la saison ?`,
    description: `${produce.name} : ${statusLabel.toLowerCase()}. ${produce.nutrition.benefits}. Calendrier de saisonnalit\u00E9 complet.`,
    keywords: `${produce.name.toLowerCase()}, saison ${produce.name.toLowerCase()}, est-ce que c'est la saison ${produce.name.toLowerCase()}, ${produce.type === 'fruit' ? 'fruit' : 'l\u00E9gume'} de saison, calendrier saisonnalit\u00E9 ${produce.name.toLowerCase()}`,
    pathname: `/${produce.slug}`
  })
}

export function produceJsonLd({ produce, month }: ProduceSeoParams) {
  const statusLabel = getSeasonStatusLabel(produce, month)
  const seasonRange = getSeasonRangeLabel(produce)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `${produce.name} : est-ce que c'est la saison ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${produce.name} : ${statusLabel.toLowerCase()}. Saison : ${seasonRange}.`
        }
      }
    ]
  } as const satisfies WithContext<FAQPage>

  return JSON.stringify(schema)
}
