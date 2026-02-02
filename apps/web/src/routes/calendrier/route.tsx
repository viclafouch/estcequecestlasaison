import { CalendarHeader } from '@/components/calendar-header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

const CalendarLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CalendarHeader />
      <Outlet />
    </div>
  )
}

export const Route = createFileRoute('/calendrier')({
  component: CalendarLayout
})
