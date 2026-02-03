import { z } from 'zod'
import { produceJsonLd } from '@/lib/seo'
import type { Month, Produce } from '@estcequecestlasaison/shared'
import {
  filterProduceByType,
  getCurrentMonth,
  getMonthStats,
  getSeasonAlternatives,
  groupProduceBySeason,
  matchIsInSeason,
  sortProduceBySeasonEnd
} from '@estcequecestlasaison/shared'
import { createServerFn } from '@tanstack/react-start'

const calendarInputSchema = z.object({
  type: z.enum(['all', 'fruit', 'vegetable'])
})

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

function toCalendarItem(item: Produce) {
  return {
    slug: item.slug,
    name: item.name,
    type: item.type,
    seasons: item.seasons
  }
}

function toProduceIconItem(item: Pick<Produce, 'id' | 'name' | 'slug'>) {
  return { id: item.id, name: item.name, slug: item.slug }
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
      alternatives,
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

export const getCalendarData = createServerFn({ method: 'GET' })
  .inputValidator(calendarInputSchema)
  .handler(async ({ data }) => {
    const { PRODUCE_LIST } = await import('./produce-data')

    const filtered = filterProduceByType({
      produceList: PRODUCE_LIST,
      type: data.type
    })

    const produceList = filtered
      .toSorted((left, right) => {
        return left.name.localeCompare(right.name, 'fr')
      })
      .map(toCalendarItem)

    return {
      produceList,
      currentMonth: getCurrentMonth()
    }
  })
