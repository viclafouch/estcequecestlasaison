import { readdir, mkdir, access } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const INPUT_DIR = './generated-images'
const OUTPUT_DIR = './apps/web/public/images/produce'
const SIZES = [256, 512]
const WEBP_QUALITY = 80

async function matchFileExists(path: string) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function optimizeImages() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  const files = await readdir(INPUT_DIR)
  const pngFiles = files.filter((file) => file.endsWith('.png'))

  console.log(`Found ${pngFiles.length} PNG files\n`)

  let generated = 0
  let skipped = 0

  for (const file of pngFiles) {
    const slug = parse(file).name
    const inputPath = join(INPUT_DIR, file)
    const missingSizes: number[] = []

    for (const size of SIZES) {
      const outputPath = join(OUTPUT_DIR, `${slug}-${size}w.webp`)
      const isAlreadyOptimized = await matchFileExists(outputPath)

      if (!isAlreadyOptimized) {
        missingSizes.push(size)
      }
    }

    if (missingSizes.length === 0) {
      skipped++
      continue
    }

    for (const size of missingSizes) {
      const outputPath = join(OUTPUT_DIR, `${slug}-${size}w.webp`)

      await sharp(inputPath)
        .resize(size, size, { fit: 'cover' })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath)
    }

    console.log(`OK ${slug} (${missingSizes.join(', ')}w)`)
    generated++
  }

  console.log(`\nDone: ${generated} optimized, ${skipped} skipped, ${pngFiles.length} total`)
}

optimizeImages().catch(console.error)
