import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { stores } from '../data/stores'
import { useLocale } from '../i18n/LocaleContext'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Listing thumbnails are ~370px wide but the sources are 2800-3000px originals,
 * so point at the WebP derivatives built by scripts/build-store-listing-images.py.
 */
const listingSrc = (src: string, kind: 'hero' | 'thumb') => {
  const slash = src.lastIndexOf('/')
  const dir = src.slice(0, slash)
  const stem = src.slice(slash + 1).replace(/\.[^.]+$/, '')
  return `${dir}/derived/${stem}-${kind}.webp`
}

export function Stores() {
  const { t, L } = useLocale()
  const reduceMotion = useReducedMotion()

  // Thresholds stay low so anything peeking above the fold fades in on load,
  // rather than staying blank until the first scroll.
  const fadeIn = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.05, margin: '0px 0px -4% 0px' },
    transition: { duration: 0.7, ease, delay },
  })

  return (
    <div className="page">
      <div className="container">
        <header className="editorial-header editorial-header--tight">
          <h1>{t('stores.title')}</h1>
        </header>
      </div>

      <div className="store-atmosphere">
        {stores.map((store, index) => {
          const flipped = index % 2 === 1
          // The first store sits above the fold; lazy-loading it there only
          // delays the request and makes the last thumb trail behind.
          const aboveFold = index === 0

          return (
            <motion.article
              key={store.slug}
              className="store-atmosphere-shell"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.04, margin: '0px 0px -3% 0px' }}
              transition={{ duration: 0.5, ease }}
            >
              <div
                className={`store-atmosphere-block${flipped ? ' is-flip' : ''}`}
              >
                <Link
                  to={`/stores/${store.slug}`}
                  className="store-atmosphere-media"
                >
                  <motion.figure
                    className="store-atmosphere-hero"
                    {...fadeIn(0)}
                  >
                    <img
                      src={listingSrc(store.cover, 'hero')}
                      alt={L(store.title)}
                      loading={aboveFold ? 'eager' : 'lazy'}
                      fetchPriority={aboveFold ? 'high' : 'auto'}
                      decoding="async"
                    />
                  </motion.figure>
                  <div className="store-atmosphere-thumbs">
                    {store.images.slice(1, 3).map((src, thumbIndex) => (
                      <motion.figure
                        key={src}
                        {...fadeIn(0.06 + thumbIndex * 0.05)}
                      >
                        <img
                          src={listingSrc(src, 'thumb')}
                          alt=""
                          loading={aboveFold ? 'eager' : 'lazy'}
                          fetchPriority={aboveFold ? 'high' : 'auto'}
                          decoding="async"
                        />
                      </motion.figure>
                    ))}
                  </div>
                </Link>
                <div className="store-atmosphere-copy">
                  <h2>
                    <Link to={`/stores/${store.slug}`}>{L(store.title)}</Link>
                  </h2>
                  <a
                    className="btn-text"
                    href={store.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('stores.book')}
                  </a>
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>
    </div>
  )
}
