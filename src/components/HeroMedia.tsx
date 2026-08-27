import { useEffect, useRef, useState } from 'react'
import type { MotionValue } from 'framer-motion'
import { motion, useReducedMotion } from 'framer-motion'

type HeroMediaProps = {
  /** Scroll-driven focus through the portrait film */
  focusY?: MotionValue<string>
}

/**
 * Portrait film in a cinematic window.
 * Scroll pans object-position so more of the frame becomes visible.
 */
export function HeroMedia({ focusY }: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el || reduceMotion) return

    const tryPlay = () => {
      el.muted = true
      const p = el.play()
      if (p) p.catch(() => {})
    }

    const onReady = () => {
      if (el.currentTime < 0.05) el.currentTime = 0.2
      setReady(true)
      tryPlay()
    }

    el.load()
    el.addEventListener('loadeddata', onReady)
    document.addEventListener('visibilitychange', tryPlay)
    tryPlay()

    return () => {
      el.removeEventListener('loadeddata', onReady)
      document.removeEventListener('visibilitychange', tryPlay)
    }
  }, [reduceMotion])

  const poster = '/assets/hero-poster-portrait.jpg?v=syw'
  const src = '/assets/hero-portrait.mp4?v=syw'

  return (
    <div className="hero-media hero-media--scroll" aria-hidden="true">
      <img src={poster} alt="" className={ready ? 'is-dim' : undefined} />
      {!reduceMotion ? (
        <motion.video
          key={src}
          ref={videoRef}
          className="is-portrait"
          style={focusY ? { objectPosition: focusY } : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </motion.video>
      ) : (
        <img src={poster} alt="" className="is-fallback" />
      )}
      <div className="hero-veil" />
      <div className="hero-grain" />
    </div>
  )
}
