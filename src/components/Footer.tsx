import { Link } from 'react-router-dom'
import { BrandMark } from './BrandMark'
import { useLocale } from '../i18n/LocaleContext'

const year = new Date().getFullYear()

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
            <Link to="/brand">{t('footer.brand')}</Link>
            <Link to="/stores">{t('footer.stores')}</Link>
          </nav>
        </div>

        <div className="footer-col" id="contact">
          <p className="footer-col-title">{t('footer.wechat')}</p>
          <div className="footer-social">
            <div className="footer-social-block">
              <p>{t('brand.wechat.a')}</p>
              <div className="footer-qr" aria-label={t('brand.wechat.a')}>
                SYW
              </div>
            </div>
            <div className="footer-social-block">
              <p>{t('brand.wechat.b')}</p>
              <div className="footer-qr" aria-label={t('brand.wechat.b')}>
                SYW
              </div>
            </div>
          </div>
          <p className="footer-douyin">
            <span>{t('footer.douyin')}</span>
            <span className="footer-douyin-id">{t('footer.douyinId')}</span>
          </p>
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
