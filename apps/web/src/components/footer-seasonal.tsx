import { Link } from '@tanstack/react-router'
import type { AvailableIconName } from './icons'
import { matchIsAvailableIcon, ProduceIcon } from './icons'

const MAX_SEASONAL_ITEMS = 8

type SeasonalItem = {
  slug: string
  name: string
  icon: string
}

type FooterSeasonalParams = {
  monthName: string
  seasonalProduce: SeasonalItem[]
}

export const FooterSeasonal = ({
  monthName,
  seasonalProduce
}: FooterSeasonalParams) => {
  const visibleProduce = seasonalProduce
    .filter((item) => {
      return matchIsAvailableIcon(item.icon)
    })
    .slice(0, MAX_SEASONAL_ITEMS)

  return (
    <nav aria-label={`En saison en ${monthName}`}>
      <p className="text-sm font-semibold tracking-wide text-gray-900">
        En saison en {monthName}
      </p>
      <ul className="mt-3 flex flex-col gap-1.5">
        {visibleProduce.map((item) => {
          return (
            <li key={item.slug}>
              <Link
                to="/$slug"
                params={{ slug: item.slug }}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
              >
                <ProduceIcon
                  name={item.icon as AvailableIconName}
                  className="size-4"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
