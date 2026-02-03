import { seasonalFooterOptions } from '@/constants/queries'
import { SITE_NAME_DISPLAY } from '@/constants/site'
import { getCurrentYear } from '@estcequecestlasaison/shared'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { FooterSeasonal } from './footer-seasonal'
import { FrenchFlag } from './french-flag'

const POPULAR_FRUITS = [
  { slug: 'fraise', name: 'Fraise' },
  { slug: 'cerise', name: 'Cerise' },
  { slug: 'pomme', name: 'Pomme' },
  { slug: 'orange', name: 'Orange' }
] as const

const POPULAR_VEGETABLES = [
  { slug: 'tomate', name: 'Tomate' },
  { slug: 'carotte', name: 'Carotte' },
  { slug: 'courgette', name: 'Courgette' },
  { slug: 'poireau', name: 'Poireau' }
] as const

type ProduceLink = { slug: string; name: string }

type ProduceLinkListParams = {
  items: readonly ProduceLink[]
  label: string
}

const ProduceLinkList = ({ items, label }: ProduceLinkListParams) => {
  return (
    <nav aria-label={label}>
      <p className="text-sm font-semibold tracking-wide text-gray-900">
        {label}
      </p>
      <ul className="mt-3 flex flex-col gap-1.5">
        {items.map((item) => {
          return (
            <li key={item.slug}>
              <Link
                to="/$slug"
                params={{ slug: item.slug }}
                className="py-0.5 text-sm text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export const Footer = () => {
  const seasonalQuery = useQuery(seasonalFooterOptions())

  return (
    <footer className="border-t border-gray-200 bg-white print:hidden">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 md:py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
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
            <p className="flex items-start gap-1.5 text-sm text-gray-500">
              <FrenchFlag className="mt-1 h-3 w-auto shrink-0 ring-1 ring-gray-950/10" />
              <span>
                Découvrez les fruits et légumes de saison en France, mois par
                mois.
              </span>
            </p>
          </div>
          {seasonalQuery.data ? (
            <FooterSeasonal
              monthName={seasonalQuery.data.monthName}
              seasonalProduce={seasonalQuery.data.seasonalProduce}
            />
          ) : null}
          <ProduceLinkList items={POPULAR_FRUITS} label="Fruits populaires" />
          <ProduceLinkList
            items={POPULAR_VEGETABLES}
            label="Légumes populaires"
          />
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 md:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {getCurrentYear()} estcequecestlasaison.fr
          </p>
          <nav aria-label="Liens utiles" className="flex gap-4">
            <Link
              to="/faq"
              className="py-1 text-sm text-gray-500 hover:text-gray-900"
            >
              FAQ
            </Link>
          </nav>
          <p className="text-sm text-gray-500">
            Bientôt disponible sur iOS et Android
          </p>
        </div>
      </div>
    </footer>
  )
}
