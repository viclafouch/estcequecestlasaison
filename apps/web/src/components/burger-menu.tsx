import * as React from 'react'
import { ChevronRight, Menu, X } from 'lucide-react'
import type { Transition } from 'motion/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { BURGER_NAV_LINKS } from '@/constants/navigation'
import { SITE_NAME_DISPLAY } from '@/constants/site'
import * as Dialog from '@radix-ui/react-dialog'
import { Link, useLocation } from '@tanstack/react-router'
import { IconButton } from './ui/icon-button'

const SLIDE_TRANSITION = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1]
} as const satisfies Transition

const INSTANT_TRANSITION = {
  duration: 0
} as const satisfies Transition

const STAGGER_DELAY = 0.06

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const location = useLocation()
  const isReducedMotion = useReducedMotion()

  const transition = isReducedMotion ? INSTANT_TRANSITION : SLIDE_TRANSITION

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <IconButton variant="ghost" aria-label="Ouvrir le menu">
          <Menu className="size-5" aria-hidden="true" />
        </IconButton>
      </Dialog.Trigger>
      <AnimatePresence>
        {isOpen ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed inset-y-0 right-0 z-50 flex w-80 flex-col bg-white shadow-xl"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={transition}
              >
                <div className="flex items-center justify-between px-6 py-5">
                  <Dialog.Title className="sr-only">Menu</Dialog.Title>
                  <Dialog.Description className="sr-only">
                    Navigation du site
                  </Dialog.Description>
                  <picture>
                    <source srcSet="/logo.webp" type="image/webp" />
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
                  <p className="px-3 pb-3 text-xs font-medium tracking-wide text-gray-400 uppercase">
                    Navigation
                  </p>
                  <div className="flex flex-col gap-1">
                    {BURGER_NAV_LINKS.map((link, index) => {
                      const isActive = link.exact
                        ? location.pathname === link.to
                        : location.pathname.startsWith(link.to as string)
                      const Icon = link.icon

                      return (
                        <motion.div
                          key={link.to}
                          initial={
                            isReducedMotion ? false : { opacity: 0, x: 20 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            ...transition,
                            delay: isReducedMotion
                              ? 0
                              : STAGGER_DELAY * (index + 1)
                          }}
                        >
                          <Link
                            to={link.to}
                            onClick={() => {
                              setIsOpen(false)
                            }}
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
                              <span className="text-xs text-gray-400 group-data-active:text-primary-600">
                                {link.description}
                              </span>
                            </span>
                            <ChevronRight
                              className="size-4 text-gray-300 transition-colors group-hover:text-gray-500 group-data-active:text-primary-400"
                              aria-hidden="true"
                            />
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </nav>

                <motion.div
                  className="border-t border-gray-100 px-6 py-5"
                  initial={isReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    ...transition,
                    delay: isReducedMotion
                      ? 0
                      : STAGGER_DELAY * (BURGER_NAV_LINKS.length + 2)
                  }}
                >
                  <p className="text-xs text-gray-400">
                    Mangez de saison, mangez local
                  </p>
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  )
}
