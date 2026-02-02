import type { BreadcrumbList, FAQPage, Thing, WithContext } from 'schema-dts'
import { clientEnv } from '@/constants/env'
import { SITE_NAME } from '@/constants/site'
import type { Month, Produce } from '@estcequecestlasaison/shared'
import {
  getSeasonRangeLabel,
  matchIsInSeasonAllYear
} from '@estcequecestlasaison/shared'

const OG_IMAGE_WIDTH = 1200
const OG_IMAGE_HEIGHT = 630
const DEFAULT_OG_IMAGE = '/images/og/default.png'

type SeoParams = {
  title: string
  description?: string
  image?: string
  imageAlt?: string
  keywords?: string
  pathname?: string
  ogType?: string
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
  pathname = '/',
  ogType = 'website'
}: SeoParams) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = buildUrl(pathname)
  const ogImage = buildOgImageUrl(image)
  const ogImageAlt = imageAlt ?? `${title} - ${SITE_NAME}`

  const baseMeta = [
    { title: fullTitle },
    { property: 'og:type', content: ogType },
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

function getVitaminsLabel(vitamins: string[]) {
  if (vitamins.length === 0) {
    return ''
  }

  return `Riche en vitamines ${vitamins.join(', ')}`
}

type ProduceSeoParams = {
  produce: Produce
  month: Month
}

export function produceSeo({ produce, month }: ProduceSeoParams) {
  const statusLabel = getSeasonStatusLabel(produce, month)
  const seasonRange = getSeasonRangeLabel(produce)
  const vitaminsLabel = getVitaminsLabel(produce.nutrition.vitamins)
  const typeLabel = produce.type === 'fruit' ? 'fruit' : 'l\u00E9gume'

  const descriptionParts = [
    `${produce.name} : ${statusLabel.toLowerCase()}`,
    matchIsInSeasonAllYear(produce) ? null : `Saison : ${seasonRange}`,
    vitaminsLabel,
    `D\u00E9couvrez le calendrier de saisonnalit\u00E9 complet de ce ${typeLabel}.`
  ].filter(Boolean)

  const result = seo({
    title: `${produce.name} : est-ce que c'est la saison ?`,
    description: `${descriptionParts.join('. ')}.`,
    keywords: `${produce.name.toLowerCase()}, saison ${produce.name.toLowerCase()}, est-ce que c'est la saison ${produce.name.toLowerCase()}, ${typeLabel} de saison, calendrier saisonnalit\u00E9 ${produce.name.toLowerCase()}`,
    pathname: `/${produce.slug}`,
    image: `/images/og/${produce.slug}.png`,
    imageAlt: `${produce.name} - ${typeLabel} de saison`,
    ogType: 'article'
  })

  return {
    ...result,
    links: [
      ...result.links,
      {
        rel: 'preload',
        as: 'image',
        type: 'image/webp',
        href: `/images/produce/${produce.slug}-512w.webp`
      }
    ]
  }
}

function buildBreadcrumbList(produce: Produce): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: buildUrl('/')
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: produce.name,
        item: buildUrl(`/${produce.slug}`)
      }
    ]
  }
}

function buildProductThing(produce: Produce): WithContext<Thing> {
  const seasonRange = getSeasonRangeLabel(produce)
  const typeLabel = produce.type === 'fruit' ? 'Fruit' : 'L\u00E9gume'

  return {
    '@context': 'https://schema.org',
    '@type': 'Thing',
    name: produce.name,
    description: `${produce.name} - ${typeLabel} de saison. Saison : ${seasonRange}. ${produce.nutrition.benefits}.`,
    url: buildUrl(`/${produce.slug}`),
    image: buildUrl(`/images/produce/${produce.slug}-512w.webp`)
  }
}

export function produceJsonLd({ produce, month }: ProduceSeoParams) {
  const statusLabel = getSeasonStatusLabel(produce, month)
  const seasonRange = getSeasonRangeLabel(produce)
  const vitaminsLabel = getVitaminsLabel(produce.nutrition.vitamins)

  const answerParts = [
    `${produce.name} : ${statusLabel.toLowerCase()}`,
    `Saison : ${seasonRange}`,
    vitaminsLabel,
    produce.nutrition.benefits
  ].filter(Boolean)

  const faqSchema: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `${produce.name} : est-ce que c'est la saison ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${answerParts.join('. ')}.`
        }
      }
    ]
  }

  const schemas: WithContext<BreadcrumbList | FAQPage | Thing>[] = [
    faqSchema,
    buildBreadcrumbList(produce),
    buildProductThing(produce)
  ]

  return schemas.map((schema) => {
    return JSON.stringify(schema)
  })
}
