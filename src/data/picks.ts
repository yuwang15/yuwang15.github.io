import type { Collection } from './collections'

/** Public-facing curated frames — never dump the full archive */
const PICKS: Record<string, number[]> = {
  // 9 frames → complete mosaic, no leftover cell
  ss26: [0, 4, 7, 11, 15, 19, 23, 27, 33],
  aw25: [2, 12, 22, 34, 48, 62, 78, 96, 118],
  resort26: [1, 6, 11, 16, 21, 26, 31, 36, 41],
}

/** Home: pin rounds + full rows — need enough frames */
const HOME_PICKS: Record<string, number[]> = {
  ss26: [4, 11, 19, 27, 7, 15, 23, 33, 0, 8, 12, 18, 22, 30],
}

export function getCollectionPicks(collection: Collection): string[] {
  const indices = PICKS[collection.slug] ?? [0, 1, 2, 3, 4, 5, 6, 7, 8]
  return indices
    .map((i) => collection.images[i])
    .filter((src): src is string => Boolean(src))
}

export function getHomePicks(collection: Collection): string[] {
  const indices = HOME_PICKS[collection.slug] ?? PICKS[collection.slug]?.slice(0, 6) ?? []
  return indices
    .map((i) => collection.images[i])
    .filter((src): src is string => Boolean(src))
}
