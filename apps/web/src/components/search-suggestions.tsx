import { searchSuggestionsOptions } from '@/constants/queries'
import { useListKeyboardNav } from '@/hooks/use-list-keyboard-nav'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { ProduceAvatar } from './produce-avatar'
import { ProduceBadge } from './produce-badge'

type SearchSuggestionsProps = {
  query: string
  onSelect: () => void
}

export const SearchSuggestions = ({
  query,
  onSelect
}: SearchSuggestionsProps) => {
  const navigate = useNavigate()

  const suggestionsQuery = useQuery(searchSuggestionsOptions(query))

  const suggestions = suggestionsQuery.data ?? []

  const handleNavigate = (slug: string) => {
    void navigate({ to: '/$slug', params: { slug } })
    onSelect()
  }

  const { highlightedIndex, setHighlightedIndex } = useListKeyboardNav({
    items: suggestions,
    query,
    onSelect: (item) => {
      return handleNavigate(item.slug)
    },
    onEscape: onSelect
  })

  return (
    <div
      role="listbox"
      aria-label="Suggestions de recherche"
      className="absolute top-full left-0 right-0 z-50 mx-auto mt-2 max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
      hidden={suggestions.length === 0}
    >
      {suggestions.map((item, index) => {
        return (
          <button
            key={item.slug}
            type="button"
            role="option"
            aria-selected={highlightedIndex === index}
            data-highlighted={highlightedIndex === index || undefined}
            onPointerDown={(event) => {
              event.preventDefault()
            }}
            onClick={() => {
              return handleNavigate(item.slug)
            }}
            onMouseEnter={() => {
              setHighlightedIndex(index)
            }}
            className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-gray-50 data-highlighted:bg-gray-50"
          >
            <ProduceAvatar
              slug={item.slug}
              name={item.name}
              className="size-9 shrink-0 rounded-full"
            />
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-900">
              {item.name}
            </span>
            <ProduceBadge
              variant={item.badge.variant}
              label={item.badge.label}
            />
          </button>
        )
      })}
    </div>
  )
}
