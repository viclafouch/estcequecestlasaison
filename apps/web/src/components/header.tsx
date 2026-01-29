import { motion } from 'motion/react'
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
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="text-xl font-bold text-accent">
            estcequecestlasaison
          </Link>
          <nav className="flex">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.type

              return (
                <button
                  key={tab.type}
                  type="button"
                  onClick={() => {
                    return onCategoryChange(tab.type)
                  }}
                  className={`relative flex flex-col items-center gap-1 px-8 py-4 transition-colors ${
                    isActive
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <ProduceIcon name={tab.icon} className="size-7" />
                  <span className="text-xs font-medium">{tab.label}</span>
                  {isActive ? (
                    <motion.span
                      layoutId="category-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gray-900"
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
          </nav>
          <div className="w-44" />
        </div>
      </div>
    </header>
  )
}
