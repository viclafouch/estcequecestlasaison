import type { Transition } from 'motion/react'

export const SLIDE_TRANSITION = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1]
} as const satisfies Transition

export const SCALE_TRANSITION = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1]
} as const satisfies Transition

export const INSTANT_TRANSITION = {
  duration: 0
} as const satisfies Transition
