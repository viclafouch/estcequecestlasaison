import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
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

function buildPrompt(item: Produce) {
  const customPrompt = CUSTOM_PROMPTS[item.slug]

  if (customPrompt) {
    return customPrompt
  }

  const typeLabel = item.type === 'fruit' ? 'fruit' : 'vegetable'

  return `A single professional food photograph of one fresh ${typeLabel}: ${item.name} (French produce). The subject must be exactly this ${typeLabel} and nothing else. Placed on a rustic wooden cutting board in a blurred kitchen background. One image only, no collage, no triptych, no split views, no multiple angles, no text, no labels, no watermark. Natural lighting, 8k resolution, minimalist composition.`
}

async function generateProduceImage(item: Produce) {
  const outputPath = join(OUTPUT_DIR, `${item.slug}.png`)

  if (await matchIsExistingFile(outputPath)) {
    console.log(`SKIP ${item.name}`)

    return false
  }

  console.log(`GENERATING ${item.name}...`)

  const result = await generateImage({ adapter, prompt: buildPrompt(item) })
  const image = result.images[0]

  if (image?.b64Json) {
    await writeFile(outputPath, Buffer.from(image.b64Json, 'base64'))
    console.log(`OK ${item.name} -> ${outputPath}`)

    return true
  }

  if (image?.url) {
    const response = await fetch(image.url)
    await writeFile(outputPath, Buffer.from(await response.arrayBuffer()))
    console.log(`OK ${item.name} -> ${outputPath}`)

    return true
  }

  console.error(`FAIL ${item.name} - no image data returned`)

  return true
}

const produceData = await loadProduceData()

await mkdir(OUTPUT_DIR, { recursive: true })

let successCount = 0
let failCount = 0

for (const item of produceData) {
  try {
    const hasGenerated = await generateProduceImage(item)
    successCount += 1

    if (hasGenerated) {
      await new Promise((resolve) => {
        setTimeout(resolve, DELAY_MS)
      })
    }
  } catch (error) {
    failCount += 1
    const message = error instanceof Error ? error.message : String(error)
    console.error(`FAIL ${item.name} - ${message}`)
  }
}

console.log(
  `\nDone: ${successCount} OK, ${failCount} failed, ${produceData.length} total`
)
