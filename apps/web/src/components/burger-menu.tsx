import * as React from 'react'
import { Menu, X } from 'lucide-react'
import type { Transition } from 'motion/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { BURGER_NAV_LINKS } from '@/constants/navigation'
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
                className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-white shadow-xl"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={transition}
              >
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    Menu
                  </Dialog.Title>
                  <Dialog.Description className="sr-only">
                    Navigation du site
                  </Dialog.Description>
                  <Dialog.Close asChild>
                    <IconButton
                      variant="ghost-muted"
                      aria-label="Fermer le menu"
                    >
                      <X className="size-5" aria-hidden="true" />
                    </IconButton>
                  </Dialog.Close>
                </div>
                <nav aria-label="Menu principal" className="flex flex-col p-4">
                  {BURGER_NAV_LINKS.map((link) => {
                    const isActive = link.exact
                      ? location.pathname === link.to
                      : location.pathname.startsWith(link.to as string)

                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => {
                          setIsOpen(false)
                        }}
                        data-active={isActive || undefined}
                        className="focus-ring rounded-lg px-3 py-3 text-base text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 data-active:font-semibold data-active:text-gray-900"
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  )
}
