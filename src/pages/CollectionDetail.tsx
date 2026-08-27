import { Link, Navigate, useParams } from 'react-router-dom'
import { getCollection } from '../data/collections'
import { getCollectionPicks } from '../data/picks'
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

export function CollectionDetail() {
  const { slug } = useParams()
  const { t, L } = useLocale()
  const collection = slug ? getCollection(slug) : undefined

  if (!collection) {
    return <Navigate to="/collections" replace />
  }

  const picks = getCollectionPicks(collection)

  return (
    <div className="page">
      <div className="container">
        <div className="detail-bar">
          <div>
            <p className="eyebrow">
              {L(collection.season)} {collection.year}
            </p>
            <h1>{collection.title}</h1>
          </div>
          <Link className="btn-text" to="/collections">
            {t('collections.all')}
          </Link>
        </div>

        <p className="lede detail-lede">{L(collection.summary)}</p>

        <div className="edit-mosaic" aria-label={collection.title}>
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
          {t('collections.footer') ? <p>{t('collections.footer')}</p> : <span />}
          <Link className="btn" to="/contact">
            {t('brand.contactLabel')}
          </Link>
        </div>
      </div>
    </div>
  )
}
