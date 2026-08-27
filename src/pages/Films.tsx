import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { brandFilms } from '../data/campaigns'
import { useLocale } from '../i18n/LocaleContext'

const ease = [0.22, 1, 0.36, 1] as const

export function Films() {
  const { t, L } = useLocale()
  const reduceMotion = useReducedMotion()

  return (
    <div className="page">
      <div className="container">
        <header className="editorial-header editorial-header--tight">
          <h1>{t('films.title')}</h1>
          <p className="lede">{t('films.lede')}</p>
        </header>
      </div>

      <div className="film-scenes">
        {brandFilms.map((film, index) => (
          <motion.article
            key={film.slug}
            className={`film-scene${index % 2 === 1 ? ' is-flip' : ''}`}
            style={
              {
                '--film-ratio': `${film.width} / ${film.height}`,
                // Numeric form lets the stacked layout cap height by narrowing
                // the width, which keeps the ratio exact and lets the caption
                // match the film's measure.
                '--film-ar': `${film.width / film.height}`,
              } as CSSProperties
            }
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.04, margin: '0px 0px -3% 0px' }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="film-scene-media">
              <video
                controls
                playsInline
                preload="metadata"
                poster={film.poster}
                width={film.width}
                height={film.height}
              >
                <source src={film.src} type="video/mp4" />
              </video>
            </div>

            <div className="film-scene-copy">
              <h2>{L(film.title)}</h2>
              <span className="film-scene-season">{L(film.season)}</span>
              <p>{L(film.summary)}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
