import type { LocalizedString } from '../i18n/types'

export type Store = {
  slug: string
  title: LocalizedString
  address: LocalizedString
  /** Opens maps search */
  mapUrl: string
  /** Listing: [hero, thumb, thumb] — only when real store photos exist */
  images?: [string, string, string]
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
    images: [
      '/assets/stores/haian-hengtian/3.jpg',
      '/assets/stores/haian-hengtian/9.jpg',
      '/assets/stores/haian-hengtian/7.jpg',
    ],
  },
  {
    slug: 'haian-central',
    title: { zh: '海安中央广场', en: 'Haian Central Plaza' },
    address: {
      zh: '江苏省南通市海安市 · 中央广场一楼',
      en: 'Central Plaza, 1F, Haian, Nantong',
    },
    mapUrl: mapsSearch('海安中央广场 SYW'),
  },
  {
    slug: 'xiruncheng',
    title: { zh: '海安喜润城', en: 'Haian Xiruncheng' },
    address: {
      zh: '江苏省南通市海安市中坝中路41号 · 喜润城',
      en: 'Xiruncheng, 41 Zhongba Middle Rd, Haian, Nantong',
    },
    mapUrl: mapsSearch('海安喜润城 SYW'),
    images: [
      '/assets/stores/xiruncheng/7.jpg',
      '/assets/stores/xiruncheng/1.jpg',
      '/assets/stores/xiruncheng/2.jpg',
    ],
  },
  {
    slug: 'rugao-wuyue',
    title: { zh: '如皋吾悦', en: 'Rugao Wuyue' },
    address: {
      zh: '江苏省南通市如皋市海阳南路与惠政路交汇处 · 吾悦广场一楼',
      en: 'Wuyue Plaza 1F, Haiyang S. Rd & Huizheng Rd, Rugao, Nantong',
    },
    mapUrl: mapsSearch('如皋吾悦广场 SYW'),
    images: [
      '/assets/stores/rugao-wuyue/4.jpg',
      '/assets/stores/rugao-wuyue/7.jpg',
      '/assets/stores/rugao-wuyue/10.jpg',
    ],
  },
  {
    slug: 'rugao-wenfeng',
    title: { zh: '如皋文峰', en: 'Rugao Wenfeng' },
    address: {
      zh: '江苏省南通市如皋市 · 文峰',
      en: 'Wenfeng, Rugao, Nantong',
    },
    mapUrl: mapsSearch('如皋文峰 SYW'),
  },
  {
    slug: 'rugao-anding',
    title: { zh: '如皋安定街', en: 'Rugao Anding Street' },
    address: {
      zh: '江苏省南通市如皋市安定街105号（二楼）',
      en: '105 Anding St, 2F, Rugao, Nantong',
    },
    mapUrl: mapsSearch('如皋安定街105号 SYW'),
  },
  {
    slug: 'baoying-wuyue',
    title: { zh: '宝应吾悦广场', en: 'Baoying Wuyue Plaza' },
    address: {
      zh: '江苏省扬州市宝应县 · 吾悦广场一楼 1063 号',
      en: 'Wuyue Plaza 1F No.1063, Baoying, Yangzhou',
    },
    mapUrl: mapsSearch('宝应吾悦广场 SYW'),
  },
  {
    slug: 'danyang-wuyue',
    title: { zh: '丹阳吾悦广场', en: 'Danyang Wuyue Plaza' },
    address: {
      zh: '江苏省镇江市丹阳市 · 吾悦广场一楼 020 号',
      en: 'Wuyue Plaza 1F No.020, Danyang, Zhenjiang',
    },
    mapUrl: mapsSearch('丹阳吾悦广场 SYW'),
  },
  {
    slug: 'gaoyou-shimao',
    title: { zh: '高邮世贸金街', en: 'Gaoyou Shimao Golden Street' },
    address: {
      zh: '江苏省扬州市高邮市 · 世贸金街一楼 1-042 号',
      en: 'Shimao Golden Street 1F No.1-042, Gaoyou, Yangzhou',
    },
    mapUrl: mapsSearch('高邮世贸金街 SYW'),
  },
  {
    slug: 'qidong-wuyue',
    title: { zh: '启东吾悦广场', en: 'Qidong Wuyue Plaza' },
    address: {
      zh: '江苏省南通市启东市 · 吾悦广场一楼 1038 号',
      en: 'Wuyue Plaza 1F No.1038, Qidong, Nantong',
    },
    mapUrl: mapsSearch('启东吾悦广场 SYW'),
  },
  {
    slug: 'xinghua-wuyue',
    title: { zh: '兴化吾悦广场', en: 'Xinghua Wuyue Plaza' },
    address: {
      zh: '江苏省泰州市兴化市 · 吾悦广场一楼 1052 号',
      en: 'Wuyue Plaza 1F No.1052, Xinghua, Taizhou',
    },
    mapUrl: mapsSearch('兴化吾悦广场 SYW'),
  },
]

export function getStore(slug: string) {
  return stores.find((store) => store.slug === slug)
}
