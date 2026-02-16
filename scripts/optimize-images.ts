import { mkdir, readdir } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'
import { matchIsExistingFile } from './utils'

const INPUT_DIR = './generated-images'
const WEB_OUTPUT_DIR = './apps/web/public/images/produce'
const MOBILE_OUTPUT_DIR = './apps/mobile/assets/produce'
const WEB_SIZES = [256, 512]
const MOBILE_SIZE = 1024
const WEBP_QUALITY = 80

type GeneratedTarget = {
  label: string
  outputPath: string
  size: number
}

async function findMissingTargets(slug: string): Promise<GeneratedTarget[]> {
  const targets: GeneratedTarget[] = []

  for (const size of WEB_SIZES) {
    const outputPath = join(WEB_OUTPUT_DIR, `${slug}-${size}w.webp`)
    const isExisting = await matchIsExistingFile(outputPath)

    if (!isExisting) {
      targets.push({ label: `web ${size}w`, outputPath, size })
    }
  }

  const mobileOutputPath = join(MOBILE_OUTPUT_DIR, `${slug}.webp`)
  const isMobileExisting = await matchIsExistingFile(mobileOutputPath)

  if (!isMobileExisting) {
    targets.push({
      label: `mobile ${MOBILE_SIZE}w`,
      outputPath: mobileOutputPath,
      size: MOBILE_SIZE
    })
  }

  return targets
}

async function processFile(file: string) {
  const slug = parse(file).name
  const inputPath = join(INPUT_DIR, file)
  const targets = await findMissingTargets(slug)

  if (targets.length === 0) {
    return 'skipped' as const
  }

  for (const target of targets) {
    await sharp(inputPath)
      .resize(target.size, target.size, { fit: 'cover' })
      .webp({ quality: WEBP_QUALITY })
      .toFile(target.outputPath)
  }

  const labels = targets.map((target) => {
    return target.label
  })
  console.log(`OK ${slug} (${labels.join(', ')})`)

  return 'generated' as const
}

async function optimizeImages() {
  await mkdir(WEB_OUTPUT_DIR, { recursive: true })
  await mkdir(MOBILE_OUTPUT_DIR, { recursive: true })

  const files = await readdir(INPUT_DIR)
  const pngFiles = files.filter((file) => {
    return file.endsWith('.png')
  })

  console.log(`Found ${pngFiles.length} PNG files\n`)

  let generatedCount = 0
  let skippedCount = 0

  for (const file of pngFiles) {
    const result = await processFile(file)

    if (result === 'generated') {
      generatedCount += 1
    } else {
      skippedCount += 1
    }
  }

  console.log(
    `\nDone: ${generatedCount} optimized, ${skippedCount} skipped, ${pngFiles.length} total`
  )
}

optimizeImages().catch(console.error)
