import { Link, Navigate, useParams } from 'react-router-dom'
import { getStore } from '../data/stores'
import { useLocale } from '../i18n/LocaleContext'

const ROLES = [
  'is-hero',
  'is-side',
  'is-side',
  'is-third',
  'is-third',
  'is-third',
  'is-half',
  'is-half',
  'is-wide',
] as const

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
            <figure
              key={src}
              className={`edit-mosaic-item ${ROLES[index] ?? 'is-third'}`}
            >
              <img
                src={src}
                alt=""
                loading={index < 3 ? 'eager' : 'lazy'}
              />
            </figure>
          ))}
        </div>

        <div className="detail-footer">
          <p>{t('stores.footer')}</p>
          <Link className="btn" to="/brand#contact">
            {t('brand.contactLabel')}
          </Link>
        </div>
      </div>
    </div>
  )
}
