import * as React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

type ListKeyboardNavParams<T> = {
  items: T[]
  query: string
  onSelect: (item: T) => void
  onEscape: () => void
}

export const useListKeyboardNav = <T>({
  items,
  query,
  onSelect,
  onEscape
}: ListKeyboardNavParams<T>) => {
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
  const [previousQuery, setPreviousQuery] = React.useState(query)

  if (query !== previousQuery) {
    setPreviousQuery(query)
    setHighlightedIndex(-1)
  }

  const hasItems = items.length > 0

  useHotkeys(
    'down',
    () => {
      setHighlightedIndex((prev) => {
        return prev < items.length - 1 ? prev + 1 : 0
      })
    },
    { preventDefault: true, enabled: hasItems, enableOnFormTags: true },
    [items.length]
  )

  useHotkeys(
    'up',
    () => {
      setHighlightedIndex((prev) => {
        return prev > 0 ? prev - 1 : items.length - 1
      })
    },
    { preventDefault: true, enabled: hasItems, enableOnFormTags: true },
    [items.length]
  )

  useHotkeys(
    'enter',
    () => {
      const selectedItem = items[highlightedIndex]

      if (selectedItem) {
        onSelect(selectedItem)
      }
    },
    {
      preventDefault: true,
      enabled: highlightedIndex >= 0,
      enableOnFormTags: true
    },
    [items, highlightedIndex, onSelect]
  )

  useHotkeys(
    'escape',
    () => {
      onEscape()
    },
    { preventDefault: true, enableOnFormTags: true },
    [onEscape]
  )

  return { highlightedIndex, setHighlightedIndex }
}
