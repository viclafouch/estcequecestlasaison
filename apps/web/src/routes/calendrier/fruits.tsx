import { CalendarPageContent } from '@/components/calendar-page'
import { CALENDAR_FRUITS_CONFIG } from '@/constants/calendar'
import { calendarOptions } from '@/constants/queries'
import { seo } from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

const CalendarFruitsPage = () => {
  return (
    <CalendarPageContent
      calendarType={CALENDAR_FRUITS_CONFIG.calendarType}
      title={CALENDAR_FRUITS_CONFIG.title}
      description={CALENDAR_FRUITS_CONFIG.description}
      pathname={CALENDAR_FRUITS_CONFIG.pathname}
      breadcrumbs={CALENDAR_FRUITS_CONFIG.breadcrumbs}
    />
  )
}

export const Route = createFileRoute('/calendrier/fruits')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(calendarOptions('fruit'))
  },
  head: () => {
    return seo({
      title: CALENDAR_FRUITS_CONFIG.title,
      description: CALENDAR_FRUITS_CONFIG.description,
      keywords: CALENDAR_FRUITS_CONFIG.keywords,
      pathname: CALENDAR_FRUITS_CONFIG.pathname
    })
  },
  component: CalendarFruitsPage
})
