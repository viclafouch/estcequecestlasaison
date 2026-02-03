export function matchIsMacPlatform() {
  return (
    typeof navigator !== 'undefined' && /Mac|iPhone/.test(navigator.userAgent)
  )
}
