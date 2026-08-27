import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { BrandMark } from '../components/BrandMark'
import { HeroMedia } from '../components/HeroMedia'
import { featuredCollection } from '../data/collections'
import { getHomePicks } from '../data/picks'
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
        <img src={src} alt="" loading={loading} />
      </Link>
    </div>
  )
}

export function Home() {
  const { t } = useLocale()
  const filmRef = useRef<HTMLElement>(null)

  const { scrollYProgress: filmProgress } = useScroll({
    target: filmRef,
    offset: ['start start', 'end end'],
  })

  // Scroll pan only — no zoom
  const focusY = useTransform(
    filmProgress,
    [0, 1],
    ['center 22%', 'center 58%'],
  )
  const overlayOpacity = useTransform(
    filmProgress,
    [0, 0.25, 0.85, 1],
    [1, 1, 0.65, 0.25],
  )

  const picks = getHomePicks(featuredCollection)
  const pinLeft = picks[0]
  const pinRight = picks.slice(1, 3)
  const rowA = picks.slice(3, 7)
  const pinLeft2 = picks[7]
  const pinRight2 = picks.slice(8, 10)
  const rowB = picks.slice(10, 14)

  const detail = `/collections/${featuredCollection.slug}`

  return (
    <>
      <section className="hero hero--scrollfilm" ref={filmRef}>
        <div className="hero-sticky">
          <div className="hero-film-stage">
            <HeroMedia focusY={focusY} />
          </div>

          <motion.div className="hero-overlay" style={{ opacity: overlayOpacity }}>
            <h1 className="hero-brand">
              <BrandMark size="hero" />
            </h1>
            <p className="hero-line">{t('home.tagline')}</p>
            <div className="hero-actions">
              <Link className="btn btn-light" to={detail}>
                {featuredCollection.title}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="home-lookbook home-lookbook--editorial">
        <div className="home-gallery-shell">
          <div className="home-pin-round">
            <div className="home-pin-left">
              {pinLeft ? (
                <div className="home-pin-sticky">
                  <Link to={detail} className="home-shot is-pin">
                    <img src={pinLeft} alt="" loading="eager" />
                  </Link>
                </div>
              ) : null}
            </div>
            <div className="home-pin-right">
              {pinRight.map((src) => (
                <Shot key={src} to={detail} src={src} className="is-stack" />
              ))}
            </div>
          </div>

          {rowA.length > 0 ? (
            <div className="home-shot-row">
              {rowA.map((src) => (
                <Shot key={src} to={detail} src={src} className="is-row" />
              ))}
            </div>
          ) : null}

          {pinLeft2 ? (
            <div className="home-pin-round">
              <div className="home-pin-left">
                <div className="home-pin-sticky">
                  <Link to={detail} className="home-shot is-pin">
                    <img src={pinLeft2} alt="" loading="lazy" />
                  </Link>
                </div>
              </div>
              <div className="home-pin-right">
                {pinRight2.map((src) => (
                  <Shot key={src} to={detail} src={src} className="is-stack" />
                ))}
              </div>
            </div>
          ) : null}

          {rowB.length > 0 ? (
            <div className="home-shot-row">
              {rowB.map((src) => (
                <Shot key={src} to={detail} src={src} className="is-row" />
              ))}
            </div>
          ) : null}

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
