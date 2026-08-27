import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { useLocale } from '../i18n/LocaleContext'

const faqKeys = ['walkin', 'wechat', 'exchange'] as const
const boutiqueOfferKeys = ['tryon', 'styling', 'care'] as const

export function Services() {
  const { t } = useLocale()
  const [openFaq, setOpenFaq] = useState<string | null>(faqKeys[0])

  return (
    <div className="page services-page">
      <header className="services-hero">
        <div className="services-hero-media">
          <ResponsiveImage
            src="/assets/services/services-visit.jpg"
            alt=""
            loading="eager"
            fetchPriority="high"
            sizes="hero"
          />
        </div>
        <div className="services-hero-copy container">
          <p className="eyebrow">{t('services.eyebrow')}</p>
          <h1>{t('services.title')}</h1>
          <p className="services-lede">{t('services.lede')}</p>
        </div>
      </header>

      <div className="container">
        <section className="services-paths" aria-label={t('services.paths.label')}>
          <article className="services-path">
            <div className="services-path-media">
              <ResponsiveImage
                src="/assets/services/services-online.jpg"
                alt=""
                loading="lazy"
                sizes="half"
              />
            </div>
            <div className="services-path-copy">
              <h2>{t('services.online.title')}</h2>
              <p>{t('services.online.body')}</p>
              <Link to="/contact" className="btn-text">
                {t('services.online.cta')}
              </Link>
            </div>
          </article>

          <article className="services-path">
            <div className="services-path-media">
              <ResponsiveImage
                src="/assets/services/services-instore.jpg"
                alt=""
                loading="lazy"
                sizes="half"
              />
            </div>
            <div className="services-path-copy">
              <h2>{t('services.boutique.title')}</h2>
              <p>{t('services.boutique.body')}</p>
              <p className="services-path-note">{t('services.boutique.note')}</p>
            </div>
          </article>
        </section>

        <section className="services-offers" aria-labelledby="services-offers">
          <div className="services-offers-intro">
            <h2 id="services-offers">{t('services.offers.title')}</h2>
            <p>{t('services.offers.lede')}</p>
          </div>
          <ul className="services-offers-list">
            {boutiqueOfferKeys.map((key) => (
              <li key={key}>
                <h3>{t(`services.offers.${key}.title`)}</h3>
                <p>{t(`services.offers.${key}.body`)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="services-visit" aria-labelledby="services-visit">
          <div className="services-visit-media">
            <ResponsiveImage
              src="/assets/stores/haian-hengtian/3.jpg"
              alt=""
              loading="lazy"
              sizes="half"
            />
          </div>
          <div className="services-visit-copy">
            <h2 id="services-visit">{t('services.visit.title')}</h2>
            <p>{t('services.visit.lede')}</p>
            <div className="services-visit-actions">
              <Link to="/stores" className="btn">
                {t('services.visit.stores')}
              </Link>
              <Link to="/contact" className="btn-text">
                {t('services.visit.optional')}
              </Link>
            </div>
          </div>
        </section>

        <section className="services-faq" aria-labelledby="services-faq">
          <h2 id="services-faq">{t('services.faq.title')}</h2>
          <ul className="services-faq-list">
            {faqKeys.map((key) => {
              const open = openFaq === key
              return (
                <li key={key} className={`services-faq-item${open ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="services-faq-trigger"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : key)}
                  >
                    <span>{t(`services.faq.${key}.q`)}</span>
                    <span className="services-faq-mark" aria-hidden>
                      {open ? '−' : '+'}
                    </span>
                  </button>
                  {open ? (
                    <p className="services-faq-answer">{t(`services.faq.${key}.a`)}</p>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </div>
  )
}
