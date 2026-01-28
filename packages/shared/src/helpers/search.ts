import Fuse from 'fuse.js'
import type { Produce } from '../types'

const FUSE_OPTIONS = {
  keys: ['name', 'slug'],
  threshold: 0.4,
  includeScore: true
} as const

export function createSearchIndex(produceList: Produce[]) {
  return new Fuse(produceList, FUSE_OPTIONS)
}

export function searchProduce(fuse: Fuse<Produce>, query: string) {
  if (!query.trim()) {
    return []
  }
  return fuse.search(query).map((result) => result.item)
}
