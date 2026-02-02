import { Link } from '@tanstack/react-router'

export const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6">
      <p className="text-6xl font-bold text-gray-900">404</p>
      <p className="mt-4 text-lg text-gray-500">
        Cette page n&apos;existe pas.
      </p>
      <Link
        to="/"
        className="focus-ring mt-8 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}
