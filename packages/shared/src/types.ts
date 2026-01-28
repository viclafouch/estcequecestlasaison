export type ProduceType = 'fruit' | 'vegetable'

export type SeasonIntensity = 'peak' | 'partial'

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type Seasons = Partial<Record<Month, SeasonIntensity>>

export type Nutrition = {
  calories: number
  vitamins: string[]
  benefits: string
}

export type Produce = {
  id: string
  slug: string
  name: string
  type: ProduceType
  icon: string
  seasons: Seasons
  nutrition: Nutrition
}
