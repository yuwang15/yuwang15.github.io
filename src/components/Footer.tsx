import { Link } from 'react-router-dom'
import { BrandMark } from './BrandMark'
import { stores } from '../data/stores'
import { useLocale } from '../i18n/LocaleContext'

const year = new Date().getFullYear()

export function Footer() {
  const { t, L } = useLocale()

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
          <p className="footer-col-title">{t('footer.explore')}</p>
          <nav className="footer-links" aria-label={t('footer.explore')}>
            <Link to="/collections">{t('nav.collections')}</Link>
            <Link to="/brand">{t('nav.about')}</Link>
            <Link to="/brand#film">{t('footer.film')}</Link>
            <Link to="/brand#contact">{t('nav.contact')}</Link>
          </nav>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">{t('footer.location')}</p>
          <nav className="footer-links" aria-label={t('footer.location')}>
            <Link to="/stores">{t('stores.title')}</Link>
            {stores.map((store) => (
              <Link key={store.slug} to={`/stores/${store.slug}`}>
                {L(store.title)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">{t('footer.contact')}</p>
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
