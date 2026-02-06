// TODO: Remove when Hermes supports Array.prototype.toSorted (ES2023)
// Track: https://github.com/facebook/hermes/issues?q=toSorted
if (!Array.prototype.toSorted) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.toSorted = function <T>(
    this: T[],
    compareFn?: (a: T, b: T) => number
  ): T[] {
    // eslint-disable-next-line unicorn/no-array-sort
    return [...this].sort(compareFn)
  }
}
