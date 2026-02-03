import * as React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { SearchCommand } from '@/components/search-command'

type SearchContextValue = {
  isSearchOpen: boolean
  openSearch: () => void
}

const SearchContext = React.createContext<SearchContextValue | null>(null)

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  useHotkeys(
    'mod+k',
    () => {
      setIsSearchOpen((prev) => {
        return !prev
      })
    },
    { preventDefault: true, enableOnFormTags: true }
  )

  const openSearch = () => {
    setIsSearchOpen(true)
  }

  return React.createElement(
    SearchContext.Provider,
    { value: { isSearchOpen, openSearch } },
    children,
    React.createElement(SearchCommand, {
      isOpen: isSearchOpen,
      onOpenChange: setIsSearchOpen
    })
  )
}

export const useSearch = () => {
  const context = React.useContext(SearchContext)

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }

  return context
}
