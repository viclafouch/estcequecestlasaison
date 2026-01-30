import type { Month, Produce } from '@estcequecestlasaison/shared'
import { getSeasonLabel, getSeasonStatus } from '@estcequecestlasaison/shared'
import { Link } from '@tanstack/react-router'
import { matchIsAvailableIcon, ProduceIcon } from './icons'

type ProduceCardProps = {
  produce: Produce
  month: Month
}

const SEASON_BADGE_STYLES = {
  peak: 'bg-season-peak text-white',
  start: 'bg-season-partial text-gray-900',
  end: 'bg-season-partial text-gray-900',
  off: 'bg-gray-200 text-gray-600'
} as const satisfies { [K in ReturnType<typeof getSeasonStatus>]: string }

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
          className={`absolute left-3 top-3 rounded-lg px-2.5 py-1 text-xs font-medium ${SEASON_BADGE_STYLES[status]}`}
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
