import {
  assetPath,
  largestWebp,
  sizesFor,
  webpSrcSet,
  type ResponsiveSizes,
} from '../lib/responsiveImage'

type Props = {
  src: string
  alt?: string
  className?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  decoding?: 'async' | 'auto' | 'sync'
  sizes?: ResponsiveSizes | string
  onLoad?: React.ReactEventHandler<HTMLImageElement>
}

/**
 * When responsive WebP derivatives exist (manifest + /.rsp), serves srcset.
 * Always keeps the original URL as <img src> fallback for reliability.
 */
export function ResponsiveImage({
  src,
  alt = '',
  className,
  loading = 'lazy',
  fetchPriority,
  decoding = 'async',
  sizes = 'full',
  onLoad,
}: Props) {
  const master = assetPath(src)
  const srcSet = webpSrcSet(src)
  const sizesAttr = sizesFor(sizes)
  // Prefer largest WebP when present; never lose the master as last resort.
  const fallback = largestWebp(src) ?? src

  if (!srcSet) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        onLoad={onLoad}
      />
    )
  }

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizesAttr} />
      <img
        src={fallback}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        sizes={sizesAttr}
        onLoad={onLoad}
        data-master={master}
      />
    </picture>
  )
}
