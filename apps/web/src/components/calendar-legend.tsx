import { SEASON_DOT_STYLES } from '@/constants/season'

type LegendEntry = {
  dotClassName: string
  label: string
}

export const LEGEND_ENTRIES = [
  {
    dotClassName: `size-2.5 ${SEASON_DOT_STYLES.peak.className}`,
    label: SEASON_DOT_STYLES.peak.label
  },
  {
    dotClassName: `size-2.5 ${SEASON_DOT_STYLES.partial.className}`,
    label: SEASON_DOT_STYLES.partial.label
  },
  {
    dotClassName: `size-1.5 ${SEASON_DOT_STYLES.off.className}`,
    label: SEASON_DOT_STYLES.off.label
  }
] satisfies readonly LegendEntry[]

export const SeasonLegend = () => {
  return (
    <div
      id="calendar-legend"
      className="flex flex-wrap items-center gap-5 text-xs text-gray-600 print:hidden"
    >
      {LEGEND_ENTRIES.map((entry) => {
        return (
          <div key={entry.label} className="flex items-center gap-2">
            <span className={entry.dotClassName} aria-hidden="true" />
            <span>{entry.label}</span>
          </div>
        )
      })}
    </div>
  )
}

export const PrintLegend = () => {
  return (
    <div className="hidden items-center gap-6 mt-4 text-xs text-gray-600 print:flex">
      {LEGEND_ENTRIES.map((entry) => {
        return (
          <div key={entry.label} className="flex items-center gap-1.5">
            <span className={entry.dotClassName} aria-hidden="true" />
            <span>{entry.label}</span>
          </div>
        )
      })}
    </div>
  )
}
