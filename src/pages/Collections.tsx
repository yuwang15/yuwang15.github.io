import { Link } from 'react-router-dom'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { collections } from '../data/collections'
import { getCollectionBandShots } from '../data/picks'
import { useLocale } from '../i18n/LocaleContext'

/**
 * Collections band layouts
 *
 * Three distinct curated picks per series — never cover.jpg + pick
 * (cover is usually a duplicate file under another path).
 *
 * 这一页不做进场动效：每块都要滚进视口才淡入的话，读者是被迫等图出现，
 * 而不是在看图。
 */

export function Collections() {
  const { t, L } = useLocale()

  return (
    <div className="page collections-page collections-page--v2">
      <div className="container">
        <header className="editorial-header">
          <p className="eyebrow">{t('collections.eyebrow')}</p>
          <h1>{t('collections.title')}</h1>
          <p className="lede">{t('collections.lede')}</p>
        </header>
      </div>

      <div className="edit-bands edit-bands--v2">
        {collections.map((item, index) => {
          const shots = getCollectionBandShots(item)
          const [hero, ...accents] = shots
          const flipped = index % 2 === 1

          return (
            <div key={item.slug} className="edit-band-v2-shell">
              <Link
                to={`/collections/${item.slug}`}
                className={`edit-band edit-band--v2${flipped ? ' is-flip' : ''}`}
              >
                <div className="edit-band-visual">
                  {hero ? (
                    <figure className="edit-band-hero">
                      <ResponsiveImage
                        src={hero}
                        alt={item.title}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        sizes="card"
                      />
                    </figure>
                  ) : null}
                  <div className="edit-band-stack">
                    {accents.map((src) => (
                      <figure key={src}>
                        <ResponsiveImage src={src} alt="" loading="lazy" sizes="third" />
                      </figure>
                    ))}
                  </div>
                </div>

                <div className="edit-band-copy">
                  <p className="eyebrow">
                    {L(item.season)} {item.year}
                  </p>
                  <h2>{item.title}</h2>
                  <p>{L(item.summary)}</p>
                  <span className="btn-text">{t('collections.open')}</span>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
