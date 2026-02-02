import { motion } from 'motion/react'
import { SITE_NAME_DISPLAY } from '@/constants/site'
import type { ProduceType } from '@estcequecestlasaison/shared'
import { Link } from '@tanstack/react-router'
import type { AvailableIconName } from './icons'
import { ProduceIcon } from './icons'

type CategoryTab = {
  type: ProduceType | 'all'
  label: string
  icon: AvailableIconName
}

const CATEGORY_TABS = [
  { type: 'all', label: 'Tous', icon: 'globe' },
  { type: 'fruit', label: 'Fruits', icon: 'red-apple' },
  { type: 'vegetable', label: 'Légumes', icon: 'carrot' }
] as const satisfies CategoryTab[]

type HeaderProps = {
  activeCategory: ProduceType | 'all'
  onCategoryChange: (category: ProduceType | 'all') => void
}

export const Header = ({ activeCategory, onCategoryChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm md:shadow-none">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            to="/"
            className="hidden text-xl font-bold text-accent md:block"
          >
            {SITE_NAME_DISPLAY}
          </Link>
          <nav aria-label="Categories" className="flex-1 md:w-96 md:flex-none">
            <div role="tablist" className="grid grid-cols-3">
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeCategory === tab.type

                return (
                  <button
                    key={tab.type}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      return onCategoryChange(tab.type)
                    }}
                    data-active={isActive || undefined}
                    className="focus-ring relative flex flex-col items-center gap-1 py-3 text-gray-500 transition-colors hover:text-gray-900 data-active:text-gray-900 md:py-4"
                  >
                    <ProduceIcon
                      name={tab.icon}
                      className="size-7"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-medium">{tab.label}</span>
                    {isActive ? (
                      <motion.span
                        layoutId="category-underline"
                        aria-hidden="true"
                        className="absolute bottom-1 left-6 right-6 h-0.75 rounded-full bg-gray-900 md:left-4 md:right-4 md:h-0.5"
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30
                        }}
                      />
                    ) : null}
                  </button>
                )
              })}
            </div>
          </nav>
          <div className="hidden w-44 md:block" />
        </div>
      </div>
    </header>
  )
}
