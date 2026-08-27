import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { HeroMedia } from '../components/HeroMedia'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { brandFilms } from '../data/campaigns'
import { getHomeSections } from '../data/picks'
import { useHomeSceneSnap } from '../hooks/useHomeSceneSnap'
import { useLocale } from '../i18n/LocaleContext'

function Shot({
  to,
  src,
  className,
  loading = 'lazy',
}: {
  to: string
  src: string
  className?: string
  loading?: 'eager' | 'lazy'
}) {
  return (
    <div className={`home-shot${className ? ` ${className}` : ''}`}>
      <Link to={to}>
        <ResponsiveImage src={src} alt="" loading={loading} sizes="half" />
      </Link>
    </div>
  )
}

/** Still intro — original hero frame + season line */
function HomeHeroIntro() {
  const heroRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { t } = useLocale()
  const progress = useMotionValue(0)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const el = heroRef.current
      if (!el) {
        ticking = false
        return
      }
      const start = el.offsetTop
      const end = start + el.offsetHeight - window.innerHeight
      const next =
        reduceMotion || end <= start
          ? 1
          : Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)))
      progress.set(next)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [progress, reduceMotion])

  const copyOpacity = useTransform(
    progress,
    [0, 0.35, 0.55],
    reduceMotion ? [1, 1, 1] : [1, 0.4, 0],
  )
  const copyY = useTransform(progress, [0, 0.55], reduceMotion ? [0, 0] : [0, 28])

  return (
    <section ref={heroRef} className="hero hero--intro">
      <div className="hero-sticky">
        <div className="hero-film-stage">
          <HeroMedia />
        </div>

        <div className="hero-overlay hero-overlay--intro">
          <motion.div
            className="hero-intro-copy"
            style={{ opacity: copyOpacity, y: copyY }}
          >
            <p className="hero-intro-season">{t('home.hero.season')}</p>
            <div className="hero-intro-scroll-block">
              <p className="hero-intro-scroll">{t('home.hero.scroll')}</p>
              <span className="hero-intro-scroll-line" aria-hidden />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/**
 * Latest film under the still: sticky stage; scroll opens inset → full canvas.
 */
function HomeVideoCanvas() {
  const trackRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()
  const film = brandFilms[0]
  const progress = useMotionValue(0)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const el = trackRef.current
      if (!el) {
        ticking = false
        return
      }
      const start = el.offsetTop
      const end = start + el.offsetHeight - window.innerHeight
      const next =
        reduceMotion || end <= start
          ? 1
          : Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)))
      progress.set(next)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [progress, reduceMotion])

  const insetY = useTransform(progress, [0, 0.5], reduceMotion ? [0, 0] : [14, 0])
  const insetX = useTransform(progress, [0, 0.5], reduceMotion ? [0, 0] : [18, 0])
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}%)`
  const videoScale = useTransform(
    progress,
    [0, 0.5, 1],
    reduceMotion ? [1, 1, 1] : [1.14, 1, 1],
  )

  useEffect(() => {
    const el = videoRef.current
    if (!el || reduceMotion) return

    const tryPlay = () => {
      el.muted = true
      el.defaultMuted = true
      const p = el.play()
      if (p) p.catch(() => {})
    }

    el.addEventListener('loadeddata', tryPlay)
    tryPlay()
    return () => el.removeEventListener('loadeddata', tryPlay)
  }, [reduceMotion, film.src])

  if (reduceMotion) {
    return (
      <section className="home-film-band" aria-label={film.title.zh}>
        <div className="home-film-curtain">
          <div className="home-film-frame home-film-frame--static">
            <img src={film.poster} alt="" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={trackRef}
      className="hero hero--video-canvas"
      aria-label={film.title.zh}
    >
      <div className="hero-sticky">
        <motion.div className="hero-canvas-frame" style={{ clipPath }}>
          <motion.video
            key={film.src}
            ref={videoRef}
            style={{ scale: videoScale }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={film.poster}
          >
            <source src={film.src} type="video/mp4" />
          </motion.video>
        </motion.div>
      </div>
    </section>
  )
}

export function Home() {
  const { t } = useLocale()
  const reduceMotion = useReducedMotion()
  const sections = getHomeSections()
  useHomeSceneSnap(!reduceMotion)

  return (
    <>
      <HomeHeroIntro />
      <HomeVideoCanvas />

      <section className="home-lookbook home-lookbook--editorial">
        <div className="home-gallery-shell">
          {sections.map((section) =>
            section.type === 'banner' ? (
              <div className="home-look-banner" key={section.shot.src}>
                <Link
                  to={`/collections/${section.shot.slug}`}
                  className="home-look-banner-link"
                >
                  <ResponsiveImage
                    src={section.shot.src}
                    alt=""
                    loading="lazy"
                    sizes="full"
                  />
                </Link>
              </div>
            ) : (
              <div className="home-pair" key={section.shots[0].src}>
                {section.shots.map((shot, index) => (
                  <Shot
                    key={shot.src}
                    to={`/collections/${shot.slug}`}
                    src={shot.src}
                    className="is-pair"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
            ),
          )}

          <div className="home-cta">
            <Link className="btn" to="/collections">
              {t('home.viewAll')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
