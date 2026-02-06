import { getCurrentMonth } from '../helpers/date'
import {
  filterProduceByType,
  getDefaultProduceBadge,
  getMonthStats,
  getSeasonAlternatives,
  groupProduceBySeason,
  matchIsInSeason,
  sortProduceBySeasonEnd
} from '../helpers/season'
import type { Month, Produce } from '../types'
import { PRODUCE_LIST, searchProduce } from './produce-data'

const MAX_SEARCH_SUGGESTIONS = 5

type GetSearchSuggestionsParams = {
  query: string
}

export function getSearchSuggestions({ query }: GetSearchSuggestionsParams) {
  const trimmed = query.trim()

  if (!trimmed) {
    return []
  }

  const currentMonth = getCurrentMonth()

  return searchProduce(trimmed)
    .slice(0, MAX_SEARCH_SUGGESTIONS)
    .map((produce) => {
      return {
        slug: produce.slug,
        name: produce.name,
        badge: getDefaultProduceBadge({ produce, month: currentMonth })
      }
    })
}

type GetGroupedProduceParams = {
  searchQuery: string
  category: Produce['type'] | 'all'
  month: Month
}

export function getGroupedProduce({
  searchQuery,
  category,
  month
}: GetGroupedProduceParams) {
  const trimmed = searchQuery.trim()

  const searchedProduce = trimmed ? searchProduce(trimmed) : PRODUCE_LIST

  const filteredByType = filterProduceByType({
    produceList: searchedProduce,
    type: category
  })

  const grouped = groupProduceBySeason({
    produceList: filteredByType,
    currentMonth: month
  })

  return {
    inSeason: sortProduceBySeasonEnd({
      produceList: grouped.inSeason,
      month
    }),
    comingNextMonth: grouped.comingNextMonth,
    offSeason: grouped.offSeason
  }
}

type GetProductBySlugParams = {
  slug: string
}

export function getProductBySlug({ slug }: GetProductBySlugParams) {
  const produce = PRODUCE_LIST.find((item) => {
    return item.slug === slug
  })

  if (!produce) {
    return null
  }

  const currentMonth = getCurrentMonth()

  const relatedProduce = sortProduceBySeasonEnd({
    produceList: PRODUCE_LIST.filter((item) => {
      return item.id !== produce.id && matchIsInSeason(item, currentMonth)
    }),
    month: currentMonth
  })

  const alternatives = getSeasonAlternatives({
    produce,
    month: currentMonth,
    allProduce: PRODUCE_LIST
  }).map((item) => {
    return { slug: item.slug, name: item.name }
  })

  return {
    produce,
    currentMonth,
    relatedProduce,
    alternatives
  }
}

type GetMonthStatsDataParams = {
  month: Month
}

export function getMonthStatsData({ month }: GetMonthStatsDataParams) {
  const stats = getMonthStats({
    produceList: PRODUCE_LIST,
    month
  })

  return {
    fruits: stats.fruits,
    vegetables: stats.vegetables,
    total: stats.total,
    arriving: stats.arriving.map((item) => {
      return { id: item.id, name: item.name, slug: item.slug }
    }),
    leaving: stats.leaving.map((item) => {
      return { id: item.id, name: item.name, slug: item.slug }
    })
  }
}

type GetCalendarDataParams = {
  type: Produce['type'] | 'all'
}

export function getCalendarData({ type }: GetCalendarDataParams) {
  const filtered = filterProduceByType({
    produceList: PRODUCE_LIST,
    type
  })

  const produceList = filtered
    .toSorted((left, right) => {
      return left.name.localeCompare(right.name, 'fr')
    })
    .map((item) => {
      return {
        slug: item.slug,
        name: item.name,
        type: item.type,
        seasons: item.seasons
      }
    })

  return {
    produceList,
    currentMonth: getCurrentMonth()
  }
}
