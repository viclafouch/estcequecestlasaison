import * as React from 'react'
import { Command } from 'cmdk'
import { Command as CommandIcon, Loader2, Search, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { INSTANT_TRANSITION, SCALE_TRANSITION } from '@/constants/animation'
import { searchSuggestionsOptions } from '@/constants/queries'
import { matchIsMacPlatform } from '@/helpers/platform'
import { cn } from '@/lib/cn'
import * as Dialog from '@radix-ui/react-dialog'
import { useDebouncedValue } from '@tanstack/react-pacer'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { ProduceAvatar } from './produce-avatar'
import { ProduceBadge } from './produce-badge'

type SearchCommandContentProps = {
  onClose: () => void
}

const SearchCommandContent = ({ onClose }: SearchCommandContentProps) => {
  const [inputValue, setInputValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const isReducedMotion = useReducedMotion()

  const handleOpenAutoFocus = (event: Event) => {
    event.preventDefault()
    inputRef.current?.focus()
  }

  const [debouncedQuery] = useDebouncedValue(inputValue, { wait: 200 })

  const suggestionsQuery = useQuery(searchSuggestionsOptions(debouncedQuery))

  const transition = isReducedMotion ? INSTANT_TRANSITION : SCALE_TRANSITION

  const handleSelect = (slug: string) => {
    void navigate({ to: '/$slug', params: { slug } })
    onClose()
  }

  const isMac = matchIsMacPlatform()
  const hasQuery = debouncedQuery.trim().length > 0
  const isLoading = suggestionsQuery.isFetching && hasQuery
  const resultCount = suggestionsQuery.data?.length ?? 0

  const getResultMessage = () => {
    if (!hasQuery) {
      return ''
    }

    if (isLoading) {
      return 'Recherche en cours'
    }

    if (resultCount === 0) {
      return 'Aucun résultat'
    }

    return `${resultCount} résultat${resultCount > 1 ? 's' : ''}`
  }

  return (
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
      <Dialog.Content asChild forceMount onOpenAutoFocus={handleOpenAutoFocus}>
        <motion.div
          className={cn(
            'fixed z-50 flex flex-col overflow-hidden bg-white overscroll-contain rounded-2xl shadow-2xl',
            'top-3 right-3 left-3 max-h-[calc(100dvh-1.5rem)]',
            'md:inset-auto md:top-[20%] md:left-1/2 md:max-h-none md:w-full md:max-w-lg md:-translate-x-1/2 md:border md:border-gray-200'
          )}
          initial={isReducedMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={isReducedMotion ? undefined : { opacity: 0, scale: 0.97 }}
          transition={transition}
        >
          <Dialog.Title className="sr-only">Rechercher</Dialog.Title>
          <Dialog.Description className="sr-only">
            Rechercher un fruit ou légume de saison
          </Dialog.Description>
          <Command shouldFilter={false}>
            <div className="flex items-center gap-3 border-b border-gray-200 px-4">
              <Search
                className="size-5 shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Command.Input
                value={inputValue}
                onValueChange={setInputValue}
                placeholder="Rechercher un fruit ou légume…"
                ref={inputRef}
                className="flex-1 bg-transparent py-4 text-base text-gray-900 placeholder:text-gray-400 focus-visible:outline-none"
              />
              {isLoading ? (
                <Loader2
                  className="size-4 shrink-0 animate-spin text-gray-400"
                  aria-hidden="true"
                />
              ) : null}
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-full p-3 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 md:hidden"
                aria-label="Fermer la recherche"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <Command.List className="cmdk-list-animated flex-1 overflow-y-auto md:flex-none">
              {hasQuery ? (
                <>
                  <Command.Empty className="px-4 py-8 text-center text-sm text-gray-500">
                    Aucun résultat
                  </Command.Empty>
                  {suggestionsQuery.data?.map((item) => {
                    return (
                      <Command.Item
                        key={item.slug}
                        value={item.slug}
                        onSelect={() => {
                          return handleSelect(item.slug)
                        }}
                        className="flex cursor-pointer items-center gap-3 px-4 py-3.5 text-gray-900 transition-colors hover:bg-gray-50"
                      >
                        <ProduceAvatar
                          slug={item.slug}
                          name={item.name}
                          className="size-9 shrink-0 rounded-full"
                        />
                        <span className="min-w-0 flex-1 truncate text-sm font-medium">
                          {item.name}
                        </span>
                        <ProduceBadge
                          variant={item.badge.variant}
                          label={item.badge.label}
                        />
                      </Command.Item>
                    )
                  })}
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 px-4 py-10">
                  <Search className="size-8 text-gray-300" aria-hidden="true" />
                  <p className="text-sm text-gray-400">
                    Tapez le nom d'un fruit ou légume
                  </p>
                </div>
              )}
            </Command.List>
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
            >
              {getResultMessage()}
            </div>
          </Command>
          <div className="hidden items-center justify-between border-t border-gray-200 px-4 py-2.5 md:flex">
            <span className="text-xs text-gray-400">
              Naviguer avec les flèches
            </span>
            <div className="flex items-center gap-1">
              <kbd className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-1.5 py-1 font-mono text-[11px] font-medium leading-none text-gray-500">
                {isMac ? (
                  <CommandIcon className="size-3" aria-hidden="true" />
                ) : (
                  'Ctrl'
                )}
              </kbd>
              <kbd className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-1.5 py-1 font-mono text-[11px] font-medium leading-none text-gray-500">
                K
              </kbd>
            </div>
          </div>
        </motion.div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

type SearchCommandProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const SearchCommand = ({ isOpen, onOpenChange }: SearchCommandProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {isOpen ? (
          <SearchCommandContent
            onClose={() => {
              return onOpenChange(false)
            }}
          />
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  )
}
