import { access, readFile } from 'node:fs/promises'
import type { Produce } from '../packages/shared/src/types'

const PRODUCE_JSON_PATH = './packages/shared/src/data/produce.json'

export async function matchIsExistingFile(path: string) {
  try {
    await access(path)

    return true
  } catch {
    return false
  }
}

export async function loadProduceData() {
  const raw = await readFile(PRODUCE_JSON_PATH, 'utf-8')

  return JSON.parse(raw) as Produce[]
}
