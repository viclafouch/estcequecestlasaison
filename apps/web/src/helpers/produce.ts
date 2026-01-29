import Fuse from 'fuse.js'
import type { Month, Produce, ProduceType } from '@estcequecestlasaison/shared'
import {
  filterProduceByType,
  matchIsInSeason,
  produceData,
  sortProduceBySeason
} from '@estcequecestlasaison/shared'

const typedProduceData = produceData as Produce[]

const fuseInstance = new Fuse(typedProduceData, {
  keys: ['name'],
  threshold: 0.3
})

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
  const trimmedQuery = searchQuery.trim()

  const searchedProduce = trimmedQuery
    ? fuseInstance.search(trimmedQuery).map((result) => {
        return result.item
      })
    : typedProduceData

  const filteredByType = filterProduceByType({
    produceList: searchedProduce,
    type: category
  })

  return sortProduceBySeason({ produceList: filteredByType, month })
}

export function getInSeasonCount(produceList: Produce[], month: Month) {
  return produceList.filter((produce) => {
    return matchIsInSeason(produce, month)
  }).length
}
