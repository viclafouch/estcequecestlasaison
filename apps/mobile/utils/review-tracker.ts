import Storage from 'expo-sqlite/kv-store'

type StorageKeys = Record<string, string>

const KEYS = {
  viewedSlugs: 'review_viewed_slugs',
  installDate: 'review_install_date',
  lastRequestDate: 'review_last_request_date',
  requestCount: 'review_request_count'
} as const satisfies StorageKeys

const MIN_VIEWED_PRODUCTS = 5
const MIN_DAYS_SINCE_INSTALL = 3
const MAX_REQUEST_COUNT = 3
const MIN_DAYS_BETWEEN_REQUESTS = 120
const MS_PER_DAY = 86_400_000

function getDaysSince(isoDate: string) {
  return Math.floor((Date.now() - new Date(isoDate).getTime()) / MS_PER_DAY)
}

function getViewedSlugs() {
  const viewedSlugsJson = Storage.getItemSync(KEYS.viewedSlugs)

  return viewedSlugsJson ? (JSON.parse(viewedSlugsJson) as string[]) : []
}

function getRequestCount() {
  const requestCountJson = Storage.getItemSync(KEYS.requestCount)

  return requestCountJson ? Number(requestCountJson) : 0
}

export function initializeReviewTracking() {
  const existingDate = Storage.getItemSync(KEYS.installDate)

  if (!existingDate) {
    Storage.setItemSync(KEYS.installDate, new Date().toISOString())
  }
}

export function trackProductView(slug: string) {
  const viewedSlugs = getViewedSlugs()

  if (!viewedSlugs.includes(slug)) {
    const updatedSlugs = [...viewedSlugs, slug]
    Storage.setItemSync(KEYS.viewedSlugs, JSON.stringify(updatedSlugs))
  }
}

export function shouldRequestReview() {
  const viewedSlugs = getViewedSlugs()

  if (viewedSlugs.length < MIN_VIEWED_PRODUCTS) {
    return false
  }

  const installDate = Storage.getItemSync(KEYS.installDate)

  if (!installDate || getDaysSince(installDate) < MIN_DAYS_SINCE_INSTALL) {
    return false
  }

  if (getRequestCount() >= MAX_REQUEST_COUNT) {
    return false
  }

  const lastRequestDate = Storage.getItemSync(KEYS.lastRequestDate)

  if (
    lastRequestDate &&
    getDaysSince(lastRequestDate) < MIN_DAYS_BETWEEN_REQUESTS
  ) {
    return false
  }

  return true
}

export function recordReviewRequest() {
  Storage.setItemSync(KEYS.lastRequestDate, new Date().toISOString())
  Storage.setItemSync(KEYS.requestCount, String(getRequestCount() + 1))
}
