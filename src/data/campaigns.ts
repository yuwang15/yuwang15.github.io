import type { LocalizedString } from '../i18n/types'

/** Brand films page — keep each encode distinct from the home hero */
export const brandFilms = [
  {
    slug: 'study-film',
    title: { zh: 'Study', en: 'Study' } satisfies LocalizedString,
    summary: {
      zh: '山色与混凝土之间，衣裳慢慢落定。',
      en: 'Between hillside and concrete, the clothes settle slowly.',
    } satisfies LocalizedString,
    poster: '/assets/collections/aw26/cover.jpg',
    src: '/assets/campaign/aw26.mp4',
  },
  {
    slug: 'daylight-film',
    title: { zh: 'Daylight', en: 'Daylight' } satisfies LocalizedString,
    summary: {
      zh: '明亮、干净，适合慢慢走近。',
      en: 'Bright and clean—meant to be approached slowly.',
    } satisfies LocalizedString,
    poster: '/assets/collections/ss26/cover.jpg',
    src: '/assets/campaign/ss26.mp4',
  },
  {
    slug: 'quiet-form-film',
    title: { zh: 'Quiet Form', en: 'Quiet Form' } satisfies LocalizedString,
    summary: {
      zh: '结构清晰，不失柔软。',
      en: 'Clear structure, without losing softness.',
    } satisfies LocalizedString,
    poster: '/assets/campaign/01.jpg',
    src: '/assets/campaign/aw25.mp4',
  },
] as const
