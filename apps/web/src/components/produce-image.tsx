import type { Produce } from '@estcequecestlasaison/shared'
import {
  getProduceImageSrc,
  getProduceImageSrcSet
} from '../helpers/produce-image'

type ProduceImageProps = {
  produce: Produce
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
}

export const ProduceImage = ({
  produce,
  loading = 'lazy',
  fetchPriority
}: ProduceImageProps) => {
  return (
    <img
      src={getProduceImageSrc(produce.slug)}
      srcSet={getProduceImageSrcSet(produce.slug)}
      sizes="(max-width: 640px) 144px, 170px"
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
