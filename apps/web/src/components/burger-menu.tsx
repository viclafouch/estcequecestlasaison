import { ChevronRight, Menu, X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { Link, useLocation } from '@tanstack/react-router'
import { BURGER_NAV_LINKS } from '@/constants/navigation'
import { SITE_NAME_DISPLAY } from '@/constants/site'
import { FrenchFlag } from './french-flag'
import { IconButton } from './ui/icon-button'

export const BurgerMenu = () => {
  const location = useLocation()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton variant="ghost" aria-label="Ouvrir le menu">
          <Menu className="size-5" aria-hidden="true" />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="drawer-overlay fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="drawer-panel fixed inset-y-0 right-0 z-50 flex w-80 flex-col bg-white shadow-xl will-change-transform">
          <div className="flex items-center justify-between px-6 py-5">
            <Dialog.Title className="sr-only">Menu</Dialog.Title>
            <Dialog.Description className="sr-only">
              Navigation du site
            </Dialog.Description>
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
                className="h-8 w-auto"
              />
            </picture>
            <Dialog.Close asChild>
              <IconButton
                variant="ghost-muted"
                size="sm"
                aria-label="Fermer le menu"
              >
                <X className="size-4" aria-hidden="true" />
              </IconButton>
            </Dialog.Close>
          </div>
          <nav aria-label="Menu principal" className="flex-1 px-4 pt-2">
            <p className="px-3 pb-3 text-xs font-medium tracking-wide text-gray-500 uppercase">
              Navigation
            </p>
            <div className="flex flex-col gap-1">
              {BURGER_NAV_LINKS.map((link) => {
                const isActive = link.exact
                  ? location.pathname === link.to
                  : location.pathname.startsWith(link.to as string)
                const Icon = link.icon

                return (
                  <Dialog.Close key={link.to} asChild>
                    <Link
                      to={link.to}
                      data-active={isActive || undefined}
                      className="focus-ring group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-gray-50 data-active:bg-primary-50"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors group-hover:bg-gray-200 group-hover:text-gray-700 group-data-active:bg-primary-100 group-data-active:text-primary-700">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="flex flex-1 flex-col gap-0.5">
                        <span className="text-sm font-medium text-gray-700 group-data-active:text-primary-900">
                          {link.label}
                        </span>
                        <span className="text-xs text-gray-500 group-data-active:text-primary-600">
                          {link.description}
                        </span>
                      </span>
                      <ChevronRight
                        className="size-4 text-gray-300 transition-colors group-hover:text-gray-500 group-data-active:text-primary-400"
                        aria-hidden="true"
                      />
                    </Link>
                  </Dialog.Close>
                )
              })}
            </div>
          </nav>
          <div className="border-t border-gray-100 px-6 py-5">
            <p className="flex items-center gap-2 text-xs text-gray-500">
              <FrenchFlag className="h-2.5 w-auto shrink-0 ring-1 ring-gray-950/10" />
              <span>Mangez de saison, mangez local</span>
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
