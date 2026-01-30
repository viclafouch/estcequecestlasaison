import type { Month, Produce } from '@estcequecestlasaison/shared'
import { getSeasonLabel, getSeasonStatus } from '@estcequecestlasaison/shared'
import { Link } from '@tanstack/react-router'
import { matchIsAvailableIcon, ProduceIcon } from './icons'

type ProduceCardProps = {
  produce: Produce
  month: Month
}

export const ProduceCard = ({ produce, month }: ProduceCardProps) => {
  const status = getSeasonStatus(produce, month)
  const label = getSeasonLabel(status)

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
          data-status={status}
          className="absolute left-3 top-3 rounded-lg px-2.5 py-1 text-xs font-medium data-[status=peak]:bg-season-peak data-[status=peak]:text-white data-[status=start]:bg-season-partial data-[status=start]:text-gray-900 data-[status=end]:bg-season-partial data-[status=end]:text-gray-900 data-[status=off]:bg-gray-200 data-[status=off]:text-gray-600"
        >
          {label}
        </span>
      </div>
      <h3 className="truncate font-semibold text-gray-900">{produce.name}</h3>
      <p className="text-sm text-gray-500">
        {produce.type === 'fruit' ? 'Fruit' : 'Légume'}
      </p>
    </Link>
  )
}
