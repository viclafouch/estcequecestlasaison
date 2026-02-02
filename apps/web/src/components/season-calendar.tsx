import { motion, useReducedMotion } from 'motion/react'
import type { Month, Produce } from '@estcequecestlasaison/shared'
import {
  ALL_MONTHS,
  getMonthName,
  getSeasonRangeLabel
} from '@estcequecestlasaison/shared'

const STAGGER_DELAY = 0.04

type SeasonCalendarProps = {
  produce: Produce
  currentMonth: Month
}

function getSeasonType(produce: Produce, month: Month) {
  return produce.seasons[month] ?? 'off'
}

function getShortMonthName(month: Month) {
  return getMonthName(month).slice(0, 3)
}

export const SeasonCalendar = ({
  produce,
  currentMonth
}: SeasonCalendarProps) => {
  const isReducedMotion = useReducedMotion()
  const seasonRange = getSeasonRangeLabel(produce)

  return (
    <section aria-label="Calendrier de saisonnalité">
      <h2 className="text-xl font-semibold text-gray-900">
        Calendrier de saisonnalité
      </h2>
      <p className="mt-1 text-sm text-gray-500">{seasonRange}</p>
      <div
        role="list"
        className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-12"
      >
        {ALL_MONTHS.map((month, index) => {
          const seasonType = getSeasonType(produce, month)
          const isCurrent = month === currentMonth

          return (
            <motion.div
              key={month}
              role="listitem"
              data-season={seasonType}
              data-current={isCurrent || undefined}
              initial={isReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                isReducedMotion
                  ? undefined
                  : {
                      duration: 0.3,
                      delay: index * STAGGER_DELAY,
                      ease: [0.4, 0, 0.2, 1]
                    }
              }
              className="flex flex-col items-center gap-1.5 rounded-2xl py-3 transition-colors duration-300 data-[season=peak]:bg-primary-100 data-[season=partial]:bg-amber-100 data-[season=off]:bg-gray-100 data-current:ring-2 data-current:ring-gray-900"
            >
              <span
                data-season={seasonType}
                className="text-xs font-semibold uppercase transition-colors duration-300 data-[season=peak]:text-primary-700 data-[season=partial]:text-amber-700 data-[season=off]:text-gray-400"
              >
                {getShortMonthName(month)}
              </span>
              <span
                data-season={seasonType}
                className="size-2 rounded-full transition-colors duration-300 data-[season=peak]:bg-primary-500 data-[season=partial]:bg-amber-400 data-[season=off]:bg-gray-300"
                aria-hidden="true"
              />
            </motion.div>
          )
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span
            className="size-2.5 rounded-full bg-primary-500"
            aria-hidden="true"
          />
          <span className="text-xs text-gray-500">Pleine saison</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="size-2.5 rounded-full bg-amber-400"
            aria-hidden="true"
          />
          <span className="text-xs text-gray-500">Début/fin de saison</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="size-2.5 rounded-full bg-gray-300"
            aria-hidden="true"
          />
          <span className="text-xs text-gray-500">Hors saison</span>
        </div>
      </div>
    </section>
  )
}
