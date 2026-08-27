import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BrandMark } from './BrandMark'
import { useLocale } from '../i18n/LocaleContext'
import { LangSwitch } from '../i18n/LangSwitch'

export function Nav() {
  const { pathname } = useLocation()
  const { locale, t } = useLocale()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/collections', label: t('nav.collections') },
    { to: '/brand', label: t('nav.brand') },
  ]

  useEffect(() => {
    setOpen(false)
  }, [pathname, locale])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`nav${open ? ' is-open' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-brand" aria-label={t('nav.home')}>
          <BrandMark size="nav" />
        </Link>

        <nav className="nav-menu" aria-label={locale === 'zh' ? '主导航' : 'Main'}>
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-tools">
          <LangSwitch />
          <button
            className="nav-toggle"
            type="button"
            aria-label={open ? t('nav.close') : t('nav.open')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
