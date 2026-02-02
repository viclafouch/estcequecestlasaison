import * as React from 'react'
import { ChevronLeft, ChevronRight, Leaf, Sprout } from 'lucide-react'
import { Drawer } from 'vaul'
import type { Month } from '@estcequecestlasaison/shared'
import {
  getMonthName,
  getNextMonth,
  getPreviousMonth
} from '@estcequecestlasaison/shared'
import type { AvailableIconName } from './icons'
import { matchIsAvailableIcon, ProduceIcon } from './icons'

const MAX_VISIBLE_ICONS = 6

type ProduceIconItem = {
  id: string
  name: string
  icon: string
}

type ProduceIconRowProps = {
  items: ProduceIconItem[]
}

const ProduceIconRow = ({ items }: ProduceIconRowProps) => {
  const visibleItems = items.slice(0, MAX_VISIBLE_ICONS)
  const remainingCount = items.length - MAX_VISIBLE_ICONS

  return (
    <div className="flex items-center gap-1">
      {visibleItems.map((item) => {
        const hasIcon = matchIsAvailableIcon(item.icon)

        return (
          <div
            key={item.id}
            className="btn-icon size-9 bg-white shadow-sm"
            title={item.name}
          >
            {hasIcon ? (
              <ProduceIcon
                name={item.icon as AvailableIconName}
                className="size-5"
              />
            ) : (
              <div className="size-5 rounded-full bg-gray-200" />
            )}
          </div>
        )
      })}
      {remainingCount > 0 ? (
        <div className="btn-icon size-9 bg-white text-xs font-semibold text-gray-500 shadow-sm">
          +{remainingCount}
        </div>
      ) : null}
    </div>
  )
}

export type MonthStatsData = {
  fruits: number
  vegetables: number
  total: number
  arriving: ProduceIconItem[]
  leaving: ProduceIconItem[]
}

type MonthDrawerProps = {
  selectedMonth: Month
  onMonthChange: (month: Month) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  stats: MonthStatsData | undefined
}

export const MonthDrawer = ({
  selectedMonth,
  onMonthChange,
  isOpen,
  onOpenChange,
  stats
}: MonthDrawerProps) => {
  const previousButtonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (isOpen) {
      previousButtonRef.current?.focus()
    }
  }, [isOpen])

  const monthName = getMonthName(selectedMonth)

  const handlePreviousMonth = () => {
    onMonthChange(getPreviousMonth(selectedMonth))
  }

  const handleNextMonth = () => {
    onMonthChange(getNextMonth(selectedMonth))
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-gray-50 focus:outline-none">
          <div className="mx-auto w-full max-w-lg px-6 pb-6 pt-4">
            <Drawer.Handle className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />
            <Drawer.Description className="sr-only">
              Sélectionnez un mois pour voir les fruits et légumes de saison
            </Drawer.Description>
            <div className="flex items-center justify-between">
              <button
                ref={previousButtonRef}
                type="button"
                onClick={handlePreviousMonth}
                className="btn-icon-lg focus-ring bg-white shadow-sm hover:bg-gray-100"
                aria-label="Mois précédent"
              >
                <ChevronLeft className="size-5 text-gray-600" />
              </button>
              <div className="text-center">
                <Drawer.Title className="text-2xl font-bold capitalize text-gray-900">
                  {monthName}
                </Drawer.Title>
                <p className="mt-1 text-sm text-gray-500">
                  {stats ? `${stats.total} produits de saison` : '\u00A0'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleNextMonth}
                className="btn-icon-lg focus-ring bg-white shadow-sm hover:bg-gray-100"
                aria-label="Mois suivant"
              >
                <ChevronRight className="size-5 text-gray-600" />
              </button>
            </div>
            {stats ? (
              <>
                <div className="mt-4 flex justify-center gap-6">
                  <div className="pill">
                    <ProduceIcon name="red-apple" className="size-4" />
                    <span className="text-sm font-medium text-gray-700">
                      {stats.fruits} fruits
                    </span>
                  </div>
                  <div className="pill">
                    <ProduceIcon name="carrot" className="size-4" />
                    <span className="text-sm font-medium text-gray-700">
                      {stats.vegetables} légumes
                    </span>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="card-section bg-emerald-50">
                    <div className="flex items-center gap-3">
                      <div className="btn-icon size-8 bg-emerald-100">
                        <Sprout className="size-4 text-emerald-600" />
                      </div>
                      <span className="text-sm font-medium text-emerald-900">
                        Nouveautés
                      </span>
                    </div>
                    {stats.arriving.length > 0 ? (
                      <ProduceIconRow items={stats.arriving} />
                    ) : (
                      <span className="flex h-9 items-center text-sm text-emerald-600">
                        Aucune
                      </span>
                    )}
                  </div>
                  <div className="card-section bg-amber-50">
                    <div className="flex items-center gap-3">
                      <div className="btn-icon size-8 bg-amber-100">
                        <Leaf className="size-4 text-amber-600" />
                      </div>
                      <span className="text-sm font-medium text-amber-900">
                        Fin de saison
                      </span>
                    </div>
                    {stats.leaving.length > 0 ? (
                      <ProduceIconRow items={stats.leaving} />
                    ) : (
                      <span className="flex h-9 items-center text-sm text-amber-600">
                        Aucune
                      </span>
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
