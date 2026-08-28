import { collections, type Collection } from './collections'

/**
 * Listing band: exactly 3 frames, first = large hero.
 * Chosen from different looks — never two of the same outfit.
 */
const BAND: Record<string, number[]> = {
  // Ridge: 侧身走 / 2169 外景 / 2726 另一套
  aw26: [3, 27, 79],
  // Rise: 走路皮衣裙(原右下) / 绿格 00516 / 白外套黑裙 00143
  spring26: [116, 57, 5],
  // Daylight: 灰纱镂空+贝壳耳环 114(主图) / 绿黄椅红包 023 / 白西装白包 133
  ss26: [113, 22, 132],
  aw25: [2, 34, 78],
  // Away: 封面级高清三套（灰青大衣 / 门廊花呢 / 棕色皮草）
  resort26: [4, 3, 42],
}

/** Public-facing curated frames — never dump the full archive */
const PICKS: Record<string, number[]> = {
  // Ridge: ordered by shoot number so same-outfit frames sit together
  // （去掉用户截图指定的几张）
  aw26: [
    0, // 1764
    17, // 2001
    27, 31, // 2169–2245
    41, 48, 52, 54, 58, 60, 76, 79, // 2386–2726
    93, 104, 105, // 2826–2897
    108, 113, // 3017–3066
    120, // 3189
    135, 142, // 3291–3392
  ],
  // Rise: first-pass 26春精选（去掉用户点名的三张）
  spring26: [
    5, 7, 25, 36, 49, 57, 75, 89, 103, 112, 116, 120, 122, 145,
    168, 180, 202, 213, 232,
  ],
  // Daylight: 重新入库后 188 帧，每套造型取一张（22 套）
  ss26: [
    2, 7, 18, 22, 30, 37, 43, 53, 59, 67, 76, 91, 98, 105, 109, 119, 126, 132,
    152, 162, 174, 186,
  ],
  aw25: [2, 12, 22, 34, 48, 62, 78, 96, 118],
  // Away: 多用高清竖图，去掉压糊/过小的横条帧
  resort26: [
    0, 3, 4, 5, 7, 11, 12, 14, 15, 16, 18, 19, 21, 23, 30, 32, 33, 36, 37, 42,
  ],
}

export type HomeShot = {
  src: string
  slug: string
}

export type HomeSection =
  | { type: 'banner'; shot: HomeShot }
  | { type: 'pair'; shots: [HomeShot, HomeShot] }

function uniquePaths(srcs: Array<string | undefined | null>): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const src of srcs) {
    if (!src || seen.has(src)) continue
    seen.add(src)
    out.push(src)
  }
  return out
}

function shotAt(slug: string, index: number): HomeShot | null {
  const collection = collections.find((c) => c.slug === slug)
  const src = collection?.images[index]
  if (!src) return null
  return { src, slug }
}

export function getCollectionPicks(collection: Collection): string[] {
  const indices = PICKS[collection.slug] ?? [0, 1, 2, 3, 4, 5, 6, 7, 8]
  return uniquePaths(indices.map((i) => collection.images[i]))
}

/** Three listing-band frames — different looks; [0] is the large hero */
export function getCollectionBandShots(collection: Collection): string[] {
  const band = BAND[collection.slug]
  if (band?.length) {
    return uniquePaths(band.map((i) => collection.images[i])).slice(0, 3)
  }

  // Fallback: spread across curated picks so neighbors aren’t the same look
  const picks = getCollectionPicks(collection)
  if (picks.length <= 3) return picks.slice(0, 3)
  const step = Math.max(1, Math.floor((picks.length - 1) / 2))
  return uniquePaths([picks[0], picks[step], picks[Math.min(picks.length - 1, step * 2)]]).slice(
    0,
    3,
  )
}

/**
 * Home lookbook under the film:
 * 1) landscape banner (sofa)
 * 2) brown walk + syw2830 (aw26/096)
 * 3) white blazer + denim on bench / rainy glass utility jacket
 */
export function getHomeSections(): HomeSection[] {
  const banner = shotAt('aw26', 17)
  const pairA = [shotAt('aw26', 31), shotAt('aw26', 95)] as const
  const pairB = [shotAt('ss26', 142), shotAt('ss26', 104)] as const
  const sections: HomeSection[] = []
  if (banner) sections.push({ type: 'banner', shot: banner })
  if (pairA[0] && pairA[1]) sections.push({ type: 'pair', shots: [pairA[0], pairA[1]] })
  if (pairB[0] && pairB[1]) sections.push({ type: 'pair', shots: [pairB[0], pairB[1]] })
  return sections
}

/** @deprecated flat list — prefer getHomeSections */
export function getHomeGalleryShots(): HomeShot[] {
  const shots: HomeShot[] = []
  for (const section of getHomeSections()) {
    if (section.type === 'banner') shots.push(section.shot)
    else shots.push(...section.shots)
  }
  return shots
}
