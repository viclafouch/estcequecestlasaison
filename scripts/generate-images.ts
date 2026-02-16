import { exec } from 'node:child_process'
import { mkdir, unlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { generateImage } from '@tanstack/ai'
import { geminiImage } from '@tanstack/ai-gemini'
import type { Produce } from '../packages/shared/src/types'
import { loadProduceData, matchIsExistingFile } from './utils'

const OUTPUT_DIR = './generated-images'
const DELAY_MS = 2000

const CUSTOM_PROMPTS: Partial<Record<Produce['slug'], string>> = {
  salade:
    'A professional, high-quality photograph of a single fresh green lettuce leaf (laitue) placed on a rustic wooden cutting board in a blurred kitchen background. Just the lettuce leaf alone, no other vegetables. Natural lighting, 8k resolution, minimalist composition.',
  groseille:
    'A single professional food photograph of a fresh cluster of red currants (groseille, French fruit) still attached to their stem. Placed on a rustic wooden cutting board in a blurred kitchen background. One image only, no collage, no split views, no text, no labels, no watermark. Natural lighting, 8k resolution, minimalist composition.',
  poivron:
    'A single professional food photograph of one fresh green bell pepper (poivron vert, French vegetable). Placed on a rustic wooden cutting board in a blurred kitchen background. One image only, no collage, no split views, no text, no labels, no watermark. Natural lighting, 8k resolution, minimalist composition.'
}

if (!process.env.GOOGLE_API_KEY && !process.env.GEMINI_API_KEY) {
  console.error('Missing GOOGLE_API_KEY environment variable.')
  console.error('Get your key at https://aistudio.google.com/apikey')
  console.error('Then add it to your .env.local file (see .env.example)')
  process.exit(1)
}

const adapter = geminiImage('imagen-4.0-generate-001')

const rl = createInterface({ input: process.stdin, output: process.stdout })

function openInPreview(filePath: string) {
  exec(`open "${filePath}"`)
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function askValidation(itemName: string): Promise<boolean> {
  const answer = await rl.question(
    `\n  ${itemName} — Valider ? (o = oui / n = non, régénérer / s = skip définitivement) : `
  )
  const normalized = answer.trim().toLowerCase()

  if (normalized === 's') {
    console.log(`  → ${itemName} skippé définitivement`)

    return true
  }

  return normalized === 'o' || normalized === 'oui' || normalized === 'y'
}

function buildPrompt(item: Produce) {
  const customPrompt = CUSTOM_PROMPTS[item.slug]

  if (customPrompt) {
    return customPrompt
  }

  return `Product photography, studio shot: a single fresh ${item.name} centered on a rustic wooden cutting board. Shallow depth of field, blurred kitchen background. Only the ${item.name}, nothing else in the frame. No people, no hands, no text, no watermark. Soft natural window light from the left, clean minimalist composition, 8k resolution.`
}

async function saveImage(
  outputPath: string,
  image: { b64Json?: string; url?: string }
): Promise<boolean> {
  if (image.b64Json) {
    await writeFile(outputPath, Buffer.from(image.b64Json, 'base64'))

    return true
  }

  if (image.url) {
    const response = await fetch(image.url)
    await writeFile(outputPath, Buffer.from(await response.arrayBuffer()))

    return true
  }

  return false
}

async function generateWithValidation(item: Produce) {
  const outputPath = join(OUTPUT_DIR, `${item.slug}.png`)

  if (await matchIsExistingFile(outputPath)) {
    console.log(`SKIP ${item.name}`)

    return 'skipped' as const
  }

  let attempt = 1

  while (true) {
    const attemptLabel = attempt > 1 ? ` (tentative ${attempt})` : ''
    console.log(`\nGENERATING ${item.name}${attemptLabel}...`)

    const result = await generateImage({
      adapter,
      prompt: buildPrompt(item)
    })
    const image = result.images[0]

    if (!image) {
      console.error(`  FAIL ${item.name} — pas d'image retournée`)

      return 'failed' as const
    }

    const saved = await saveImage(outputPath, image)

    if (!saved) {
      console.error(`  FAIL ${item.name} — format d'image non supporté`)

      return 'failed' as const
    }

    console.log(`  ✓ Image sauvegardée → ${outputPath}`)
    openInPreview(outputPath)

    const isValid = await askValidation(item.name)

    if (isValid) {
      console.log(`  ✓ ${item.name} validé`)

      return 'generated' as const
    }

    console.log(`  ✗ ${item.name} rejeté, régénération...`)
    await unlink(outputPath)
    attempt += 1
    await sleep(DELAY_MS)
  }
}

const produceData = await loadProduceData()

await mkdir(OUTPUT_DIR, { recursive: true })

console.log(`${produceData.length} produits à traiter\n`)
console.log('Chaque image sera ouverte dans Aperçu pour validation.')
console.log('  o = valider  |  n = régénérer  |  s = skip\n')

let generatedCount = 0
let skippedCount = 0
let failedCount = 0

for (const item of produceData) {
  try {
    const result = await generateWithValidation(item)

    if (result === 'generated') {
      generatedCount += 1
      await sleep(DELAY_MS)
    } else if (result === 'skipped') {
      skippedCount += 1
    } else {
      failedCount += 1
    }
  } catch (error) {
    failedCount += 1
    const message = error instanceof Error ? error.message : String(error)
    console.error(`FAIL ${item.name} — ${message}`)
  }
}

rl.close()

console.log(
  `\nTerminé : ${generatedCount} générés, ${skippedCount} skippés, ${failedCount} échoués (${produceData.length} total)`
)
