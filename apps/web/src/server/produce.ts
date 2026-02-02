import { z } from 'zod'
import { produceJsonLd } from '@/lib/seo'
import type { Month } from '@estcequecestlasaison/shared'
import {
  filterProduceByType,
  getCurrentMonth,
  getMonthStats,
  groupProduceBySeason,
  matchIsInSeason,
  sortProduceBySeasonEnd
} from '@estcequecestlasaison/shared'
import { createServerFn } from '@tanstack/react-start'

const slugInputSchema = z.object({
  slug: z.string().min(1).trim().toLowerCase()
})

const monthSchema = z
  .number()
  .int()
  .min(1)
  .max(12)
  .transform((value) => {
    return value as Month
  })

const groupedProduceInputSchema = z.object({
  searchQuery: z.string().max(200),
  category: z.enum(['all', 'fruit', 'vegetable']),
  month: monthSchema
})

const monthStatsInputSchema = z.object({
  month: monthSchema
})

function toProduceIconItem(item: { id: string; name: string; icon: string }) {
  return { id: item.id, name: item.name, icon: item.icon }
}

export const getSlugPageData = createServerFn({ method: 'GET' })
  .inputValidator(slugInputSchema)
  .handler(async ({ data }) => {
    const { PRODUCE_LIST } = await import('./produce-data')

    const produce = PRODUCE_LIST.find((item) => {
      return item.slug === data.slug
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

    return {
      produce,
      currentMonth,
      relatedProduce,
      jsonLd: produceJsonLd({ produce, month: currentMonth })
    }
  })

export const getGroupedProduceData = createServerFn({ method: 'GET' })
  .inputValidator(groupedProduceInputSchema)
  .handler(async ({ data }) => {
    const { PRODUCE_LIST, fuseInstance } = await import('./produce-data')

    const trimmedQuery = data.searchQuery.trim()

    const searchedProduce = trimmedQuery
      ? fuseInstance.search(trimmedQuery).map((result) => {
          return result.item
        })
      : PRODUCE_LIST

    const filteredByType = filterProduceByType({
      produceList: searchedProduce,
      type: data.category
    })

    const grouped = groupProduceBySeason({
      produceList: filteredByType,
      currentMonth: data.month
    })

    return {
      inSeason: sortProduceBySeasonEnd({
        produceList: grouped.inSeason,
        month: data.month
      }),
      comingNextMonth: grouped.comingNextMonth,
      offSeason: grouped.offSeason
    }
  })

export const getMonthStatsData = createServerFn({ method: 'GET' })
  .inputValidator(monthStatsInputSchema)
  .handler(async ({ data }) => {
    const { PRODUCE_LIST } = await import('./produce-data')

    const stats = getMonthStats({
      produceList: PRODUCE_LIST,
      month: data.month
    })

    return {
      fruits: stats.fruits,
      vegetables: stats.vegetables,
      total: stats.total,
      arriving: stats.arriving.map(toProduceIconItem),
      leaving: stats.leaving.map(toProduceIconItem)
    }
  })
