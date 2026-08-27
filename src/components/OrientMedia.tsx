import { useState, type SyntheticEvent } from 'react'
import { ResponsiveImage } from './ResponsiveImage'

export type Orient = 'landscape' | 'portrait' | 'square'

function detectOrient(width: number, height: number): Orient {
  if (!width || !height) return 'portrait'
  const ratio = width / height
  if (ratio > 1.12) return 'landscape'
  if (ratio < 0.88) return 'portrait'
  return 'square'
}

type OrientFigureProps = {
  src: string
  alt?: string
  className?: string
  loading?: 'eager' | 'lazy'
  sizes?: 'full' | 'half' | 'third' | 'card'
  /** Extra class prefix wrapper — defaults to edit-mosaic-item */
  asMosaic?: boolean
}

/**
 * Renders a figure whose layout class follows the file’s native ratio.
 * Avoids forcing portrait frames into wide cover crops (and vice versa).
 */
export function OrientFigure({
  src,
  alt = '',
  className,
  loading = 'lazy',
  sizes = 'half',
  asMosaic = true,
}: OrientFigureProps) {
  const [orient, setOrient] = useState<Orient>('portrait')

  const onLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget
    setOrient(detectOrient(naturalWidth, naturalHeight))
  }

  const base = asMosaic ? `edit-mosaic-item is-${orient}` : `is-${orient}`
  const merged = className ? `${base} ${className}` : base

  return (
    <figure className={merged}>
      <ResponsiveImage
        src={src}
        alt={alt}
        loading={loading}
        sizes={sizes}
        onLoad={onLoad}
      />
    </figure>
  )
}

type OrientImgProps = {
  src: string
  alt?: string
  loading?: 'eager' | 'lazy'
  className?: string
  sizes?: 'full' | 'half' | 'third' | 'card'
  onOrient?: (orient: Orient) => void
}

/** Plain img that reports orientation via callback / data attribute */
export function OrientImg({
  src,
  alt = '',
  loading = 'lazy',
  className,
  sizes = 'full',
  onOrient,
}: OrientImgProps) {
  const onLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget
    const orient = detectOrient(naturalWidth, naturalHeight)
    event.currentTarget.dataset.orient = orient
    onOrient?.(orient)
  }

  return (
    <ResponsiveImage
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      sizes={sizes}
      onLoad={onLoad}
    />
  )
}
