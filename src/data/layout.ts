import { IMAGE_RATIOS } from './ratios'
import type { Collection } from './collections'

export type EditorialShot = {
  src: string
  ratio: number
}

/** 一行并排。行宽固定时 行高 = 行宽 / span */
export type EditorialRowBlock = {
  kind: 'row'
  shots: EditorialShot[]
  span: number
  /** 四张一条时接缝收到最细，读起来是一条胶片而不是一格格网格 */
  tight: boolean
}

/**
 * 一张主图 + 侧边竖排两张小图。
 * 主图与小图栏等高，所以三张都按原比例显示，不裁切，且正好铺满整宽。
 */
export type EditorialFeatureBlock = {
  kind: 'feature'
  hero: EditorialShot
  stack: [EditorialShot, EditorialShot]
  span: number
  /** 主图占的份额，与小图栏的 1 份对比 */
  heroGrow: number
  /** 主图放右边，避免每个 feature 都朝同一侧 */
  flip: boolean
}

export type EditorialBlock = EditorialRowBlock | EditorialFeatureBlock

const LANDSCAPE = 1.15
const CYCLE = ['feature', 'strip', 'pair', 'feature', 'strip', 'pair', 'strip', 'pair'] as const
const SIZE = { feature: 3, strip: 4, pair: 2 } as const

function sum(shots: EditorialShot[]) {
  return shots.reduce((acc, s) => acc + s.ratio, 0)
}

function row(shots: EditorialShot[], tight: boolean): EditorialRowBlock {
  return { kind: 'row', shots, span: sum(shots), tight }
}

/**
 * 主图宽 wh、小图栏宽 wc，两者等高：
 *   wh / rHero = wc * (1/r1 + 1/r2)
 * 于是主图份额 = rHero * (1/r1 + 1/r2)，整块比例 = (1 + 份额) / (1/r1 + 1/r2)
 */
function feature(
  hero: EditorialShot,
  stack: [EditorialShot, EditorialShot],
  flip: boolean,
): EditorialFeatureBlock {
  const stackInv = 1 / stack[0].ratio + 1 / stack[1].ratio
  const heroGrow = hero.ratio * stackInv
  return {
    kind: 'feature',
    hero,
    stack,
    span: (1 + heroGrow) / stackInv,
    heroGrow,
    flip,
  }
}

/**
 * 竖图跑段按 大图块 / 四张紧排 / 两张并排 的节奏切分。
 * 三种块的高度差到 2.5 倍以上，这个尺度落差是"不像 gallery"的来源；
 * 每块都严格铺满整宽，所以不会出现栏位空洞。
 */
function planPortraitRun(shots: EditorialShot[], flipSeed: number): EditorialBlock[] {
  const blocks: EditorialBlock[] = []
  let cursor = 0
  let beat = 0
  let flips = flipSeed

  while (cursor < shots.length) {
    const left = shots.length - cursor
    let kind: (typeof CYCLE)[number] = CYCLE[beat % CYCLE.length]
    beat += 1
    let size: number = SIZE[kind]

    if (size > left) {
      size = left
      kind = left >= 3 ? 'strip' : 'pair'
    }
    // 收尾绝不剩单张 —— 那正是改版前最后一行右侧空 860px 的成因
    if (left - size === 1) {
      size += 1
      if (kind === 'feature') kind = 'strip'
    }

    const group = shots.slice(cursor, cursor + size)
    cursor += size

    if (kind === 'feature' && group.length === 3) {
      blocks.push(feature(group[0], [group[1], group[2]], flips % 2 === 1))
      flips += 1
    } else {
      blocks.push(row(group, group.length >= 3))
    }
  }

  return blocks
}

export function planEditorialBlocks(shots: EditorialShot[]): EditorialBlock[] {
  const blocks: EditorialBlock[] = []
  let cursor = 0
  let features = 0

  while (cursor < shots.length) {
    if (shots[cursor].ratio >= LANDSCAPE) {
      // 横图不进竖图节奏：单张撑满一行做视觉停顿，连着两张就并排
      let end = cursor
      while (end < shots.length && shots[end].ratio >= LANDSCAPE) end += 1
      const wides = shots.slice(cursor, end)
      for (let i = 0; i < wides.length; i += 2) {
        const pair = wides.slice(i, i + 2)
        blocks.push(row(pair, false))
      }
      cursor = end
      continue
    }

    let end = cursor
    while (end < shots.length && shots[end].ratio < LANDSCAPE) end += 1
    const run = shots.slice(cursor, end)

    // 落单的竖图并到上一块里，不让它自己占一整行
    if (run.length === 1 && blocks.length) {
      const prev = blocks[blocks.length - 1]
      if (prev.kind === 'row') {
        prev.shots.push(run[0])
        prev.span = sum(prev.shots)
        prev.tight = prev.shots.length >= 3
        cursor = end
        continue
      }
    }

    const planned = planPortraitRun(run, features)
    features += planned.filter((b) => b.kind === 'feature').length
    blocks.push(...planned)
    cursor = end
  }

  return blocks
}

export function getEditorialShots(
  collection: Collection,
  picks: string[],
): EditorialShot[] {
  const ratios = IMAGE_RATIOS[collection.slug] ?? []
  return picks.map((src) => {
    const index = collection.images.indexOf(src)
    return { src, ratio: ratios[index] ?? 0.75 }
  })
}
