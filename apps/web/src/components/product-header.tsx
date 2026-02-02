import { ChevronLeft } from 'lucide-react'
import { SITE_NAME_DISPLAY } from '@/constants/site'
import { Link } from '@tanstack/react-router'

export const ProductHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm md:shadow-none">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            to="/"
            aria-label="Retour à l'accueil"
            className="focus-ring btn-icon-sm border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
          </Link>
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
          <div className="size-8" aria-hidden="true" />
        </div>
      </div>
    </header>
  )
}
