import { useEffect, useState, type CSSProperties } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { getCollection } from '../data/collections'
import {
  getEditorialShots,
  planEditorialBlocks,
  type EditorialShot,
} from '../data/layout'
import { getCollectionPicks } from '../data/picks'
import { useLocale } from '../i18n/LocaleContext'

/** First paint: a few groups only, then reveal the rest in quiet waves. */
const INITIAL_BLOCKS = 4
const WAVE_SIZE = 3
const WAVE_MS = 450

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
        fetchPriority={eager ? 'high' : 'auto'}
        sizes="half"
        pending
      />
    </figure>
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
  const layoutScale = collection.slug === 'aw25' ? 'large' : 'default'
  const blocks = planEditorialBlocks(
    getEditorialShots(collection, picks),
    layoutScale,
  )
  // First few groups paint immediately; later groups trickle in without a click.
  const [visibleCount, setVisibleCount] = useState(INITIAL_BLOCKS)
  const shown = blocks.slice(0, visibleCount)

  useEffect(() => {
    setVisibleCount(INITIAL_BLOCKS)
  }, [collection.slug])

  useEffect(() => {
    if (visibleCount >= blocks.length) return
    const id = window.setTimeout(() => {
      setVisibleCount((n) => Math.min(blocks.length, n + WAVE_SIZE))
    }, WAVE_MS)
    return () => window.clearTimeout(id)
  }, [visibleCount, blocks.length])

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
          {shown.map((block, blockIndex) => {
            const eager = blockIndex === 0

            return block.kind === 'feature' ? (
              <div
                key={block.hero.src}
                className={`edit-run-row is-feature${block.flip ? ' is-flip' : ''}`}
                style={{ '--row-span': block.span } as CSSProperties}
              >
                <Frame shot={block.hero} grow={block.heroGrow} eager={eager} />
                <div className="edit-run-stack">
                  {block.stack.map((shot, stackIndex) => (
                    <Frame
                      key={shot.src}
                      shot={shot}
                      grow={1 / shot.ratio}
                      eager={eager && stackIndex === 0}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div
                key={block.shots[0].src}
                className={`edit-run-row${block.tight ? ' is-tight' : ''}`}
                style={{ '--row-span': block.span } as CSSProperties}
              >
                {block.shots.map((shot, shotIndex) => (
                  <Frame
                    key={shot.src}
                    shot={shot}
                    grow={shot.ratio}
                    eager={eager && shotIndex === 0}
                  />
                ))}
              </div>
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
