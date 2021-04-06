export const at = <T>(arr: T[], index: number): T | null => {
  const l = arr.length
  const k = index >= 0 ? index : l + index
  if (k < 0 || k >= l) return null
  return arr[k]
}
