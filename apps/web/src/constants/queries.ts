import { getGroupedProduceData, getMonthStatsData } from '@/server/produce'
import type { Month, ProduceType } from '@estcequecestlasaison/shared'
import { queryOptions } from '@tanstack/react-query'

type GroupedProduceParams = {
  searchQuery: string
  category: ProduceType | 'all'
  month: Month
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
