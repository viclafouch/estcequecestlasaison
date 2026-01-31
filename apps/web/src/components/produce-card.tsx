import {
  getDefaultProduceBadge,
  getProduceBadge,
  type Month,
  type Produce,
  type ProduceSection
} from '@estcequecestlasaison/shared'
import { Link } from '@tanstack/react-router'
import { ProduceImage } from './produce-image'

type ProduceCardProps = {
  produce: Produce
  month: Month
  section?: ProduceSection
}

export const ProduceCard = ({ produce, month, section }: ProduceCardProps) => {
  const badge = section
    ? getProduceBadge({ produce, month, section })
    : getDefaultProduceBadge({ produce, month })

  return (
    <Link
      to="/$slug"
      params={{ slug: produce.slug }}
      className="focus-ring flex min-w-0 flex-col rounded-2xl"
    >
      <div className="relative mb-3 overflow-hidden rounded-2xl bg-gray-100">
        <div className="aspect-square">
          <ProduceImage produce={produce} />
        </div>
        <span
          data-variant={badge.variant}
          className="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur-sm data-[variant=positive]:text-badge-positive data-[variant=warning]:text-badge-warning data-[variant=neutral]:text-badge-neutral"
        >
          {badge.label}
        </span>
      </div>
      <h3 className="truncate font-semibold text-gray-900">{produce.name}</h3>
      <p className="text-sm text-gray-500">
        {produce.type === 'fruit' ? 'Fruit' : 'Légume'}
      </p>
    </Link>
  )
}
