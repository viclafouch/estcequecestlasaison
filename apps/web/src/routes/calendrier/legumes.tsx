import { CalendarPageContent } from '@/components/calendar-page'
import { CALENDAR_LEGUMES_CONFIG } from '@/constants/calendar'
import { calendarOptions } from '@/constants/queries'
import { seo } from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

const CalendarLegumesPage = () => {
  return (
    <CalendarPageContent
      calendarType={CALENDAR_LEGUMES_CONFIG.calendarType}
      title={CALENDAR_LEGUMES_CONFIG.title}
      description={CALENDAR_LEGUMES_CONFIG.description}
      pathname={CALENDAR_LEGUMES_CONFIG.pathname}
      breadcrumbs={CALENDAR_LEGUMES_CONFIG.breadcrumbs}
    />
  )
}

export const Route = createFileRoute('/calendrier/legumes')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(calendarOptions('vegetable'))
  },
  head: () => {
    return seo({
      title: CALENDAR_LEGUMES_CONFIG.title,
      description: CALENDAR_LEGUMES_CONFIG.description,
      keywords: CALENDAR_LEGUMES_CONFIG.keywords,
      pathname: CALENDAR_LEGUMES_CONFIG.pathname
    })
  },
  component: CalendarLegumesPage
})
