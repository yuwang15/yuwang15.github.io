import { motion, useReducedMotion } from 'framer-motion'
import { stores, type Store } from '../data/stores'
import { useLocale } from '../i18n/LocaleContext'

const ease = [0.22, 1, 0.36, 1] as const

const listingSrc = (src: string, kind: 'hero' | 'thumb') => {
  const slash = src.lastIndexOf('/')
  const dir = src.slice(0, slash)
  const stem = src.slice(slash + 1).replace(/\.[^.]+$/, '')
  return `${dir}/derived/${stem}-${kind}.webp`
}

export function Stores() {
  const { t, L } = useLocale()
  const reduceMotion = useReducedMotion()

  const withPhotos = stores.filter((store): store is Store & { images: [string, string, string] } =>
    Boolean(store.images),
  )
  const textOnly = stores.filter((store) => !store.images)

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
        {withPhotos.map((store, index) => {
          const flipped = index % 2 === 1
          const aboveFold = index === 0
          const [hero, thumbA, thumbB] = store.images

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
                <div className="store-atmosphere-media">
                  <motion.figure
                    className="store-atmosphere-hero"
                    {...fadeIn(0)}
                  >
                    <img
                      src={listingSrc(hero, 'hero')}
                      alt={L(store.title)}
                      loading={aboveFold ? 'eager' : 'lazy'}
                      fetchPriority={aboveFold ? 'high' : 'auto'}
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.src = hero
                      }}
                    />
                  </motion.figure>
                  <div className="store-atmosphere-thumbs">
                    {[thumbA, thumbB].map((src, thumbIndex) => (
                      <motion.figure key={src} {...fadeIn(0.06 + thumbIndex * 0.05)}>
                        <img
                          src={listingSrc(src, 'thumb')}
                          alt=""
                          loading={aboveFold ? 'eager' : 'lazy'}
                          fetchPriority={aboveFold ? 'high' : 'auto'}
                          decoding="async"
                          onError={(event) => {
                            event.currentTarget.src = src
                          }}
                        />
                      </motion.figure>
                    ))}
                  </div>
                </div>
                <div className="store-atmosphere-copy">
                  <h2>{L(store.title)}</h2>
                  <p>{L(store.address)}</p>
                  <a
                    className="btn-text"
                    href={store.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('stores.map')}
                  </a>
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>

      {textOnly.length > 0 ? (
        <div className="container store-directory">
          <hr className="store-directory-rule" aria-hidden="true" />
          <ul className="store-directory-list">
            {textOnly.map((store) => (
              <li key={store.slug} className="store-directory-row">
                <div className="store-directory-main">
                  <h2>{L(store.title)}</h2>
                  <p>{L(store.address)}</p>
                </div>
                <a
                  className="btn-text"
                  href={store.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('stores.map')}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
