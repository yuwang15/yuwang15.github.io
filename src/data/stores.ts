import type { LocalizedString } from '../i18n/types'

export type Store = {
  slug: string
  /** Atmosphere title — never a city / mall name */
  title: LocalizedString
  summary: LocalizedString
  cover: string
  images: string[]
  /** Practical visit note — kept quiet, not the headline */
  visitNote?: LocalizedString
}

const storeImages = (slug: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/assets/stores/${slug}/${i + 1}.jpg`)

export const stores: Store[] = [
  {
    slug: 'rugao-wuyue',
    title: { zh: '洞石与橱窗', en: 'Stone & Window' },
    summary: {
      zh: '门头沉静，橱窗柔亮。走进去，衣裳沿墙慢慢排开，光线落在面料上，不急着说话。',
      en: 'A quiet facade, a soft-lit window. Inside, clothes line the walls slowly—light lands on cloth before anyone speaks.',
    },
    cover: '/assets/stores/rugao-wuyue/1.jpg',
    images: storeImages('rugao-wuyue', 10),
    visitNote: {
      zh: '到店预约，请通过微信与我们联系。',
      en: 'To visit, reach us on WeChat.',
    },
  },
  {
    slug: 'xiruncheng',
    title: { zh: '留白的陈列', en: 'Room to Breathe' },
    summary: {
      zh: '中性色墙面托住剪裁。每一件衣裳旁边都留一点空，好让你看清楚，也慢慢试。',
      en: 'Neutral walls hold the cut. Each piece keeps a little air beside it—so you can see clearly, and try without hurry.',
    },
    cover: '/assets/stores/xiruncheng/2.jpg',
    images: storeImages('xiruncheng', 7),
    visitNote: {
      zh: '到店预约，请通过微信与我们联系。',
      en: 'To visit, reach us on WeChat.',
    },
  },
  {
    slug: 'haian-hengtian',
    title: { zh: '柔光与动线', en: 'Light & Path' },
    summary: {
      zh: '动线开阔，灯光柔和。衣裳是焦点，空间只负责安静地托住它们，让人愿意多停一会儿。',
      en: 'Open flow, soft light. Clothes are the focus; the room simply holds them—so you want to stay a little longer.',
    },
    cover: '/assets/stores/haian-hengtian/1.jpg',
    images: storeImages('haian-hengtian', 14),
    visitNote: {
      zh: '到店预约，请通过微信与我们联系。',
      en: 'To visit, reach us on WeChat.',
    },
  },
]

export function getStore(slug: string) {
  return stores.find((store) => store.slug === slug)
}
