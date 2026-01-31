import { readdir, mkdir } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const INPUT_DIR = './generated-images'
const OUTPUT_DIR = './apps/web/public/images/produce'
const SIZES = [256, 512, 1024]
const WEBP_QUALITY = 80

async function optimizeImages() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  const files = await readdir(INPUT_DIR)
  const pngFiles = files.filter((file) => {
    return file.endsWith('.png')
  })

  console.log(`Found ${pngFiles.length} PNG files\n`)

  let totalInputSize = 0
  let totalOutputSize = 0

  for (const file of pngFiles) {
    const slug = parse(file).name
    const inputPath = join(INPUT_DIR, file)
    const { size: inputSize } = await sharp(inputPath).metadata()

    totalInputSize += inputSize ?? 0

    for (const size of SIZES) {
      const outputPath = join(OUTPUT_DIR, `${slug}-${size}w.webp`)

      const { size: outputSize } = await sharp(inputPath)
        .resize(size, size, { fit: 'cover' })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath)

      totalOutputSize += outputSize
    }

    console.log(`OK ${slug} (${SIZES.length} sizes)`)
  }

  const inputMB = (totalInputSize / 1024 / 1024).toFixed(1)
  const outputMB = (totalOutputSize / 1024 / 1024).toFixed(1)
  const ratio = ((1 - totalOutputSize / totalInputSize) * 100).toFixed(0)

  console.log(`\nDone: ${pngFiles.length} images x ${SIZES.length} sizes = ${pngFiles.length * SIZES.length} files`)
  console.log(`Input: ${inputMB}MB -> Output: ${outputMB}MB (${ratio}% reduction)`)
}

optimizeImages().catch(console.error)
