import { Printer } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { SITE_NAME_DISPLAY } from '@/constants/site'
import type { LinkOptions } from '@tanstack/react-router'
import { Link, useLocation } from '@tanstack/react-router'
import { INSTANT_TRANSITION, SPRING_TRANSITION } from './calendar-table-helpers'
import type { AvailableIconName } from './icons'
import { ProduceIcon } from './icons'

type CalendarTab = LinkOptions & {
  label: string
  icon: AvailableIconName
}

const CALENDAR_TABS = [
  { to: '/calendrier', label: 'Tous', icon: 'globe' },
  { to: '/calendrier/fruits', label: 'Fruits', icon: 'red-apple' },
  { to: '/calendrier/legumes', label: 'L\u00e9gumes', icon: 'carrot' }
] as const satisfies readonly CalendarTab[]

type CalendarTabTo = (typeof CALENDAR_TABS)[number]['to']

function matchIsTabActive(tabTo: CalendarTabTo, pathname: string) {
  if (tabTo === '/calendrier') {
    return pathname === '/calendrier' || pathname === '/calendrier/'
  }

  return pathname === tabTo
}

function handlePrint() {
  window.print()
}

type CalendarTabNavParams = {
  layoutIdSuffix: string
  className: string
  ariaLabel: string
}

const CalendarTabNav = ({
  layoutIdSuffix,
  className,
  ariaLabel
}: CalendarTabNavParams) => {
  const location = useLocation()
  const isReducedMotion = useReducedMotion()

  return (
    <nav aria-label={ariaLabel} className={className}>
      {CALENDAR_TABS.map((tab) => {
        const isActive = matchIsTabActive(tab.to, location.pathname)

        return (
          <Link
            key={tab.to}
            to={tab.to}
            replace
            viewTransition={false}
            activeOptions={{ exact: true }}
            data-active={isActive || undefined}
            className="focus-ring relative flex min-h-11 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-sm transition-colors data-active:text-gray-900 not-data-active:text-gray-600 not-data-active:hover:text-gray-900 md:px-4"
          >
            <ProduceIcon
              name={tab.icon}
              className="size-5"
              aria-hidden="true"
            />
            {tab.label}
            {isActive ? (
              <motion.span
                layoutId={`calendar-tab-underline-${layoutIdSuffix}`}
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-gray-100"
                style={{ zIndex: -1 }}
                transition={
                  isReducedMotion ? INSTANT_TRANSITION : SPRING_TRANSITION
                }
              />
            ) : null}
          </Link>
        )
      })}
    </nav>
  )
}

export const CalendarHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm print:static print:shadow-none print:border-none">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-14 items-center justify-center md:h-20 md:justify-between print:hidden">
          <Link to="/" className="focus-ring rounded-sm">
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img
                src="/logo.png"
                alt={SITE_NAME_DISPLAY}
                width={545}
                height={196}
                className="h-8 w-auto md:h-14"
              />
            </picture>
          </Link>
          <div className="flex items-center gap-4">
            <CalendarTabNav
              layoutIdSuffix="desktop"
              ariaLabel="Filtres calendrier"
              className="hidden md:grid md:grid-cols-3"
            />
            <Link
              to="/faq"
              activeOptions={{ exact: true }}
              activeProps={{
                className: 'font-semibold text-gray-900'
              }}
              inactiveProps={{
                className: 'text-gray-600 hover:text-gray-900'
              }}
              className="focus-ring hidden min-h-11 items-center rounded-sm py-2 text-sm transition-colors md:inline-flex"
            >
              FAQ
            </Link>
            <button
              type="button"
              onClick={handlePrint}
              className="focus-ring hidden size-11 shrink-0 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:flex"
              aria-label="Imprimer le calendrier"
            >
              <Printer className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <CalendarTabNav
          layoutIdSuffix="mobile"
          ariaLabel="Filtres calendrier, mobile"
          className="grid grid-cols-3 border-t border-gray-100 py-1.5 md:hidden print:hidden"
        />
      </div>
      <div className="hidden print:flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <picture>
            <source srcSet="/logo.webp" type="image/webp" />
            <img
              src="/logo.png"
              alt={SITE_NAME_DISPLAY}
              width={545}
              height={196}
              className="h-10 w-auto"
            />
          </picture>
        </div>
        <p className="text-sm text-gray-600">
          {new Intl.DateTimeFormat('fr-FR', {
            month: 'long',
            year: 'numeric'
          }).format(new Date())}
        </p>
      </div>
    </header>
  )
}
