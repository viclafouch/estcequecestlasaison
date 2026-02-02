import { HEADER_NAV_LINKS } from '@/constants/navigation'
import { SITE_NAME_DISPLAY } from '@/constants/site'
import type { LinkOptions } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

type NavLink = LinkOptions & {
  label: string
  exact: boolean
}

const SITE_HEADER_NAV_LINKS = [
  { to: '/', label: 'Rechercher', exact: true },
  ...HEADER_NAV_LINKS
] as const satisfies readonly NavLink[]

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm md:shadow-none">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="focus-ring rounded-sm">
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img
                src="/logo.png"
                alt={SITE_NAME_DISPLAY}
                width={545}
                height={196}
                className="h-14 w-auto"
              />
            </picture>
          </Link>
          <nav aria-label="Navigation" className="flex items-center gap-6">
            {SITE_HEADER_NAV_LINKS.map((link) => {
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  activeOptions={{ exact: link.exact }}
                  activeProps={{
                    className: 'font-semibold text-gray-900'
                  }}
                  inactiveProps={{
                    className: 'text-gray-600 hover:text-gray-900'
                  }}
                  className="focus-ring rounded-sm py-2 text-sm transition-colors"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
