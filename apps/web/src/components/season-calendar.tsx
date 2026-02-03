import { motion, useReducedMotion } from 'motion/react'
import { SEASON_DOT_STYLES } from '@/constants/season'
import type { Month, Produce, SeasonStatus } from '@estcequecestlasaison/shared'
import {
  ALL_MONTHS,
  getCurrentYear,
  getMonthName,
  getSeasonRangeLabel,
  getShortMonthName,
  SEASON_STATUS_LABELS
} from '@estcequecestlasaison/shared'

const STAGGER_DELAY = 0.04

type SeasonCalendarProps = {
  produce: Produce
  currentMonth: Month
}

function getSeasonType(produce: Produce, month: Month) {
  return produce.seasons[month] ?? 'off'
}

function getGridDotClassName(seasonType: SeasonStatus) {
  return `size-2 ${SEASON_DOT_STYLES[seasonType].className}`
}

export const SeasonCalendar = ({
  produce,
  currentMonth
}: SeasonCalendarProps) => {
  const isReducedMotion = useReducedMotion()
  const seasonRange = getSeasonRangeLabel(produce)
  const currentYear = getCurrentYear()

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
          const displaySeason = isCurrent ? 'current' : seasonType

          return (
            <motion.div
              key={month}
              role="listitem"
              aria-label={`${getMonthName(month)} - ${SEASON_STATUS_LABELS[seasonType]}`}
              data-season={displaySeason}
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
              className="flex flex-col items-center gap-1.5 rounded-2xl py-3 transition-colors duration-300 data-[season=peak]:bg-primary-100 data-[season=partial]:bg-warning-100 data-[season=off]:bg-gray-100 data-[season=current]:bg-active-50"
            >
              <time
                dateTime={`${currentYear}-${String(month).padStart(2, '0')}`}
                data-season={displaySeason}
                className="text-xs font-semibold uppercase transition-colors duration-300 data-[season=peak]:text-primary-700 data-[season=partial]:text-warning-700 data-[season=off]:text-gray-400 data-[season=current]:text-active-700"
              >
                {getShortMonthName(month)}
              </time>
              <span
                className={getGridDotClassName(seasonType)}
                aria-hidden="true"
              />
            </motion.div>
          )
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span
            className={`size-2.5 ${SEASON_DOT_STYLES.peak.className}`}
            aria-hidden="true"
          />
          <span className="text-xs text-gray-500">
            {SEASON_DOT_STYLES.peak.label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`size-2.5 ${SEASON_DOT_STYLES.partial.className}`}
            aria-hidden="true"
          />
          <span className="text-xs text-gray-500">
            {SEASON_DOT_STYLES.partial.label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`size-2.5 ${SEASON_DOT_STYLES.off.className}`}
            aria-hidden="true"
          />
          <span className="text-xs text-gray-500">
            {SEASON_DOT_STYLES.off.label}
          </span>
        </div>
      </div>
    </section>
  )
}
