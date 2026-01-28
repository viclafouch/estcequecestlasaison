import type { Produce } from '../types'
import produceData from './produce.json'

export const PRODUCE_LIST = produceData as Produce[]

export function getProduceBySlug(slug: string) {
  return PRODUCE_LIST.find((p) => p.slug === slug)
}

export function getAllSlugs() {
  return PRODUCE_LIST.map((p) => p.slug)
}
