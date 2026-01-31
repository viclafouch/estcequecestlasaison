import {
  getDefaultProduceBadge,
  getProduceBadge,
  type Month,
  type Produce,
  type ProduceSection
} from '@estcequecestlasaison/shared'
import { Link } from '@tanstack/react-router'
import { matchIsAvailableIcon, ProduceIcon } from './icons'

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
        <div className="flex aspect-square items-center justify-center p-6">
          {matchIsAvailableIcon(produce.icon) ? (
            <ProduceIcon name={produce.icon} className="size-24" />
          ) : (
            <div className="size-24" />
          )}
        </div>
        <span
          data-variant={badge.variant}
          className="absolute left-3 top-3 rounded-lg px-2.5 py-1 text-xs font-medium data-[variant=positive]:bg-season-peak data-[variant=positive]:text-white data-[variant=warning]:bg-season-partial data-[variant=warning]:text-gray-900 data-[variant=neutral]:bg-gray-200 data-[variant=neutral]:text-gray-600"
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
