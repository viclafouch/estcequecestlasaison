import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Month } from '@estcequecestlasaison/shared'
import {
  getMonthName,
  getNextMonth,
  getPreviousMonth
} from '@estcequecestlasaison/shared'

type MonthBarProps = {
  selectedMonth: Month
  currentYear: number
  onMonthChange: (month: Month) => void
  onMonthClick: () => void
}

export const MonthBar = ({
  selectedMonth,
  currentYear,
  onMonthChange,
  onMonthClick
}: MonthBarProps) => {
  const monthName = getMonthName(selectedMonth)

  const handlePreviousMonth = () => {
    onMonthChange(getPreviousMonth(selectedMonth))
  }

  const handleNextMonth = () => {
    onMonthChange(getNextMonth(selectedMonth))
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.06)] md:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <button
          type="button"
          onClick={handlePreviousMonth}
          className="focus-ring flex size-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          aria-label="Mois précédent"
        >
          <ChevronLeft className="size-5 text-gray-600" />
        </button>
        <button
          type="button"
          onClick={onMonthClick}
          className="focus-ring rounded-lg px-4 py-1.5 text-base font-semibold capitalize text-gray-900 transition-colors hover:bg-gray-100"
        >
          {monthName} {currentYear}
        </button>
        <button
          type="button"
          onClick={handleNextMonth}
          className="focus-ring flex size-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          aria-label="Mois suivant"
        >
          <ChevronRight className="size-5 text-gray-600" />
        </button>
      </div>
    </div>
  )
}
