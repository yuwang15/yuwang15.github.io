type BrandMarkProps = {
  className?: string
  size?: 'hero' | 'nav' | 'footer' | 'display' | 'mega'
}

/** SYW wordmark — site chrome always spells the full brand */
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
