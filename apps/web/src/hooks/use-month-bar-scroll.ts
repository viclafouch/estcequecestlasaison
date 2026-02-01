import * as React from 'react'
import type { Month } from '@estcequecestlasaison/shared'
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'

const CENTER_SET = '1'

function findCenterElement(container: HTMLElement, month: Month) {
  return container.querySelector<HTMLButtonElement>(
    `[data-month="${month}"][data-set="${CENTER_SET}"]`
  )
}

function findNearestMonth(container: HTMLElement, month: Month) {
  const containerCenter =
    container.getBoundingClientRect().left + container.clientWidth / 2
  const elements = container.querySelectorAll<HTMLButtonElement>(
    `[data-month="${month}"]`
  )

  let nearest: HTMLButtonElement | null = null
  let minDistance = Infinity

  for (const element of elements) {
    const elementCenter =
      element.getBoundingClientRect().left + element.offsetWidth / 2
    const distance = Math.abs(elementCenter - containerCenter)

    if (distance < minDistance) {
      minDistance = distance
      nearest = element
    }
  }

  return nearest
}

function findSnappedElement(container: HTMLElement) {
  const rect = container.getBoundingClientRect()

  return document
    .elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)
    ?.closest<HTMLButtonElement>('[data-month]')
}

function scrollToCenter(
  container: HTMLElement,
  element: HTMLElement,
  behavior: ScrollBehavior
) {
  const containerCenter =
    container.getBoundingClientRect().left + container.clientWidth / 2
  const elementCenter =
    element.getBoundingClientRect().left + element.offsetWidth / 2
  const offset = elementCenter - containerCenter

  if (Math.abs(offset) < 1) {
    return
  }

  container.scrollBy({ left: offset, behavior })
}

type UseMonthBarScrollParams = {
  selectedMonth: Month
  onMonthChange: (month: Month) => void
}

export function useMonthBarScroll({
  selectedMonth,
  onMonthChange
}: UseMonthBarScrollParams) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = React.useState(false)

  const handleMonthChange = React.useEffectEvent((month: Month) => {
    onMonthChange(month)
  })

  useIsomorphicLayoutEffect(() => {
    const container = scrollContainerRef.current

    if (!container) {
      return
    }

    const element = isReady
      ? findNearestMonth(container, selectedMonth)
      : findCenterElement(container, selectedMonth)

    if (!element) {
      return
    }

    scrollToCenter(container, element, isReady ? 'smooth' : 'instant')
    setIsReady(true)
  }, [selectedMonth, isReady])

  React.useEffect(() => {
    const container = scrollContainerRef.current

    const handleScrollEnd = () => {
      if (!container) {
        return
      }

      const snappedElement = findSnappedElement(container)

      if (!snappedElement?.dataset.month || !snappedElement.dataset.set) {
        return
      }

      const month = Number(snappedElement.dataset.month) as Month
      const isOutsideCenterSet = snappedElement.dataset.set !== CENTER_SET

      if (isOutsideCenterSet) {
        const centerElement = findCenterElement(container, month)

        if (centerElement) {
          scrollToCenter(container, centerElement, 'instant')
        }
      }

      if (month !== selectedMonth) {
        handleMonthChange(month)
      }
    }

    container?.addEventListener('scrollend', handleScrollEnd)

    return () => {
      container?.removeEventListener('scrollend', handleScrollEnd)
    }
  }, [selectedMonth])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    let nextMonth: Month | null = null

    switch (event.key) {
      case 'ArrowRight':
        nextMonth = ((selectedMonth % 12) + 1) as Month
        break
      case 'ArrowLeft':
        nextMonth = (((selectedMonth - 2 + 12) % 12) + 1) as Month
        break
      case 'Home':
        nextMonth = 1 as Month
        break
      case 'End':
        nextMonth = 12 as Month
        break
      default:
        return
    }

    event.preventDefault()
    handleMonthChange(nextMonth)

    const target = findCenterElement(scrollContainerRef.current!, nextMonth)

    target?.focus({ preventScroll: true })
  }

  return { scrollContainerRef, isReady, handleKeyDown }
}
