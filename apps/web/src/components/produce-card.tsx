import type { Variants } from 'motion/react'
import { motion, useReducedMotion } from 'motion/react'
import type {
  Month,
  Produce,
  ProduceSection
} from '@estcequecestlasaison/shared'
import {
  getDefaultProduceBadge,
  getProduceBadge
} from '@estcequecestlasaison/shared'
import { Link } from '@tanstack/react-router'
import { ProduceImage } from './produce-image'

type ProduceCardProps = {
  produce: Produce
  month: Month
  section?: ProduceSection
  priority?: boolean
}

const HOVER_TRANSITION = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1]
} as const

const IMAGE_VARIANTS = {
  idle: { scale: 1 },
  hover: { scale: 1.05 }
} as const satisfies Variants

const CARD_SHADOW_VARIANTS = {
  idle: { boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' },
  hover: { boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)' }
} as const satisfies Variants

const BADGE_SHADOW_VARIANTS = {
  idle: { boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
  hover: { boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.1)' }
} as const satisfies Variants

export const ProduceCard = ({
  produce,
  month,
  section,
  priority
}: ProduceCardProps) => {
  const isReducedMotion = useReducedMotion()

  const badge = section
    ? getProduceBadge({ produce, month, section })
    : getDefaultProduceBadge({ produce, month })

  return (
    <Link
      to="/$slug"
      params={{ slug: produce.slug }}
      className="focus-ring block min-w-0 rounded-3xl"
    >
      <motion.div
        className="flex flex-col"
        whileHover={isReducedMotion ? undefined : 'hover'}
        initial="idle"
      >
        <motion.div
          className="relative mb-3 overflow-hidden rounded-3xl bg-gray-100"
          variants={CARD_SHADOW_VARIANTS}
          transition={HOVER_TRANSITION}
        >
          <motion.div
            className="aspect-square"
            variants={IMAGE_VARIANTS}
            transition={HOVER_TRANSITION}
          >
            <ProduceImage
              produce={produce}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : undefined}
            />
          </motion.div>
          <motion.span
            data-variant={badge.variant}
            className="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium backdrop-blur-sm data-[variant=positive]:text-badge-positive data-[variant=warning]:text-badge-warning data-[variant=neutral]:text-badge-neutral"
            variants={BADGE_SHADOW_VARIANTS}
            transition={HOVER_TRANSITION}
          >
            {badge.label}
          </motion.span>
        </motion.div>
        <h3 className="truncate font-semibold text-gray-900">{produce.name}</h3>
        <p className="text-sm text-gray-500">
          {produce.type === 'fruit' ? 'Fruit' : 'Légume'}
        </p>
      </motion.div>
    </Link>
  )
}
