import { Printer } from 'lucide-react'
import { calendarOptions } from '@/constants/queries'
import { calendarBreadcrumbJsonLd, calendarItemListJsonLd } from '@/lib/seo'
import { useSuspenseQuery } from '@tanstack/react-query'
import { CalendarTable } from './calendar-table'
import { IconButton } from './ui/icon-button'

type BreadcrumbItem = {
  name: string
  pathname: string
}

type CalendarPageContentProps = {
  title: string
  description: string
  pathname: string
  breadcrumbs: BreadcrumbItem[]
}

function handlePrint() {
  window.print()
}

export const CalendarPageContent = ({
  title,
  description,
  pathname,
  breadcrumbs
}: CalendarPageContentProps) => {
  const calendarQuery = useSuspenseQuery(calendarOptions('all'))

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
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1 md:gap-2">
          <h1 className="text-lg font-semibold text-gray-900 md:text-3xl md:font-bold md:tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-gray-600 md:text-sm">{description}</p>
        </div>
        <IconButton
          variant="ghost"
          onClick={handlePrint}
          className="hidden size-11 md:flex print:hidden"
          aria-label="Imprimer le calendrier"
        >
          <Printer className="size-4" aria-hidden="true" />
        </IconButton>
      </div>
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
