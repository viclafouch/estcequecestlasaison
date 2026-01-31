import type { Produce } from '@estcequecestlasaison/shared'
import {
  getProduceImageSrc,
  getProduceImageSrcSet
} from '../helpers/produce-image'

type ProduceImageProps = {
  produce: Produce
  loading?: 'lazy' | 'eager'
}

export const ProduceImage = ({
  produce,
  loading = 'lazy'
}: ProduceImageProps) => {
  return (
    <img
      src={getProduceImageSrc(produce.slug)}
      srcSet={getProduceImageSrcSet(produce.slug)}
      sizes="(max-width: 640px) 144px, 192px"
      alt={produce.name}
      width={512}
      height={512}
      loading={loading}
      decoding="async"
      className="size-full object-cover"
    />
  )
}
