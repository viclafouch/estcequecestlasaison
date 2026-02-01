import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Search, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import * as Dialog from '@radix-ui/react-dialog'

type SearchDrawerProps = {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export const SearchDrawer = ({
  searchQuery,
  onSearchChange
}: SearchDrawerProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [draftQuery, setDraftQuery] = React.useState('')

  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleOpen = () => {
    ReactDOM.flushSync(() => {
      setDraftQuery(searchQuery)
      setIsOpen(true)
    })
    inputRef.current?.focus()
  }

  const handleSubmit = () => {
    onSearchChange(draftQuery)
    setIsOpen(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-center px-6 pt-5 pb-4">
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Ouvrir la recherche"
          className="focus-ring flex w-full max-w-lg items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-4 shadow-sm"
        >
          <Search
            className="size-5 shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <span
            data-has-query={searchQuery || undefined}
            className="truncate text-base font-medium text-gray-400 data-has-query:text-gray-900"
          >
            {searchQuery || 'Rechercher un fruit ou legume...'}
          </span>
        </button>
      </div>
      <AnimatePresence>
        {isOpen ? (
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
                    <button
                      type="button"
                      className="btn-icon-md focus-ring text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      aria-label="Fermer la recherche"
                    >
                      <X className="size-5" aria-hidden="true" />
                    </button>
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
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  )
}
