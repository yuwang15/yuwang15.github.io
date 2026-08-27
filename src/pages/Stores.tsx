import { Link } from 'react-router-dom'
import { stores } from '../data/stores'
import { useLocale } from '../i18n/LocaleContext'

export function Stores() {
  const { t, L } = useLocale()

  return (
    <div className="page">
      <div className="container">
        <header className="editorial-header editorial-header--tight">
          <h1>{t('stores.title')}</h1>
        </header>

        <div className="store-atmosphere">
          {stores.map((store) => (
            <article key={store.slug} className="store-atmosphere-block">
              <Link
                to={`/stores/${store.slug}`}
                className="store-atmosphere-media"
              >
                <img src={store.cover} alt={L(store.title)} loading="lazy" />
                <div className="store-atmosphere-thumbs">
                  {store.images.slice(1, 3).map((src) => (
                    <img key={src} src={src} alt="" loading="lazy" />
                  ))}
                </div>
              </Link>
              <div className="store-atmosphere-copy">
                <h2>
                  <Link to={`/stores/${store.slug}`}>{L(store.title)}</Link>
                </h2>
                <Link className="btn-text" to={`/stores/${store.slug}`}>
                  {t('stores.enter')}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
