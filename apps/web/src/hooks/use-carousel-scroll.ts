import * as React from 'react'

const DEFAULT_GAP = 24
const DEFAULT_CARD_WIDTH = 200

type ScrollDirection = 'left' | 'right'

type UseCarouselScrollParams = {
  gap?: number
}

export function useCarouselScroll({
  gap = DEFAULT_GAP
}: UseCarouselScrollParams = {}) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)
  const [hasOverflow, setHasOverflow] = React.useState(false)

  React.useEffect(() => {
    const container = scrollContainerRef.current

    const updateScrollButtons = () => {
      if (!container) {
        return
      }

      const { scrollLeft, scrollWidth, clientWidth } = container
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
      setHasOverflow(scrollWidth > clientWidth)
    }

    updateScrollButtons()
    container?.addEventListener('scroll', updateScrollButtons)
    window.addEventListener('resize', updateScrollButtons)

    return () => {
      container?.removeEventListener('scroll', updateScrollButtons)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [])

  const scrollByDirection = (direction: ScrollDirection) => {
    const container = scrollContainerRef.current

    if (!container) {
      return
    }

    const cardWidth =
      container.querySelector('a')?.offsetWidth ?? DEFAULT_CARD_WIDTH
    const scrollAmount = cardWidth + gap
    const scrollOffset = direction === 'left' ? -scrollAmount : scrollAmount

    container.scrollBy({
      left: scrollOffset,
      behavior: 'smooth'
    })
  }

  return {
    scrollContainerRef,
    hasOverflow,
    canScrollLeft,
    canScrollRight,
    scrollByDirection
  }
}
