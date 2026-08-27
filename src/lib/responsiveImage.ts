import manifest from '../data/responsive.manifest.json'

/** Strip cache-busting query from asset URLs. */
export function assetPath(src: string): string {
  return src.split('?')[0] ?? src
}

/**
 * Map `/assets/foo/bar.jpg` → `/assets/.rsp/foo/bar`
 */
export function responsiveStem(src: string): string | null {
  const path = assetPath(src)
  const match = path.match(/^\/assets\/(.+)\.(jpe?g|png|webp)$/i)
  if (!match) return null
  const rel = match[1]
  if (
    rel.startsWith('.rsp/') ||
    rel.includes('/derived/') ||
    rel.startsWith('_orient/')
  ) {
    return null
  }
  return `/assets/.rsp/${rel}`
}

export function responsiveWidths(src: string): number[] | null {
  const path = assetPath(src)
  const widths = (manifest as Record<string, number[]>)[path]
  return widths?.length ? widths : null
}

export function webpSrcSet(src: string): string | null {
  const widths = responsiveWidths(src)
  const stem = responsiveStem(src)
  if (!stem || !widths) return null
  return widths.map((w) => `${stem}/w${w}.webp ${w}w`).join(', ')
}

/** Largest WebP tier — used as img fallback so masters need not ship. */
export function largestWebp(src: string): string | null {
  const widths = responsiveWidths(src)
  const stem = responsiveStem(src)
  if (!stem || !widths?.length) return null
  const w = widths[widths.length - 1]
  return `${stem}/w${w}.webp`
}

export type ResponsiveSizes =
  | 'hero'
  | 'full'
  | 'half'
  | 'third'
  | 'card'
  | 'thumb'

const SIZE_MAP: Record<ResponsiveSizes, string> = {
  hero: '100vw',
  full: '100vw',
  half: '(max-width: 900px) 100vw, 50vw',
  third: '(max-width: 900px) 100vw, 33vw',
  card: '(max-width: 900px) 100vw, 40vw',
  thumb: '(max-width: 900px) 45vw, 20vw',
}

export function sizesFor(kind: ResponsiveSizes | string): string {
  if (kind in SIZE_MAP) return SIZE_MAP[kind as ResponsiveSizes]
  return kind
}
