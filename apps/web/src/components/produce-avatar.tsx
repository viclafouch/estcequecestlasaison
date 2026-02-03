import { getProduceImageSrc } from '../helpers/produce-image'

type ProduceAvatarParams = {
  slug: string
  name: string
  className?: string
}

export const ProduceAvatar = ({
  slug,
  name,
  className
}: ProduceAvatarParams) => {
  return (
    <img
      src={getProduceImageSrc(slug)}
      alt={name}
      width={40}
      height={40}
      loading="lazy"
      decoding="async"
      className={className}
    />
  )
}
