import type { Produce } from '@estcequecestlasaison/shared'
import {
  getProduceImageSrc,
  getProduceImageSrcSet
} from '../helpers/produce-image'

const DEFAULT_SIZES = '(max-width: 640px) 144px, 170px'

type ProduceImageProps = {
  produce: Produce
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  sizes?: string
}

export const ProduceImage = ({
  produce,
  loading = 'lazy',
  fetchPriority,
  sizes = DEFAULT_SIZES
}: ProduceImageProps) => {
  return (
    <img
      src={getProduceImageSrc(produce.slug)}
      srcSet={getProduceImageSrcSet(produce.slug)}
      sizes={sizes}
      alt={produce.name}
      width={256}
      height={256}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={fetchPriority === 'high' ? 'sync' : 'async'}
      className="size-full object-cover"
    />
  )
}
