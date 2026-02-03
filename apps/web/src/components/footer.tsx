import { SITE_NAME_DISPLAY } from '@/constants/site'
import { getCurrentYear } from '@estcequecestlasaison/shared'
import type { LinkOptions } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { FrenchFlag } from './french-flag'

type ProduceLink = { slug: string; name: string }

const POPULAR_FRUITS = [
  { slug: 'fraise', name: 'Fraise' },
  { slug: 'cerise', name: 'Cerise' },
  { slug: 'pomme', name: 'Pomme' },
  { slug: 'orange', name: 'Orange' }
] as const satisfies readonly ProduceLink[]

const POPULAR_VEGETABLES = [
  { slug: 'tomate', name: 'Tomate' },
  { slug: 'carotte', name: 'Carotte' },
  { slug: 'courgette', name: 'Courgette' },
  { slug: 'poireau', name: 'Poireau' }
] as const satisfies readonly ProduceLink[]

type FooterNavLink = {
  to: LinkOptions['to']
  label: string
}

const NAV_LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/calendrier', label: 'Calendrier' },
  { to: '/faq', label: 'FAQ' }
] as const satisfies readonly FooterNavLink[]

type ProduceLinkListParams = {
  items: readonly ProduceLink[]
  label: string
}

const ProduceLinkList = ({ items, label }: ProduceLinkListParams) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-gray-900">{label}</p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => {
          return (
            <li key={item.slug}>
              <Link
                to="/$slug"
                params={{ slug: item.slug }}
                className="focus-ring rounded-sm py-1 text-sm text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white print:hidden">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-24 md:pb-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link to="/" className="focus-ring w-fit rounded-sm">
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
                  className="h-10 w-auto"
                />
              </picture>
            </Link>
            <p className="flex items-start gap-1.5 text-sm text-gray-600">
              <FrenchFlag className="mt-0.5 h-3.5 w-auto shrink-0 rounded-xs ring-1 ring-gray-950/10" />
              <span className="text-balance">
                Découvrez les fruits et légumes de saison en France, mois par
                mois.
              </span>
            </p>
          </div>
          <nav
            aria-label="Navigation"
            className="flex flex-col gap-3 lg:col-span-1"
          >
            <p className="text-sm font-semibold text-gray-900">Navigation</p>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="focus-ring rounded-sm py-1 text-sm text-gray-600 hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <nav aria-label="Fruits populaires">
            <ProduceLinkList items={POPULAR_FRUITS} label="Fruits populaires" />
          </nav>
          <nav aria-label="Légumes populaires">
            <ProduceLinkList
              items={POPULAR_VEGETABLES}
              label="Légumes populaires"
            />
          </nav>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 md:flex-row">
          <p className="text-sm text-gray-600">
            &copy; {getCurrentYear()} estcequecestlasaison.fr
          </p>
          <p className="text-sm text-gray-600">
            Bientôt disponible sur iOS et Android
          </p>
        </div>
      </div>
    </footer>
  )
}
