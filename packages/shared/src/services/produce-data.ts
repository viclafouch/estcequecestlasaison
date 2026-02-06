import Fuse from 'fuse.js'
import produceJson from '../data/produce.json'
import type { Produce } from '../types'

export const PRODUCE_LIST = produceJson as Produce[]

const fuseInstance = new Fuse(PRODUCE_LIST, {
  keys: ['name'],
  threshold: 0.3
})

export function searchProduce(query: string) {
  const trimmed = query.trim()

  if (!trimmed) {
    return []
  }

  return fuseInstance.search(trimmed).map((result) => {
    return result.item
  })
}
