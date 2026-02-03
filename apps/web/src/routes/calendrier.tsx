import { CalendarPageContent } from '@/components/calendar-page'
import { SiteHeader } from '@/components/site-header'
import { CALENDAR_ALL_CONFIG } from '@/constants/calendar'
import { calendarOptions } from '@/constants/queries'
import { seo } from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

const CalendarPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <CalendarPageContent
        title={CALENDAR_ALL_CONFIG.title}
        description={CALENDAR_ALL_CONFIG.description}
        pathname={CALENDAR_ALL_CONFIG.pathname}
        breadcrumbs={CALENDAR_ALL_CONFIG.breadcrumbs}
      />
    </div>
  )
}

export const Route = createFileRoute('/calendrier')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(calendarOptions('all'))
  },
  head: () => {
    return seo({
      title: CALENDAR_ALL_CONFIG.title,
      description: CALENDAR_ALL_CONFIG.description,
      keywords: CALENDAR_ALL_CONFIG.keywords,
      pathname: CALENDAR_ALL_CONFIG.pathname
    })
  },
  component: CalendarPage
})
