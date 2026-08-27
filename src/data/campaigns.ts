import type { LocalizedString } from '../i18n/types'

/**
 * Brand films page — keep each encode distinct from the home hero.
 * Every entry reads the same way: film name, then its season, then one line.
 */
export const brandFilms = [
  {
    slug: 'winter-2026-film',
    title: { zh: 'Interior', en: 'Interior' } satisfies LocalizedString,
    season: { zh: '2026 秋冬', en: 'Autumn Winter 2026' } satisfies LocalizedString,
    summary: {
      zh: '当季成片：剪裁、层叠，与落在衣裳上的光。',
      en: 'This season on film—cut, layer, and light on cloth.',
    } satisfies LocalizedString,
    poster: '/assets/video-poster.jpg',
    src: '/assets/video.mp4',
    width: 1080,
    height: 1920,
  },
  {
    slug: 'ridge-film',
    title: { zh: 'Ridge', en: 'Ridge' } satisfies LocalizedString,
    season: { zh: '2026 秋冬', en: 'Autumn Winter 2026' } satisfies LocalizedString,
    summary: {
      zh: '山色与混凝土之间，衣裳慢慢落定。',
      en: 'Between hillside and concrete, the clothes settle slowly.',
    } satisfies LocalizedString,
    poster: '/assets/collections/aw26/cover.jpg',
    src: '/assets/campaign/aw26.mp4',
    width: 1080,
    height: 1920,
  },
  {
    slug: 'daylight-film',
    title: { zh: 'Daylight', en: 'Daylight' } satisfies LocalizedString,
    season: { zh: '2026 春夏', en: 'Spring Summer 2026' } satisfies LocalizedString,
    summary: {
      zh: '明亮、干净，适合慢慢走近。',
      en: 'Bright and clean—meant to be approached slowly.',
    } satisfies LocalizedString,
    poster: '/assets/collections/ss26/cover.jpg',
    src: '/assets/campaign/ss26.mp4',
    width: 1080,
    height: 1920,
  },
  {
    slug: 'quiet-form-film',
    title: { zh: 'Quiet Form', en: 'Quiet Form' } satisfies LocalizedString,
    season: { zh: '2025 秋冬', en: 'Autumn Winter 2025' } satisfies LocalizedString,
    summary: {
      zh: '结构清晰，不失柔软。',
      en: 'Clear structure, without losing softness.',
    } satisfies LocalizedString,
    poster: '/assets/campaign/01.jpg',
    src: '/assets/campaign/aw25.mp4',
    width: 1920,
    height: 3414,
  },
  {
    slug: 'syw-film',
    title: { zh: 'In Our Words', en: 'In Our Words' } satisfies LocalizedString,
    season: { zh: '品牌短片', en: 'Brand film' } satisfies LocalizedString,
    summary: {
      zh: '光线、衣裳，与一句一句留在画面里的话。',
      en: 'Light, cloth, and words left inside the frame.',
    } satisfies LocalizedString,
    poster: '/assets/brand/syw-poster.jpg',
    src: '/assets/brand/syw.mp4',
    width: 1080,
    height: 1920,
  },
] as const
