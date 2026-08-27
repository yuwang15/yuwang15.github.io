import { collections, type Collection } from './collections'

/** Public-facing curated frames — never dump the full archive */
const PICKS: Record<string, number[]> = {
  // 9 frames → complete mosaic, no leftover cell
  aw26: [0, 8, 16, 28, 42, 58, 76, 98, 120],
  ss26: [0, 4, 7, 11, 15, 19, 23, 27, 33],
  aw25: [2, 12, 22, 34, 48, 62, 78, 96, 118],
  resort26: [1, 6, 11, 16, 21, 26, 31, 36, 41],
}

/** Home gallery: a few frames per collection (not one season only) */
const HOME_MIX: Record<string, number[]> = {
  aw26: [4, 28],
  ss26: [4, 19],
  aw25: [12, 62],
  resort26: [6, 21],
}

export type HomeShot = {
  src: string
  slug: string
}

export function getCollectionPicks(collection: Collection): string[] {
  const indices = PICKS[collection.slug] ?? [0, 1, 2, 3, 4, 5, 6, 7, 8]
  return indices
    .map((i) => collection.images[i])
    .filter((src): src is string => Boolean(src))
}

/** Round-robin across seasons — ~2 frames each */
export function getHomeGalleryShots(): HomeShot[] {
  const pools = collections.map((collection) => {
    const indices = HOME_MIX[collection.slug] ?? [0, 8]
    return indices
      .map((i) => collection.images[i])
      .filter((src): src is string => Boolean(src))
      .map((src) => ({ src, slug: collection.slug }))
  })

  const shots: HomeShot[] = []
  const depth = Math.max(0, ...pools.map((p) => p.length))
  for (let i = 0; i < depth; i += 1) {
    for (const pool of pools) {
      if (pool[i]) shots.push(pool[i])
    }
  }
  return shots
}
