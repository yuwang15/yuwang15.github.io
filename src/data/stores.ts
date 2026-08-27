import type { LocalizedString } from '../i18n/types'

export type Store = {
  slug: string
  title: LocalizedString
  summary: LocalizedString
  /** Street / mall line shown on Contact */
  address: LocalizedString
  /** Opens native / web maps */
  mapUrl: string
  cover: string
  images: string[]
  visitNote?: LocalizedString
}

const mapsSearch = (query: string) =>
  `https://uri.amap.com/search?keyword=${encodeURIComponent(query)}&src=syw`

export const stores: Store[] = [
  {
    slug: 'haian-hengtian',
    title: { zh: '海安恒天', en: 'Haian Hengtian' },
    address: {
      zh: '江苏省南通市海安市宁海中路19号 · 恒天新世界',
      en: 'Hengtian New World, 19 Ninghai Middle Rd, Haian, Nantong',
    },
    mapUrl: mapsSearch('海安恒天新世界 SYW'),
    summary: {
      zh: '动线开阔，灯光柔和。衣裳是焦点，空间只负责安静地托住它们，让人愿意多停一会儿。',
      en: 'Open flow, soft light. Clothes are the focus; the room simply holds them—so you want to stay a little longer.',
    },
    cover: '/assets/stores/haian-hengtian/3.jpg',
    // Listing: night facade + lounge doorway + wood island — not the travertine twin of 如皋
    images: [
      '/assets/stores/haian-hengtian/3.jpg',
      '/assets/stores/haian-hengtian/9.jpg',
      '/assets/stores/haian-hengtian/7.jpg',
      '/assets/stores/haian-hengtian/8.jpg',
      '/assets/stores/haian-hengtian/4.jpg',
      '/assets/stores/haian-hengtian/11.jpg',
      '/assets/stores/haian-hengtian/1.jpg',
      '/assets/stores/haian-hengtian/2.jpg',
      '/assets/stores/haian-hengtian/10.jpg',
      '/assets/stores/haian-hengtian/12.jpg',
      '/assets/stores/haian-hengtian/14.jpg',
      '/assets/stores/haian-hengtian/5.jpg',
      '/assets/stores/haian-hengtian/6.jpg',
      '/assets/stores/haian-hengtian/13.jpg',
    ],
    visitNote: {
      zh: '到店预约，请通过微信与我们联系。',
      en: 'To visit, reach us on WeChat.',
    },
  },
  {
    slug: 'xiruncheng',
    title: { zh: '喜润城', en: 'Xiruncheng' },
    address: {
      zh: '江苏省南通市如东县城中街道珠江路7号 · 喜润城',
      en: 'Xiruncheng, 7 Zhujiang Rd, Rudong, Nantong',
    },
    mapUrl: mapsSearch('如东喜润城 SYW'),
    summary: {
      zh: '中性色墙面托住剪裁。每一件衣裳旁边都留一点空，好让你看清楚，也慢慢试。',
      en: 'Neutral walls hold the cut. Each piece keeps a little air beside it—so you can see clearly, and try without hurry.',
    },
    cover: '/assets/stores/xiruncheng/7.jpg',
    // Listing: hall panorama + terrazzo view + storefront
    images: [
      '/assets/stores/xiruncheng/7.jpg',
      '/assets/stores/xiruncheng/2.jpg',
      '/assets/stores/xiruncheng/1.jpg',
      '/assets/stores/xiruncheng/3.jpg',
      '/assets/stores/xiruncheng/4.jpg',
      '/assets/stores/xiruncheng/5.jpg',
      '/assets/stores/xiruncheng/6.jpg',
    ],
    visitNote: {
      zh: '到店预约，请通过微信与我们联系。',
      en: 'To visit, reach us on WeChat.',
    },
  },
  {
    slug: 'rugao-wuyue',
    title: { zh: '如皋吾悦', en: 'Rugao Wuyue' },
    address: {
      zh: '江苏省南通市如皋市海阳南路与惠政路交汇处 · 吾悦广场',
      en: 'Wuyue Plaza, intersection of Haiyang S. Rd & Huizheng Rd, Rugao, Nantong',
    },
    mapUrl: mapsSearch('如皋吾悦广场 SYW'),
    summary: {
      zh: '门头沉静，橱窗柔亮。走进去，衣裳沿墙慢慢排开，光线落在面料上，不急着说话。',
      en: 'A quiet facade, a soft-lit window. Inside, clothes line the walls slowly—light lands on cloth before anyone speaks.',
    },
    cover: '/assets/stores/rugao-wuyue/4.jpg',
    // Listing: rock-wall signature + herringbone + exterior — distinct from 海安
    images: [
      '/assets/stores/rugao-wuyue/7.jpg',
      '/assets/stores/rugao-wuyue/10.jpg',
      '/assets/stores/rugao-wuyue/1.jpg',
      '/assets/stores/rugao-wuyue/6.jpg',
      '/assets/stores/rugao-wuyue/3.jpg',
      '/assets/stores/rugao-wuyue/4.jpg',
      '/assets/stores/rugao-wuyue/5.jpg',
      '/assets/stores/rugao-wuyue/8.jpg',
      '/assets/stores/rugao-wuyue/9.jpg',
      '/assets/stores/rugao-wuyue/2.jpg',
    ],
    visitNote: {
      zh: '到店预约，请通过微信与我们联系。',
      en: 'To visit, reach us on WeChat.',
    },
  },
]

export function getStore(slug: string) {
  return stores.find((store) => store.slug === slug)
}
