import * as React from 'react'
import { Search, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import * as Dialog from '@radix-ui/react-dialog'
import { IconButton } from './ui/icon-button'

type SearchDrawerContentProps = {
  searchQuery: string
  onSearchChange: (query: string) => void
  onOpenChange: (open: boolean) => void
}

const SearchDrawerContent = ({
  searchQuery,
  onSearchChange,
  onOpenChange
}: SearchDrawerContentProps) => {
  const [draftQuery, setDraftQuery] = React.useState(searchQuery)

  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = () => {
    onSearchChange(draftQuery)
    onOpenChange(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <Dialog.Portal forceMount>
      <Dialog.Overlay asChild forceMount>
        <motion.div
          className="fixed inset-0 z-50 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </Dialog.Overlay>
      <Dialog.Content asChild forceMount>
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-white"
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 16 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Rechercher
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Rechercher un fruit ou legume de saison
            </Dialog.Description>
            <Dialog.Close asChild>
              <IconButton
                variant="ghost-muted"
                aria-label="Fermer la recherche"
              >
                <X className="size-5" aria-hidden="true" />
              </IconButton>
            </Dialog.Close>
          </div>
          <div className="flex flex-1 flex-col gap-4 px-6 pt-6">
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
              <Search
                className="size-5 shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="search"
                autoComplete="off"
                value={draftQuery}
                onChange={(event) => {
                  return setDraftQuery(event.target.value)
                }}
                onKeyDown={handleKeyDown}
                placeholder="Rechercher un fruit ou legume..."
                aria-label="Rechercher un fruit ou legume"
                className="w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus-visible:outline-none"
              />
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                className="focus-ring w-full rounded-xl bg-gray-900 py-3.5 text-base font-semibold text-white transition-colors hover:bg-gray-800"
              >
                Rechercher
              </button>
              {draftQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    return setDraftQuery('')
                  }}
                  className="focus-ring rounded-xl py-2 text-base font-semibold text-gray-500 underline transition-colors hover:text-gray-900"
                >
                  Tout effacer
                </button>
              ) : null}
            </div>
          </div>
        </motion.div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

type SearchDrawerProps = {
  searchQuery: string
  onSearchChange: (query: string) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const SearchDrawer = ({
  searchQuery,
  onSearchChange,
  isOpen,
  onOpenChange
}: SearchDrawerProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {isOpen ? (
          <SearchDrawerContent
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            onOpenChange={onOpenChange}
          />
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  )
}
