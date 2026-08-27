import { Link } from 'react-router-dom'
import { collections } from '../data/collections'
import { getCollectionPicks } from '../data/picks'
import { useLocale } from '../i18n/LocaleContext'

export function Collections() {
  const { t, L } = useLocale()

  return (
    <div className="page collections-page">
      <div className="container">
        <header className="editorial-header">
          <p className="eyebrow">{t('collections.eyebrow')}</p>
          <h1>{t('collections.title')}</h1>
          <p className="lede">{t('collections.lede')}</p>
        </header>

        <div className="edit-bands">
          {collections.map((item, index) => {
            const accents = getCollectionPicks(item).slice(0, 2)
            return (
              <Link
                key={item.slug}
                to={`/collections/${item.slug}`}
                className={`edit-band${index % 2 === 1 ? ' is-flip' : ''}`}
              >
                <div className="edit-band-visual">
                  <figure className="edit-band-hero">
                    <img src={item.cover} alt={item.title} />
                  </figure>
                  <div className="edit-band-stack">
                    {accents.map((src) => (
                      <figure key={src}>
                        <img src={src} alt="" loading="lazy" />
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
            )
          })}
        </div>
      </div>
    </div>
  )
}
