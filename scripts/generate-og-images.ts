import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import satori from 'satori'
import type { Font } from 'satori'
import sharp from 'sharp'

import type { Month, Produce } from '../packages/shared/src/types'

const OUTPUT_DIR = './apps/web/public/images/og'
const PRODUCE_IMAGES_DIR = './apps/web/public/images/produce'
const LOGO_PATH = './apps/web/public/logo.png'
const PRODUCE_JSON_PATH = './packages/shared/src/data/produce.json'
const OG_WIDTH = 1200
const OG_HEIGHT = 630

const GRAY_50 = '#f9fafb'
const GRAY_200 = '#e5e7eb'
const GRAY_400 = '#9ca3af'
const GRAY_500 = '#6b7280'
const GRAY_800 = '#1f2937'
const GRAY_900 = '#111827'
const EMERALD_500 = '#10b981'

const INTER_REGULAR_URL =
  'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf'
const INTER_SEMIBOLD_URL =
  'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf'
const INTER_BOLD_URL =
  'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf'

const MONTH_LABELS = [
  'Jan',
  'Fév',
  'Mar',
  'Avr',
  'Mai',
  'Juin',
  'Juil',
  'Aoû',
  'Sep',
  'Oct',
  'Nov',
  'Déc'
]

type SatoriNode = {
  type: string
  props: Record<string, unknown>
}

function div(
  style: Record<string, unknown>,
  children?: string | SatoriNode | (string | SatoriNode)[]
): SatoriNode {
  return { type: 'div', props: { style, children } }
}

async function loadProduceImageAsBase64(slug: string) {
  const imagePath = join(PRODUCE_IMAGES_DIR, `${slug}-512w.webp`)
  const isExisting = await matchIsExistingFile(imagePath)

  if (!isExisting) {
    return null
  }

  const pngBuffer = await sharp(imagePath)
    .resize(280, 280, { fit: 'cover' })
    .png()
    .toBuffer()

  return `data:image/png;base64,${pngBuffer.toString('base64')}`
}

async function fetchFont(url: string) {
  const response = await fetch(url)

  return response.arrayBuffer()
}

async function matchIsExistingFile(path: string) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

const ALL_MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const satisfies readonly Month[]

function getSeasonMonths(produce: Produce) {
  return new Set(ALL_MONTHS.filter((month) => {
    return produce.seasons[month]
  }))
}

function buildMonthBar(seasonMonths: Set<number>) {
  const monthNodes = MONTH_LABELS.map((label, index) => {
    const isInSeason = seasonMonths.has(index + 1)

    return div(
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 44,
        borderRadius: 8,
        fontSize: 16,
        fontWeight: 600,
        backgroundColor: isInSeason ? EMERALD_500 : GRAY_200,
        color: isInSeason ? 'white' : GRAY_400
      },
      label
    )
  })

  return div({ display: 'flex', gap: 8, padding: '12px 56px' }, monthNodes)
}

function buildImageColumn(imageBase64: string) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        width: 280,
        height: 280,
        borderRadius: 24,
        overflow: 'hidden',
        marginLeft: 40,
        flexShrink: 0
      },
      children: {
        type: 'img',
        props: {
          src: imageBase64,
          width: 280,
          height: 280
        }
      }
    }
  }
}

function buildTextColumn(produce: Produce) {
  const typeLabel = produce.type === 'fruit' ? 'Fruit' : 'Légume'

  return div(
    {
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    },
    [
      div({ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }, [
        div(
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: EMERALD_500,
            color: 'white',
            borderRadius: 9999,
            padding: '6px 20px',
            fontSize: 20,
            fontWeight: 600
          },
          typeLabel
        )
      ]),
      div(
        {
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          flex: 1
        },
        [
          div(
            {
              fontSize: 72,
              fontWeight: 700,
              color: GRAY_900,
              lineHeight: 1.1,
              letterSpacing: -1
            },
            produce.name
          ),
          div(
            { fontSize: 28, color: GRAY_500, lineHeight: 1.3 },
            "Est-ce que c'est la saison ?"
          )
        ]
      )
    ]
  )
}

