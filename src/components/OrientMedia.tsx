import { useState, type SyntheticEvent } from 'react'

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
      <img src={src} alt={alt} loading={loading} onLoad={onLoad} />
    </figure>
  )
}

type OrientImgProps = {
  src: string
  alt?: string
  loading?: 'eager' | 'lazy'
  className?: string
  onOrient?: (orient: Orient) => void
}

/** Plain img that reports orientation via callback / data attribute */
export function OrientImg({
  src,
  alt = '',
  loading = 'lazy',
  className,
  onOrient,
}: OrientImgProps) {
  const onLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget
    const orient = detectOrient(naturalWidth, naturalHeight)
    event.currentTarget.dataset.orient = orient
    onOrient?.(orient)
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      onLoad={onLoad}
    />
  )
}
