import { Link } from 'react-router-dom'
import { BrandMark } from './BrandMark'
import { useLocale } from '../i18n/LocaleContext'

const year = new Date().getFullYear()

const qrItems = [
  { key: 'brand', src: '/assets/qr/wechat-brand.jpg' },
  { key: 'booking', src: '/assets/qr/wechat-booking.jpg' },
  { key: 'service', src: '/assets/qr/douyin.jpg' },
] as const

const navKeys = [
  { to: '/collections', key: 'footer.collections' },
  { to: '/films', key: 'footer.films' },
  { to: '/stores', key: 'footer.stores' },
  { to: '/services', key: 'footer.services' },
  { to: '/brand', key: 'footer.brand' },
  { to: '/contact', key: 'footer.contactUs' },
] as const

export function Footer() {
  const { t } = useLocale()
  const wechatLabel = t('brand.wechat')

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand-block">
          <Link to="/" className="footer-brand" aria-label={t('nav.home')}>
            <BrandMark size="footer" />
          </Link>
          <p className="footer-tag">{t('footer.tag')}</p>
        </div>

        <nav className="footer-nav" aria-label={t('footer.pages')}>
          {navKeys.map((item) => (
            <Link key={item.to} to={item.to}>
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="footer-follow" id="contact">
          <p className="footer-col-title">{wechatLabel}</p>
          <div className="footer-social" aria-label={wechatLabel}>
            {qrItems.map((item) => (
              <div key={item.key} className="footer-qr">
                <img src={item.src} alt={wechatLabel} loading="lazy" />
              </div>
            ))}
          </div>
          <p className="footer-douyin-line">
            {t('footer.follow')} {t('footer.douyin')}{' '}
            <span className="footer-douyin-id">{t('footer.douyinId')}</span>
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        <span className="footer-copy">{t('footer.copyright', { year })}</span>
      </div>
    </footer>
  )
}
