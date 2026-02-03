import {
  getCalendarData,
  getGroupedProduceData,
  getMonthStatsData,
  getSearchSuggestions
} from '@/server/produce'
import type { Month, ProduceType } from '@estcequecestlasaison/shared'
import { queryOptions } from '@tanstack/react-query'

type GroupedProduceParams = {
  searchQuery: string
  category: ProduceType | 'all'
  month: Month
}

export function searchSuggestionsOptions(query: string) {
  return queryOptions({
    queryKey: ['search-suggestions', query],
    queryFn: () => {
      return getSearchSuggestions({ data: { query } })
    },
    enabled: query.trim().length > 0,
    staleTime: 60_000,
    placeholderData: (previous) => {
      return previous
    }
  })
}

export function groupedProduceOptions({
  searchQuery,
  category,
  month
}: GroupedProduceParams) {
  return queryOptions({
    queryKey: ['grouped-produce', searchQuery, category, month],
    queryFn: () => {
      return getGroupedProduceData({
        data: { searchQuery, category, month }
      })
    }
  })
}

export function monthStatsOptions(month: Month) {
  return queryOptions({
    queryKey: ['month-stats', month],
    queryFn: () => {
      return getMonthStatsData({ data: { month } })
    }
  })
}

type CalendarType = 'all' | ProduceType

export function calendarOptions(type: CalendarType) {
  return queryOptions({
    queryKey: ['calendar', type],
    queryFn: () => {
      return getCalendarData({ data: { type } })
    }
  })
}
