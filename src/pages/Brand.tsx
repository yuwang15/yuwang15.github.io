import { useEffect, useRef, useState } from 'react'
import { BrandMark } from '../components/BrandMark'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { useLocale } from '../i18n/LocaleContext'

/** One block per letter: image + label + copy. No second pass that restates SYW. */
const pillars = [
  {
    src: '/assets/collections/aw26/032.jpg',
    letter: 'S',
    en: 'Style',
    zh: '风格',
    body: 'brand.style',
  },
  {
    src: '/assets/collections/spring26/140.jpg',
    letter: 'Y',
    en: 'Youth',
    zh: '青春',
    body: 'brand.youth',
  },
  {
    src: '/assets/collections/aw26/045.jpg',
    letter: 'W',
    en: 'Wild',
    zh: '野性',
    body: 'brand.wild',
  },
] as const

export function Brand() {
  const { t } = useLocale()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const markReady = () => {
      setReady(true)
      el.muted = true
      const play = el.play()
      if (play) play.catch(() => {})
    }

    if (el.readyState >= 2) markReady()
    el.addEventListener('loadeddata', markReady)
    el.addEventListener('canplay', markReady)

    return () => {
      el.removeEventListener('loadeddata', markReady)
      el.removeEventListener('canplay', markReady)
    }
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
            preload="auto"
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

      <section className="brand-pillars" aria-label="SYW">
        <div className="container brand-pillars-stack">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.letter}
              className={`brand-pillar${index % 2 === 0 ? ' is-flip' : ''}`}
            >
              <figure className="brand-pillar-media">
                <ResponsiveImage
                  src={pillar.src}
                  alt={`${pillar.letter} ${pillar.en}`}
                  loading="lazy"
                  sizes="half"
                />
              </figure>
              <div className="brand-pillar-copy">
                <h3>
                  <span className="brand-pillar-letter" aria-hidden>
                    {pillar.letter}
                  </span>
                  <span className="brand-pillar-sep" aria-hidden>
                    ·
                  </span>
                  <span className="brand-pillar-en">{pillar.en}</span>
                  <span className="brand-pillar-zh">{pillar.zh}</span>
                </h3>
                <p>{t(pillar.body)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
