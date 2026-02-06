import { z } from 'zod'
import { produceJsonLd } from '@/lib/seo'
import type { Month } from '@estcequecestlasaison/shared'
import { createServerFn } from '@tanstack/react-start'

const searchSuggestionsInputSchema = z.object({
  query: z.string().max(200)
})

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

export const getSearchSuggestions = createServerFn({ method: 'GET' })
  .inputValidator(searchSuggestionsInputSchema)
  .handler(async ({ data }) => {
    const { getSearchSuggestions: getSearchSuggestionsShared } =
      await import('@estcequecestlasaison/shared/services')

    return getSearchSuggestionsShared({ query: data.query })
  })

export const getSlugPageData = createServerFn({ method: 'GET' })
  .inputValidator(slugInputSchema)
  .handler(async ({ data }) => {
    const { getProductBySlug } =
      await import('@estcequecestlasaison/shared/services')
    const result = getProductBySlug({ slug: data.slug })

    if (!result) {
      return null
    }

    return {
      ...result,
      jsonLd: produceJsonLd({
        produce: result.produce,
        month: result.currentMonth
      })
    }
  })

export const getGroupedProduceData = createServerFn({ method: 'GET' })
  .inputValidator(groupedProduceInputSchema)
  .handler(async ({ data }) => {
    const { getGroupedProduce } =
      await import('@estcequecestlasaison/shared/services')

    return getGroupedProduce({
      searchQuery: data.searchQuery,
      category: data.category,
      month: data.month
    })
  })

export const getMonthStatsData = createServerFn({ method: 'GET' })
  .inputValidator(monthStatsInputSchema)
  .handler(async ({ data }) => {
    const { getMonthStatsData: getMonthStatsDataShared } =
      await import('@estcequecestlasaison/shared/services')

    return getMonthStatsDataShared({ month: data.month })
  })

export const getCalendarData = createServerFn({ method: 'GET' })
  .inputValidator(calendarInputSchema)
  .handler(async ({ data }) => {
    const { getCalendarData: getCalendarDataShared } =
      await import('@estcequecestlasaison/shared/services')

    return getCalendarDataShared({ type: data.type })
  })
