import { Link } from '@tanstack/react-router'

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-8 pb-24 md:py-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <Link
            to="/"
            className="focus-ring rounded-sm text-sm font-bold lowercase text-accent"
          >
            estcequecestlasaison
          </Link>
          <p className="text-xs text-gray-400">
            Bientôt disponible sur iOS et Android
          </p>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} estcequecestlasaison.fr
          </p>
        </div>
      </div>
    </footer>
  )
}
