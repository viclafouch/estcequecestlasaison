export type ProduceType = 'fruit' | 'vegetable'

export type SeasonIntensity = 'peak' | 'partial'

export type Produce = {
  id: string
  slug: string
  name: string
  type: ProduceType
  icon: string
  seasons: Partial<Record<number, SeasonIntensity>>
  nutrition: {
    calories: number
    vitamins: string[]
    benefits: string
  }
}
