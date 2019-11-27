export const MAX_TACHYONS_TOKEN = 11
export const MIN_TACHYONS_TOKEN = 0

export function getValidTachyonsTokenNumber(num: number = MIN_TACHYONS_TOKEN) {
  const tokenValue = Math.min(Math.max(num, MIN_TACHYONS_TOKEN), MAX_TACHYONS_TOKEN)
  return isNaN(tokenValue) ? MIN_TACHYONS_TOKEN : tokenValue
}
