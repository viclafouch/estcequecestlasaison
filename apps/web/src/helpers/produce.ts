import Fuse from 'fuse.js'
import type { Month, Produce, ProduceType } from '@estcequecestlasaison/shared'
import {
  filterProduceByType,
  groupProduceBySeason,
  matchIsInSeason,
  sortProduceBySeason
} from '@estcequecestlasaison/shared'
import { PRODUCE_LIST } from '../constants/produce'

const fuseInstance = new Fuse(PRODUCE_LIST, {
  keys: ['name'],
  threshold: 0.3
})

type SearchAndFilterParams = {
  searchQuery: string
  category: ProduceType | 'all'
}

function searchAndFilterProduce({
  searchQuery,
  category
}: SearchAndFilterParams) {
  const trimmedQuery = searchQuery.trim()

  const searchedProduce = trimmedQuery
    ? fuseInstance.search(trimmedQuery).map((result) => {
        return result.item
      })
    : PRODUCE_LIST

  return filterProduceByType({
    produceList: searchedProduce,
    type: category
  })
}

type FilterProduceParams = {
  searchQuery: string
  category: ProduceType | 'all'
  month: Month
}

export function getFilteredProduce({
  searchQuery,
  category,
  month
}: FilterProduceParams) {
  const filteredByType = searchAndFilterProduce({ searchQuery, category })

  return sortProduceBySeason({ produceList: filteredByType, month })
}

export function getInSeasonCount(produceList: Produce[], month: Month) {
  return produceList.filter((produce) => {
    return matchIsInSeason(produce, month)
  }).length
}

type GetGroupedProduceParams = {
  searchQuery: string
  category: ProduceType | 'all'
  month: Month
}

export function getGroupedProduce({
  searchQuery,
  category,
  month
}: GetGroupedProduceParams) {
  const filteredByType = searchAndFilterProduce({ searchQuery, category })

  const grouped = groupProduceBySeason({
    produceList: filteredByType,
    currentMonth: month
  })

  return {
    inSeason: sortProduceBySeason({ produceList: grouped.inSeason, month }),
    comingNextMonth: grouped.comingNextMonth,
    offSeason: grouped.offSeason
  }
}
