/// <reference types="vite/client" />
import { Footer } from '@/components/footer'
import { NotFound } from '@/components/not-found'
import { WEBSITE_JSON_LD } from '@/constants/json-ld'
import { SITE_DOMAIN, SITE_NAME, THEME_COLOR } from '@/constants/site'
import { SearchProvider } from '@/hooks/use-search'
import appCss from '@/styles.css?url'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Scripts
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

const RootDocument = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: WEBSITE_JSON_LD }}
        />
        <HeadContent />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-gray-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Aller au contenu principal
        </a>
        <SearchProvider>
          {children}
          <Footer />
        </SearchProvider>
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

const RootError = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6">
      <h1 className="text-6xl font-bold text-gray-900">Erreur</h1>
      <p className="mt-4 text-lg text-gray-500">Une erreur est survenue.</p>
      <Link
        to="/"
        className="focus-ring mt-8 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
      >
        Retour à l'accueil
      </Link>
    </div>
  )
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => {
    return {
      meta: [
        { charSet: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover'
        },
        { name: 'theme-color', content: THEME_COLOR },
        { name: 'color-scheme', content: 'light' },
        { name: 'robots', content: 'index,follow,noai,noimageai' },
        { name: 'application-name', content: SITE_NAME },
        { name: 'apple-mobile-web-app-title', content: SITE_NAME },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'default'
        },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'msapplication-TileColor', content: THEME_COLOR },
        { name: 'author', content: SITE_DOMAIN },
        { name: 'copyright', content: SITE_DOMAIN }
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
  errorComponent: RootError
})
