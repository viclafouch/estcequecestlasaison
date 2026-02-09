import type { ProduceType } from '@estcequecestlasaison/shared'

export type CategoryFilter = ProduceType | 'all'

type CategoryOption = {
  value: CategoryFilter
  label: string
}

export const CATEGORIES = [
  { value: 'all', label: 'Tous' },
  { value: 'fruit', label: 'Fruits' },
  { value: 'vegetable', label: 'Légumes' }
] as const satisfies readonly CategoryOption[]
