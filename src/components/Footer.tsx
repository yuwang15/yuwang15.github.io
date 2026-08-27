import { Link } from 'react-router-dom'
import { BrandMark } from './BrandMark'
import { useLocale } from '../i18n/LocaleContext'

const year = new Date().getFullYear()

const qrItems = [
  {
    key: 'brand',
    labelKey: 'brand.wechat.a',
    src: '/assets/qr/wechat-brand.jpg',
  },
  {
    key: 'booking',
    labelKey: 'brand.wechat.b',
    src: '/assets/qr/wechat-booking.jpg',
  },
  {
    key: 'douyin',
    labelKey: 'footer.douyin',
    src: '/assets/qr/douyin.jpg',
    handleKey: 'footer.douyinId',
  },
] as const

export function Footer() {
  const { t } = useLocale()

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col footer-col--brand">
          <Link to="/" className="footer-brand" aria-label={t('nav.home')}>
            <BrandMark size="footer" />
          </Link>
          <p className="footer-tag">{t('footer.tag')}</p>
        </div>

        <div className="footer-col">
          <nav className="footer-links" aria-label={t('footer.pages')}>
            <Link to="/collections">{t('footer.collections')}</Link>
            <Link to="/films">{t('footer.films')}</Link>
            <Link to="/stores">{t('footer.stores')}</Link>
            <Link to="/brand">{t('footer.brand')}</Link>
            <Link to="/contact">{t('footer.contactUs')}</Link>
          </nav>
        </div>

        <div className="footer-col" id="contact">
          <p className="footer-col-title">{t('footer.follow')}</p>
          <div className="footer-social">
            {qrItems.map((item) => (
              <div key={item.key} className="footer-social-block">
                <p className="footer-social-label">{t(item.labelKey)}</p>
                <div className="footer-qr">
                  <img src={item.src} alt={t(item.labelKey)} loading="lazy" />
                </div>
                {'handleKey' in item ? (
                  <p className="footer-social-handle">{t(item.handleKey)}</p>
                ) : (
                  <p className="footer-social-handle footer-social-handle--spacer" aria-hidden>
                    &nbsp;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span className="footer-copy">
          {t('footer.copyright', { year })}
        </span>
      </div>
    </footer>
  )
}
