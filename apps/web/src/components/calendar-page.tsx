import { calendarOptions } from '@/constants/queries'
import { calendarBreadcrumbJsonLd, calendarItemListJsonLd } from '@/lib/seo'
import type { ProduceType } from '@estcequecestlasaison/shared'
import { useSuspenseQuery } from '@tanstack/react-query'
import { CalendarTable } from './calendar-table'

type BreadcrumbItem = {
  name: string
  pathname: string
}

type CalendarPageContentParams = {
  calendarType: 'all' | ProduceType
  title: string
  description: string
  pathname: string
  breadcrumbs: BreadcrumbItem[]
}

export const CalendarPageContent = ({
  calendarType,
  title,
  description,
  pathname,
  breadcrumbs
}: CalendarPageContentParams) => {
  const calendarQuery = useSuspenseQuery(calendarOptions(calendarType))

  const breadcrumbJsonLd = calendarBreadcrumbJsonLd(breadcrumbs)
  const itemListJsonLd = calendarItemListJsonLd({
    items: calendarQuery.data.produceList,
    listName: title,
    pathname
  })

  return (
    <main
      id="main-content"
      className="mx-auto max-w-7xl px-4 pt-3 pb-24 md:px-6 md:pt-12 md:pb-20"
    >
      <h1 className="text-lg font-semibold text-gray-900 md:text-3xl md:font-bold md:tracking-tight">
        {title}
      </h1>
      <p className="text-xs text-gray-600 mt-1 md:text-sm md:mt-2">
        {description}
      </p>
      <div className="mt-4 md:mt-8">
        <CalendarTable
          produceList={calendarQuery.data.produceList}
          currentMonth={calendarQuery.data.currentMonth}
        />
      </div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: itemListJsonLd }}
      />
    </main>
  )
}
