import Fuse from 'fuse.js'
import type { Produce } from '@estcequecestlasaison/shared'
import { produceData } from '@estcequecestlasaison/shared'

export const PRODUCE_LIST = produceData as Produce[]

export const fuseInstance = new Fuse(PRODUCE_LIST, {
  keys: ['name'],
  threshold: 0.3
})
