import { ChevronRight } from 'lucide-react'
import { ProduceAvatar } from '@/components/produce-avatar'
import { Link } from '@tanstack/react-router'

type SeasonAlternativesParams = {
  alternatives: { slug: string; name: string }[]
}

export const SeasonAlternatives = ({
  alternatives
}: SeasonAlternativesParams) => {
  return (
    <div className="rounded-2xl border border-primary-200 bg-primary-50 p-3">
      <div className="mb-2.5 flex items-center gap-2">
        <span
          className="size-2 shrink-0 rounded-full bg-primary-500"
          aria-hidden="true"
        />
        <p className="text-xs font-medium text-primary-700">
          En saison en ce moment
        </p>
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
        {alternatives.map((item) => {
          return (
            <Link
              key={item.slug}
              to="/$slug"
              params={{ slug: item.slug }}
              className="focus-ring flex items-center gap-2 rounded-xl border border-gray-200 bg-white py-1.5 pr-2.5 pl-1.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
            >
              <ProduceAvatar
                slug={item.slug}
                name={item.name}
                className="size-7 rounded-lg"
              />
              {item.name}
              <ChevronRight
                className="ml-auto size-3.5 shrink-0 text-gray-400"
                aria-hidden="true"
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
