import { SITE_NAME_DISPLAY } from '@/constants/site'
import { Link } from '@tanstack/react-router'

const POPULAR_FRUITS = [
  { slug: 'fraise', name: 'Fraise' },
  { slug: 'cerise', name: 'Cerise' },
  { slug: 'pomme', name: 'Pomme' },
  { slug: 'orange', name: 'Orange' },
  { slug: 'melon', name: 'Melon' },
  { slug: 'raisin', name: 'Raisin' }
] as const

const POPULAR_VEGETABLES = [
  { slug: 'tomate', name: 'Tomate' },
  { slug: 'carotte', name: 'Carotte' },
  { slug: 'courgette', name: 'Courgette' },
  { slug: 'poireau', name: 'Poireau' },
  { slug: 'pomme-de-terre', name: 'Pomme de terre' },
  { slug: 'aubergine', name: 'Aubergine' }
] as const

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-8 pb-24 md:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <nav aria-label="Fruits populaires">
            <p className="text-xs font-semibold tracking-wide text-gray-900 uppercase">
              Fruits
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {POPULAR_FRUITS.map((item) => {
                return (
                  <li key={item.slug}>
                    <Link
                      to="/$slug"
                      params={{ slug: item.slug }}
                      className="text-xs text-gray-500 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <nav aria-label="Légumes populaires">
            <p className="text-xs font-semibold tracking-wide text-gray-900 uppercase">
              Légumes
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {POPULAR_VEGETABLES.map((item) => {
                return (
                  <li key={item.slug}>
                    <Link
                      to="/$slug"
                      params={{ slug: item.slug }}
                      className="text-xs text-gray-500 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="flex flex-col gap-3 md:items-end md:text-right">
            <Link
              to="/"
              className="focus-ring w-fit rounded-sm text-sm font-bold lowercase text-accent"
            >
              {SITE_NAME_DISPLAY}
            </Link>
            <p className="text-xs text-gray-400">
              Bientôt disponible sur iOS et Android
            </p>
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} estcequecestlasaison.fr
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
