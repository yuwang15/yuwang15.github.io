type BrandMarkProps = {
  className?: string
  size?: 'hero' | 'nav' | 'footer' | 'display'
}

/** SYW wordmark — tight tracking, trailing space cancelled */
export function BrandMark({ className = '', size = 'display' }: BrandMarkProps) {
  return (
    <span
      className={`brand-mark brand-mark--${size}${className ? ` ${className}` : ''}`}
      aria-label="SYW"
    >
      SYW
    </span>
  )
}
