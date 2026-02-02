import Fuse from 'fuse.js'
import { PRODUCE_LIST } from '@/constants/produce'
import type { Month, Produce, ProduceType } from '@estcequecestlasaison/shared'
import {
  filterProduceByType,
  groupProduceBySeason,
  matchIsInSeason,
  sortProduceBySeasonEnd
} from '@estcequecestlasaison/shared'

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
    inSeason: sortProduceBySeasonEnd({ produceList: grouped.inSeason, month }),
    comingNextMonth: grouped.comingNextMonth,
    offSeason: grouped.offSeason
  }
}

export function findProduceBySlug(slug: string) {
  return PRODUCE_LIST.find((produce) => {
    return produce.slug === slug
  })
}

type GetRelatedProduceParams = {
  produce: Produce
  produceList: Produce[]
  month: Month
}

export function getRelatedProduce({
  produce,
  produceList,
  month
}: GetRelatedProduceParams) {
  const inSeasonExcludingCurrent = produceList.filter((item) => {
    return item.id !== produce.id && matchIsInSeason(item, month)
  })

  return sortProduceBySeasonEnd({
    produceList: inSeasonExcludingCurrent,
    month
  })
}
