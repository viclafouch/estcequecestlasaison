import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import { join } from 'node:path'
import { generateImage } from '@tanstack/ai'
import { geminiImage } from '@tanstack/ai-gemini'

type ProduceItem = {
  slug: string
  name: string
  type: string
}

const OUTPUT_DIR = './generated-images'
const DELAY_MS = 2000

const adapter = geminiImage('imagen-4.0-generate-001')

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function matchFileExists(path: string) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function generateProduceImage(item: ProduceItem) {
  const outputPath = join(OUTPUT_DIR, `${item.slug}.png`)

  if (await matchFileExists(outputPath)) {
    console.log(`SKIP ${item.name} (already exists)`)
    return
  }

  const prompt = `A professional, high-quality photograph of a single ${item.name} placed on a rustic wooden cutting board in a blurred kitchen background. Natural lighting, 8k resolution, minimalist composition.`

  console.log(`GENERATING ${item.name}...`)

  const result = await generateImage({ adapter, prompt })
  const image = result.images[0]

  if (image?.b64Json) {
    await writeFile(outputPath, Buffer.from(image.b64Json, 'base64'))
    console.log(`OK ${item.name} -> ${outputPath}`)
    return
  }

  if (image?.url) {
    const response = await fetch(image.url)
    await writeFile(outputPath, Buffer.from(await response.arrayBuffer()))
    console.log(`OK ${item.name} -> ${outputPath}`)
    return
  }

  console.error(`FAIL ${item.name} - no image data returned`)
}

const raw = await readFile('./packages/shared/src/data/produce.json', 'utf-8')
const produceData = JSON.parse(raw) as ProduceItem[]

await mkdir(OUTPUT_DIR, { recursive: true })

let successCount = 0
let failCount = 0

for (const item of produceData) {
  try {
    await generateProduceImage(item)
    successCount++
  } catch (error) {
    failCount++
    const message = error instanceof Error ? error.message : String(error)
    console.error(`FAIL ${item.name} - ${message}`)
  }

  await sleep(DELAY_MS)
}

console.log(`\nDone: ${successCount} OK, ${failCount} failed, ${produceData.length} total`)
