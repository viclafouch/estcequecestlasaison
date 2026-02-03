import * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import { ChevronLeft, ChevronRight, Leaf, Sprout } from 'lucide-react'
import { Drawer } from 'vaul'
import type { Month } from '@estcequecestlasaison/shared'
import {
  getMonthName,
  getNextMonth,
  getPreviousMonth
} from '@estcequecestlasaison/shared'
import { ProduceIcon } from './icons'
import { ProduceAvatar } from './produce-avatar'
import { CardSection } from './ui/card-section'
import { IconButton, iconButtonVariants } from './ui/icon-button'
import { Pill } from './ui/pill'

const MAX_VISIBLE_ICONS = 5

type ProduceIconItem = {
  id: string
  name: string
  slug: string
}

type ProduceIconRowProps = {
  items: ProduceIconItem[]
}

const ProduceIconRow = ({ items }: ProduceIconRowProps) => {
  const visibleItems = items.slice(0, MAX_VISIBLE_ICONS)
  const remainingCount = items.length - MAX_VISIBLE_ICONS

  return (
    <div className="flex items-center gap-1.5">
      {visibleItems.map((item) => {
        return (
          <div
            key={item.id}
            className={iconButtonVariants({
              class: 'size-8 bg-white/80 shadow-sm'
            })}
            title={item.name}
          >
            <ProduceAvatar
              slug={item.slug}
              name={item.name}
              className="size-6 rounded-full object-cover"
            />
          </div>
        )
      })}
      {remainingCount > 0 ? (
        <div
          className={iconButtonVariants({
            class:
              'size-8 bg-white/80 text-xs font-semibold text-gray-500 shadow-sm'
          })}
        >
          +{remainingCount}
        </div>
      ) : null}
    </div>
  )
}

type ColorScheme = 'emerald' | 'amber'

type ColorSchemeConfig = {
  card: string
  iconBadge: string
  icon: string
  label: string
  empty: string
}

const COLOR_SCHEMES = {
  emerald: {
    card: 'bg-emerald-50/70',
    iconBadge: 'bg-emerald-100/80',
    icon: 'size-4 text-emerald-600',
    label: 'text-sm font-medium text-emerald-800',
    empty: 'text-sm font-medium text-emerald-400'
  },
  amber: {
    card: 'bg-amber-50/70',
    iconBadge: 'bg-amber-100/80',
    icon: 'size-4 text-amber-600',
    label: 'whitespace-nowrap text-sm font-medium text-amber-800',
    empty: 'text-sm font-medium text-amber-400'
  }
} as const satisfies Record<ColorScheme, ColorSchemeConfig>

type SeasonChangeCardProps = {
  icon: LucideIcon
  label: string
  items: ProduceIconItem[]
  colorScheme: ColorScheme
}

const SeasonChangeCard = ({
  icon: Icon,
  label,
  items,
  colorScheme
}: SeasonChangeCardProps) => {
  const colors = COLOR_SCHEMES[colorScheme]

  return (
    <CardSection className={colors.card}>
      <div className="flex items-center gap-2.5">
        <div
          className={iconButtonVariants({
            size: 'sm',
            class: colors.iconBadge
          })}
        >
          <Icon className={colors.icon} aria-hidden="true" />
        </div>
        <span className={colors.label}>{label}</span>
      </div>
      {items.length > 0 ? (
        <ProduceIconRow items={items} />
      ) : (
        <span className={colors.empty}>Aucune</span>
      )}
    </CardSection>
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
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-white focus:outline-none">
          <div className="mx-auto w-full max-w-lg px-6 pb-8 pt-3">
            <Drawer.Handle className="mx-auto mb-6 h-1 w-10 rounded-full bg-gray-200" />
            <Drawer.Description className="sr-only">
              Sélectionnez un mois pour voir les fruits et légumes de saison
            </Drawer.Description>
            <div className="flex items-center justify-between px-2">
              <IconButton
                ref={previousButtonRef}
                size="md"
                variant="outline"
                onClick={handlePreviousMonth}
                aria-label="Mois précédent"
              >
                <ChevronLeft className="size-4 text-gray-600" />
              </IconButton>
              <div className="flex flex-col items-center gap-0.5">
                <Drawer.Title className="text-xl font-bold capitalize text-gray-900">
                  {monthName}
                </Drawer.Title>
                <p className="text-sm text-gray-600">
                  {stats ? `${stats.total} produits de saison` : '\u00A0'}
                </p>
              </div>
              <IconButton
                size="md"
                variant="outline"
                onClick={handleNextMonth}
                aria-label="Mois suivant"
              >
                <ChevronRight className="size-4 text-gray-600" />
              </IconButton>
            </div>
            {stats ? (
              <div className="flex flex-col gap-4 pt-4">
                <div className="flex justify-center gap-3">
                  <Pill>
                    <ProduceIcon
                      name="red-apple"
                      className="size-4"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {stats.fruits} fruits
                    </span>
                  </Pill>
                  <Pill>
                    <ProduceIcon
                      name="carrot"
                      className="size-4"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {stats.vegetables} légumes
                    </span>
                  </Pill>
                </div>
                <div className="space-y-2.5">
                  <SeasonChangeCard
                    icon={Sprout}
                    label="Nouveautés"
                    items={stats.arriving}
                    colorScheme="emerald"
                  />
                  <SeasonChangeCard
                    icon={Leaf}
                    label="Fin de saison"
                    items={stats.leaving}
                    colorScheme="amber"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
