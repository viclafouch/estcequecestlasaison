import { ChevronUp } from 'lucide-react'
import type { Month } from '@estcequecestlasaison/shared'
import { getMonthName } from '@estcequecestlasaison/shared'
import { useMonthBarScroll } from '../hooks/use-month-bar-scroll'

const ALL_MONTHS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
] as const satisfies Month[]

const MONTH_SETS = [0, 1, 2] as const

type MonthBarProps = {
  selectedMonth: Month
  onMonthChange: (month: Month) => void
  onMonthClick: () => void
}

const preventFocus = (event: React.MouseEvent) => {
  event.preventDefault()
}

export const MonthBar = ({
  selectedMonth,
  onMonthChange,
  onMonthClick
}: MonthBarProps) => {
  const { scrollContainerRef, isReady, handleKeyDown } = useMonthBarScroll({
    selectedMonth,
    onMonthChange
  })

  return (
    <nav
      data-ready={isReady || undefined}
      aria-label="Sélection du mois"
      className="month-bar fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.06)] md:hidden"
    >
      <div
        ref={scrollContainerRef}
        role="tablist"
        aria-orientation="horizontal"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="scrollbar-hide flex snap-x snap-mandatory items-center overflow-x-auto"
      >
        <div className="month-bar-spacer shrink-0" aria-hidden="true" />
        {MONTH_SETS.map((setIndex) => {
          const isCloneSet = setIndex !== 1

          return ALL_MONTHS.map((month) => {
            const isSelected = month === selectedMonth

            const handleClick = () => {
              if (isSelected) {
                onMonthClick()
              } else {
                onMonthChange(month)
              }
            }

            return (
              <button
                key={`${setIndex}-${month}`}
                type="button"
                role="tab"
                data-month={month}
                data-set={setIndex}
                data-active={isSelected || undefined}
                aria-selected={isCloneSet ? undefined : isSelected}
                aria-hidden={isCloneSet || undefined}
                tabIndex={isCloneSet || !isSelected ? -1 : 0}
                onMouseDown={preventFocus}
                onClick={handleClick}
                className="month-bar-item focus-ring shrink-0 snap-center"
              >
                <span className="month-bar-label capitalize">
                  {getMonthName(month)}
                </span>
                <ChevronUp
                  className="month-bar-chevron text-active-500"
                  aria-hidden="true"
                />
              </button>
            )
          })
        })}
        <div className="month-bar-spacer shrink-0" aria-hidden="true" />
      </div>
    </nav>
  )
}
