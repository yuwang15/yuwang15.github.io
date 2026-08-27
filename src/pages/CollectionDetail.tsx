import { Fragment, type CSSProperties } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { getCollection, type MoodInsert } from '../data/collections'
import {
  getEditorialShots,
  planEditorialBlocks,
  type EditorialShot,
} from '../data/layout'
import { getCollectionPicks } from '../data/picks'
import { useLocale } from '../i18n/LocaleContext'

function Frame({
  shot,
  grow,
  eager,
}: {
  shot: EditorialShot
  /** 并排时按宽高比分宽；竖排时按 1/宽高比 分高 */
  grow: number
  eager: boolean
}) {
  return (
    <figure
      className="edit-run-frame"
      style={{ flexGrow: grow, '--frame-ratio': shot.ratio } as CSSProperties}
    >
      <ResponsiveImage
        src={shot.src}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        sizes="half"
      />
    </figure>
  )
}

/** 氛围图借用图墙的行排版，所以它读起来是这一季的一部分，而不是外挂的一块 */
function MoodRow({ insert, eager }: { insert: MoodInsert; eager: boolean }) {
  const { L } = useLocale()
  const span = insert.studies.reduce((acc, s) => acc + s.ratio, 0)

  return (
    <div className="edit-run-row is-mood" style={{ '--row-span': span } as CSSProperties}>
      {insert.studies.map((study) => (
        <figure
          key={study.src}
          className="edit-run-frame"
          style={{ flexGrow: study.ratio, '--frame-ratio': study.ratio } as CSSProperties}
        >
          <ResponsiveImage
            src={study.src}
            alt={L(study.caption)}
            loading={eager ? 'eager' : 'lazy'}
            sizes="half"
          />
        </figure>
      ))}
    </div>
  )
}

export function CollectionDetail() {
  const { slug } = useParams()
  const { t, L } = useLocale()
  const collection = slug ? getCollection(slug) : undefined

  if (!collection) {
    return <Navigate to="/collections" replace />
  }

  const picks = getCollectionPicks(collection)
  const blocks = planEditorialBlocks(getEditorialShots(collection, picks))

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

        <div className="edit-run" aria-label={collection.title}>
          {blocks.map((block, blockIndex) => {
            const eager = blockIndex === 0
            const insert = collection.mood?.find((m) => m.at === blockIndex)
            const body =
              block.kind === 'feature' ? (
                <div
                  className={`edit-run-row is-feature${block.flip ? ' is-flip' : ''}`}
                  style={{ '--row-span': block.span } as CSSProperties}
                >
                  <Frame shot={block.hero} grow={block.heroGrow} eager={eager} />
                  <div className="edit-run-stack">
                    {block.stack.map((shot) => (
                      <Frame
                        key={shot.src}
                        shot={shot}
                        grow={1 / shot.ratio}
                        eager={eager}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className={`edit-run-row${block.tight ? ' is-tight' : ''}`}
                  style={{ '--row-span': block.span } as CSSProperties}
                >
                  {block.shots.map((shot) => (
                    <Frame
                      key={shot.src}
                      shot={shot}
                      grow={shot.ratio}
                      eager={eager}
                    />
                  ))}
                </div>
              )

            return (
              <Fragment
                key={block.kind === 'feature' ? block.hero.src : block.shots[0].src}
              >
                {insert && <MoodRow insert={insert} eager={eager} />}
                {body}
              </Fragment>
            )
          })}
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
