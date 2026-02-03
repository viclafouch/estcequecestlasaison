import type { BadgeVariant } from '@estcequecestlasaison/shared'

type ProduceBadgeProps = {
  variant: BadgeVariant
  label: string
}

export const ProduceBadge = ({ variant, label }: ProduceBadgeProps) => {
  return (
    <span
      data-variant={variant}
      className="shrink-0 truncate max-w-32 rounded-full px-2.5 py-0.5 text-xs font-medium data-[variant=positive]:bg-primary-50 data-[variant=positive]:text-badge-positive data-[variant=warning]:bg-warning-100 data-[variant=warning]:text-badge-warning data-[variant=neutral]:bg-gray-100 data-[variant=neutral]:text-badge-neutral"
    >
      {label}
    </span>
  )
}
