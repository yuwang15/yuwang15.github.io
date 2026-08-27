import { useEffect, useRef, useState } from 'react'
import { BrandMark } from '../components/BrandMark'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { useLocale } from '../i18n/LocaleContext'

/** Brand philosophy visuals — lookbook / film only, never store interiors */
const brandStills = [
  '/assets/collections/aw26/008.jpg',
  '/assets/collections/ss26/021.jpg',
  '/assets/collections/spring26/058.jpg',
]

/** Brand tone studies — garment close-ups, one per SYW letter, season-agnostic */
const toneStudies = [
  { src: '/assets/mood/brand-tone-style.jpg', letter: 'S', name: 'brand.pillar.style' },
  { src: '/assets/mood/brand-tone-youth.jpg', letter: 'Y', name: 'brand.pillar.youth' },
  { src: '/assets/mood/brand-tone-wild.jpg', letter: 'W', name: 'brand.pillar.wild' },
]

export function Brand() {
  const { t } = useLocale()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const tryPlay = () => {
      el.muted = true
      const p = el.play()
      if (p) p.catch(() => {})
    }
    const onReady = () => {
      setReady(true)
      tryPlay()
    }
    el.addEventListener('loadeddata', onReady)
    tryPlay()
    return () => el.removeEventListener('loadeddata', onReady)
  }, [])

  return (
    <div className="page brand-page">
      <section className="about-intro" aria-labelledby="about-heading">
        <div className="about-intro-media">
          <img
            src="/assets/brand/syw-poster.jpg"
            alt=""
            className={ready ? 'is-dim' : undefined}
          />
          <video
            ref={videoRef}
            className={ready ? 'is-ready' : undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/brand/syw-poster.jpg"
          >
            <source src="/assets/brand/syw.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="about-intro-copy">
          <p className="eyebrow">{t('brand.eyebrow')}</p>
          <h1 id="about-heading">
            <BrandMark size="display" />
          </h1>
          <div className="about-intro-lede">
            <p>{t('brand.p1')}</p>
            <p>{t('brand.p2')}</p>
            <p>{t('brand.p3')}</p>
            <p>{t('brand.p4')}</p>
          </div>
        </div>
      </section>

      <section className="brand-pillars">
        <div className="container brand-pillars-grid">
          <article>
            <h3>
              <span className="brand-pillar-letter" aria-hidden>
                S
              </span>
              {t('brand.pillar.style')}
            </h3>
            <p>{t('brand.style')}</p>
          </article>
          <article>
            <h3>
              <span className="brand-pillar-letter" aria-hidden>
                Y
              </span>
              {t('brand.pillar.youth')}
            </h3>
            <p>{t('brand.youth')}</p>
          </article>
          <article>
            <h3>
              <span className="brand-pillar-letter" aria-hidden>
                W
              </span>
              {t('brand.pillar.wild')}
            </h3>
            <p>{t('brand.wild')}</p>
          </article>
        </div>
      </section>

      <section className="brand-mood" aria-labelledby="brand-mood-heading">
        <div className="container brand-mood-head">
          <p className="eyebrow">{t('brand.mood.eyebrow')}</p>
          <h2 id="brand-mood-heading">{t('brand.mood.title')}</h2>
          <p className="brand-mood-lede">{t('brand.mood.lede')}</p>
        </div>

        <div className="container brand-mood-grid">
          {toneStudies.map(({ src, letter, name }) => (
            <figure key={src} className="brand-mood-item">
              <ResponsiveImage src={src} alt={t(name)} loading="lazy" sizes="third" />
              <figcaption>
                <span className="brand-mood-letter" aria-hidden>
                  {letter}
                </span>
                <span className="brand-mood-name">{t(name)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="brand-visuals" aria-label={t('brand.about')}>
        <div className="brand-visuals-grid brand-visuals-grid--lookbook">
          {brandStills.map((src) => (
            <figure key={src} className="brand-visual is-look">
              <ResponsiveImage
                src={src}
                alt={t('brand.altDetail')}
                loading="lazy"
                sizes="third"
              />
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}
