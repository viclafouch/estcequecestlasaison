/// <reference types="vite/client" />
import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  createRootRoute,
  HeadContent,
  Link,
  Scripts
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import appCss from '../styles.css?url'

const RootDocument = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />
            }
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

const NotFound = () => {
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

export const Route = createRootRoute({
  head: () => {
    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { title: 'TanStack Start Starter' }
      ],
      links: [{ rel: 'stylesheet', href: appCss }]
    }
  },
  shellComponent: RootDocument,
  notFoundComponent: NotFound
})
