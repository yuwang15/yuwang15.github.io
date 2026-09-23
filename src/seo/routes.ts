import { collections } from '../data/collections'

export const SITE_ORIGIN = 'https://syw.fashion'

/**
 * Each route ships as <path>/index.html, which GitHub Pages serves at <path>/
 * and 301s to from <path>. Canonical and sitemap URLs use the 200 form.
 */
export function canonicalUrl(path: string): string {
  return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}/`
}

export type SeoRoute = {
  path: string
  title: string
  description: string
  image: string
  /** Baidu, 360 and Sogou still read the keywords tag. */
  keywords: string
  /** Listed in sitemap.xml. Unlinked pages stay reachable but unlisted. */
  sitemap: boolean
}

const DEFAULT_IMAGE = '/assets/share/og.jpg'
const BRAND_KEYWORDS = 'SYW,SYW官网,SYW官方网站,SYW品牌,SYW成衣,SYW配饰'

export function seoRoutes(): SeoRoute[] {
  const pages: Omit<SeoRoute, 'keywords'>[] = [
    {
      path: '/',
      title: 'SYW 官方网站 | 成衣与配饰品牌',
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

  return pages.map((page) => ({ ...page, keywords: BRAND_KEYWORDS }))
}

export function seoForPath(pathname: string): SeoRoute {
  const routes = seoRoutes()
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return routes.find((route) => route.path === path) ?? routes[0]
}
