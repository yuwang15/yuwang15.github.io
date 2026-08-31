import { collections } from '../data/collections'

export const SITE_ORIGIN = 'https://syw.fashion'

export type SeoRoute = {
  path: string
  title: string
  description: string
  image: string
  /** Listed in sitemap.xml. Unlinked pages stay reachable but unlisted. */
  sitemap: boolean
}

const DEFAULT_IMAGE = '/assets/share/og.jpg'

export function seoRoutes(): SeoRoute[] {
  const pages: SeoRoute[] = [
    {
      path: '/',
      title: 'SYW',
      description: 'SYW — 成衣与配饰，以卓越品质与持久设计为核心。',
      image: DEFAULT_IMAGE,
      sitemap: true,
    },
    {
      path: '/collections',
      title: '系列 | SYW',
      description: 'SYW 成衣系列：Ridge、Rise、Quiet Form、Daylight、Away。',
      image: DEFAULT_IMAGE,
      sitemap: true,
    },
    {
      path: '/films',
      title: '品牌视频 | SYW',
      description: 'SYW 品牌短片与系列影像。',
      image: DEFAULT_IMAGE,
      sitemap: true,
    },
    {
      path: '/services',
      title: '服务 | SYW',
      description: '尺码、现货与到店试穿，通过官方微信咨询。',
      image: DEFAULT_IMAGE,
      sitemap: true,
    },
    {
      path: '/brand',
      title: '关于我们 | SYW',
      description: 'SYW 成衣与配饰品牌。穿得好看，也穿得自在。',
      image: DEFAULT_IMAGE,
      sitemap: true,
    },
    {
      path: '/contact',
      title: '加盟合作 | SYW',
      description: 'SYW 加盟与合作咨询，请通过官方微信联系。',
      image: DEFAULT_IMAGE,
      sitemap: true,
    },
    {
      path: '/stores',
      title: '门店 | SYW',
      description: '添加官方微信，咨询门店地址、营业时间与当季在售款式。',
      image: DEFAULT_IMAGE,
      sitemap: false,
    },
  ]

  for (const collection of collections) {
    pages.push({
      path: `/collections/${collection.slug}`,
      title: `${collection.title} ${collection.year} ${collection.season.zh}系列 | SYW`,
      description: `${collection.title}，SYW ${collection.year} ${collection.season.zh}系列。${collection.summary.zh}`,
      image: `/assets/share/og-${collection.slug}.jpg`,
      sitemap: true,
    })
  }

  return pages
}

export function seoForPath(pathname: string): SeoRoute {
  const routes = seoRoutes()
  return routes.find((route) => route.path === pathname) ?? routes[0]
}
