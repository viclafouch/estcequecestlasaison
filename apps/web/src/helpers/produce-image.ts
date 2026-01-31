const SIZES = [256, 512, 1024] as const
const DEFAULT_SIZE = 512

export function getProduceImageSrc(slug: string) {
  return `/images/produce/${slug}-${DEFAULT_SIZE}w.webp`
}

export function getProduceImageSrcSet(slug: string) {
  return SIZES.map((size) => {
    return `/images/produce/${slug}-${size}w.webp ${size}w`
  }).join(', ')
}