async function buildProduceImage(produce: Produce) {
  const seasonMonths = getSeasonMonths(produce)
  const imageBase64 = await loadProduceImageAsBase64(produce.slug)

  const contentChildren = [
    buildTextColumn(produce),
    ...(imageBase64 ? [buildImageColumn(imageBase64)] : [])
  ]

  return div(
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: GRAY_50,
      fontFamily: 'Inter'
    },
    [
      div(
        {
          display: 'flex',
          flex: 1,
          padding: '48px 56px 32px'
        },
        contentChildren
      ),
      buildMonthBar(seasonMonths),
      div(
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 56px',
          borderTop: `1px solid ${GRAY_200}`
        },
        [
          div({ display: 'flex', alignItems: 'center', gap: 8 }, [
            div({
              width: 28,
              height: 28,
              borderRadius: 9999,
              backgroundColor: EMERALD_500,
              display: 'flex'
            }),
            div(
              { fontSize: 20, fontWeight: 600, color: GRAY_800 },
              'estcequecestlasaison.fr'
            )
          ]),
          div(
            { fontSize: 18, color: GRAY_500 },
            'Calendrier de saisonnalité'
          )
        ]
      )
    ]
  )
}

async function buildDefaultImage() {
  const logoBuffer = await readFile(LOGO_PATH)
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`

  const pillNames = ['Pomme', 'Carotte', 'Fraise', 'Tomate', 'Poireau']

  const pills = pillNames.map((name) => {
    return div(
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 24px',
        borderRadius: 9999,
        backgroundColor: EMERALD_500,
        color: 'white',
        fontSize: 20,
        fontWeight: 600
      },
      name
    )
  })

  const logoNode: SatoriNode = {
    type: 'img',
    props: { src: logoBase64, width: 600, height: 216 }
  }

  return div(
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      fontFamily: 'Inter'
    },
    [
      div(
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24
        },
        [
          logoNode,
          div(
            { fontSize: 28, color: GRAY_500 },
            'Fruits et légumes de saison en France'
          )
        ]
      ),
      div({ display: 'flex', gap: 12, marginTop: 40 }, pills)
    ]
  )
}

async function generatePng(element: SatoriNode, fonts: Font[]) {
  const svg = await satori(element as Parameters<typeof satori>[0], {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts
  })

  return sharp(Buffer.from(svg)).png({ quality: 90 }).toBuffer()
}

async function loadFonts() {
  const [interRegular, interSemiBold, interBold] = await Promise.all([
    fetchFont(INTER_REGULAR_URL),
    fetchFont(INTER_SEMIBOLD_URL),
    fetchFont(INTER_BOLD_URL)
  ])

  return [
    { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
    { name: 'Inter', data: interSemiBold, weight: 600, style: 'normal' },
    { name: 'Inter', data: interBold, weight: 700, style: 'normal' }
  ] satisfies Font[]
}

type GenerateImageParams = {
  outputPath: string
  element: SatoriNode
  fonts: Font[]
  label: string
}

async function generateImageIfMissing({ outputPath, element, fonts, label }: GenerateImageParams) {
  if (await matchIsExistingFile(outputPath)) {
    console.log(`SKIP ${label}`)
    return 'skipped' as const
  }

  try {
    const png = await generatePng(element, fonts)
    await writeFile(outputPath, png)
    console.log(`OK ${label}`)
    return 'generated' as const
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`FAIL ${label} - ${message}`)
    return 'failed' as const
  }
}

async function run() {
  console.log('Fetching fonts...')
  const fonts = await loadFonts()
  console.log('Fonts loaded\n')

  await mkdir(OUTPUT_DIR, { recursive: true })

  const produceJson = await readFile(PRODUCE_JSON_PATH, 'utf-8')
  const produceList = JSON.parse(produceJson) as Produce[]

  const defaultResult = await generateImageIfMissing({
    outputPath: join(OUTPUT_DIR, 'default.png'),
    element: await buildDefaultImage(),
    fonts,
    label: 'default'
  })

  const produceResults = []
  for (const produce of produceList) {
    const result = await generateImageIfMissing({
      outputPath: join(OUTPUT_DIR, `${produce.slug}.png`),
      element: await buildProduceImage(produce),
      fonts,
      label: produce.name
    })
    produceResults.push(result)
  }

  const results = [defaultResult, ...produceResults]
  const generatedCount = results.filter((result) => { return result === 'generated' }).length
  const skippedCount = results.filter((result) => { return result === 'skipped' }).length

  console.log(`\nDone: ${generatedCount} generated, ${skippedCount} skipped, ${results.length} total`)
}

run().catch(console.error)
