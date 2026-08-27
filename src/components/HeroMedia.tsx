/**
 * Full-bleed hero still — Ridge landscape (8.15 syw / 040).
 */
import { ResponsiveImage } from './ResponsiveImage'

export function HeroMedia() {
  return (
    <div className="hero-media hero-media--single" aria-hidden="true">
      <ResponsiveImage
        src="/assets/hero-main.jpg?v=040"
        alt=""
        loading="eager"
        fetchPriority="high"
        sizes="hero"
      />
      <div className="hero-veil" />
      <div className="hero-grain" />
    </div>
  )
}
