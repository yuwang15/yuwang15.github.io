import { Link, Navigate, useParams } from 'react-router-dom'
import { OrientFigure } from '../components/OrientMedia'
import { getStore } from '../data/stores'
import { useLocale } from '../i18n/LocaleContext'

export function StoreDetail() {
  const { slug } = useParams()
  const { t, L } = useLocale()
  const store = slug ? getStore(slug) : undefined

  if (!store) {
    return <Navigate to="/stores" replace />
  }

  const picks = store.images.slice(0, 9)

  return (
    <div className="page">
      <div className="container">
        <div className="detail-bar">
          <div>
            <p className="eyebrow">
              <Link to="/stores">{t('stores.back')}</Link>
            </p>
            <h1>{L(store.title)}</h1>
          </div>
        </div>

        <div className="edit-mosaic" aria-label={L(store.title)}>
          {picks.map((src, index) => (
            <OrientFigure
              key={src}
              src={src}
              loading={index < 3 ? 'eager' : 'lazy'}
            />
          ))}
        </div>

        <div className="detail-footer">
          <p>{t('stores.footer')}</p>
          <a
            className="btn"
            href={store.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t('stores.book')}
          </a>
        </div>
      </div>
    </div>
  )
}
