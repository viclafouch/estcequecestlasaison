import { Search } from 'lucide-react'
import { motion } from 'motion/react'
import { SITE_NAME_DISPLAY } from '@/constants/site'
import type { ProduceType } from '@estcequecestlasaison/shared'
import { Link } from '@tanstack/react-router'
import { BurgerMenu } from './burger-menu'
import { FrenchFlag } from './french-flag'
import type { AvailableIconName } from './icons'
import { ProduceIcon } from './icons'
import { IconButton } from './ui/icon-button'

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

type CategoryTabsConfig = {
  activeCategory: ProduceType | 'all'
  onCategoryChange: (category: ProduceType | 'all') => void
}

type SearchDrawerConfig = {
  onOpen: () => void
}

type CategoryTabListProps = {
  config: CategoryTabsConfig
  layoutId: string
  buttonClassName: string
  underlineClassName: string
}

const CategoryTabList = ({
  config,
  layoutId,
  buttonClassName,
  underlineClassName
}: CategoryTabListProps) => {
  return (
    <div role="tablist" className="grid grid-cols-3">
      {CATEGORY_TABS.map((tab) => {
        const isActive = config.activeCategory === tab.type

        return (
          <button
            key={tab.type}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              return config.onCategoryChange(tab.type)
            }}
            data-active={isActive || undefined}
            className={`focus-ring relative flex flex-col items-center gap-1 text-gray-500 transition-colors hover:text-gray-900 data-active:text-gray-900 ${buttonClassName}`}
          >
            <ProduceIcon
              name={tab.icon}
              className="size-7"
              aria-hidden="true"
            />
            <span className="text-xs font-medium">{tab.label}</span>
            {isActive ? (
              <motion.span
                layoutId={layoutId}
                aria-hidden="true"
                className={`absolute rounded-full bg-gray-900 ${underlineClassName}`}
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
  )
}

type SiteHeaderProps = {
  categoryTabs?: CategoryTabsConfig
  searchDrawer?: SearchDrawerConfig
}

export const SiteHeader = ({ categoryTabs, searchDrawer }: SiteHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm md:shadow-none">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          <div className="flex shrink-0 items-center gap-2.5">
            <Link to="/" className="focus-ring rounded-sm">
              <picture>
                <source
                  srcSet="/logo.webp"
                  type="image/webp"
                  width={545}
                  height={196}
                />
                <img
                  src="/logo.png"
                  alt={SITE_NAME_DISPLAY}
                  width={545}
                  height={196}
                  fetchPriority="high"
                  className="h-10 w-auto md:h-14"
                />
              </picture>
            </Link>
            <FrenchFlag className="h-3 w-auto shrink-0 ring-1 ring-gray-950/10 md:h-4" />
          </div>
          {categoryTabs ? (
            <nav
              aria-label="Cat\u00e9gories"
              className="hidden flex-none md:block md:w-96"
            >
              <CategoryTabList
                config={categoryTabs}
                layoutId="category-underline"
                buttonClassName="py-4"
                underlineClassName="bottom-1 left-4 right-4 h-0.5"
              />
            </nav>
          ) : null}
          <div className="flex items-center gap-2">
            {searchDrawer ? (
              <IconButton
                variant="ghost"
                onClick={searchDrawer.onOpen}
                className="md:hidden"
                aria-label="Ouvrir la recherche"
              >
                <Search className="size-5" aria-hidden="true" />
              </IconButton>
            ) : null}
            <BurgerMenu />
          </div>
        </div>
      </div>
      {categoryTabs ? (
        <nav
          aria-label="Cat\u00e9gories mobile"
          className="border-t border-gray-100 md:hidden"
        >
          <div className="mx-auto max-w-7xl px-6">
            <CategoryTabList
              config={categoryTabs}
              layoutId="category-underline-mobile"
              buttonClassName="py-3"
              underlineClassName="bottom-1 left-6 right-6 h-0.75"
            />
          </div>
        </nav>
      ) : null}
    </header>
  )
}
