import { BrandMark } from '../components/BrandMark'
import { stores } from '../data/stores'
import { useLocale } from '../i18n/LocaleContext'

/** Store atmosphere + garment detail — not lookbook fashion plates */
const brandVisuals = {
  hero: stores[0].images[2] ?? stores[0].cover,
  storeWide: stores[2].images[4] ?? stores[2].cover,
  detailA: stores[1].images[3] ?? stores[1].cover,
  detailB: '/assets/collections/ss26/029.jpg',
  detailC: '/assets/collections/aw25/018.jpg',
}

export function Brand() {
  const { t } = useLocale()

  return (
    <>
      <section className="about-hero" id="about">
        <img src={`${brandVisuals.hero}?v=store`} alt={t('brand.altHero')} />
        <div className="about-hero-veil" />
        <div className="about-hero-copy">
          <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>
            {t('brand.eyebrow')}
          </p>
          <h1>
            <BrandMark size="display" />
          </h1>
        </div>
      </section>

      <div className="about-body">
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>
          {t('brand.about')}
        </p>
        <p>{t('brand.p1')}</p>
        <p>{t('brand.p2')}</p>
        <p>{t('brand.p3')}</p>
        <p>{t('brand.p4')}</p>
      </div>

      <section className="brand-pillars">
        <div className="container brand-pillars-grid">
          <article>
            <h3>
              <span className="brand-pillar-letter" aria-hidden>
                S
              </span>
              {t('brand.pillar.style')}
            </h3>
            <p>{t('brand.style')}</p>
          </article>
          <article>
            <h3>
              <span className="brand-pillar-letter" aria-hidden>
                Y
              </span>
              {t('brand.pillar.youth')}
            </h3>
            <p>{t('brand.youth')}</p>
          </article>
          <article>
            <h3>
              <span className="brand-pillar-letter" aria-hidden>
                W
              </span>
              {t('brand.pillar.wild')}
            </h3>
            <p>{t('brand.wild')}</p>
          </article>
        </div>
      </section>

      <section className="brand-visuals">
        <div className="brand-visuals-grid">
          <figure className="brand-visual is-store">
            <img
              src={`${brandVisuals.detailA}?v=store`}
              alt={t('brand.altStore')}
            />
          </figure>
          <figure className="brand-visual is-detail">
            <img
              src={`${brandVisuals.detailB}?v=detail`}
              alt={t('brand.altDetail')}
            />
          </figure>
          <figure className="brand-visual is-detail-b">
            <img
              src={`${brandVisuals.detailC}?v=detail`}
              alt={t('brand.altDetail')}
            />
          </figure>
          <figure className="brand-visual is-wide">
            <img
              src={`${brandVisuals.storeWide}?v=store`}
              alt={t('brand.altStore')}
            />
          </figure>
        </div>
      </section>
    </>
  )
}
