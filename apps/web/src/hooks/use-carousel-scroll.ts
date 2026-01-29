import * as React from 'react'

const DEFAULT_GAP = 24
const DEFAULT_CARD_WIDTH = 200

type UseCarouselScrollParams = {
  gap?: number
}

export function useCarouselScroll({
  gap = DEFAULT_GAP
}: UseCarouselScrollParams = {}) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)

  React.useEffect(() => {
    const container = scrollContainerRef.current

    const updateScrollButtons = () => {
      if (!container) {
        return
      }

      const { scrollLeft, scrollWidth, clientWidth } = container
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }

    updateScrollButtons()
    container?.addEventListener('scroll', updateScrollButtons)
    window.addEventListener('resize', updateScrollButtons)

    return () => {
      container?.removeEventListener('scroll', updateScrollButtons)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [])

  function scrollByDirection(direction: 'left' | 'right') {
    const container = scrollContainerRef.current

    if (!container) {
      return
    }

    const cardWidth =
      container.querySelector('a')?.offsetWidth ?? DEFAULT_CARD_WIDTH
    const scrollAmount = cardWidth + gap
    const signedAmount = direction === 'left' ? -scrollAmount : scrollAmount

    container.scrollBy({
      left: signedAmount,
      behavior: 'smooth'
    })
  }

  return {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scrollByDirection
  }
}
