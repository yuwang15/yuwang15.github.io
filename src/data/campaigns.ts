import type { LocalizedString } from '../i18n/types'

/** Two distinct films for Brand — never duplicate the home hero encode */
export const brandFilms = [
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
