import { mkdir, readdir } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'
import { matchIsExistingFile } from './utils'

const INPUT_DIR = './generated-images'
const OUTPUT_DIR = './apps/web/public/images/produce'
const SIZES = [256, 512]
const WEBP_QUALITY = 80

async function findMissingSizes(slug: string) {
  const checks = await Promise.all(
    SIZES.map(async (size) => {
      const outputPath = join(OUTPUT_DIR, `${slug}-${size}w.webp`)
      const isExisting = await matchIsExistingFile(outputPath)

      return { size, isExisting }
    })
  )

  return checks
    .filter((check) => {
      return !check.isExisting
    })
    .map((check) => {
      return check.size
    })
}

async function processFile(file: string) {
  const slug = parse(file).name
  const inputPath = join(INPUT_DIR, file)
  const missingSizes = await findMissingSizes(slug)

  if (missingSizes.length === 0) {
    return 'skipped' as const
  }

  for (const size of missingSizes) {
    const outputPath = join(OUTPUT_DIR, `${slug}-${size}w.webp`)

    await sharp(inputPath)
      .resize(size, size, { fit: 'cover' })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath)
  }

  console.log(`OK ${slug} (${missingSizes.join(', ')}w)`)

  return 'generated' as const
}

async function optimizeImages() {
  await mkdir(OUTPUT_DIR, { recursive: true })

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
