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
  /** Marks image as waiting to fade in */
  pending?: boolean
}

/**
 * When responsive WebP derivatives exist (manifest + /.rsp), serves srcset.
 * Always keeps a fallback src for reliability.
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
  pending = false,
}: Props) {
  const master = assetPath(src)
  const srcSet = webpSrcSet(src)
  const sizesAttr = sizesFor(sizes)
  const fallback = largestWebp(src) ?? src

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
    event.currentTarget.classList.add('is-loaded')
    event.currentTarget.removeAttribute('data-pending')
    onLoad?.(event)
  }

  const img = (
    <img
      src={srcSet ? fallback : src}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
      sizes={srcSet ? sizesAttr : undefined}
      onLoad={handleLoad}
      data-pending={pending ? '' : undefined}
      data-master={srcSet ? master : undefined}
      ref={(node) => {
        // Cached images may already be complete before onLoad fires.
        if (node?.complete && node.naturalWidth > 0) {
          node.classList.add('is-loaded')
          node.removeAttribute('data-pending')
        }
      }}
    />
  )

  if (!srcSet) return img

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizesAttr} />
      {img}
    </picture>
  )
}
