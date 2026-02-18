import Storage from 'expo-sqlite/kv-store'

const LAST_VIEWED_KEY = 'last_viewed_slug'

export const getLastViewedSlug = () => {
  return Storage.getItemSync(LAST_VIEWED_KEY)
}

export const saveLastViewedSlug = (slug: string) => {
  Storage.setItemSync(LAST_VIEWED_KEY, slug)
}
